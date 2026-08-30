import { Quote, Star } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Rail } from '@/components/ui/Rail';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import type { Testimonial } from '@/lib/types';

const Stars = ({ rating }: { rating: number }) => (
  <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn('size-4', i < rating ? 'fill-orange text-orange' : 'text-ink/20')}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    ))}
  </span>
);

export const Testimonials = ({ items }: { items: Testimonial[] }) => (
  <Section id="reviews" tone="paper">
    <SectionHeader
      eyebrow="Reviews"
      title={
        <>
          Pests hate us.
          <br />
          Customers keep us.
        </>
      }
    />

    <Reveal delay={120} className="mt-14">
      <Rail label="Customer reviews">
        {items.map((item) => (
          <figure
            key={item.name}
            className="flex h-full flex-col border-2 border-ink/12 bg-cream p-7 transition-[border-color,transform] duration-[var(--dur-base)] ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink"
          >
            <Quote className="size-8 text-orange/25" strokeWidth={1.5} aria-hidden="true" />

            <blockquote className="mt-5 flex-1 text-[1rem] leading-relaxed text-ink">
              {item.quote}
            </blockquote>

            <figcaption className="mt-7 border-t border-ink/12 pt-5">
              <Stars rating={item.rating} />
              <p className="mt-3 font-heading text-[0.98rem] font-800">{item.name}</p>
              <p className="text-[0.82rem] text-muted">
                {item.role} · {item.location}
              </p>
            </figcaption>
          </figure>
        ))}
      </Rail>
    </Reveal>
  </Section>
);
