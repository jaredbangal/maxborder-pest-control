import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { logger } from './lib/logger.js';

/** Durable store backed by a SQLite file. Used whenever real disk is available. */
export const createSqliteStore = (file) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });

  const db = new DatabaseSync(file);

  // WAL keeps reads non-blocking while a lead is being written.
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');
  db.exec('PRAGMA busy_timeout = 5000');

  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id            TEXT PRIMARY KEY,
      kind          TEXT NOT NULL CHECK (kind IN ('quote', 'contact', 'callback')),
      name          TEXT NOT NULL,
      email         TEXT NOT NULL,
      phone         TEXT NOT NULL,
      zip           TEXT,
      address       TEXT,
      service_slug  TEXT,
      property_type TEXT,
      urgency       TEXT,
      message       TEXT,
      source_page   TEXT,
      status        TEXT NOT NULL DEFAULT 'new',
      ip_hash       TEXT,
      user_agent    TEXT,
      created_at    TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_kind       ON leads (kind);
    CREATE INDEX IF NOT EXISTS idx_leads_status     ON leads (status);

    CREATE TABLE IF NOT EXISTS subscribers (
      id         TEXT PRIMARY KEY,
      email      TEXT NOT NULL UNIQUE COLLATE NOCASE,
      created_at TEXT NOT NULL
    );
  `);

  const statements = {
    insertLead: db.prepare(`
      INSERT INTO leads (
        id, kind, name, email, phone, zip, address, service_slug, property_type,
        urgency, message, source_page, ip_hash, user_agent, created_at
      ) VALUES (
        :id, :kind, :name, :email, :phone, :zip, :address, :service_slug, :property_type,
        :urgency, :message, :source_page, :ip_hash, :user_agent, :created_at
      )
    `),
    listLeads: db.prepare(`
      SELECT id, kind, name, email, phone, zip, address, service_slug, property_type,
             urgency, message, source_page, status, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT :limit OFFSET :offset
    `),
    countLeads: db.prepare('SELECT COUNT(*) AS total FROM leads'),
    upsertSubscriber: db.prepare(`
      INSERT INTO subscribers (id, email, created_at) VALUES (:id, :email, :created_at)
      ON CONFLICT (email) DO NOTHING
    `),
  };

  logger.info(`SQLite store ready at ${file}`);

  return {
    kind: 'sqlite',
    persistent: true,
    insertLead: (lead) => statements.insertLead.run(lead),
    listLeads: (opts) => statements.listLeads.all(opts),
    countLeads: () => statements.countLeads.get().total,
    upsertSubscriber: (row) => statements.upsertSubscriber.run(row),
    close: () => {
      try {
        db.close();
      } catch {
        /* already closed */
      }
    },
  };
};
