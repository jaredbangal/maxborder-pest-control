import { env } from './env.js';
import { logger } from './lib/logger.js';
import { createMemoryStore } from './store.memory.js';

/**
 * Picks a storage backend at boot.
 *
 * SQLite needs two things a serverless platform does not provide: a writable,
 * durable filesystem, and (on Node 22) the --experimental-sqlite flag. Rather
 * than crash or silently drop data, we detect that and fall back to an
 * explicitly non-persistent store — the honest behaviour for a demo deployment.
 */
const select = async () => {
  if (env.isServerless) {
    logger.info('Serverless environment detected — using non-persistent store.');
    return createMemoryStore();
  }

  try {
    // Imported lazily: on a runtime without node:sqlite this rejects instead of
    // taking the whole process down at module-load time.
    const { createSqliteStore } = await import('./store.sqlite.js');
    return createSqliteStore(env.databaseFile);
  } catch (err) {
    logger.warn(`SQLite unavailable (${err.message}) — falling back to non-persistent store.`);
    return createMemoryStore();
  }
};

export const store = await select();
export const closeStore = () => store.close();
