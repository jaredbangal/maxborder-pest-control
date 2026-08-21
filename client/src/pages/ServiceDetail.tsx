import { Navigate, useParams } from 'react-router-dom';
import { Check, Phone } from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ServiceCard } from '@/components/sections/ServicesSection';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { FaqSection } from '@/components/sections/FaqSection';
import { useSite } from '@/lib/SiteContext';
import { PHONE, PHONE_HREF } from '@/lib/constants';

export const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services, faqs } = useSite();

  const service = services.find((s) => s.slug === slug);

  // Unknown slug is a genuine 404, not an empty page.
  if (!service) return <Navigate to="/404" replace />;

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Meta title={service.name} description={service.summary} />

      <PageHero
        eyebrow="Service"
        crumbs={[
          { to: '/services', label: 'Services' },
          { to: `/services/${service.slug}`, label: service.name },
        ]}
        title={service.name}
        intro={service.summary}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button to="/contact" size="lg">
            Get a free quote
          </Button>

          <Button href={PHONE_HREF} variant="outline" size="lg">
            <Phone className="size-4" aria-hidden="true" />
            {PHONE}
          </Button>

          <p className="text-[0.9rem] text-muted">
            <span className="tabular font-display text-[1.75rem] text-ink">
              ${service.priceFrom}
            </span>
            <span className="font-heading font-600">{service.unit}</span> to start
          </p>
        </div>
      </PageHero>

      <Section tone="cream" className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="grid size-16 place-items-center rounded-full bg-orange-tint text-orange">
                <Icon name={service.icon} className="size-7" />
              </span>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-7 text-[1.1rem] leading-relaxed text-ink">{service.description}</p>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="mt-12 font-heading text-[1.4rem] font-800">What is included</h2>
            </Reveal>

            <ul className="mt-6 space-y-4">
              {service.highlights.map((item, i) => (
                <Reveal as="li" key={item} delay={180 + i * 60}>
                  <span className="flex items-start gap-3">
                    <Check
                      className="mt-1 size-4 shrink-0 text-orange"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <span className="text-[1rem] leading-relaxed text-muted">{item}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={220}>
              <h2 className="mt-12 font-heading text-[1.4rem] font-800">Pests covered</h2>
            </Reveal>

            <Reveal delay={260}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.covers.map((pest) => (
                  <li
                    key={pest}
                    className="border-2 border-ink/12 bg-paper px-4 py-2 font-heading text-[0.78rem] font-700 uppercase tracking-[0.08em]"
                  >
                    {pest}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={120}>
              <p className="eyebrow mb-4">Request this service</p>
              <QuoteForm services={services} defaultService={service.slug} compact />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeader eyebrow="Also consider" title="Other services" />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 70}>
              <ServiceCard service={item} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <FaqSection faqs={faqs} limit={4} />
    </>
  );
};
