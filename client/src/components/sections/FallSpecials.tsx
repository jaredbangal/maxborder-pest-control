import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { Promotion } from '@/lib/types';

/**
 * Seasonal offers. Which ones show is decided in the content layer (`active`),
 * so taking the mosquito offer down at the end of the season is a data change.
 */
export const FallSpecials = ({ promotions }: { promotions: Promotion[] }) => {
  if (!promotions.length) return null;

  return (
    // scroll-mt clears the fixed header when the announcement bar links here.
    <Section id="fall-specials" tone="paper" className="scroll-mt-24">
      <SectionHeader
        eyebrow="This season"
        title="Fall Pest Specials"
        intro="Fall brings different pest problems. MaxBorder focuses on the pests homeowners are dealing with now — from spiders and common household pests to rodents moving around homes as temperatures change."
      />

      <ul className={cn('mt-14 grid gap-8', promotions.length > 1 && 'lg:grid-cols-2')}>
        {promotions.map((promo, i) => (
          <Reveal as="li" key={promo.id} delay={i * 90}>
            <article className="corner-ticks relative flex h-full flex-col border-2 border-ink/12 bg-cream p-7 sm:p-9">
              <span className="absolute -top-3 left-7 bg-orange px-3 py-1 font-heading text-[0.62rem] font-700 uppercase tracking-[0.16em] text-on-orange">
                {promo.badge}
              </span>

              <h3 className="font-heading text-[1.4rem] font-800 leading-tight">{promo.title}</h3>

              {promo.price && (
                <p className="mt-3 font-heading text-[1.05rem] font-800 text-orange">{promo.price}</p>
              )}

              <p className="mt-5 text-[1rem] leading-relaxed text-muted">{promo.body}</p>

              {promo.fine && (
                <p className="mt-4 text-[0.82rem] leading-relaxed text-muted">{promo.fine}</p>
              )}

              {/* mt-auto pins the button to the card's foot, so side-by-side
                  cards line up whether or not they carry fine print. */}
              <div className="mt-auto pt-8">
                <Button to={`/contact?service=${promo.service}`} className="group">
                  Get a Quote
                  <ArrowRight
                    className="size-4 transition-transform duration-[var(--dur-base)] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
};
