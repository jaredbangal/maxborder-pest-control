import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import compression from 'compression';
import { env } from './env.js';
import { HttpError, notFound } from './lib/errors.js';
import { logger } from './lib/logger.js';
import { corsMiddleware, generalLimiter, securityHeaders } from './security.js';
import { contentRouter } from './routes/content.js';
import { leadsRouter } from './routes/leads.js';
import { adminRouter } from './routes/admin.js';

export const app = express();

// Required for correct client IPs (and therefore rate limiting) behind a proxy.
app.set('trust proxy', env.trustProxy ? 1 : false);
app.disable('x-powered-by');

app.use(securityHeaders);
app.use(compression());
app.use(corsMiddleware);
// 32kb is far more than any form here needs and small enough to blunt payload abuse.
app.use(express.json({ limit: '32kb' }));
app.use(generalLimiter);

app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)}ms`);
  });
  next();
});

app.get('/api/health', (_req, res) =>
  res.json({ ok: true, status: 'healthy', uptime: process.uptime(), env: env.NODE_ENV })
);

app.use('/api', contentRouter);
app.use('/api', leadsRouter);
app.use('/api/admin', adminRouter);

app.use('/api', (req, _res, next) => next(notFound(`No API route for ${req.method} ${req.path}`)));

// When self-hosting, the API also serves the built SPA so there is a single
// origin. On Vercel the static build is served by the platform instead.
const clientDist = path.resolve(env.serverRoot, '../client/dist');
if (!env.isServerless && fs.existsSync(clientDist)) {
  app.use(
    express.static(clientDist, {
      maxAge: '1y',
      // Hashed assets can cache forever; the HTML entry point must not.
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache');
      },
    })
  );
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  logger.info(`Serving built client from ${clientDist}`);
}

// eslint-disable-next-line no-unused-vars -- Express identifies error middleware by arity.
app.use((err, req, res, _next) => {
  const status = err instanceof HttpError ? err.status : err.status || 500;

  if (err.type === 'entity.too.large') {
    return res.status(413).json({ ok: false, error: 'Request payload too large.' });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'Malformed JSON body.' });
  }

  if (status >= 500) {
    logger.error(`Unhandled error on ${req.method} ${req.originalUrl}`, {
      message: err.message,
      stack: err.stack,
    });
  }

  res.status(status).json({
    ok: false,
    // Never leak internals on a 500 — generic message for the client, detail in the log.
    error: status >= 500 ? 'Something went wrong on our end. Please try again.' : err.message,
    ...(err.details ? { fields: err.details } : {}),
  });
});
