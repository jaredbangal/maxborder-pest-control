import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/cn';

type Item = { q: string; a: string };

/**
 * Single-open accordion. The panel animates between grid-template-rows 0fr and
 * 1fr, which transitions to the content's natural height with no measurement
 * and therefore no stale-height bug on first open.
 */
export const Accordion = ({ items, className }: { items: Item[]; className?: string }) => {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-ink/12 border-y border-ink/12', className)}>
      {items.map((item, i) => (
        <AccordionRow
          key={item.q}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          id={`${baseId}-${i}`}
        />
      ))}
    </div>
  );
};

const AccordionRow = ({
  item,
  isOpen,
  onToggle,
  id,
}: {
  item: Item;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}) => {
  return (
    <div className="group">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          className={cn(
            'flex w-full cursor-pointer items-start gap-4 py-6 text-left',
            'transition-colors duration-[var(--dur-fast)] hover:text-orange',
            'min-h-[3.5rem]'
          )}
        >
          <span className="flex-1 font-heading text-[1.05rem] font-700 leading-snug sm:text-[1.2rem]">
            {item.q}
          </span>

          <span
            className={cn(
              'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink/20',
              'transition-[transform,background-color,border-color] duration-[var(--dur-base)]',
              'ease-[var(--ease-out-expo)]',
              isOpen ? 'rotate-45 border-orange bg-orange text-white' : 'group-hover:border-orange/50'
            )}
            aria-hidden="true"
          >
            <Plus className="size-4" strokeWidth={2.5} />
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-[var(--dur-slow)]',
          'ease-[var(--ease-out-expo)]',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
            <p className="max-w-2xl pb-7 pr-4 text-[1rem] leading-relaxed text-muted">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};
