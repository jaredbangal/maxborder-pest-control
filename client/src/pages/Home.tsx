import { Meta } from '@/components/layout/Meta';
import { useSite } from '@/lib/SiteContext';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsBand } from '@/components/sections/StatsBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const Home = () => {
  const { site, services, testimonials } = useSite();

  // The home page advertises three services; the rest live on /services.
  const homeServices = services.filter((service) =>
    ['general-pest-control', 'rodent-control', 'mosquito-tick-flea'].includes(service.slug)
  );

  return (
    <>
      <Meta
        title="Pests Stop At The Border"
        description="Licensed, guaranteed pest control for homes and businesses. Free return visits and a treated perimeter that holds."
      />

      <Hero />
      <TrustBar items={site.certifications} />
      <ServicesSection services={homeServices} />
      <StatsBand stats={site.stats} />
      <Testimonials items={testimonials} />
      <CtaBanner services={services} />
    </>
  );
};
