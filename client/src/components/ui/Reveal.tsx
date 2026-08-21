import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useInView } from '@/hooks';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Props = {
  children: ReactNode;
  /** Stagger position within a group, in ms. */
  delay?: number;
  direction?: Direction;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article' | 'span';
};

const offsets: Record<Direction, string> = {
  up: 'translate3d(0, 28px, 0)',
  down: 'translate3d(0, -28px, 0)',
  left: 'translate3d(28px, 0, 0)',
  right: 'translate3d(-28px, 0, 0)',
  none: 'none',
};

/**
 * Scroll-triggered entrance. Animates transform + opacity only (never layout
 * properties), and the global reduced-motion rule pins [data-reveal] visible.
 */
export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  className,
  as: Tag = 'div',
}: Props) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={cn('will-change-[opacity,transform]', className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : offsets[direction],
        transition: `opacity 640ms var(--ease-out-expo) ${delay}ms, transform 640ms var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

/** A rule that draws itself across as it enters — the "perimeter" motif. */
export const RevealRule = ({ className, delay = 0 }: { className?: string; delay?: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal=""
      aria-hidden="true"
      className={cn('perimeter-rule origin-left', className)}
      style={{
        transform: inView ? 'scaleX(1)' : 'scaleX(0)',
        transition: `transform 900ms var(--ease-out-expo) ${delay}ms`,
      }}
    />
  );
};
