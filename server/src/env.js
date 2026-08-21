import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const bool = (v, fallback = false) =>
  v === undefined ? fallback : ['1', 'true', 'yes', 'on'].includes(String(v).toLowerCase());

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

/** Origins allowed to call the API. Empty list in dev means "same-origin + localhost". */
const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const smtp = {
  host: process.env.SMTP_HOST || '',
  port: Number(process.env.SMTP_PORT || 587),
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
  to: process.env.LEAD_NOTIFY_TO || '',
  from: process.env.LEAD_NOTIFY_FROM || '',
};
smtp.enabled = Boolean(smtp.host && smtp.user && smtp.pass && smtp.to);

// Vercel/Netlify/Lambda all set one of these. Storage and shutdown behaviour
// differ on a platform with an ephemeral, read-only filesystem.
const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY
);

export const env = {
  NODE_ENV,
  isProd,
  isServerless,
  serverRoot,
  port: Number(process.env.PORT || 4000),
  corsOrigins,
  databaseFile: path.resolve(serverRoot, process.env.DATABASE_FILE || 'data/maxborder.db'),
  adminApiKey: process.env.ADMIN_API_KEY || '',
  trustProxy: bool(process.env.TRUST_PROXY, isProd),
  smtp,
};

// Fail loudly rather than silently shipping an unprotected admin endpoint.
if (isProd && !isServerless && !env.adminApiKey) {
  throw new Error(
    'ADMIN_API_KEY must be set in production — /api/admin/* would otherwise be unreachable or unprotected.'
  );
}
