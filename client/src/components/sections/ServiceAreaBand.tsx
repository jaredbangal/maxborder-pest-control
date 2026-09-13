import { MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { ServiceArea } from '@/lib/types';

/** Names the counties served. Nothing here should read as statewide coverage. */
export const ServiceAreaBand = ({ area }: { area: ServiceArea }) => (
  <Section tone="paper">
    <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader eyebrow="Service area" title={`${area.label}.`} />

      <Reveal delay={160}>
        <ul className="flex flex-wrap gap-3 lg:pb-8">
          {area.counties.map((county) => (
            <li
              key={county}
              className="flex items-center gap-2 border-2 border-ink/12 bg-cream px-4 py-2.5 font-heading text-[0.8rem] font-700 uppercase tracking-[0.1em] text-ink"
            >
              <MapPin className="size-4 text-orange" aria-hidden="true" />
              {county}, {area.state}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </Section>
);
