/**
 * Vercel serves the static HTML from its CDN, so the CSP for it lives in
 * vercel.json as literal text — it cannot be computed at request time the way
 * the Express server does it.
 *
 * Hard-coded CSP hashes are the classic thing that silently rots: someone edits
 * the inline theme script, the hash no longer matches, and the browser blocks
 * it — producing a flash of the wrong theme that nobody connects to a CSP
 * change. This runs after the build and fails loudly instead.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../client/dist/index.html', import.meta.url), 'utf8');
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

const actual = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
  .map((m) => m[1])
  .filter((s) => s.trim())
  .map((s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`);

const csp =
  config.headers
    ?.flatMap((h) => h.headers)
    .find((h) => h.key.toLowerCase() === 'content-security-policy')?.value ?? '';

const missing = actual.filter((h) => !csp.includes(h));

if (missing.length) {
  console.error(
    '\n✗ CSP hash mismatch — the inline script(s) in index.html changed.\n' +
      '  Add these to script-src in vercel.json:\n' +
      missing.map((h) => `    ${h}`).join('\n') +
      '\n'
  );
  process.exit(1);
}

console.log(`✓ CSP: all ${actual.length} inline script hash(es) present in vercel.json`);
