import { Info, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useSite } from '@/lib/SiteContext';

/** Product-use and follow-up wording, in place of safety or guarantee claims. */
export const ServiceNotes = ({ className }: { className?: string }) => {
  const { site } = useSite();

  return (
    <div className={cn('corner-ticks border-2 border-ink/12 bg-paper p-7', className)}>
      <h2 className="eyebrow">Good to know</h2>
      <ul className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-muted">
        <li className="flex items-start gap-3">
          <Info className="mt-1 size-4 shrink-0 text-orange" aria-hidden="true" />
          {site.notes.products}
        </li>
        <li className="flex items-start gap-3">
          <MessageCircle className="mt-1 size-4 shrink-0 text-orange" aria-hidden="true" />
          {site.notes.concerns}
        </li>
      </ul>
    </div>
  );
};
