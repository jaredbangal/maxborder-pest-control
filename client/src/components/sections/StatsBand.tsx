import { StatCounter } from '@/components/ui/StatCounter';
import { Reveal } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/Section';
import type { Stat } from '@/lib/types';

export const StatsBand = ({ stats }: { stats: Stat[] }) => (
  <section className="relative overflow-hidden border-y border-ink/12 bg-sand py-16 lg:py-20">
    <Container>
      <ul className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-6">
        {stats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={i * 90}>
            <StatCounter stat={stat} />
          </Reveal>
        ))}
      </ul>
    </Container>
  </section>
);
