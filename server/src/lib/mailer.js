import nodemailer from 'nodemailer';
import { env } from '../env.js';
import { logger } from './logger.js';

let transporter = null;
if (env.smtp.enabled) {
  transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.port === 465,
    auth: { user: env.smtp.user, pass: env.smtp.pass },
  });
  logger.info('SMTP lead notifications enabled');
} else {
  logger.info('SMTP not configured — lead notifications will be logged only');
}

const escapeHtml = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Fire-and-forget notification. A mail failure must never turn a captured lead
 * into a client-facing error, so this always resolves.
 */
export const notifyNewLead = async (lead) => {
  if (!transporter) {
    logger.info(`New ${lead.kind} lead from ${lead.name} <${lead.email}>`);
    return;
  }

  const rows = Object.entries(lead)
    .filter(([, v]) => v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;background:#F4EEE0">${escapeHtml(
          k
        )}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`
    )
    .join('');

  try {
    await transporter.sendMail({
      to: env.smtp.to,
      from: env.smtp.from || env.smtp.user,
      replyTo: lead.email || undefined,
      subject: `New ${lead.kind} request — ${lead.name}`,
      text: Object.entries(lead)
        .map(([k, v]) => `${k}: ${v ?? ''}`)
        .join('\n'),
      html: `<h2 style="font-family:sans-serif">New ${escapeHtml(
        lead.kind
      )} request</h2><table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows}</table>`,
    });
  } catch (err) {
    logger.error('Lead notification email failed', { message: err.message });
  }
};
