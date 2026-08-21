import crypto from 'node:crypto';
import { Router } from 'express';
import { store } from '../store.js';
import { asyncHandler } from '../lib/errors.js';
import { logger } from '../lib/logger.js';
import { notifyNewLead } from '../lib/mailer.js';
import { hashIp, writeLimiter } from '../security.js';
import {
  callbackSchema,
  contactSchema,
  fieldErrors,
  quoteSchema,
  subscribeSchema,
} from '../validation.js';

export const leadsRouter = Router();

leadsRouter.use(writeLimiter);

const SUCCESS = {
  quote: 'Thanks — your free inspection request is in. We will call within one business hour.',
  contact: 'Message received. A specialist will reply within one business day.',
  callback: 'Got it. Expect a call from our team shortly.',
};

/**
 * Shared handler for every lead type. The honeypot check returns the ordinary
 * success shape on purpose — a bot that gets a distinct error just retries.
 */
const handleLead = (kind, schema) =>
  asyncHandler(async (req, res) => {
    const parsed = schema.safeParse(req.body ?? {});

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields.',
        fields: fieldErrors(parsed.error),
      });
    }

    const body = parsed.data;

    if (body.company) {
      logger.warn('Honeypot triggered — dropping submission', { ip: hashIp(req.ip), kind });
      return res.status(202).json({ ok: true, message: SUCCESS[kind] });
    }

    const lead = {
      id: crypto.randomUUID(),
      kind,
      name: body.name,
      email: body.email ?? '',
      phone: body.phone,
      zip: body.zip ?? null,
      address: body.address ?? null,
      service_slug: body.serviceSlug ?? null,
      property_type: body.propertyType ?? null,
      urgency: body.urgency ?? null,
      message: body.message ?? null,
      source_page: body.sourcePage ?? null,
      ip_hash: hashIp(req.ip),
      user_agent: (req.get('User-Agent') || '').slice(0, 255),
      created_at: new Date().toISOString(),
    };

    store.insertLead(lead);
    logger.info(`Captured ${kind} lead ${lead.id}`);

    // Do not make the customer wait on SMTP.
    void notifyNewLead({
      kind,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      zip: lead.zip,
      service: lead.service_slug,
      urgency: lead.urgency,
      message: lead.message,
      page: lead.source_page,
    });

    res.status(201).json({ ok: true, id: lead.id, message: SUCCESS[kind] });
  });

leadsRouter.post('/quote', handleLead('quote', quoteSchema));
leadsRouter.post('/contact', handleLead('contact', contactSchema));
leadsRouter.post('/callback', handleLead('callback', callbackSchema));

leadsRouter.post(
  '/subscribe',
  asyncHandler(async (req, res) => {
    const parsed = subscribeSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return res
        .status(400)
        .json({ ok: false, error: 'Enter a valid email address.', fields: fieldErrors(parsed.error) });
    }
    if (parsed.data.company) {
      return res.status(202).json({ ok: true, message: 'You are subscribed.' });
    }

    store.upsertSubscriber({
      id: crypto.randomUUID(),
      email: parsed.data.email,
      created_at: new Date().toISOString(),
    });

    // Same response whether or not the address was already on the list —
    // otherwise the endpoint becomes a subscriber-enumeration oracle.
    res.status(201).json({ ok: true, message: 'You are subscribed. Seasonal pest alerts only.' });
  })
);
