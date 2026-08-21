import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/sections/ServicesSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { Process } from '@/components/sections/Process';
import { useSite } from '@/lib/SiteContext';

export const Services = () => {
  const { services, process } = useSite();

  return (
    <>
      <Meta
        title="Pest Control Services"
        description="General pest control, rodents, mosquitoes and ticks, termites, bed bugs and commercial pest management. Plans from $49/mo with free return visits."
      />

      <PageHero
        eyebrow="Services"
        crumbs={[{ to: '/services', label: 'Services' }]}
        title={
          <>
            Every pest problem
            <br />
            has a plan behind it.
          </>
        }
        intro="Six services, each priced monthly and each backed by the same guarantee: if it comes back between visits, so do we — free."
      />

      <Section tone="cream" className="!pt-4">
        {/* The cards render h3s. Without this h2 the outline jumps h1 -> h3. */}
        <h2 className="eyebrow mb-8">All services</h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Process steps={process.steps} />
      <CtaBanner services={services} />
    </>
  );
};
