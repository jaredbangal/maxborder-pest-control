import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal, RevealRule } from './Reveal';

export const Container = ({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}) => (
  <div
    className={cn(
      'mx-auto w-full px-5 sm:px-8 lg:px-12',
      size === 'narrow' && 'max-w-3xl',
      size === 'default' && 'max-w-[80rem]',
      size === 'wide' && 'max-w-[92rem]',
      className
    )}
  >
    {children}
  </div>
);

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** `dark` inverts to charcoal, `sand` is the recessed warm tone. */
  tone?: 'cream' | 'paper' | 'sand' | 'dark';
  size?: 'default' | 'wide' | 'narrow';
  bleed?: boolean;
};

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  cream: 'bg-cream text-ink',
  paper: 'bg-paper text-ink',
  sand: 'bg-sand text-ink',
  dark: 'bg-inverse text-on-inverse',
};

export const Section = ({
  children,
  id,
  className,
  tone = 'cream',
  size = 'default',
  bleed = false,
}: SectionProps) => (
  <section
    id={id}
    className={cn(
      'relative overflow-hidden py-20 sm:py-24 lg:py-32',
      tones[tone],
      tone !== 'dark' && 'grain',
      className
    )}
  >
    {bleed ? children : <Container size={size} className="relative z-10">{children}</Container>}
  </section>
);

type HeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
};

export const SectionHeader = ({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'light',
  className,
}: HeaderProps) => (
  <header
    className={cn(
      'relative max-w-3xl',
      align === 'center' && 'mx-auto text-center',
      className
    )}
  >
    <Reveal>
      <p className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span
          aria-hidden="true"
          className={cn('h-px w-6', tone === 'dark' ? 'bg-orange-bright' : 'bg-orange')}
        />
        <span className={tone === 'dark' ? 'text-on-inverse/60' : undefined}>{eyebrow}</span>
      </p>
    </Reveal>

    <Reveal delay={80}>
      <h2
        className={cn(
          'mt-5 text-[clamp(2rem,5.2vw,3.5rem)]',
          tone === 'dark' ? 'text-on-inverse' : 'text-ink'
        )}
      >
        {title}
      </h2>
    </Reveal>

    {intro && (
      <Reveal delay={160}>
        <div
          className={cn(
            'mt-5 max-w-2xl text-[1.0625rem] leading-relaxed',
            align === 'center' && 'mx-auto',
            tone === 'dark' ? 'text-on-inverse/70' : 'text-muted'
          )}
        >
          {intro}
        </div>
      </Reveal>
    )}

    <RevealRule className={cn('mt-8', align === 'center' && 'mx-auto w-24')} delay={220} />
  </header>
);
