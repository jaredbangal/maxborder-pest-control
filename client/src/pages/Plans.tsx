import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';
import type { Plan } from '@/lib/types';

export const Plans = () => {
  const { plans, services, faqs } = useSite();

  return (
    <>
      <Meta
        title="Plans & Pricing"
        description="Three pest control plans, all with free return visits and no long-term contract. Every plan is quoted after a free inspection."
      />

      <PageHero
        eyebrow="Pricing"
        crumbs={[{ to: '/plans', label: 'Plans' }]}
        title={
          <>
            Pick the level
            <br />
            of cover.
          </>
        }
        intro="Every plan is quoted after a free inspection, so the price fits your actual property rather than a guess. Month to month after the initial service period, with no callout fees and no re-service charges."
      />

      <Section tone="cream" className="!pt-4" id="compare">
        <ul className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 90}>
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-[0.88rem] text-muted">
            Every property is different, so we quote after walking it. Tell us what you are seeing
            and we will put a written plan and price in front of you before anything is signed.
          </p>
        </Reveal>
      </Section>

      <FaqSection faqs={faqs} />
      <CtaBanner services={services} />
    </>
  );
};

const PlanCard = ({ plan }: { plan: Plan }) => (
  <div
    className={cn(
      'corner-ticks relative flex h-full flex-col border-2 p-8',
      'transition-[border-color,transform,box-shadow] duration-[var(--dur-base)]',
      'ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]',
      plan.popular
        ? 'border-ink bg-inverse text-on-inverse shadow-[var(--shadow-lg)]'
        : 'border-ink/12 bg-paper hover:border-ink'
    )}
  >
    {plan.popular && (
      <span className="absolute -top-3 left-8 bg-orange px-3 py-1 font-heading text-[0.62rem] font-700 uppercase tracking-[0.16em] text-on-orange">
        Best value
      </span>
    )}

    <h2
      className={cn(
        'font-heading text-[1.5rem] font-800',
        plan.popular ? 'text-on-inverse' : 'text-ink'
      )}
    >
      {plan.name}
    </h2>

    <p className={cn('mt-2 text-[0.92rem]', plan.popular ? 'text-on-inverse/65' : 'text-muted')}>
      {plan.blurb}
    </p>

    <p
      className={cn(
        'mt-7 font-heading text-[0.72rem] font-700 uppercase tracking-[0.14em]',
        plan.popular ? 'text-on-inverse/65' : 'text-muted'
      )}
    >
      Quoted after your free inspection
    </p>

    <Button
      to="/contact"
      variant={plan.popular ? 'primary' : 'outline'}
      size="lg"
      className="mt-4 w-full"
    >
      Get a quote
    </Button>

    <ul
      className={cn(
        'mt-8 space-y-3 border-t pt-7',
        plan.popular ? 'border-on-inverse/15' : 'border-ink/12'
      )}
    >
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <Check
            className={cn(
              'mt-0.5 size-4 shrink-0',
              plan.popular ? 'text-orange-bright' : 'text-orange'
            )}
            strokeWidth={3}
            aria-hidden="true"
          />
          <span className={cn('text-[0.9rem]', plan.popular ? 'text-on-inverse/85' : 'text-ink')}>
            {feature}
          </span>
        </li>
      ))}

      {plan.notIncluded.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <Minus
            className={cn('mt-0.5 size-4 shrink-0', plan.popular ? 'text-on-inverse/30' : 'text-ink/25')}
            strokeWidth={3}
            aria-hidden="true"
          />
          <span className={cn('text-[0.9rem] line-through', plan.popular ? 'text-on-inverse/60' : 'text-muted/85')}>
            {feature}
          </span>
          <span className="sr-only-focusable">not included</span>
        </li>
      ))}
    </ul>
  </div>
);
