import { useState, type FormEvent } from 'react';
import { ArrowRight, Check, MapPin, Phone, ShieldCheck, Star, X } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PerimeterGraphic } from './PerimeterGraphic';
import { PHONE, PHONE_HREF } from '@/lib/constants';
import type { Coverage } from '@/lib/types';

const TRUST_POINTS = [
  { Icon: ShieldCheck, label: 'Licensed & insured' },
  { Icon: Star, label: '4.9 from 3,800+ reviews' },
  { Icon: Check, label: 'Free return visits' },
];

export const Hero = () => (
  <section className="grain relative overflow-hidden bg-cream pb-20 pt-36 sm:pt-40 lg:pb-28 lg:pt-48">
    {/* Warm radial wash behind the graphic — atmosphere, not a flat fill. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-10%] top-[-5%] hidden size-[46rem] rounded-full lg:block"
      style={{
        background:
          'radial-gradient(circle, rgba(217,31,44,0.07) 0%, rgba(217,31,44,0.02) 45%, transparent 70%)',
      }}
    />

    <Container className="relative z-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-orange" />
                <span className="relative inline-flex size-2 rounded-full bg-orange" />
              </span>
              Serving Texas since 2009
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8.5vw,5.25rem)] leading-[0.94] tracking-[-0.03em]">
              Pests stop
              <br />
              at the{' '}
              <span className="relative inline-block text-orange">
                border
                {/* Hand-drawn underline: the boundary, marked. */}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8c40-5 78-6 196-3"
                    stroke="#C2410C"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-[1.15rem]">
              We build a treated perimeter around your home and maintain it season by season — so
              ants, roaches, rodents and mosquitoes never make it past the foundation. Licensed
              technicians, service within 48 hours, and free return visits for as long as you need
              them.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/contact" size="lg" className="group">
                Get my free inspection
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>

              <Button href={PHONE_HREF} variant="outline" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {PHONE}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ZipChecker />
          </Reveal>

          <Reveal delay={420}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {TRUST_POINTS.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-[0.85rem] text-muted">
                  <Icon className="size-4 shrink-0 text-orange" strokeWidth={2} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Text leads on every viewport — the graphic follows on mobile so the
            headline and CTA stay above the fold. */}
        <div className="relative">
          <PerimeterGraphic className="mx-auto max-w-[22rem] lg:max-w-none" />
        </div>
      </div>
    </Container>
  </section>
);

/** Instant coverage lookup — answers the first question a visitor actually has. */
const ZipChecker = () => {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<Coverage | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.get<Coverage>(`/coverage/${encodeURIComponent(zip.trim())}`);
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not check that ZIP right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-md">
      <form onSubmit={onSubmit} noValidate>
        <label
          htmlFor="hero-zip"
          className="font-heading text-[0.72rem] font-700 uppercase tracking-[0.14em] text-ink"
        >
          Check your ZIP for same-week service
        </label>

        <div className="mt-2.5 flex gap-2">
          <div className="relative flex-1">
            <MapPin
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="hero-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="78701"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
              aria-describedby="zip-result"
              aria-invalid={error ? true : undefined}
              className={cn(
                'min-h-[3.25rem] w-full rounded-[3px] border-2 bg-paper pl-11 pr-4 text-[16px]',
                'transition-colors duration-[var(--dur-fast)] placeholder:text-muted/85',
                error ? 'border-danger' : 'border-ink/15 focus:border-ink'
              )}
            />
          </div>

          <Button type="submit" loading={loading} disabled={zip.length !== 5} size="md">
            Check
          </Button>
        </div>
      </form>

      <div id="zip-result" aria-live="polite" className="min-h-[1.5rem]">
        {error && <p className="mt-3 text-[0.85rem] font-500 text-danger">{error}</p>}

        {result && (
          <p
            className={cn(
              'mt-3 flex items-start gap-2 text-[0.88rem] font-500',
              result.covered ? 'text-success' : 'text-muted'
            )}
          >
            {result.covered ? (
              <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <X className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            )}
            {result.message}
          </p>
        )}
      </div>
    </div>
  );
};
