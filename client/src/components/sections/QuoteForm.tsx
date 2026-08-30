import { useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Phone } from 'lucide-react';
import { api, ApiError, type LeadResponse } from '@/lib/api';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Honeypot, Input, Select, Textarea } from '@/components/ui/Field';
import { PHONE, PHONE_HREF } from '@/lib/constants';
import type { Service } from '@/lib/types';

type Tone = 'light' | 'dark';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  zip: '',
  serviceSlug: '',
  propertyType: '',
  urgency: '',
  message: '',
  company: '',
};

export const QuoteForm = ({
  services,
  tone = 'light',
  defaultService,
  compact = false,
}: {
  services: Service[];
  tone?: Tone;
  defaultService?: string;
  compact?: boolean;
}) => {
  const { pathname } = useLocation();
  const [values, setValues] = useState({ ...EMPTY, serviceSlug: defaultService ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [successMsg, setSuccessMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof typeof EMPTY) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    // Clear a field's error as soon as the person starts correcting it.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    setErrors({});
    setFormError('');

    try {
      const res = await api.post<LeadResponse>('/quote', { ...values, sourcePage: pathname });
      setSuccessMsg(res.message);
      setStatus('done');
      setValues({ ...EMPTY });
      // Move focus to the confirmation so screen readers land on the outcome.
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setStatus('idle');

      if (err instanceof ApiError && err.fields) {
        setErrors(err.fields);
        setFormError(err.message);

        // Focus the first field the server rejected.
        const firstKey = Object.keys(err.fields)[0];
        const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
        el?.focus();
      } else {
        setFormError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
      }
    }
  };

  if (status === 'done') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className={cn(
          'corner-ticks flex flex-col items-start border-2 p-8 sm:p-10',
          tone === 'dark' ? 'border-on-inverse/20 bg-on-inverse/5' : 'border-ink/15 bg-paper'
        )}
      >
        <CheckCircle2 className="size-12 text-success" strokeWidth={1.5} aria-hidden="true" />

        <h3
          className={cn(
            'mt-6 font-heading text-[1.6rem] font-800',
            tone === 'dark' ? 'text-on-inverse' : 'text-ink'
          )}
        >
          Request received.
        </h3>

        <p className={cn('mt-3 text-[1rem]', tone === 'dark' ? 'text-on-inverse/70' : 'text-muted')}>
          {successMsg}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={PHONE_HREF} variant={tone === 'dark' ? 'light' : 'outline'}>
            <Phone className="size-4" aria-hidden="true" />
            {PHONE}
          </Button>

          <Button type="button" variant="ghost" onClick={() => setStatus('idle')}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className={cn(
        'corner-ticks border-2 p-6 sm:p-8',
        tone === 'dark' ? 'border-on-inverse/20 bg-on-inverse/5' : 'border-ink/15 bg-paper'
      )}
    >
      <div className={cn('grid gap-5', compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2')}>
        <Input
          label="Full name"
          name="name"
          required
          autoComplete="name"
          tone={tone}
          value={values.name}
          error={errors.name}
          onChange={(e) => set('name')(e.target.value)}
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="(801) 555-0134"
          tone={tone}
          value={values.phone}
          error={errors.phone}
          onChange={(e) => set('phone')(e.target.value)}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          tone={tone}
          value={values.email}
          error={errors.email}
          onChange={(e) => set('email')(e.target.value)}
        />

        <Input
          label="ZIP code"
          name="zip"
          required
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={10}
          tone={tone}
          value={values.zip}
          error={errors.zip}
          onChange={(e) => set('zip')(e.target.value)}
        />

        <Select
          label="Service needed"
          name="serviceSlug"
          tone={tone}
          hint="optional"
          value={values.serviceSlug}
          error={errors.serviceSlug}
          onChange={(e) => set('serviceSlug')(e.target.value)}
        >
          <option value="">Not sure yet — help me choose</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </Select>

        <Select
          label="How soon?"
          name="urgency"
          tone={tone}
          hint="optional"
          value={values.urgency}
          error={errors.urgency}
          onChange={(e) => set('urgency')(e.target.value)}
        >
          <option value="">Select a timeframe</option>
          <option value="emergency">It is an emergency</option>
          <option value="this-week">This week</option>
          <option value="flexible">I am flexible</option>
        </Select>

        {!compact && (
          <>
            <Select
              label="Property type"
              name="propertyType"
              tone={tone}
              hint="optional"
              className="sm:col-span-2"
              value={values.propertyType}
              error={errors.propertyType}
              onChange={(e) => set('propertyType')(e.target.value)}
            >
              <option value="">Select property type</option>
              <option value="home">Single-family home</option>
              <option value="apartment">Apartment or condo</option>
              <option value="business">Business or commercial</option>
              <option value="other">Something else</option>
            </Select>

            <Textarea
              label="What are you seeing?"
              name="message"
              tone={tone}
              hint="optional"
              className="sm:col-span-2"
              placeholder="Ants along the kitchen baseboard for about two weeks, worst in the mornings…"
              value={values.message}
              error={errors.message}
              onChange={(e) => set('message')(e.target.value)}
            />
          </>
        )}
      </div>

      <Honeypot value={values.company} onChange={set('company')} />

      {formError && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 border-2 border-danger bg-danger-tint p-3 text-[0.88rem] font-500 text-danger"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" loading={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Get my free quote'}
        </Button>

      </div>
    </form>
  );
};
