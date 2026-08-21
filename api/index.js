/**
 * Vercel serverless entry point.
 *
 * An Express app is itself a valid (req, res) handler, so the platform can call
 * it directly. Nothing here listens on a port — Vercel owns the socket.
 */
export { app as default } from '../server/src/app.js';
