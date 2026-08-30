import { Check } from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ServiceCard } from '@/components/sections/ServicesSection';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

const INCLUDED = [
  'A treated perimeter around the full foundation, refreshed every quarter',
  'Interior treatment on request at no extra charge',
  'Eave, soffit and doorway web and nest removal',
  'Granular barrier across the turf line and mulch beds',
  'Free return visits between treatments, with no cap',
  'The same assigned technician who knows your property',
];

export const Residential = () => {
  const { services, testimonials, faqs, process } = useSite();

  // Home services only — the commercial plan lives on its own page.
  const homeServices = services.filter((s) => s.slug !== 'commercial-pest-control');

  return (
    <>
      <Meta
        title="Residential Pest Control"
        description="Year-round pest control for your home. Quarterly treatments, free return visits, and licensed technicians."
      />

      <PageHero
        eyebrow="For homeowners"
        crumbs={[{ to: '/residential', label: 'Residential' }]}
        title={
          <>
            Pest control built
            <br />
            around your home.
          </>
        }
        intro="One plan, maintained season by season, covering the 50+ pests that actually turn up at a house. No callout fees, no re-service charges, no contract past the first service period."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/contact" size="lg">
            Get my free inspection
          </Button>
        </div>
      </PageHero>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeader
            eyebrow="What you get"
            title={
              <>
                Every visit,
                <br />
                every time.
              </>
            }
            intro="The same sequence on every service call, logged into your property file so nothing depends on who happens to be on the route that day."
          />

          <ul className="space-y-4">
            {INCLUDED.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 70}>
                <span className="flex items-start gap-3 border-b border-ink/10 pb-4">
                  <Check className="mt-1 size-4 shrink-0 text-orange" strokeWidth={3} aria-hidden="true" />
                  <span className="text-[1rem] leading-relaxed text-ink">{item}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeader
          eyebrow="Home services"
          title="Pick what you are dealing with."
          intro="Each one is backed by the same guarantee."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Process steps={process.steps} />
      <Testimonials items={testimonials} />
      <FaqSection faqs={faqs} limit={5} />
      <CtaBanner services={services} />
    </>
  );
};
