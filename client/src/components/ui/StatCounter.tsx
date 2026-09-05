import { cn } from '@/lib/cn';
import { useCountUp } from '@/hooks';
import type { Stat } from '@/lib/types';

export const StatCounter = ({
  stat,
  tone = 'light',
  className,
}: {
  stat: Stat;
  tone?: 'light' | 'dark';
  className?: string;
}) => {
  const { ref, value } = useCountUp(stat.value, { decimals: stat.decimals ?? 0 });

  const display =
    (stat.decimals ?? 0) > 0
      ? value.toFixed(stat.decimals)
      : Math.round(value).toLocaleString('en-US');

  return (
    <div className={cn('relative text-center', className)}>
      <p
        className={cn(
          'tabular font-display text-[clamp(2.5rem,6vw,4rem)] leading-none',
          tone === 'dark' ? 'text-on-inverse' : 'text-ink'
        )}
      >
        <span ref={ref}>{display}</span>
        {stat.suffix && (
          <span className={tone === 'dark' ? 'text-orange-bright' : 'text-orange'}>
            {stat.suffix}
          </span>
        )}
      </p>

      <p
        className={cn(
          'mt-3 font-heading text-[0.8rem] font-700 uppercase tracking-[0.14em]',
          tone === 'dark' ? 'text-on-inverse' : 'text-ink'
        )}
      >
        {stat.label}
      </p>

      <p className={cn('mt-1 text-[0.85rem]', tone === 'dark' ? 'text-on-inverse/60' : 'text-muted')}>
        {stat.detail}
      </p>
    </div>
  );
};
