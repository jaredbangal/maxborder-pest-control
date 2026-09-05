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
import { NavDropdown } from './NavDropdown';
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
        // Stays on screen and condenses, rather than sliding away — hiding it
        // took the wordmark off screen for most of every page.
        className={cn(
          'fixed inset-x-0 top-0 bg-inverse text-on-inverse',
          'transition-[box-shadow] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]',
          scrolled && 'shadow-[var(--shadow-lg)]'
        )}
        style={{ zIndex: 'var(--z-header)' }}
      >
        {!scrolled && <AnnouncementBar />}

        {/* Utility row — secondary links and the phone number. */}
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

        {/*
          Flex with equal-weight side groups rather than a grid: the logo group
          and the actions group are both flex-1, so the actions are pinned right
          and the tabs sit centred between them. A grid track was doing this
          before, but a display:none grid item leaves the flow entirely and the
          column count has to be kept in sync with what is rendered — one more
          thing to get wrong. Flex has no such coupling.
        */}
        <div
          className={cn(
            'flex items-center gap-4 px-5 sm:px-8 lg:px-12',
            scrolled ? 'py-2.5' : 'py-3.5'
          )}
        >
          <div className="flex flex-1 justify-start">
            <Link
              to="/"
              aria-label="Maxborder Pest Control — home"
              className="flex min-h-[2.75rem] items-center"
            >
              <Logo variant="light" />
            </Link>
          </div>

          <nav className="hidden flex-none xl:block" aria-label="Primary">
            <ul className="flex items-center gap-1 rounded-full border border-on-inverse/15 bg-on-inverse/6 p-1">
              {NAV_LINKS.map((link) => (
                <NavDropdown
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  blurb={link.blurb}
                  items={link.items}
                  active={pathname.startsWith(link.to)}
                />
              ))}
            </ul>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-3">
            <span className="hidden sm:block">
              <Button to="/contact" size="sm">
                Free Quote
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-on-inverse/45 text-on-inverse transition-colors duration-[var(--dur-fast)] hover:border-on-inverse hover:bg-on-inverse hover:text-inverse xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>

            {/* Last in the row, so it is the right-hand corner control at every
                width — and it needs no strip of its own to live in. */}
            <ThemeToggle tone="inverse" showLabel />
          </div>
        </div>

      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
