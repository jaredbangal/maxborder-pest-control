import { logger } from './lib/logger.js';

/**
 * Non-persistent store for serverless/demo deployments.
 *
 * Serverless instances are ephemeral and share nothing, so anything written
 * here disappears when the instance is recycled. That is intentional: it lets
 * the forms validate and respond correctly on a preview deployment without
 * pretending submissions are being kept. For real lead capture, configure SMTP
 * (durable email record) or point DATABASE_FILE at persistent disk.
 */
export const createMemoryStore = () => {
  const leads = [];
  const subscribers = new Set();
  const MAX = 200; // bounded so a burst cannot exhaust function memory

  logger.warn(
    'Using in-memory store — leads are NOT persisted. Configure SMTP or a database for production.'
  );

  return {
    kind: 'memory',
    persistent: false,

    insertLead(lead) {
      leads.unshift(lead);
      if (leads.length > MAX) leads.length = MAX;
    },

    listLeads({ limit, offset }) {
      return leads.slice(offset, offset + limit).map(({ ip_hash, user_agent, ...rest }) => rest);
    },

    countLeads() {
      return leads.length;
    },

    upsertSubscriber({ email }) {
      subscribers.add(email.toLowerCase());
    },

    close() {},
  };
};
