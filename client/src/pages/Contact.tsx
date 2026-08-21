import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { FaqSection } from '@/components/sections/FaqSection';
import { useSite } from '@/lib/SiteContext';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/constants';

export const Contact = () => {
  const { services, site, faqs } = useSite();

  return (
    <>
      <Meta
        title="Contact & Free Quote"
        description="Request a free pest inspection. We reply within one business hour, and service is scheduled within 48 hours."
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
        intro="Free inspection, honest assessment, and a written plan before you pay anything. Most requests get a call back within the hour."
      />

      <Section tone="cream" className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <QuoteForm services={services} />
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-10">
              <div>
                <h2 className="eyebrow">Reach us directly</h2>

                <ul className="mt-5 space-y-5">
                  <li>
                    <a href={PHONE_HREF} className="group flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange transition-colors duration-[var(--dur-base)] group-hover:bg-orange group-hover:text-white">
                        <Phone className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[1.05rem] font-800">{PHONE}</span>
                        <span className="block text-[0.85rem] text-muted">
                          Fastest route to a technician
                        </span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a href={`mailto:${EMAIL}`} className="group flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange transition-colors duration-[var(--dur-base)] group-hover:bg-orange group-hover:text-white">
                        <Mail className="size-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-heading text-[1.05rem] font-800">{EMAIL}</span>
                        <span className="block text-[0.85rem] text-muted">
                          Send photos for a free pest ID
                        </span>
                      </span>
                    </a>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange">
                      <MapPin className="size-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-heading text-[1.05rem] font-800">
                        {site.company.address.street}
                      </span>
                      <span className="block text-[0.85rem] text-muted">
                        {site.company.address.city}, {site.company.address.state}{' '}
                        {site.company.address.zip}
                      </span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="corner-ticks border-2 border-ink/12 bg-paper p-7">
                <h2 className="eyebrow flex items-center gap-2">
                  <Clock className="size-3.5 text-orange" aria-hidden="true" />
                  Opening hours
                </h2>

                <dl className="mt-5 space-y-3">
                  {site.company.hours.map((slot) => (
                    <div key={slot.days} className="flex justify-between gap-4 text-[0.9rem]">
                      <dt className="font-600 text-ink">{slot.days}</dt>
                      <dd className="text-right text-muted">{slot.open}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="eyebrow">Where we service</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {site.serviceAreas.map((area) => (
                    <li
                      key={area.region}
                      className="border-2 border-ink/12 px-3.5 py-1.5 font-heading text-[0.72rem] font-700 uppercase tracking-[0.1em] text-muted"
                    >
                      {area.region}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <FaqSection faqs={faqs} limit={5} />
    </>
  );
};
