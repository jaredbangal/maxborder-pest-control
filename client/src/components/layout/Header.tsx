import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useScrollHeader } from '@/hooks';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from './ThemeToggle';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileNav } from './MobileNav';
import { NAV_LINKS, PHONE, PHONE_HREF } from '@/lib/constants';

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
          // Slide away on scroll-down so phone screens stay clear; return on scroll-up.
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled
            ? 'bg-cream/92 shadow-[var(--shadow-md)] backdrop-blur-md'
            : 'bg-transparent'
        )}
        style={{ zIndex: 'var(--z-header)' }}
      >
        {!scrolled && <AnnouncementBar />}

        <div className="mx-auto flex max-w-[80rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="Maxborder Pest Control — home"
            className={cn(
              'shrink-0 py-4 transition-[padding] duration-[var(--dur-base)]',
              scrolled ? 'py-3' : 'py-5'
            )}
          >
            <Logo />
          </Link>

          <nav className="ml-auto hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    data-active={pathname.startsWith(link.to)}
                    className={({ isActive }) =>
                      cn(
                        'link-underline py-2 font-heading text-[0.82rem] font-700 uppercase tracking-[0.12em]',
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
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-orange text-white transition-colors duration-[var(--dur-fast)] hover:bg-orange-deep sm:hidden"
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

            {/* Last in the row on purpose: keeps the toggle pinned to the
                top-right corner at every breakpoint, away from the wordmark. */}
            <ThemeToggle className="ml-1" />
          </div>
        </div>

        <div className={cn('perimeter-rule transition-opacity duration-[var(--dur-base)]', scrolled ? 'opacity-25' : 'opacity-0')} />
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
