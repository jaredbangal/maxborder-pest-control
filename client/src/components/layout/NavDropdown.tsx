import { NavLink } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Item = { readonly to: string; readonly label: string; readonly note: string };

type Props = {
  to: string;
  label: string;
  blurb: string;
  items: readonly Item[];
  active: boolean;
};

/**
 * A primary tab with a panel underneath it.
 *
 * Open state is CSS-only — group-hover for the mouse, group-focus-within for
 * the keyboard — so there is no open/closed state to get out of sync, and the
 * panel is reachable by tabbing without any key handling of our own.
 *
 * The panel is hidden with visibility rather than `display`, so its links stay
 * focusable targets in order and the fade can animate.
 */
export const NavDropdown = ({ to, label, blurb, items, active }: Props) => (
  <li className="group relative">
    <NavLink
      to={to}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex min-h-[2.75rem] items-center whitespace-nowrap rounded-full px-5',
        'font-heading text-[0.78rem] font-700 uppercase tracking-[0.1em]',
        'transition-[background-color,color] duration-[var(--dur-base)]',
        active
          ? 'bg-orange text-on-orange shadow-[var(--shadow-orange)]'
          : 'text-on-inverse/70 group-hover:bg-on-inverse/10 group-hover:text-on-inverse'
      )}
    >
      {label}
    </NavLink>

    {/* Bridges the gap between tab and panel so the pointer can travel down
        without the panel closing underneath it. */}
    <div aria-hidden="true" className="absolute inset-x-0 top-full h-3" />

    <div
      className={cn(
        'absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 pt-3',
        'invisible translate-y-1 opacity-0',
        'transition-[opacity,transform,visibility] duration-[var(--dur-base)] ease-[var(--ease-out-expo)]',
        'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
        'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100'
      )}
    >
      <div className="corner-ticks border-2 border-ink/12 bg-paper p-5 shadow-[var(--shadow-lg)]">
        <p className="text-[0.85rem] leading-relaxed text-muted">{blurb}</p>

        <ul className="mt-4 space-y-0.5">
          {items.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className="group/item flex min-h-[2.75rem] items-center justify-between gap-3 rounded-[3px] px-3 py-2 transition-colors duration-[var(--dur-fast)] hover:bg-orange-tint"
              >
                <span>
                  <span className="block font-heading text-[0.85rem] font-700 text-ink">
                    {item.label}
                  </span>
                  <span className="block text-[0.75rem] text-muted">{item.note}</span>
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-orange opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover/item:opacity-100"
                  aria-hidden="true"
                />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </li>
);
