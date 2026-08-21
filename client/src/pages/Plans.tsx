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
        description="Transparent monthly pest control pricing. Three plans from $49/mo, all with free return visits and no long-term contract."
      />

      <PageHero
        eyebrow="Pricing"
        crumbs={[{ to: '/plans', label: 'Plans' }]}
        title={
          <>
            Honest pricing,
            <br />
            printed up front.
          </>
        }
        intro="Every plan is month to month after the initial service period. No callout fees, no re-service charges, and no pressure to upgrade."
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
            Prices shown are for single-family homes up to 3,000 sq ft. Larger properties and
            commercial sites are quoted after the free inspection.
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
        ? 'border-ink bg-ink text-cream shadow-[var(--shadow-lg)]'
        : 'border-ink/12 bg-paper hover:border-ink'
    )}
  >
    {plan.popular && (
      <span className="absolute -top-3 left-8 bg-orange px-3 py-1 font-heading text-[0.62rem] font-700 uppercase tracking-[0.16em] text-white">
        Best value
      </span>
    )}

    <h2
      className={cn(
        'font-heading text-[1.5rem] font-800',
        plan.popular ? 'text-cream' : 'text-ink'
      )}
    >
      {plan.name}
    </h2>

    <p className={cn('mt-2 text-[0.92rem]', plan.popular ? 'text-cream/65' : 'text-muted')}>
      {plan.blurb}
    </p>

    <p className="mt-7 flex items-baseline gap-1">
      <span
        className={cn(
          'tabular font-display text-[3rem] leading-none',
          plan.popular ? 'text-cream' : 'text-ink'
        )}
      >
        ${plan.price}
      </span>
      <span
        className={cn(
          'font-heading text-[0.85rem] font-600',
          plan.popular ? 'text-cream/60' : 'text-muted'
        )}
      >
        /{plan.cadence.replace('per ', '')}
      </span>
    </p>

    <p className={cn('mt-2 text-[0.82rem]', plan.popular ? 'text-cream/60' : 'text-muted')}>
      {plan.setup === 0 ? 'No setup fee' : `Plus $${plan.setup} initial service`}
    </p>

    <Button
      to="/contact"
      variant={plan.popular ? 'primary' : 'outline'}
      size="lg"
      className="mt-7 w-full"
    >
      Choose {plan.name}
    </Button>

    <ul
      className={cn(
        'mt-8 space-y-3 border-t pt-7',
        plan.popular ? 'border-cream/15' : 'border-ink/12'
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
          <span className={cn('text-[0.9rem]', plan.popular ? 'text-cream/85' : 'text-ink')}>
            {feature}
          </span>
        </li>
      ))}

      {plan.notIncluded.map((feature) => (
        <li key={feature} className="flex items-start gap-3">
          <Minus
            className={cn('mt-0.5 size-4 shrink-0', plan.popular ? 'text-cream/30' : 'text-ink/25')}
            strokeWidth={3}
            aria-hidden="true"
          />
          <span className={cn('text-[0.9rem] line-through', plan.popular ? 'text-cream/60' : 'text-muted/85')}>
            {feature}
          </span>
          <span className="sr-only-focusable">not included</span>
        </li>
      ))}
    </ul>
  </div>
);
