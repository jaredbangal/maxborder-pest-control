import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

/** Full-page loader shown while the initial content bundle is in flight. */
export const PageLoader = () => (
  <div className="grid min-h-dvh place-items-center bg-cream px-6">
    <div className="flex flex-col items-center gap-6" role="status" aria-live="polite">
      <Logo className="h-14" />
      <span className="relative flex size-3">
        <span className="animate-pulse-ring absolute inline-flex size-full rounded-full bg-orange" />
        <span className="relative inline-flex size-3 rounded-full bg-orange" />
      </span>
      <span className="sr-only-focusable">Loading Maxborder Pest Control</span>
    </div>
  </div>
);

/** Shown when the content API cannot be reached at all. */
export const PageError = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="grid min-h-dvh place-items-center bg-cream px-6">
    <div className="max-w-md text-center">
      <AlertTriangle className="mx-auto size-12 text-orange" strokeWidth={1.5} aria-hidden="true" />

      <h1 className="mt-6 font-heading text-[1.75rem] font-800">We could not load the site.</h1>

      <p className="mt-3 text-[0.95rem] text-muted">{message}</p>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Button type="button" onClick={onRetry}>
          <RotateCw className="size-4" aria-hidden="true" />
          Try again
        </Button>

        <p className="text-[0.85rem] text-muted">
          Or call us directly on{' '}
          <a href="tel:+18886297378" className="link-underline font-600 text-ink">
            (888) 629-7378
          </a>
        </p>
      </div>
    </div>
  </div>
);
