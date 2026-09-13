import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/sections/ServicesSection';
import { ServiceNotes } from '@/components/sections/ServiceNotes';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const Services = () => {
  const { services } = useSite();

  return (
    <>
      <Meta
        title="Pest Control Services"
        description="General pest control, rodent control and seasonal mosquito control for homes and small businesses in Davis and Salt Lake Counties."
      />

      <PageHero
        eyebrow="Services"
        crumbs={[{ to: '/services', label: 'Services' }]}
        title={
          <>
            Pest control,
            <br />
            kept simple.
          </>
        }
        intro="Three services, each based on what we find at your property: general pest control, rodent control and seasonal mosquito control."
      />

      <Section tone="cream" className="!pt-4">
        {/* The cards render h3s. Without this h2 the outline jumps h1 -> h3. */}
        <h2 className="eyebrow mb-8">Our services</h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <ServiceNotes className="mt-14 max-w-3xl" />
        </Reveal>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
