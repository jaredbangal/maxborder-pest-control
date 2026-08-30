import { Marquee } from '@/components/ui/Marquee';
import type { Certification } from '@/lib/types';

/**
 * Credential strip. Real accreditations rendered as typographic badges rather
 * than borrowed logo images, which keeps it honest and asset-free.
 */
export const TrustBar = ({ items }: { items: Certification[] }) => {
  // A marquee needs enough items that the loop isn't obvious. Below that the
  // duplicate copy scrolls into view and just reads as repetition, so a short
  // list is centred and still instead.
  if (items.length < 4) {
    return (
      <div className="border-y border-ink/12 bg-sand py-7">
        <ul className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-x-12 gap-y-5 px-5">
          {items.map((item) => (
            <li key={item.name} className="flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink/20 font-heading text-[0.68rem] font-800 tracking-tight text-ink"
              >
                {item.abbr}
              </span>
              <span>
                <span className="block font-heading text-[0.85rem] font-700 text-ink">{item.name}</span>
                <span className="block text-[0.75rem] text-muted">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
  <div className="border-y border-ink/12 bg-sand py-7">
    <Marquee duration={44}>
      {items.map((item) => (
        <div key={item.name} className="flex shrink-0 items-center gap-3.5 px-2">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink/20 font-heading text-[0.68rem] font-800 tracking-tight text-ink"
          >
            {item.abbr}
          </span>
          <span className="whitespace-nowrap">
            <span className="block font-heading text-[0.85rem] font-700 text-ink">{item.name}</span>
            <span className="block text-[0.75rem] text-muted">{item.detail}</span>
          </span>
          <span aria-hidden="true" className="ml-4 h-8 w-px bg-ink/12" />
        </div>
      ))}
    </Marquee>
  </div>
  );
};
