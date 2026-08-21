/**
 * Vercel serverless entry point.
 *
 * The .mjs extension is load-bearing: the repo-root package.json has no
 * "type": "module" (the workspaces set their own), so a .js file here would be
 * loaded as CommonJS and fail on this file's `export` — and again on the
 * top-level await inside the store. .mjs is ESM regardless of package.json.
 *
 * An Express app is itself a valid (req, res) handler, so the platform can call
 * it directly. Nothing here listens on a port — Vercel owns the socket.
 */
export { app as default } from '../server/src/app.js';
