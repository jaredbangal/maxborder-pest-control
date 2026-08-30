import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Process } from '@/components/sections/Process';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { useSite } from '@/lib/SiteContext';

export const HowItWorks = () => {
  const { process, services } = useSite();

  return (
    <>
      <Meta
        title="How It Works"
        description="The six-step Maxborder perimeter. Every visit follows the same sequence, in the same order, documented in your property file."
      />

      <PageHero
        eyebrow="How it works"
        crumbs={[{ to: '/how-it-works', label: 'How It Works' }]}
        title={
          <>
            The same sequence,
            <br />
            every visit.
          </>
        }
        intro="No guesswork and no shortcuts — each step is logged into your property file so nothing depends on who happens to be on the route that day."
      />

      <Process steps={process.steps} />
      <CtaBanner services={services} />
    </>
  );
};
