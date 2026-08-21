import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

// NOTE: no display utility here. `inline-flex` in the base would win over a
// `hidden` passed through className (same CSS layer), silently breaking
// responsive show/hide. Call sites wrap in a container to hide instead.
const base =
  'relative inline-flex items-center justify-center gap-2 font-heading font-700 uppercase ' +
  'tracking-[0.08em] cursor-pointer select-none rounded-[3px] ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-[var(--dur-base)] ' +
  'ease-[var(--ease-out-expo)] active:translate-y-[1px] ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-orange text-on-orange shadow-[var(--shadow-orange)] hover:bg-orange-deep hover:shadow-[0_16px_40px_-10px_rgba(217,31,44,0.55)]',
  dark: 'bg-inverse text-on-inverse hover:bg-ink-2 shadow-[var(--shadow-md)]',
  outline:
    'border-2 border-ink text-ink bg-transparent hover:bg-ink hover:text-cream',
  light:
    'border-2 border-on-inverse/35 text-on-inverse bg-transparent hover:bg-on-inverse hover:text-inverse hover:border-on-inverse',
  ghost: 'text-ink hover:bg-ink/8',
};

// Every size clears the 44px minimum touch target.
const sizes: Record<Size, string> = {
  sm: 'h-11 px-4 text-[0.7rem]',
  md: 'h-13 px-6 text-[0.78rem] min-h-[3.25rem]',
  lg: 'h-15 px-8 text-[0.82rem] min-h-[3.75rem]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };

type LinkProps = CommonProps & { to: string; href?: never };

type AnchorProps = CommonProps & { href: string; to?: never };

export const Button = (props: ButtonProps | LinkProps | AnchorProps) => {
  const { variant = 'primary', size = 'md', className, children, loading, ...rest } = props as
    CommonProps & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ('to' in props && props.to) {
    const { to } = props;
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href } = props;
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  const { type = 'button', disabled, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
};
