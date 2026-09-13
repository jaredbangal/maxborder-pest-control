import { Meta } from '@/components/layout/Meta';
import { useSite } from '@/lib/SiteContext';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FallSpecials } from '@/components/sections/FallSpecials';
import { WhyMaxBorder } from '@/components/sections/WhyMaxBorder';
import { AboutSection } from '@/components/sections/AboutSection';
import { ServiceAreaBand } from '@/components/sections/ServiceAreaBand';
import { CtaBanner } from '@/components/sections/CtaBanner';

// A reviews section goes between the service area and the quote form once
// there are genuine Google reviews to show. Never placeholder testimonials.
export const Home = () => {
  const { site, services, promotions } = useSite();

  return (
    <>
      <Meta
        title="Pests Stop At The Border"
        description="Straightforward pest control for homes and small businesses in Davis and Salt Lake Counties. General pest, rodent and mosquito control."
      />

      <Hero />
      <ServicesSection services={services} />
      <FallSpecials promotions={promotions} />
      <WhyMaxBorder points={site.trustPoints} />
      <AboutSection />
      <ServiceAreaBand area={site.serviceArea} />
      <CtaBanner services={services} />
    </>
  );
};
