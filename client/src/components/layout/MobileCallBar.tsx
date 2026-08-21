import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { PHONE_HREF } from '@/lib/constants';

/**
 * Phone-only action bar. Appears once past the hero so the primary CTA is
 * always one thumb-reach away, and sits above the home indicator via safe-area.
 */
export const MobileCallBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 620);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 border-t border-ink/12 bg-cream/95 backdrop-blur-md sm:hidden',
        'transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{
        zIndex: 'var(--z-sticky)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={PHONE_HREF}
          className="flex min-h-[3rem] items-center justify-center gap-2 rounded-[3px] border-2 border-ink font-heading text-[0.78rem] font-700 uppercase tracking-[0.08em] text-ink transition-colors duration-[var(--dur-fast)] active:bg-ink active:text-cream"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call now
        </a>

        <Link
          to="/contact"
          className="flex min-h-[3rem] items-center justify-center gap-2 rounded-[3px] bg-orange font-heading text-[0.78rem] font-700 uppercase tracking-[0.08em] text-white transition-colors duration-[var(--dur-fast)] active:bg-orange-deep"
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          Free quote
        </Link>
      </div>
    </div>
  );
};
