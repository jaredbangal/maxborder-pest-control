import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './env.js';
import { unauthorized } from './lib/errors.js';
import { logger } from './lib/logger.js';

/**
 * Salt for IP hashing. Reusing ADMIN_API_KEY keeps hashes stable across restarts
 * so repeat abusers stay correlatable; without it we fall back to a per-process
 * random salt, which still protects the raw IP but resets on redeploy.
 */
const IP_SALT = env.adminApiKey || crypto.randomBytes(32).toString('hex');

/** We never store raw IPs — only a salted hash, enough to spot repeat abuse. */
export const hashIp = (ip) =>
  ip ? crypto.createHash('sha256').update(`${IP_SALT}:${ip}`).digest('hex').slice(0, 32) : null;

/**
 * The built index.html carries two inline scripts: the pre-paint theme setter
 * (which MUST be inline — a deferred file would flash the wrong palette) and
 * the JSON-LD block. Rather than open the policy with 'unsafe-inline', we hash
 * whatever is actually in the file at boot and allow exactly those.
 *
 * Reading at startup means the hashes can never drift out of sync with the
 * markup, which is the usual failure mode of hand-maintained CSP hashes.
 */
const inlineScriptHashes = () => {
  const indexFile = path.resolve(env.serverRoot, '../client/dist/index.html');
  if (!fs.existsSync(indexFile)) return [];

  const html = fs.readFileSync(indexFile, 'utf8');
  const hashes = [];

  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const body = match[1];
    if (!body.trim()) continue;
    hashes.push(`'sha256-${crypto.createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }

  if (hashes.length) logger.info(`CSP: allowing ${hashes.length} hashed inline script(s)`);
  return hashes;
};

const SCRIPT_HASHES = inlineScriptHashes();

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      // Only 'self' plus the exact hashes of the inline scripts we ship.
      scriptSrc: ["'self'", ...SCRIPT_HASHES],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", ...env.corsOrigins],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: env.isProd ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: env.isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
});

export const corsMiddleware = cors({
  origin(origin, cb) {
    // Same-origin requests and server-to-server calls arrive without an Origin header.
    if (!origin) return cb(null, true);
    if (env.corsOrigins.includes(origin)) return cb(null, true);
    logger.warn(`CORS blocked origin: ${origin}`);
    return cb(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Admin-Key'],
  maxAge: 86400,
  credentials: false,
});

const limiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { ok: false, error: message },
    // Health checks shouldn't burn a caller's budget.
    skip: (req) => req.path === '/api/health',
  });

/**
 * Broad ceiling for reads. Set high on purpose: an office, a school or any
 * carrier-grade NAT presents many real visitors as a single IP, and reads are
 * cheap and cacheable. Abuse is caught by writeLimiter, which is what matters.
 */
export const generalLimiter = limiter(15 * 60 * 1000, 1000, 'Too many requests. Please slow down.');

/** Writes are far more expensive and far more attractive to spam. */
export const writeLimiter = limiter(
  60 * 60 * 1000,
  10,
  'You have submitted several requests already. Please call us at (888) 629-7378 and we will help right away.'
);

export const adminLimiter = limiter(15 * 60 * 1000, 30, 'Too many admin requests.');

/** Constant-time comparison so a wrong key leaks nothing through response timing. */
export const requireAdmin = (req, _res, next) => {
  const provided = req.get('X-Admin-Key') || '';
  const expected = env.adminApiKey;
  if (!expected) return next(unauthorized('Admin API is disabled — set ADMIN_API_KEY.'));

  // Hash both sides first: timingSafeEqual throws on length mismatch, and
  // short-circuiting on length would leak the key's length through timing.
  // Hashing gives two fixed-width buffers, so the compare is always constant time.
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  const ok = crypto.timingSafeEqual(a, b);
  if (!ok) {
    logger.warn('Rejected admin request', { ip: hashIp(req.ip) });
    return next(unauthorized());
  }
  return next();
};
