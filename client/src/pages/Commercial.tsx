import {
  Building2,
  ClipboardCheck,
  Clock,
  FileCheck2,
  Hotel,
  Store,
  UtensilsCrossed,
  Warehouse,
} from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

const INDUSTRIES = [
  { Icon: UtensilsCrossed, name: 'Restaurants & food service', note: 'Health department and AIB ready' },
  { Icon: Warehouse, name: 'Warehousing & distribution', note: 'Stored product pest programmes' },
  { Icon: Hotel, name: 'Multi-family', note: 'Discreet, unit-by-unit scheduling' },
  { Icon: Building2, name: 'Offices & clinics', note: 'After-hours service, no disruption' },
  { Icon: Store, name: 'Retail', note: 'Front-of-house safe treatments' },
  { Icon: ClipboardCheck, name: 'Schools & childcare', note: 'Lowest-risk products, full logs' },
];

const COMPLIANCE = [
  {
    Icon: FileCheck2,
    title: 'Audit-ready documentation',
    body: 'Every device is barcoded and scanned on each visit. Your binder stays current for health department, AIB and SQF inspections — no scramble the week before.',
  },
  {
    Icon: Clock,
    title: 'Scheduling around your hours',
    body: 'Overnight and pre-open service so treatment never happens in front of customers or interrupts a shift.',
  },
  {
    Icon: ClipboardCheck,
    title: 'A named account manager',
    body: 'One person who knows the site, the history and the inspector. Not a call centre and a different tech each month.',
  },
];

export const Commercial = () => {
  const { services, testimonials } = useSite();

  return (
    <>
      <Meta
        title="Commercial Pest Control"
        description="Audit-ready commercial pest management for restaurants, warehouses, clinics and property managers. Digital logs, barcoded devices, after-hours service."
      />

      <PageHero
        eyebrow="For business"
        crumbs={[{ to: '/commercial', label: 'Commercial' }]}
        title={
          <>
            Built for properties
            <br />
            that get inspected.
          </>
        }
      >
        <Button to="/contact" size="lg">
          Request a site assessment
        </Button>
      </PageHero>

      <Section tone="cream" className="!pt-4">
        <SectionHeader
          eyebrow="Industries"
          title="Who we service."
          intro="Different sites fail inspections for different reasons. The programme is built around yours."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ Icon, name, note }, i) => (
            <Reveal as="li" key={name} delay={i * 70}>
              <div className="corner-ticks flex h-full flex-col border-2 border-ink/12 bg-paper p-7 transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink">
                <span className="grid size-12 place-items-center rounded-full bg-orange-tint text-orange">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-heading text-[1.1rem] font-800 leading-snug">{name}</h3>
                <p className="mt-2 text-[0.9rem] text-muted">{note}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                Paperwork that
                <br />
                survives an audit.
              </>
            }
          />

          <ul className="space-y-10">
            {COMPLIANCE.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 90}>
                <div className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-orange/25 text-orange"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.15rem] font-800 leading-snug">{title}</h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Get started"
            title="Tell us about the site."
            intro="We will walk the property, identify what is driving the activity, and put a written programme and price in front of you before anything is signed."
          />
          <Reveal delay={120}>
            <QuoteForm services={services} defaultService="commercial-pest-control" />
          </Reveal>
        </div>
      </Section>

      <Testimonials items={testimonials} />
      <CtaBanner services={services} />
    </>
  );
};
