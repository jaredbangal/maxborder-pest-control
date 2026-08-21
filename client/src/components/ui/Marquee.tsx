import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/hooks';

/**
 * Seamless infinite marquee. The track holds two identical copies and shifts by
 * exactly -50%, so the wrap point lands on a duplicate frame and never stutters.
 * With reduced motion on, it degrades to a normal horizontal scroll rail.
 */
export const Marquee = ({
  children,
  duration = 40,
  className,
  reverse = false,
  fade = true,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fade?: boolean;
}) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={cn('no-scrollbar overflow-x-auto', className)}>
        <div className="flex w-max items-center gap-10 px-4">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn('marquee-track relative overflow-hidden', className)}
      style={
        fade
          ? {
              maskImage:
                'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
            }
          : undefined
      }
    >
      <div
        className="animate-marquee flex w-max items-center"
        style={{
          ['--marquee-duration' as string]: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
