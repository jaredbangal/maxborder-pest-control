import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { TrustPoint } from '@/lib/types';

/** Only claims the business can back up. No review counts, awards or tallies. */
export const WhyMaxBorder = ({ points }: { points: TrustPoint[] }) => (
  <Section tone="sand">
    <SectionHeader eyebrow="Why MaxBorder" title="What you can count on." />

    <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {points.map((point, i) => (
        <Reveal as="li" key={point.label} delay={i * 70}>
          <div className="border-t-2 border-ink pt-6">
            <span className="grid size-12 place-items-center rounded-full bg-orange-tint text-orange">
              <Icon name={point.icon} className="size-5" />
            </span>
            <p className="mt-5 font-heading text-[1.1rem] font-800 leading-snug text-ink">
              {point.label}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  </Section>
);
