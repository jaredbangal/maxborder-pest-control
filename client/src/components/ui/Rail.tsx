import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Horizontal carousel built on native scroll-snap rather than transforms, so
 * touch momentum, keyboard scrolling, and screen-reader order all keep working.
 * The arrows are a progressive enhancement on top of a rail that already works.
 */
export const Rail = ({
  children,
  label,
  className,
  itemClassName,
}: {
  children: ReactNode[];
  label: string;
  className?: string;
  itemClassName?: string;
}) => {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, children.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.querySelector('li');
    // Fall back to 80% of the viewport width if there is no card to measure.
    const step = first ? first.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  const arrowClass =
    'grid size-12 cursor-pointer place-items-center rounded-full border-2 border-ink/20 ' +
    'transition-[background-color,border-color,color,opacity] duration-[var(--dur-base)] ' +
    'hover:border-ink hover:bg-ink hover:text-cream ' +
    'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent ' +
    'disabled:hover:text-ink disabled:hover:border-ink/20';

  return (
    <div className={cn('relative', className)}>
      <ul
        ref={railRef}
        aria-label={label}
        className={cn(
          'no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto',
          // pt-4 leaves room for card badges that sit above the card's top edge,
          // which the scroll container would otherwise clip.
          'px-5 pb-2 pt-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12'
        )}
        style={{ scrollbarWidth: 'none' }}
      >
        {children.map((child, i) => (
          <li
            key={i}
            className={cn(
              'w-[85vw] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]',
              itemClassName
            )}
          >
            {child}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label={`Scroll ${label} backward`}
          className={arrowClass}
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label={`Scroll ${label} forward`}
          className={arrowClass}
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>

        <span className="ml-2 text-[0.8rem] text-muted">
          Drag or swipe to explore
        </span>
      </div>
    </div>
  );
};
