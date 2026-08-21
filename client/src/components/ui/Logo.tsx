import { cn } from '@/lib/cn';

type Props = {
  /** `light` renders for dark backgrounds (footer, dark sections). */
  variant?: 'default' | 'light';
  className?: string;
  showTagline?: boolean;
};

/**
 * The Maxborder wordmark, rebuilt as live text rather than an image so it stays
 * crisp at any size, recolours for dark sections, and is readable by search
 * engines and screen readers.
 */
export const Logo = ({ variant = 'default', className, showTagline = true }: Props) => {
  const borderColor = variant === 'light' ? 'text-on-inverse' : 'text-ink';
  const taglineColor = variant === 'light' ? 'text-on-inverse/60' : 'text-muted';

  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span
        className="font-display text-[1.35rem] tracking-[-0.02em] sm:text-[1.5rem]"
        aria-hidden="true"
      >
        <span className="text-orange">MAX</span>
        <span className={borderColor}>BORDER</span>
      </span>

      {showTagline && (
        <span
          className={cn(
            'mt-[0.3em] font-heading text-[0.5rem] font-700 uppercase tracking-[0.42em] sm:text-[0.55rem]',
            // Letter-spacing also applies AFTER the final letter, so the text
            // box is one full tracking unit wider than the glyphs. Centering
            // the box would leave the word visibly left of centre; the negative
            // right margin removes that phantom width so it centres true.
            '-mr-[0.42em]',
            taglineColor
          )}
          aria-hidden="true"
        >
          Pest Control
        </span>
      )}

      <span className="sr-only-focusable">Maxborder Pest Control</span>
    </span>
  );
};
