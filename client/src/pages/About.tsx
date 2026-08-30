import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { StatsBand } from '@/components/sections/StatsBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

const TIMELINE = [
  {
    year: '2009',
    title: 'One truck, one technician',
    body: 'Maxborder started with a single route around the Salt Lake valley and a simple rule that has not changed: never sell a treatment the property does not need.',
  },
  {
    year: '2014',
    title: 'The guarantee goes in writing',
    body: 'Free return visits, no cap, no fine print. It cost us money in the first year and won us the retention rate we still run on.',
  },
  {
    year: '2019',
    title: 'Wasatch Front coverage',
    body: 'Six counties, sixty technicians, and a routing system built to keep drive times short enough that same-week scheduling is a promise rather than a hope.',
  },
  {
    year: '2024',
    title: '42,000 properties protected',
    body: 'Still the same rule. Still the same guarantee. A great deal more paperwork.',
  },
];

export const About = () => {
  const { site, services, testimonials } = useSite();

  return (
    <>
      <Meta
        title="About Us"
        description="Maxborder has protected Salt Lake City homes and businesses since 2009. Licensed technicians and written guarantees."
      />

      <PageHero
        eyebrow="About"
        crumbs={[{ to: '/about', label: 'About' }]}
        title={
          <>
            Fifteen years of
            <br />
            holding the line.
          </>
        }
        intro="We are a Salt Lake City pest control company that grew slowly on purpose. Every technician is licensed, badged, background-checked, and paid on service quality rather than upsell volume."
      />

      <StatsBand stats={site.stats} />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader eyebrow="Our story" title={<>How we got here.</>} />

          <ol className="relative">
            {TIMELINE.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 90}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  {/* Continuous rule linking the entries, stopped before the last one. */}
                  {i < TIMELINE.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.4rem] top-12 h-[calc(100%-3rem)] w-px bg-ink/15"
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-orange bg-cream font-heading text-[0.6rem] font-800 tabular text-orange"
                  >
                    {item.year}
                  </span>

                  <div>
                    <h3 className="font-heading text-[1.2rem] font-800 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.98rem] leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>
      <Testimonials items={testimonials} />
      <CtaBanner services={services} />
    </>
  );
};
