import { Router } from 'express';
import * as content from '../data/content.js';
import { store } from '../store.js';
import { notFound } from '../lib/errors.js';

export const contentRouter = Router();

// Content is static per deploy — let browsers and any CDN cache it.
const cache = (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
  next();
};

contentRouter.use(cache);

const site = () => ({
  company: content.company,
  serviceArea: content.serviceArea,
  trustPoints: content.trustPoints,
  notes: content.notes,
});

/**
 * Everything the SPA needs to boot, in one round trip. The client used to make
 * seven parallel calls per page load, which burned rate-limit budget (whole
 * offices share one NAT address) and cost seven handshakes before first paint.
 */
contentRouter.get('/bootstrap', (_req, res) => {
  res.json({
    ok: true,
    data: {
      // True when submissions are not durably stored (preview/demo deploys).
      demo: !store.persistent,
      site: site(),
      services: content.services,
      promotions: content.promotions.filter((p) => p.active),
    },
  });
});

contentRouter.get('/site', (_req, res) => {
  res.json({ ok: true, data: site() });
});

contentRouter.get('/services', (_req, res) => {
  res.json({ ok: true, data: content.services });
});

contentRouter.get('/services/:slug', (req, res, next) => {
  const service = content.services.find((s) => s.slug === req.params.slug);
  if (!service) return next(notFound(`No service named "${req.params.slug}".`));
  const related = content.services.filter((s) => s.slug !== service.slug);
  res.json({ ok: true, data: { ...service, related } });
});
