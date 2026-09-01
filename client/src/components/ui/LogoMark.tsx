import { cn } from '@/lib/cn';

/**
 * The Maxborder "M" badge, traced from the supplied artwork: a cream plate with
 * the letterform knocked into it in orange (14 vertices, ~350 bytes).
 *
 * Vector rather than the original PNG because that file is RGB with no alpha —
 * its black canvas would render as a black box around the badge. As paths, the
 * plate and letter each take a token, so the badge sits correctly on the navy
 * header and in both themes.
 */
export const LogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 77.54"
    className={cn('block', className)}
    role="img"
    aria-label="Maxborder"
  >
    <rect width="100" height="77.54" fill="var(--color-cream)" />
    <path d="M8.19 8.65 L40.06 8.65 L50.00 41.35 L60.02 8.65 L91.88 8.65 L91.88 68.97 L69.50 68.97 L69.42 35.51 L59.10 68.97 L40.97 68.97 L30.65 35.43 L30.58 68.97 L8.19 68.97 L8.19 8.65 Z" fill="var(--color-orange)" />
  </svg>
);
