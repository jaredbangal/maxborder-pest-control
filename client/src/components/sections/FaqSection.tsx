import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { PHONE, PHONE_HREF } from '@/lib/constants';
import type { Faq } from '@/lib/types';

export const FaqSection = ({ faqs, limit }: { faqs: Faq[]; limit?: number }) => (
  <Section id="faq" tone="cream">
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <SectionHeader
          eyebrow="Questions"
          title={
            <>
              Ask the
              <br />
              pest experts.
            </>
          }
          intro="The things people actually ask on the first call, answered properly."
        />

        <Reveal delay={140} className="mt-8">
          <p className="text-[0.95rem] text-muted">Still not sure? Talk to a real technician.</p>
          <Button href={PHONE_HREF} variant="outline" className="mt-4">
            Call {PHONE}
          </Button>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <Accordion items={limit ? faqs.slice(0, limit) : faqs} />
      </Reveal>
    </div>
  </Section>
);
