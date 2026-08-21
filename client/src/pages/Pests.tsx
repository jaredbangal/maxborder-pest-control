import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeader } from '@/components/ui/Section';
import { PestCategories } from '@/components/sections/PestCategories';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const Pests = () => {
  const { pests, pestCategories, services } = useSite();

  return (
    <>
      <Meta
        title="Pest Library"
        description="Identify what you are dealing with. Season, risk level, and treatment for the 50+ pests we cover across Texas."
      />

      <PageHero
        eyebrow="Pest library"
        crumbs={[{ to: '/pests', label: 'Pest Library' }]}
        title={
          <>
            Know what you
            <br />
            are dealing with.
          </>
        }
        intro="Every pest we treat, grouped by how it behaves. If you are not sure what you have found, send us a photo and we will identify it free."
      />

      <PestCategories categories={pestCategories} />

      {/* The full list, set as plain type. A grid of near-identical bug icons
          reads as noise; names in columns are faster to scan and quieter. */}
      <Section tone="cream">
        <SectionHeader
          eyebrow="The full list"
          title="Everything covered."
          intro="Included on the Complete and Fortress plans at no extra cost."
        />

        <Reveal delay={100}>
          <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-0 sm:grid-cols-3 lg:grid-cols-4">
            {pests.map((pest) => (
              <li
                key={pest.slug}
                className="flex items-baseline justify-between gap-3 border-b border-ink/10 py-3.5"
              >
                <span className="font-heading text-[0.95rem] font-700">{pest.name}</span>
                <span className="shrink-0 text-[0.72rem] text-muted">{pest.season}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CtaBanner services={services} />
    </>
  );
};
