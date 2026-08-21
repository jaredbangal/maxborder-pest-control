import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useLockBodyScroll } from '@/hooks';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { NAV_LINKS, PHONE, PHONE_HREF, UTILITY_LINKS } from '@/lib/constants';

/**
 * Full-screen mobile drawer with a proper focus trap: focus moves in on open,
 * Tab cycles inside, Escape closes, and focus returns to the trigger on close.
 */
export const MobileNav = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        'fixed inset-0 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      style={{ zIndex: 'var(--z-drawer)' }}
      aria-hidden={!open}
    >
      {/* Scrim at 55% — strong enough to isolate the panel from the page behind. */}
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-ink/55 backdrop-blur-[2px] transition-opacity duration-[var(--dur-base)]',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          'absolute inset-y-0 right-0 flex w-[min(24rem,88vw)] flex-col bg-cream shadow-[var(--shadow-lg)]',
          'transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-between border-b border-ink/12 px-6 py-5">
          <Logo showTagline={false} />

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full border-2 border-ink/15 transition-colors duration-[var(--dur-fast)] hover:border-ink hover:bg-ink hover:text-cream"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
          <ul className="divide-y divide-ink/10">
            {NAV_LINKS.map((link, i) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-[3.5rem] items-center gap-4 py-4 font-heading text-[1.15rem] font-700',
                      'transition-colors duration-[var(--dur-fast)]',
                      isActive ? 'text-orange' : 'text-ink hover:text-orange'
                    )
                  }
                  style={{
                    // Staggered entrance, 45ms apart, only while the panel is open.
                    opacity: open ? 1 : 0,
                    transform: open ? 'none' : 'translateX(16px)',
                    transition: `opacity 400ms var(--ease-out-expo) ${open ? 120 + i * 45 : 0}ms, transform 400ms var(--ease-out-expo) ${open ? 120 + i * 45 : 0}ms, color var(--dur-fast)`,
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-1 border-t border-ink/10 pt-5">
            {UTILITY_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-[2.75rem] items-center text-[0.95rem]',
                      'transition-colors duration-[var(--dur-fast)]',
                      isActive ? 'text-orange' : 'text-muted hover:text-ink'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-ink/12 px-6 py-5">
          <Button to="/contact" size="lg" className="w-full" >
            Get a free quote
          </Button>
          <a
            href={PHONE_HREF}
            className="flex min-h-[3rem] items-center justify-center gap-2 font-heading text-[0.95rem] font-700 text-ink transition-colors hover:text-orange"
          >
            <Phone className="size-4" aria-hidden="true" />
            {PHONE}
          </a>
        </div>
      </div>
    </div>
  );
};
