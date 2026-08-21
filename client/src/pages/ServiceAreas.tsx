import { MapPin } from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ZipChecker } from '@/components/sections/ZipChecker';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const ServiceAreas = () => {
  const { site, services } = useSite();
  const totalCities = site.serviceAreas.reduce((n, a) => n + a.cities.length, 0);

  return (
    <>
      <Meta
        title="Service Areas"
        description="Maxborder services Central Texas, North Texas, the Gulf Coast and South Texas. Check your ZIP for same-week scheduling."
      />

      <PageHero
        eyebrow="Coverage"
        crumbs={[{ to: '/service-areas', label: 'Service Areas' }]}
        title={
          <>
            {site.serviceAreas.length} regions.
            <br />
            {totalCities}+ cities.
          </>
        }
        intro="Routes are built for density rather than reach, which is what makes a 48-hour service window a promise instead of a hope. If you are just outside a region, tell us — we expand where the demand is."
      >
        <ZipChecker />
      </PageHero>

      <Section tone="cream" className="!pt-4">
        <SectionHeader eyebrow="Where we work" title="Every city on the route." />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.serviceAreas.map((area, i) => (
            <Reveal as="li" key={area.region} delay={i * 80}>
              <div className="corner-ticks flex h-full flex-col border-2 border-ink/12 bg-paper p-7 transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink">
                <span className="grid size-11 place-items-center rounded-full bg-orange-tint text-orange">
                  <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-heading text-[1.15rem] font-800">{area.region}</h3>
                <p className="eyebrow mt-1">{area.cities.length} cities</p>

                <ul className="mt-5 space-y-2">
                  {area.cities.map((city) => (
                    <li key={city} className="text-[0.9rem] text-muted">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={160} className="mt-12">
          <p className="max-w-2xl text-[0.95rem] text-muted">
            Do not see your city? We add routes as demand builds, and being on the waiting list is
            what moves a town up the queue. Send us your ZIP and we will tell you honestly whether
            it is months or longer.
          </p>
        </Reveal>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
