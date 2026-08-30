import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';
import { applyTheme, readTheme, systemTheme, type Theme } from '@/lib/theme';

/**
 * Day/night switch.
 *
 * Starts from whatever the pre-paint script in index.html already applied, so
 * the button never contradicts what is on screen. While the user is on
 * 'system', it keeps following the OS live — flip your Mac to dark at sunset
 * and the page follows without a reload.
 */
export const ThemeToggle = ({
  className,
  tone = 'default',
}: {
  className?: string;
  tone?: 'default' | 'inverse';
}) => {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  const [effective, setEffective] = useState<'light' | 'dark'>(() =>
    readTheme() === 'system' ? systemTheme() : (readTheme() as 'light' | 'dark')
  );

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setEffective(applyTheme('system'));
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const toggle = () => {
    const next: Theme = effective === 'dark' ? 'light' : 'dark';

    // Only animate colours during a deliberate switch, never on first paint.
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 360);
    }

    setTheme(next);
    setEffective(applyTheme(next));
    try {
      localStorage.setItem('mb-theme', next);
    } catch {
      /* storage blocked */
    }
  };

  const isDark = effective === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
      title={isDark ? 'Day mode' : 'Night mode'}
      className={cn(
        'group relative grid size-11 shrink-0 cursor-pointer place-items-center rounded-full',
        'transition-[background-color,border-color,color] duration-[var(--dur-base)]',
        tone === 'inverse'
          ? 'border-2 border-on-inverse/25 text-on-inverse hover:border-on-inverse hover:bg-on-inverse hover:text-inverse'
          : 'border-2 border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-cream',
        className
      )}
    >
      {/* Both icons are always mounted and cross-rotate, so the swap reads as
          one object turning rather than two elements popping. */}
      <Sun
        className={cn(
          'absolute size-[1.15rem] transition-[opacity,transform] duration-[var(--dur-slow)]',
          'ease-[var(--ease-out-back)]',
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        )}
        strokeWidth={2}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          'absolute size-[1.15rem] transition-[opacity,transform] duration-[var(--dur-slow)]',
          'ease-[var(--ease-out-back)]',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        )}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
};
