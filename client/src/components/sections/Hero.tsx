import { ArrowRight, Check, Phone, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PerimeterGraphic } from './PerimeterGraphic';
import { ZipChecker } from './ZipChecker';
import { PHONE, PHONE_HREF } from '@/lib/constants';

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
          <Reveal delay={90}>
            <h1 className="font-display text-[clamp(2.75rem,8.5vw,5.25rem)] leading-[0.94] tracking-[-0.03em]">
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
