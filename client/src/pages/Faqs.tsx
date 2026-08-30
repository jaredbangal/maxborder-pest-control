import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const Faqs = () => {
  const { faqs, services } = useSite();

  return (
    <>
      <Meta
        title="FAQs"
        description="Safety, scheduling and service questions — the ones people actually ask on the first call, answered properly."
      />

      <PageHero
        eyebrow="Questions"
        crumbs={[{ to: '/faqs', label: 'FAQs' }]}
        title={<>Ask the pest experts.</>}
        intro="If your question is not here, call us. You will reach someone who has done the work, not a script."
      />

      <Section tone="cream" size="narrow" className="!pt-4">
        <h2 className="eyebrow mb-8">Every question, answered</h2>

        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
