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
  phone: '',
  email: '',
  address: '',
  serviceSlug: '',
  problem: '',
  activityLocation: '',
  preferredTime: '',
  propertyType: '',
  petsChildren: '',
  accessNotes: '',
  message: '',
  company: '',
};

type Key = keyof typeof EMPTY;

/**
 * Short on purpose: seven required fields, four optional. `compact` drops the
 * optional ones for the narrow sidebar on service pages.
 */
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
  const initial = { ...EMPTY, serviceSlug: defaultService ?? '' };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [successMsg, setSuccessMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (key: Key) => (v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    // Clear a field's error as soon as the person starts correcting it.
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  // Shared wiring for every field: value, error, and change handler.
  const field = (key: Key) => ({
    name: key,
    tone,
    value: values[key],
    error: errors[key],
    onChange: (e: { target: { value: string } }) => set(key)(e.target.value),
  });

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
      setValues(initial);
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Full name" required autoComplete="name" {...field('name')} />

        <Input
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="(801) 555-0134"
          {...field('phone')}
        />

        <Input
          label="Email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          {...field('email')}
        />

        <Select label="Service" required {...field('serviceSlug')}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="not-sure">Not sure / help me choose</option>
        </Select>

        <Input
          label="Service address"
          required
          autoComplete="street-address"
          className="sm:col-span-2"
          placeholder="Street, city, ZIP"
          {...field('address')}
        />

        <Input
          label="Pest or problem"
          required
          placeholder="Ants, mice, spiders…"
          {...field('problem')}
        />

        <Input
          label="Where are you seeing it?"
          required
          placeholder="Kitchen, garage, backyard…"
          {...field('activityLocation')}
        />

        <Input
          label="Preferred appointment time"
          required
          placeholder="Weekday mornings"
          className={cn(compact && 'sm:col-span-2')}
          {...field('preferredTime')}
        />

        {!compact && (
          <>
            <Select label="Property type" hint="optional" {...field('propertyType')}>
              <option value="">Select property type</option>
              <option value="home">House</option>
              <option value="apartment">Apartment or condo</option>
              <option value="business">Small business</option>
              <option value="other">Something else</option>
            </Select>

            <Input
              label="Pets or children at home?"
              hint="optional"
              placeholder="Two dogs, one toddler"
              {...field('petsChildren')}
            />

            <Input
              label="Access instructions"
              hint="optional"
              placeholder="Gate code, side-yard access…"
              {...field('accessNotes')}
            />

            <Textarea
              label="Anything else we should know?"
              hint="optional"
              className="sm:col-span-2"
              {...field('message')}
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

      <div className="mt-7">
        <Button type="submit" size="lg" loading={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Get a Quote'}
        </Button>
      </div>
    </form>
  );
};
