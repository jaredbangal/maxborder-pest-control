import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

type Tone = 'light' | 'dark';

const shell = (tone: Tone, invalid: boolean) =>
  cn(
    // 3.25rem clears the 44px touch minimum; 16px text stops iOS zoom-on-focus.
    'w-full min-h-[3.25rem] rounded-[3px] border-2 px-4 py-3 text-[16px]',
    'transition-[border-color,background-color,box-shadow] duration-[var(--dur-fast)]',
    'placeholder:text-muted/85',
    tone === 'dark'
      ? 'border-on-inverse/20 bg-on-inverse/6 text-on-inverse placeholder:text-on-inverse/60 focus:border-on-inverse/70'
      : 'border-ink/15 bg-paper text-ink focus:border-ink',
    invalid && '!border-danger bg-danger-tint'
  );

type LabelProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  tone: Tone;
  hint?: string;
};

const FieldLabel = ({ label, htmlFor, required, tone, hint }: LabelProps) => (
  <span className="mb-2 flex flex-wrap items-baseline gap-x-2">
    <label
      htmlFor={htmlFor}
      className={cn(
        'font-heading text-[0.72rem] font-700 uppercase tracking-[0.14em]',
        tone === 'dark' ? 'text-on-inverse/85' : 'text-ink'
      )}
    >
      {label}
      {required && (
        <span
          className={cn('ml-1', tone === 'dark' ? 'text-orange-bright' : 'text-orange')}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
    {hint && (
      <span className={cn('text-[0.75rem]', tone === 'dark' ? 'text-on-inverse/60' : 'text-muted')}>
        {hint}
      </span>
    )}
  </span>
);

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <span
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-[0.82rem] font-500 text-danger"
    >
      <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      {message}
    </span>
  ) : null;

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  tone?: Tone;
  className?: string;
};

export const Input = ({
  label,
  error,
  hint,
  tone = 'light',
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel label={label} htmlFor={id} required={props.required} tone={tone} hint={hint} />
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={shell(tone, Boolean(error))}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
};

export const Textarea = ({
  label,
  error,
  hint,
  tone = 'light',
  className,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel label={label} htmlFor={id} required={props.required} tone={tone} hint={hint} />
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(shell(tone, Boolean(error)), 'resize-y leading-relaxed')}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
};

export const Select = ({
  label,
  error,
  hint,
  tone = 'light',
  className,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel label={label} htmlFor={id} required={props.required} tone={tone} hint={hint} />
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(shell(tone, Boolean(error)), 'cursor-pointer appearance-none bg-no-repeat pr-10')}
        style={{
          // Chevron stroke follows the tone: charcoal on light, cream on dark.
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${
            tone === 'dark' ? '%23f4eee0' : '%234e525a'
          }' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
        }}
        {...props}
      >
        {children}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
};

/**
 * Invisible to people, irresistible to bots. Kept in the normal tab order?
 * No — tabIndex -1 and aria-hidden keep it away from keyboard and AT users.
 */
export const Honeypot = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  // Generated, not hardcoded: pages that render two forms (a section form plus
  // the CTA banner) would otherwise emit duplicate ids and break the label
  // association on both.
  const id = useId();

  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor={id}>Company website (leave blank)</label>
      <input
        id={id}
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
