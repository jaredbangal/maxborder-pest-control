import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Section';
import { Reveal, RevealRule } from '@/components/ui/Reveal';

/** Shared inner-page masthead: breadcrumb, title, lede. */
export const PageHero = ({
  eyebrow,
  title,
  intro,
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Array<{ to: string; label: string }>;
  children?: ReactNode;
}) => (
  <section className="grain relative overflow-hidden bg-cream pb-16 pt-36 sm:pt-40 lg:pb-20 lg:pt-44">
    <Container className="relative z-10">
      {crumbs.length > 0 && (
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.78rem] text-muted">
              <li>
                <Link
                  to="/"
                  // Padding widens the tap area; -my cancels its layout effect.
                  className="-my-2 inline-flex min-h-[2.75rem] items-center py-2 transition-colors hover:text-ink sm:min-h-0"
                >
                  Home
                </Link>
              </li>
              {crumbs.map((crumb, i) => (
                <li key={crumb.to} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3 opacity-50" aria-hidden="true" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.to}
                      className="-my-2 inline-flex min-h-[2.75rem] items-center py-2 transition-colors hover:text-ink sm:min-h-0"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      )}

      <Reveal delay={60}>
        <p className="eyebrow mt-6">{eyebrow}</p>
      </Reveal>

      <Reveal delay={120}>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,6.5vw,4.25rem)] leading-[0.98] tracking-[-0.03em]">
          {title}
        </h1>
      </Reveal>

      {intro && (
        <Reveal delay={200}>
          <div className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">{intro}</div>
        </Reveal>
      )}

      {children && <div className="mt-9">{children}</div>}

      <RevealRule className="mt-12" delay={260} />
    </Container>
  </section>
);
