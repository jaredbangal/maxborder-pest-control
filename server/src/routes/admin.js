import { Router } from 'express';
import { store } from '../store.js';
import { adminLimiter, requireAdmin } from '../security.js';

export const adminRouter = Router();

adminRouter.use(adminLimiter, requireAdmin);

adminRouter.get('/leads', (req, res) => {
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  const rows = store.listLeads({ limit, offset });
  const total = store.countLeads();

  res.set('Cache-Control', 'no-store');
  res.json({
    ok: true,
    data: rows,
    meta: { total, limit, offset, persistent: store.persistent, store: store.kind },
  });
});
