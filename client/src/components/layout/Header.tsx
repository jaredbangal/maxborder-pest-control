import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useScrollHeader } from '@/hooks';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from './ThemeToggle';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileNav } from './MobileNav';
import { NAV_LINKS, PHONE, PHONE_HREF, UTILITY_LINKS } from '@/lib/constants';

export const Header = () => {
  const { scrolled } = useScrollHeader();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[var(--z-toast)] rounded-[3px] bg-on-inverse px-5 py-3 font-heading text-[0.8rem] font-700 uppercase tracking-[0.12em] text-inverse"
      >
        Skip to main content
      </a>

      {/*
        The whole header block is navy so it reads as one solid bar against the
        orange hero below it. Keeping the promo strip orange too would have put
        orange above navy above orange, which just looks like banding.
      */}
      <header
        // Always on screen. It condenses on scroll rather than sliding away,
        // so the logo and name stay visible the whole way down the page.
        className={cn(
          'fixed inset-x-0 top-0 bg-inverse text-on-inverse',
          'transition-[box-shadow] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]',
          scrolled && 'shadow-[var(--shadow-lg)]'
        )}
        style={{ zIndex: 'var(--z-header)' }}
      >
        {!scrolled && <AnnouncementBar />}

        {/* Utility row — collapses on scroll. Secondary links only. */}
        <div className="hidden border-b border-on-inverse/12 lg:block">
          <div
            className={cn(
              'flex items-center justify-between px-5 transition-[padding] duration-[var(--dur-base)] sm:px-8 lg:px-12',
              scrolled ? 'py-1' : 'py-2'
            )}
          >
            <p className="flex items-center gap-2 text-[0.76rem] text-on-inverse/70">
              <ShieldCheck className="size-3.5 text-orange-bright" aria-hidden="true" />
              Licensed &amp; insured · Free return visits · Service within 48 hours
            </p>

            <div className="flex items-center gap-5">
              <a
                href={PHONE_HREF}
                className="hidden items-center gap-2 font-heading text-[0.8rem] font-700 text-on-inverse transition-colors duration-[var(--dur-fast)] hover:text-orange-bright xl:flex"
              >
                <Phone className="size-3.5 text-orange-bright" aria-hidden="true" />
                {PHONE}
              </a>

              <nav aria-label="Secondary">
                <ul className="flex items-center gap-5">
                  {UTILITY_LINKS.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            'text-[0.76rem] transition-colors duration-[var(--dur-fast)]',
                            isActive ? 'text-on-inverse' : 'text-on-inverse/70 hover:text-on-inverse'
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Mirrored layout: actions left, tabs centred, logo hard right. */}
        <div
          className={cn(
            // Two columns until the tabs appear: a display:none grid item is
            // removed from the flow entirely, so a fixed three-column track
            // left an empty third column and a trailing gap that nudged the
            // logo 16px in from the edge.
            'grid grid-cols-[auto_1fr] items-center gap-4 xl:grid-cols-[auto_1fr_auto]',
            'px-5 sm:px-8 lg:px-12',
            scrolled ? 'py-2.5' : 'py-3.5'
          )}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-on-inverse/45 text-on-inverse transition-colors duration-[var(--dur-fast)] hover:border-on-inverse hover:bg-on-inverse hover:text-inverse xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            <span className="hidden sm:block">
              <Button to="/contact" size="sm">
                Free Quote
              </Button>
            </span>

            <ThemeToggle tone="inverse" showLabel />
          </div>

          <nav className="hidden justify-self-center xl:block" aria-label="Primary">
            <ul className="flex items-center gap-1 rounded-full border border-on-inverse/15 bg-on-inverse/6 p-1">
              {NAV_LINKS.map((link) => {
                const active = pathname.startsWith(link.to);
                return (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[2.75rem] items-center whitespace-nowrap rounded-full px-5',
                        'font-heading text-[0.78rem] font-700 uppercase tracking-[0.1em]',
                        'transition-[background-color,color] duration-[var(--dur-base)]',
                        active
                          ? 'bg-orange text-on-orange shadow-[var(--shadow-orange)]'
                          : 'text-on-inverse/70 hover:bg-on-inverse/10 hover:text-on-inverse'
                      )}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            to="/"
            aria-label="Maxborder Pest Control — home"
            className="flex min-h-[2.75rem] items-center justify-self-end"
          >
            {/* Wrapped rather than passing `hidden` to Logo: Logo's own root
                carries `inline-flex`, and two display utilities in the same
                layer fight — so both variants rendered at once and the lockup
                overflowed the viewport on small phones. */}
            <span className="hidden sm:block">
              <Logo variant="light" />
            </span>
            <span className="sm:hidden">
              <Logo variant="light" markOnly />
            </span>
          </Link>
        </div>

      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
