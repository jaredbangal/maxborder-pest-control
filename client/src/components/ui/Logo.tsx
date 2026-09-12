import { cn } from '@/lib/cn';

/**
 * The approved lockup (brand/kit), simplified and trimmed to its artwork bounds
 * so it carries no dead canvas. Served as static files rather than inlined, so
 * the ~20KB of path data stays out of the JavaScript bundle and is cached once.
 */
const LOCKUP = {
  width: 1534,
  height: 347,
  onDark: '/brand/maxborder-on-dark.svg',
  onLight: '/brand/maxborder-on-light.svg',
} as const;

type Props = {
  /**
   * `light` — the logo sits on a surface that is dark in both themes (the navy
   * header and footer), so it always uses the cream-lettered artwork.
   * `default` — it sits on the page ground, which flips with the theme, so both
   * versions are rendered and CSS shows the one that matches the ground.
   */
  variant?: 'default' | 'light';
  /**
   * Size by height; width follows the artwork's aspect ratio. Pass a height
   * utility only — never a display utility, which would fight `inline-flex`.
   */
  className?: string;
};

const art = (src: string, extra?: string) => (
  <img
    src={src}
    alt=""
    width={LOCKUP.width}
    height={LOCKUP.height}
    draggable={false}
    className={cn('h-full w-auto', extra)}
  />
);

export const Logo = ({ variant = 'default', className }: Props) => (
  // One accessible name for the whole lockup, whichever twin is showing.
  <span
    role="img"
    aria-label="Maxborder Pest Control"
    className={cn('inline-flex shrink-0 items-center', className ?? 'h-10')}
  >
    {variant === 'light' ? (
      art(LOCKUP.onDark)
    ) : (
      <>
        {art(LOCKUP.onLight, 'logo-on-light-ground')}
        {art(LOCKUP.onDark, 'logo-on-dark-ground')}
      </>
    )}
  </span>
);
