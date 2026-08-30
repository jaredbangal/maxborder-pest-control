import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { PestCategories } from '@/components/sections/PestCategories';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const Coverage = () => {
  const { pestCategories, services } = useSite();

  return (
    <>
      <Meta
        title="Coverage"
        description="The pests we treat, grouped by how they behave. One seasonal plan covers all of them."
      />

      <PageHero
        eyebrow="Coverage"
        crumbs={[{ to: '/coverage', label: 'Coverage' }]}
        title={
          <>
            What we
            <br />
            treat.
          </>
        }
        intro="One seasonal plan covers all of them. Pick the group that matches what you are seeing."
      />

      <PestCategories categories={pestCategories} />
      <CtaBanner services={services} />
    </>
  );
};
