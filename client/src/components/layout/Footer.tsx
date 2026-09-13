import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Section';
import { useSite } from '@/lib/SiteContext';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/constants';

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy Policy' },
];

export const Footer = ({ demo }: { demo?: boolean }) => {
  const { site, services } = useSite();
  const { company, serviceArea } = site;

  return (
    <footer className="relative bg-inverse text-on-inverse">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Logo variant="light" className="h-12" />

            <p className="mt-6 font-heading text-[1rem] font-700 text-on-inverse">
              {company.legalName}
            </p>
            <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-on-inverse/60">
              <MapPin className="size-4 shrink-0 text-orange-bright" aria-hidden="true" />
              {serviceArea.label}, {serviceArea.state}
            </p>
            {company.licenseNumber && (
              <p className="mt-2 text-[0.85rem] text-on-inverse/60">License #{company.licenseNumber}</p>
            )}

            <ul className="mt-8 space-y-3 text-[0.92rem]">
              <li>
                <a
                  href={PHONE_HREF}
                  className="inline-flex min-h-[2.75rem] items-center gap-3 text-on-inverse transition-colors duration-[var(--dur-fast)] hover:text-orange-bright sm:min-h-0"
                >
                  <Phone className="size-4 shrink-0 text-orange-bright" aria-hidden="true" />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-[2.75rem] items-center gap-3 text-on-inverse/70 transition-colors duration-[var(--dur-fast)] hover:text-on-inverse sm:min-h-0"
                >
                  <Mail className="size-4 shrink-0 text-orange-bright" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn
            title="Services"
            links={services.map((s) => ({ to: `/services/${s.slug}`, label: s.name }))}
          />
          <FooterColumn title="Links" links={LINKS} />
        </div>
      </Container>

      <div className="border-t border-on-inverse/12">
        <Container className="py-6">
          <p className="text-[0.8rem] text-on-inverse/60">
            © {new Date().getFullYear()} {company.legalName}.
            {demo && (
              <>
                {' '}
                <span className="text-orange-bright">
                  Demo site — form submissions are not stored or acted on.
                </span>
              </>
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ to: string; label: string }>;
}) => (
  <div>
    <h2 className="eyebrow text-on-inverse/60">{title}</h2>
    <ul className="mt-3 space-y-0 sm:mt-5 sm:space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.to}
            // 44px row on touch viewports; back to normal line rhythm on desktop.
            className="flex min-h-[2.75rem] items-center text-[0.92rem] text-on-inverse/70 transition-colors duration-[var(--dur-fast)] hover:text-orange-bright sm:min-h-0"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
