import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import { Rail } from '@/components/ui/Rail';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { Service } from '@/lib/types';

export const ServiceCard = ({ service }: { service: Service }) => (
  <Link
    to={`/services/${service.slug}`}
    className={cn(
      'group corner-ticks relative flex h-full flex-col border-2 border-ink/12 bg-paper p-7',
      'transition-[border-color,transform,box-shadow] duration-[var(--dur-base)]',
      'ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink',
      'hover:shadow-[var(--shadow-lg)]'
    )}
  >
    {service.popular && (
      <span className="absolute -top-3 left-7 bg-orange px-3 py-1 font-heading text-[0.62rem] font-700 uppercase tracking-[0.16em] text-white">
        Most popular
      </span>
    )}

    <span
      className={cn(
        'grid size-14 place-items-center rounded-full bg-orange-tint text-orange',
        'transition-[background-color,color] duration-[var(--dur-base)]',
        'group-hover:bg-orange group-hover:text-white'
      )}
    >
      <Icon name={service.icon} className="size-6" />
    </span>

    <h3 className="mt-6 font-heading text-[1.3rem] font-800 leading-tight">{service.name}</h3>

    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{service.summary}</p>

    <div className="mt-7 flex items-end justify-between border-t border-ink/12 pt-5">
      <span>
        <span className="eyebrow block">Starting at</span>
        <span className="tabular font-display text-[1.6rem] leading-none text-ink">
          ${service.priceFrom}
          <span className="font-heading text-[0.85rem] font-600 text-muted">{service.unit}</span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className={cn(
          'grid size-10 place-items-center rounded-full border-2 border-ink/15',
          'transition-[background-color,border-color,color] duration-[var(--dur-base)]',
          'group-hover:border-ink group-hover:bg-ink group-hover:text-cream'
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.5} />
      </span>
    </div>
  </Link>
);

export const ServicesSection = ({ services }: { services: Service[] }) => (
  <Section id="services" tone="cream">
    <div className="flex flex-wrap items-end justify-between gap-6">
      <SectionHeader
        eyebrow="What we treat"
        title={
          <>
            A plan for every
            <br />
            problem on your property.
          </>
        }
        intro="If it creeps, crawls, bites, or stings, there is a service below built for it — priced monthly, with no surprise callout fees."
      />
    </div>

    <Reveal delay={120} className="mt-14">
      <Rail label="Pest control services">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </Rail>
    </Reveal>
  </Section>
);
