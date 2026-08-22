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
  const { scrolled, hidden } = useScrollHeader();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[var(--z-toast)] rounded-[3px] bg-ink px-5 py-3 font-heading text-[0.8rem] font-700 uppercase tracking-[0.12em] text-cream"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0',
          'transition-[transform,background-color,box-shadow,backdrop-filter] duration-[var(--dur-slow)]',
          'ease-[var(--ease-out-expo)]',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled ? 'bg-cream/92 shadow-[var(--shadow-md)] backdrop-blur-md' : 'bg-transparent'
        )}
        style={{ zIndex: 'var(--z-header)' }}
      >
        {!scrolled && <AnnouncementBar />}

        {/* Utility bar — collapses on scroll to keep the sticky header compact.
            Secondary links only: nothing essential lives here, because anything
            in this row disappears the moment the page scrolls. */}
        <div className="hidden border-b border-ink/10 lg:block">
          <div
            className={cn(
              'flex items-center justify-between px-5 transition-[padding] duration-[var(--dur-base)] sm:px-8 lg:px-12',
              scrolled ? 'py-1' : 'py-2'
            )}
          >
            <p className="flex items-center gap-2 text-[0.76rem] text-muted">
              <ShieldCheck className="size-3.5 text-orange" aria-hidden="true" />
              Licensed &amp; insured · Free return visits · Service within 48 hours
            </p>

            <div className="flex items-center gap-5">
              <nav aria-label="Secondary">
                <ul className="flex items-center gap-5">
                  {UTILITY_LINKS.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={({ isActive }) =>
                          cn(
                            'text-[0.76rem] transition-colors duration-[var(--dur-fast)]',
                            isActive ? 'text-ink' : 'text-muted hover:text-ink'
                          )
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Top-right corner of the page. This bar deliberately does NOT
                  collapse on scroll — it did once, and took the toggle with it. */}
              <ThemeToggle className="size-9" />
            </div>
          </div>
        </div>

        {/*
          Main row. Full-bleed rather than a centred max-width box so the logo
          and the toggle sit at the real edges of the screen — boxed, the toggle
          drifted hundreds of pixels inward on a wide monitor.
        */}
        <div className="flex items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="Maxborder Pest Control — home"
            className={cn(
              'shrink-0 transition-[padding] duration-[var(--dur-base)]',
              scrolled ? 'py-3' : 'py-4'
            )}
          >
            <Logo />
          </Link>

          <nav className="mx-auto hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-10 xl:gap-14">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    data-active={pathname.startsWith(link.to)}
                    className={({ isActive }) =>
                      cn(
                        'link-underline whitespace-nowrap py-2 font-heading text-[0.85rem] font-700 uppercase tracking-[0.12em]',
                        'transition-colors duration-[var(--dur-fast)]',
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            <a
              href={PHONE_HREF}
              className="hidden items-center gap-2 font-heading text-[0.85rem] font-700 text-ink transition-colors duration-[var(--dur-fast)] hover:text-orange xl:flex"
            >
              <Phone className="size-4 text-orange" aria-hidden="true" />
              {PHONE}
            </a>

            <span className="hidden sm:block">
              <Button to="/contact" size="sm">
                Free Quote
              </Button>
            </span>

            <a
              href={PHONE_HREF}
              aria-label={`Call us at ${PHONE}`}
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-orange text-on-orange transition-colors duration-[var(--dur-fast)] hover:bg-orange-deep sm:hidden"
            >
              <Phone className="size-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-ink/15 transition-colors duration-[var(--dur-fast)] hover:border-ink hover:bg-ink hover:text-cream lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            {/* Below lg the utility bar is hidden, so the toggle lives here.
                Exactly one of the two is ever displayed. */}
            <ThemeToggle className="lg:hidden" />
          </div>
        </div>

        <div className={cn('perimeter-rule transition-opacity duration-[var(--dur-base)]', scrolled ? 'opacity-25' : 'opacity-0')} />
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
