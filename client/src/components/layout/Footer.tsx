import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, Youtube } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Section';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/constants';

const SERVICE_LINKS = [
  { to: '/services/general-pest-control', label: 'General Pest Control' },
  { to: '/services/rodent-control', label: 'Rodent Control' },
  { to: '/services/mosquito-tick-flea', label: 'Mosquito & Tick' },
  { to: '/services/bed-bug-treatment', label: 'Bed Bug Treatment' },
  { to: '/services/commercial-pest-control', label: 'Commercial' },
];

const COMPANY_LINKS = [
  { to: '/residential', label: 'Residential' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/about', label: 'About Us' },
  { to: '/pests', label: 'Pest Library' },
  { to: '/faqs', label: 'FAQs' },
];

const SOCIALS = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
];

export const Footer = ({ demo }: { demo?: boolean }) => (
  <footer className="relative bg-inverse text-on-inverse">
    <Container className="py-16 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Logo variant="light" className="h-12" />

          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-on-inverse/60">
            Licensed, guaranteed pest control for homes and businesses. A treated perimeter,
            maintained on schedule, backed by free return visits.
          </p>

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

          <ul className="mt-8 flex gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-full border-2 border-on-inverse/15 text-on-inverse/70 transition-[background-color,border-color,color] duration-[var(--dur-fast)] hover:border-orange-bright hover:bg-orange-bright hover:text-ink"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Services" links={SERVICE_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
      </div>

    </Container>

    <div className="border-t border-on-inverse/12">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-on-inverse/60">
          © {new Date().getFullYear()} Maxborder Pest Control.
          {demo && (
            <>
              {' '}
              <span className="text-orange-bright">
                Demo site — form submissions are not stored or acted on.
              </span>
            </>
          )}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem]">
          {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Sitemap'].map((label) => (
            <li key={label}>
              <Link
                to="/"
                className="flex min-h-[2.75rem] items-center text-on-inverse/60 transition-colors duration-[var(--dur-fast)] hover:text-on-inverse sm:min-h-0"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  </footer>
);

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

