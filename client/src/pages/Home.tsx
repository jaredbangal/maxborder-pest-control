import { Meta } from '@/components/layout/Meta';
import { useSite } from '@/lib/SiteContext';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PestCategories } from '@/components/sections/PestCategories';
import { Process } from '@/components/sections/Process';
import { StatsBand } from '@/components/sections/StatsBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const Home = () => {
  const { site, services, pestCategories, testimonials, faqs, process } = useSite();

  return (
    <>
      <Meta
        title="Pests Stop At The Border"
        description="Licensed, guaranteed pest control for homes and businesses across Texas. Service within 48 hours, free return visits, plans from $49/mo."
      />

      <Hero />
      <TrustBar items={site.certifications} />
      <ServicesSection services={services} />
      <StatsBand stats={site.stats} />
      <PestCategories categories={pestCategories} />
      <Process steps={process.steps} />
      <Testimonials items={testimonials} />
      <FaqSection faqs={faqs} limit={5} />
      <CtaBanner services={services} />
    </>
  );
};
