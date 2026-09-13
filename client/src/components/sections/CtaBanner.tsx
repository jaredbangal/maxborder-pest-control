import { Phone } from 'lucide-react';
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
            <p className="eyebrow text-on-inverse/60">Get a quote</p>
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
              Tell us what you are seeing and where. We will follow up to talk through a practical
              treatment and a straightforward price.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={PHONE_HREF} variant="primary" size="lg">
                <Phone className="size-4" aria-hidden="true" />
                {PHONE}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <QuoteForm services={services} tone="dark" />
        </Reveal>
      </div>
    </Container>
  </section>
);
