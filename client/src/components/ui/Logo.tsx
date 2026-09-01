import { cn } from '@/lib/cn';
import { LogoMark } from './LogoMark';

type Props = {
  /** `light` renders for dark backgrounds (the navy header, the footer). */
  variant?: 'default' | 'light';
  className?: string;
  showTagline?: boolean;
  /** Hide the wordmark and show the mark alone — used where space is tight. */
  markOnly?: boolean;
};

/**
 * The full lockup: the Maxborder mark beside the wordmark. The wordmark is live
 * text rather than an image so it stays crisp at any size, recolours per
 * surface, and is readable by search engines and screen readers.
 */
export const Logo = ({
  variant = 'default',
  className,
  showTagline = true,
  markOnly = false,
}: Props) => {
  const onDark = variant === 'light';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark
        className={cn(
          'size-8 shrink-0 sm:size-9',
          // The lifted orange keeps its punch on navy, where the base orange
          // sits at only 3.1:1 against the ground.
          onDark ? 'text-orange-bright' : 'text-orange'
        )}
      />

      {!markOnly && (
        <span className="inline-flex flex-col items-center leading-none">
          <span
            className="font-display text-[1.35rem] tracking-[-0.02em] sm:text-[1.5rem]"
            aria-hidden="true"
          >
            <span className={onDark ? 'text-orange-bright' : 'text-orange'}>MAX</span>
            <span className={onDark ? 'text-on-inverse' : 'text-ink'}>BORDER</span>
          </span>

          {showTagline && (
            <span
              className={cn(
                'mt-[0.3em] font-heading text-[0.5rem] font-700 uppercase tracking-[0.42em] sm:text-[0.55rem]',
                // Letter-spacing also applies after the final letter, so the box
                // is a tracking unit wider than the glyphs; the negative margin
                // removes that phantom width so the word centres true.
                '-mr-[0.42em]',
                onDark ? 'text-on-inverse/60' : 'text-muted'
              )}
              aria-hidden="true"
            >
              Pest Control
            </span>
          )}
        </span>
      )}

      <span className="sr-only-focusable">Maxborder Pest Control</span>
    </span>
  );
};
