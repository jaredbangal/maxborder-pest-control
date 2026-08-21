import { Leaf, Route, ShieldCheck, Users } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';

const PILLARS = [
  {
    Icon: ShieldCheck,
    title: 'Products chosen for precision',
    body: 'Integrated Pest Management means exclusion and sanitation come first, and product is the targeted last step — not the default first one. Less material, placed far more deliberately.',
  },
  {
    Icon: Users,
    title: 'The same technician, every visit',
    body: 'You get one assigned technician who knows your property, your history, and the corner of the garage where it always starts. Continuity is why the second year works better than the first.',
  },
  {
    Icon: Route,
    title: 'Routes built to cut emissions',
    body: 'Density-optimised routing means shorter drives between stops. It cut our per-visit fuel use by roughly a third and it is the reason we can offer 48-hour windows at all.',
  },
  {
    Icon: Leaf,
    title: 'Safe around the people who live there',
    body: 'Every product is EPA-registered and applied at label rate. Tell us about a pregnancy, an allergy, an aquarium, or a nervous dog, and the plan gets built around it.',
  },
];

export const WhyUs = () => (
  <Section id="why" tone="cream">
    <SectionHeader
      eyebrow="Why Maxborder"
      title={
        <>
          Careful work,
          <br />
          done the same way every time.
        </>
      }
      intro="Pest control is not complicated, but it is unforgiving of shortcuts. Here is what we hold constant."
    />

    <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
      {PILLARS.map(({ Icon, title, body }, i) => (
        <Reveal as="li" key={title} delay={i * 90}>
          <div className="flex gap-5">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-orange/25 text-orange"
            >
              <Icon className="size-5" strokeWidth={1.75} />
            </span>

            <div>
              <h3 className="font-heading text-[1.15rem] font-800 leading-snug">{title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  </Section>
);
