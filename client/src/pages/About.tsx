import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PeaceOfMindCard } from '@/components/sections/AboutSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';
import { ABOUT_INTRO } from '@/lib/constants';

// Keep this personal and simple. No company size, years in business,
// customer counts or results.
const APPROACH = [
  "We believe customers should understand what we're treating, why we're treating it, and what they can expect afterward. Our approach focuses on practical treatments, clear communication, and recommendations based on what we actually find at the property.",
  "We're building MaxBorder one customer at a time and want every customer to feel comfortable reaching out when pest problems come up.",
];

export const About = () => {
  const { services } = useSite();

  return (
    <>
      <Meta
        title="About Us"
        description="MaxBorder Pest Control provides dependable pest control in Davis and Salt Lake Counties without making the process complicated."
      />

      <PageHero
        eyebrow="About"
        crumbs={[{ to: '/about', label: 'About' }]}
        title="Local pest control built around straightforward service."
        intro={ABOUT_INTRO}
      />

      <Section tone="cream" className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="Our approach" title="How we work." />

            <div className="mt-2 space-y-6">
              {APPROACH.map((paragraph, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className="text-[1.1rem] leading-relaxed text-ink">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={160} className="lg:pt-24">
            <PeaceOfMindCard />
          </Reveal>
        </div>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
