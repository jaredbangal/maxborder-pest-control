import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';
import { applyTheme, readTheme, storeTheme, type Theme } from '@/lib/theme';

/**
 * Day/night switch.
 *
 * Shows the mode you are switching TO, with a word next to the icon. The
 * earlier icon-only version had a 25%-opacity border and no label, and people
 * repeatedly failed to find it in a header row alongside eight text links —
 * it read as decoration rather than a control.
 *
 * Starts from whatever the pre-paint script in index.html already applied, so
 * the button never contradicts what is on screen. Day mode unless the visitor
 * has chosen night mode here.
 */
export const ThemeToggle = ({
  className,
  tone = 'default',
  showLabel = false,
}: {
  className?: string;
  tone?: 'default' | 'inverse';
  showLabel?: boolean;
}) => {
  const [effective, setEffective] = useState<Theme>(readTheme);

  const toggle = () => {
    const next: Theme = effective === 'dark' ? 'light' : 'dark';

    // Only animate colours during a deliberate switch, never on first paint.
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 360);
    }

    setEffective(applyTheme(next));
    storeTheme(next);
  };

  const isDark = effective === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Day' : 'Night';

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
      className={cn(
        'group inline-flex min-h-[2.75rem] shrink-0 cursor-pointer items-center justify-center gap-2',
        showLabel ? 'rounded-full px-3 sm:px-4' : 'size-11 rounded-full',
        showLabel && 'min-w-[2.75rem]',
        'font-heading text-[0.72rem] font-700 uppercase tracking-[0.1em]',
        'transition-[background-color,border-color,color] duration-[var(--dur-base)]',
        tone === 'inverse'
          ? 'border-2 border-on-inverse/45 text-on-inverse hover:border-on-inverse hover:bg-on-inverse hover:text-inverse'
          : 'border-2 border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream',
        className
      )}
    >
      <span className="relative grid size-[1.15rem] place-items-center">
        {/* Both icons stay mounted and cross-rotate, so the swap reads as one
            object turning rather than two elements popping. */}
        <Sun
          className={cn(
            'absolute size-[1.15rem] transition-[opacity,transform] duration-[var(--dur-slow)]',
            'ease-[var(--ease-out-back)]',
            isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
        <Moon
          className={cn(
            'absolute size-[1.15rem] transition-[opacity,transform] duration-[var(--dur-slow)]',
            'ease-[var(--ease-out-back)]',
            isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
        <Icon className="invisible size-[1.15rem]" aria-hidden="true" />
      </span>

      {showLabel && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
};
