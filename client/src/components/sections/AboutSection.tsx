import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ABOUT_INTRO, PEACE_OF_MIND } from '@/lib/constants';

export const PeaceOfMindCard = ({ children }: { children?: ReactNode }) => (
  <div className="corner-ticks border-2 border-ink/12 bg-paper p-8 sm:p-10">
    <p className="font-heading text-[1.35rem] font-800 leading-snug text-ink">
      {PEACE_OF_MIND.title}
    </p>
    <p className="mt-4 text-[1rem] leading-relaxed text-muted">{PEACE_OF_MIND.body}</p>
    {children}
  </div>
);

/** Home page: who we are, plus the peace-of-mind message. */
export const AboutSection = () => (
  <Section tone="cream">
    <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
      <SectionHeader
        eyebrow="About MaxBorder"
        title="Local pest control built around straightforward service."
        intro={ABOUT_INTRO}
      />

      <Reveal delay={140}>
        <PeaceOfMindCard>
          <Button to="/about" variant="outline" className="mt-8">
            More about us
          </Button>
        </PeaceOfMindCard>
      </Reveal>
    </div>
  </Section>
);
