import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/Section';
import { QuoteForm } from './QuoteForm';
import { PHONE, PHONE_HREF } from '@/lib/constants';
import type { Service } from '@/lib/types';

export const CtaBanner = ({ services }: { services: Service[] }) => (
  <section id="quote" className="relative overflow-hidden bg-inverse py-20 text-on-inverse lg:py-28">
    {/* Oversized moving wordmark — the one grid-breaking, full-bleed moment. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-8 opacity-[0.045]">
      <Marquee duration={38} fade={false}>
        <span className="whitespace-nowrap font-display text-[11vw] leading-none tracking-tight text-on-inverse">
          PESTS STOP AT THE BORDER ·
        </span>
      </Marquee>
    </div>

    <Container className="relative z-10">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-on-inverse/60">Get started</p>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.98] text-on-inverse">
              Take back your
              <br />
              <span className="text-orange-bright">peace of mind.</span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-on-inverse/65">
              Free inspection, honest assessment, and a written plan before you pay anything. If we
              are not the right fit, we will tell you that too.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={PHONE_HREF} variant="primary" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {PHONE}
              </Button>

              <Button to="/plans" variant="light" size="lg" className="group">
                Compare plans
                <ArrowRight
                  className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-on-inverse/12 pt-8">
              <div>
                <dt className="eyebrow text-on-inverse/60">Response time</dt>
                <dd className="mt-2 font-display text-[2rem] leading-none text-on-inverse tabular">48hr</dd>
              </div>
              <div>
                <dt className="eyebrow text-on-inverse/60">Re-service cost</dt>
                <dd className="mt-2 font-display text-[2rem] leading-none text-on-inverse tabular">$0</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <QuoteForm services={services} tone="dark" />
        </Reveal>
      </div>
    </Container>
  </section>
);
