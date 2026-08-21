import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const Faq = () => {
  const { faqs, services } = useSite();

  return (
    <>
      <Meta
        title="Frequently Asked Questions"
        description="Safety, scheduling, guarantees and contracts — the questions people actually ask on the first call, answered properly."
      />

      <PageHero
        eyebrow="Questions"
        crumbs={[{ to: '/faq', label: 'FAQ' }]}
        title={<>Ask the pest experts.</>}
        intro="If your question is not here, call us. You will reach someone who has done the work, not a script."
      />

      <Section tone="cream" size="narrow" className="!pt-4">
        {/* Accordion rows are h3s; this keeps the outline from jumping h1 -> h3. */}
        <h2 className="eyebrow mb-8">Every question, answered</h2>

        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
