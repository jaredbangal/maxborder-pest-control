import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { useSite } from '@/lib/SiteContext';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/constants';

export const Contact = () => {
  const { services, site } = useSite();

  // Promotion and service-page buttons link here with ?service=<slug>.
  const [params] = useSearchParams();
  const requested = params.get('service');
  const preset = services.some((s) => s.slug === requested) ? requested! : undefined;

  return (
    <>
      <Meta
        title="Get a Quote"
        description="Request a quote for general pest control, rodent control or mosquito control in Davis and Salt Lake Counties."
      />

      <PageHero
        eyebrow="Contact"
        crumbs={[{ to: '/contact', label: 'Contact' }]}
        title={
          <>
            Tell us what you
            <br />
            are seeing.
          </>
        }
        intro="Fill out the short form or call us directly. We will follow up to talk through what is going on and a practical treatment."
      />

      <Section tone="cream" className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            {/* Keyed so arriving from a different promotion resets the choice. */}
            <QuoteForm key={preset ?? 'none'} services={services} defaultService={preset} />
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-10">
              <div>
                <h2 className="eyebrow">Reach us directly</h2>

                <ul className="mt-5 space-y-5">
                  <li>
                    <a href={PHONE_HREF} className="group flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange transition-colors duration-[var(--dur-base)] group-hover:bg-orange group-hover:text-on-orange">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[1.05rem] font-800">{PHONE}</span>
                        <span className="block text-[0.85rem] text-muted">Call now</span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href={`mailto:${EMAIL}`} className="group flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange transition-colors duration-[var(--dur-base)] group-hover:bg-orange group-hover:text-on-orange">
                        <Mail className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[1.05rem] font-800">{EMAIL}</span>
                        <span className="block text-[0.85rem] text-muted">Email us</span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-heading text-[1.05rem] font-800">
                        {site.serviceArea.label}
                      </span>
                      <span className="block text-[0.85rem] text-muted">{site.serviceArea.state}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
};
