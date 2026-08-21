import { app } from './app.js';
import { env } from './env.js';
import { closeStore } from './store.js';
import { logger } from './lib/logger.js';

const server = app.listen(env.port, () => {
  logger.info(`Maxborder API listening on http://localhost:${env.port} [${env.NODE_ENV}]`);
});

const shutdown = (signal) => () => {
  logger.info(`${signal} received — shutting down`);
  server.close(() => {
    closeStore();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', shutdown('SIGTERM'));
process.on('SIGINT', shutdown('SIGINT'));
