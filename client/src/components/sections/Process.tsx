import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { ProcessStep } from '@/lib/types';

/**
 * The six-step treatment, as an interactive stepper. Implemented with the ARIA
 * tabs pattern: arrow keys move between steps, and each panel is properly
 * associated with its tab.
 */
export const Process = ({ steps }: { steps: ProcessStep[] }) => {
  const [active, setActive] = useState(0);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowDown: active + 1,
      ArrowLeft: active - 1,
      ArrowUp: active - 1,
      Home: 0,
      End: steps.length - 1,
    };

    const next = map[e.key];
    if (next === undefined) return;

    e.preventDefault();
    const clamped = (next + steps.length) % steps.length;
    setActive(clamped);
    document.getElementById(`step-tab-${clamped}`)?.focus();
  };

  return (
    <Section id="process" tone="dark">
      <SectionHeader
        eyebrow="How it works"
        tone="dark"
        title={
          <>
            The Maxborder
            <br />
            six-step perimeter.
          </>
        }
        intro="Every visit follows the same sequence, in the same order, documented in your property file. No guesswork, no shortcuts."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div role="tablist" aria-label="Treatment steps" onKeyDown={onKeyDown} className="flex flex-col">
          {steps.map((step, i) => {
            const isActive = i === active;
            const isDone = i < active;

            return (
              <Reveal key={step.number} delay={i * 60}>
                <button
                  id={`step-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`step-panel-${i}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex w-full cursor-pointer items-center gap-5 border-b border-on-inverse/12 py-5 text-left',
                    'transition-colors duration-[var(--dur-base)]'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-12 shrink-0 place-items-center rounded-full border-2',
                      'font-heading text-[0.85rem] font-800 tabular',
                      'transition-[background-color,border-color,color,transform] duration-[var(--dur-base)]',
                      'ease-[var(--ease-out-expo)]',
                      isActive
                        ? 'scale-110 border-orange bg-orange text-white'
                        : isDone
                          ? 'border-on-inverse/30 bg-on-inverse/10 text-on-inverse/70'
                          : 'border-on-inverse/20 text-on-inverse/60 group-hover:border-on-inverse/50 group-hover:text-on-inverse'
                    )}
                  >
                    {isDone ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : step.number}
                  </span>

                  <span
                    className={cn(
                      'font-heading text-[1.05rem] font-700 leading-snug transition-colors duration-[var(--dur-base)]',
                      isActive ? 'text-on-inverse' : 'text-on-inverse/60 group-hover:text-on-inverse'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="relative">
          {steps.map((step, i) => (
            <div
              key={step.number}
              id={`step-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`step-tab-${i}`}
              hidden={i !== active}
              className="corner-ticks border-2 border-on-inverse/15 bg-on-inverse/5 p-8 sm:p-10"
            >
              <p
                className="font-display text-[clamp(4rem,12vw,7rem)] leading-none text-on-inverse/10 tabular"
                aria-hidden="true"
              >
                {step.number}
              </p>

              <h3 className="mt-2 font-heading text-[1.75rem] font-800 text-on-inverse sm:text-[2rem]">
                {step.title}
              </h3>

              <p className="mt-5 text-[1.02rem] leading-relaxed text-on-inverse/70">{step.body}</p>

              <p className="mt-8 flex items-center gap-2 font-heading text-[0.72rem] font-700 uppercase tracking-[0.14em] text-on-inverse/60">
                Step {i + 1} of {steps.length}
              </p>

              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-on-inverse/12">
                <div
                  className="h-full rounded-full bg-orange transition-[width] duration-[var(--dur-slow)] ease-[var(--ease-out-expo)]"
                  style={{ width: `${((i + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
