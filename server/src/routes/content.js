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
      site: {
        company: content.company,
        stats: content.stats,
        certifications: content.certifications,
        serviceAreas: content.serviceAreas,
      },
      services: content.services,
      plans: content.plans,
      pestCategories: content.pestCategories,
      pests: content.pests,
      testimonials: content.testimonials,
      faqs: content.faqs,
      process: { steps: content.processSteps },
    },
  });
});

contentRouter.get('/site', (_req, res) => {
  res.json({
    ok: true,
    data: {
      company: content.company,
      stats: content.stats,
      certifications: content.certifications,
      serviceAreas: content.serviceAreas,
    },
  });
});

contentRouter.get('/services', (_req, res) => {
  res.json({ ok: true, data: content.services });
});

contentRouter.get('/services/:slug', (req, res, next) => {
  const service = content.services.find((s) => s.slug === req.params.slug);
  if (!service) return next(notFound(`No service named "${req.params.slug}".`));
  const related = content.services.filter((s) => s.slug !== service.slug).slice(0, 3);
  res.json({ ok: true, data: { ...service, related } });
});

contentRouter.get('/plans', (_req, res) => res.json({ ok: true, data: content.plans }));
contentRouter.get('/pests', (_req, res) => res.json({ ok: true, data: content.pests }));
contentRouter.get('/pest-categories', (_req, res) =>
  res.json({ ok: true, data: content.pestCategories })
);
contentRouter.get('/testimonials', (_req, res) => res.json({ ok: true, data: content.testimonials }));
contentRouter.get('/faqs', (_req, res) => res.json({ ok: true, data: content.faqs }));
contentRouter.get('/process', (_req, res) =>
  res.json({ ok: true, data: { steps: content.processSteps } })
);

/** Coverage lookup for the hero ZIP field. */
contentRouter.get('/coverage/:zip', (req, res) => {
  const zip = String(req.params.zip).trim();
  if (!/^\d{5}$/.test(zip)) {
    return res.status(400).json({ ok: false, error: 'Enter a 5-digit ZIP code.' });
  }
  // Demo rule: Texas ZIPs (75000–79999) are in-network.
  const n = Number(zip);
  const covered = n >= 75000 && n <= 79999;
  res.json({
    ok: true,
    data: {
      zip,
      covered,
      message: covered
        ? 'Good news — we service your area with same-week scheduling.'
        : 'We are not in your area yet, but leave your details and we will tell you the moment we are.',
    },
  });
});
