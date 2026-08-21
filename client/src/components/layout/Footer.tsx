import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube, Check } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Section';
import { EMAIL, PHONE, PHONE_HREF } from '@/lib/constants';
import type { ServiceArea } from '@/lib/types';

const SERVICE_LINKS = [
  { to: '/services/general-pest-control', label: 'General Pest Control' },
  { to: '/services/rodent-control', label: 'Rodent Control' },
  { to: '/services/mosquito-tick-flea', label: 'Mosquito & Tick' },
  { to: '/services/termite-protection', label: 'Termite Protection' },
  { to: '/services/bed-bug-treatment', label: 'Bed Bug Treatment' },
  { to: '/services/commercial-pest-control', label: 'Commercial' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/plans', label: 'Plans & Pricing' },
  { to: '/pests', label: 'Pest Library' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

const SOCIALS = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: Facebook },
  { href: 'https://instagram.com', label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com', label: 'YouTube', Icon: Youtube },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: Linkedin },
];

export const Footer = ({ areas, demo }: { areas: ServiceArea[]; demo?: boolean }) => (
  <footer className="relative bg-inverse text-on-inverse">
    <Container className="py-16 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
        <div>
          <Logo variant="light" />

          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-on-inverse/60">
            Licensed, guaranteed pest control for homes and businesses across Texas. A treated
            perimeter, maintained on schedule, backed by free return visits.
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
            <li className="flex items-start gap-3 text-on-inverse/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-orange-bright" aria-hidden="true" />
              <span>
                1420 Ironwood Ave, Suite 300
                <br />
                Austin, TX 78701
              </span>
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
        <div>
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <NewsletterForm />
        </div>
      </div>

      {areas.length > 0 && (
        <div className="mt-16 border-t border-on-inverse/12 pt-12">
          <h2 className="eyebrow text-on-inverse/60">Where we service</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => (
              <div key={area.region}>
                <h3 className="font-heading text-[0.9rem] font-700 text-on-inverse">{area.region}</h3>
                <ul className="mt-3 space-y-1.5">
                  {area.cities.map((city) => (
                    <li key={city} className="text-[0.85rem] text-on-inverse/60">
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>

    <div className="border-t border-on-inverse/12">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-on-inverse/60">
          © {new Date().getFullYear()} Maxborder Pest Control. TDA License #TX-40219.
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

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === 'sending') return;

    setState('sending');
    try {
      const res = await api.post<{ message: string }>('/subscribe', { email, company: '' });
      setMessage(res.message);
      setState('done');
      setEmail('');
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : 'Could not subscribe. Try again.');
      setState('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-10">
      <h2 className="eyebrow text-on-inverse/60">Seasonal pest alerts</h2>

      <p className="mt-3 text-[0.85rem] leading-relaxed text-on-inverse/60">
        What is active this month, and what to do about it. No sales mail.
      </p>

      <div className="mt-4 flex gap-2">
        <label htmlFor="footer-email" className="sr-only-focusable">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-describedby="footer-newsletter-status"
          className="min-h-[3rem] w-full rounded-[3px] border-2 border-on-inverse/20 bg-on-inverse/6 px-4 text-[16px] text-on-inverse placeholder:text-on-inverse/60 transition-colors duration-[var(--dur-fast)] focus:border-on-inverse/70"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="shrink-0 cursor-pointer rounded-[3px] bg-orange px-5 font-heading text-[0.75rem] font-700 uppercase tracking-[0.1em] text-white transition-colors duration-[var(--dur-fast)] hover:bg-orange-deep disabled:opacity-50"
        >
          {state === 'sending' ? '...' : 'Join'}
        </button>
      </div>

      <p
        id="footer-newsletter-status"
        aria-live="polite"
        className={cn(
          'mt-2 flex items-center gap-1.5 text-[0.8rem]',
          state === 'error' ? 'text-orange-bright' : 'text-on-inverse/60'
        )}
      >
        {state === 'done' && <Check className="size-3.5 shrink-0" aria-hidden="true" />}
        {message}
      </p>
    </form>
  );
};
