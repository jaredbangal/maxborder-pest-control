import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { usePrefersReducedMotion } from '@/hooks';
import type { PestCategory } from '@/lib/types';

/** How far the card leans, in degrees, at the very corner. */
const MAX_TILT = 7;

/**
 * Pointer-tracking 3D tilt. Reads the pointer position relative to the card
 * centre and leans the card toward it.
 *
 * Deliberately gated: it only engages for a fine pointer (a mouse), because on
 * touch there is no hover — the tilt would fire on tap and read as a glitch.
 * It is also skipped entirely under prefers-reduced-motion.
 */
const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});

  const enabled = !reduced && typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      // -0.5 … 0.5 across each axis, measured from the card's centre.
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setStyle({
          transform:
            `perspective(1000px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) ` +
            `rotateY(${(px * MAX_TILT).toFixed(2)}deg) translate3d(0,-4px,0) scale(1.02)`,
          // No transition while tracking, so the card follows the pointer 1:1.
          transition: 'none',
        });
      });
    },
    [enabled]
  );

  const onLeave = useCallback(() => {
    if (!enabled) return;
    cancelAnimationFrame(frame.current);
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale(1)',
      transition: 'transform 620ms var(--ease-out-expo)',
    });
  }, [enabled]);

  return { ref, style, onMove, onLeave, enabled };
};

const CategoryCard = ({ category }: { category: PestCategory }) => {
  const { ref, style, onMove, onLeave, enabled } = useTilt();

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={style}
      className={cn(
        'group relative h-full',
        // Without hover tilt (touch / reduced motion) fall back to a plain lift.
        !enabled && 'transition-transform duration-[var(--dur-base)] hover:-translate-y-1.5'
      )}
    >
      <Link
        to={`/services/${category.serviceSlug}`}
        className={cn(
          'corner-ticks flex h-full flex-col border-2 border-ink/12 bg-paper p-6',
          'transition-[border-color,box-shadow] duration-[var(--dur-base)]',
          'hover:border-ink hover:shadow-[var(--shadow-lg)]'
        )}
      >
        <span
          className={cn(
            'grid size-12 place-items-center rounded-full bg-orange-tint text-orange',
            'transition-[background-color,color] duration-[var(--dur-base)]',
            'group-hover:bg-orange group-hover:text-white'
          )}
        >
          <Icon name={category.icon} className="size-5" strokeWidth={1.75} />
        </span>

        <p className="eyebrow mt-5">{category.count}</p>

        <h3 className="mt-1.5 font-heading text-[1.15rem] font-800 leading-tight">
          {category.name}
        </h3>

        <p className="mt-2.5 flex-1 text-[0.88rem] leading-relaxed text-muted">{category.blurb}</p>

        <span className="mt-5 flex items-center justify-between border-t border-ink/12 pt-4">
          <span className="font-heading text-[0.7rem] font-700 uppercase tracking-[0.12em] text-ink">
            See the plan
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'grid size-8 place-items-center rounded-full border-2 border-ink/15',
              'transition-[background-color,border-color,color] duration-[var(--dur-base)]',
              'group-hover:border-ink group-hover:bg-ink group-hover:text-cream'
            )}
          >
            <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
          </span>
        </span>
      </Link>
    </div>
  );
};

export const PestCategories = ({ categories }: { categories: PestCategory[] }) => (
  <Section id="pests" tone="paper">
    <SectionHeader
      eyebrow="Coverage"
      title={
        <>
          Treating <span className="text-orange">50+</span> pests,
          <br />
          in four groups.
        </>
      }
      intro="One seasonal plan covers all of them — ants, roaches, rodents, mosquitoes, termites and the rest. Pick the group that matches what you are seeing."
    />

    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, i) => (
        <Reveal as="li" key={category.slug} delay={i * 90} className="[perspective:1000px]">
          <CategoryCard category={category} />
        </Reveal>
      ))}
    </ul>
  </Section>
);
