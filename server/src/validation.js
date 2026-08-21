import { z } from 'zod';

/** Collapse whitespace and strip control characters that only ever show up in injection attempts. */
const clean = (max) =>
  z
    .string()
    .transform((s) =>
      s
        .replace(/[\u0000-\u001f\u007f]/g, " ")
        .replace(/\s+/g, ' ')
        .trim()
    )
    .pipe(z.string().max(max));

const name = clean(80).pipe(z.string().min(2, 'Please enter your full name.'));

const email = clean(160)
  .pipe(
    z
      .string()
      .min(5, 'Please enter a valid email address.')
      .email('Please enter a valid email address.')
  )
  .transform((s) => s.toLowerCase());

// Deliberately permissive: international callers, extensions, and formatting all pass.
const phone = clean(32).pipe(
  z
    .string()
    .min(7, 'Please enter a valid phone number.')
    .regex(/^[0-9+().\-\s]+$/, 'Phone can only contain digits and () + - . characters.')
);

const optional = (schema) =>
  z
    .union([schema, z.literal(''), z.undefined(), z.null()])
    .transform((v) => (v === '' || v === undefined || v === null ? null : v));

const zip = clean(12).pipe(
  z.string().regex(/^[A-Za-z0-9\s-]{3,12}$/, 'Enter a valid ZIP or postcode.')
);
const slug = clean(60).pipe(z.string().regex(/^[a-z0-9-]+$/, 'Invalid selection.'));

/**
 * Bots fill every field they find. `company` is hidden from real users via CSS,
 * so any value at all means we can drop the submission without telling the sender.
 */
const honeypot = z.union([z.literal(''), z.undefined(), z.null(), z.string()]).optional();

const base = {
  name,
  email,
  phone,
  sourcePage: optional(clean(200)),
  company: honeypot,
};

export const quoteSchema = z.object({
  ...base,
  zip,
  address: optional(clean(200)),
  serviceSlug: optional(slug),
  propertyType: optional(z.enum(['home', 'apartment', 'business', 'other'])),
  urgency: optional(z.enum(['emergency', 'this-week', 'flexible'])),
  message: optional(clean(2000)),
});

export const contactSchema = z.object({
  ...base,
  zip: optional(zip),
  message: clean(2000).pipe(
    z.string().min(10, 'Please tell us a little more (10+ characters).')
  ),
});

export const callbackSchema = z.object({
  name,
  phone,
  email: optional(email),
  zip: optional(zip),
  sourcePage: optional(clean(200)),
  company: honeypot,
});

export const subscribeSchema = z.object({ email, company: honeypot });

/** Turns a ZodError into a flat { field: message } map the form can render inline. */
export const fieldErrors = (error) => {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || 'form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
};
