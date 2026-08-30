import { useState, type FormEvent } from 'react';
import { Check, MapPin, X } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import type { Coverage } from '@/lib/types';

/** Instant coverage lookup — answers the first question a visitor actually has. */
export const ZipChecker = () => {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState<Coverage | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await api.get<Coverage>(`/coverage/${encodeURIComponent(zip.trim())}`);
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not check that ZIP right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-md">
      <form onSubmit={onSubmit} noValidate>
        <label
          htmlFor="hero-zip"
          className="font-heading text-[0.72rem] font-700 uppercase tracking-[0.14em] text-ink"
        >
          Check your ZIP for same-week service
        </label>

        <div className="mt-2.5 flex gap-2">
          <div className="relative flex-1">
            <MapPin
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="hero-zip"
              name="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="84101"
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
              aria-describedby="zip-result"
              aria-invalid={error ? true : undefined}
              className={cn(
                'min-h-[3.25rem] w-full rounded-[3px] border-2 bg-paper pl-11 pr-4 text-[16px]',
                'transition-colors duration-[var(--dur-fast)] placeholder:text-muted/85',
                error ? 'border-danger' : 'border-ink/15 focus:border-ink'
              )}
            />
          </div>

          <Button type="submit" loading={loading} disabled={zip.length !== 5} size="md">
            Check
          </Button>
        </div>
      </form>

      <div id="zip-result" aria-live="polite" className="min-h-[1.5rem]">
        {error && <p className="mt-3 text-[0.85rem] font-500 text-danger">{error}</p>}

        {result && (
          <p
            className={cn(
              'mt-3 flex items-start gap-2 text-[0.88rem] font-500',
              result.covered ? 'text-success' : 'text-muted'
            )}
          >
            {result.covered ? (
              <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <X className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            )}
            {result.message}
          </p>
        )}
      </div>
    </div>
  );
};
