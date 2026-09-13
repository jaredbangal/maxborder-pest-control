import { Meta } from '@/components/layout/Meta';
import { PageHero } from '@/components/layout/PageHero';
import { Section } from '@/components/ui/Section';
import { EMAIL, PHONE } from '@/lib/constants';

// Describes what this site actually does with data. Update it if the site
// adds analytics, cookies, or a new way of collecting information.
const SECTIONS = [
  {
    title: 'What we collect',
    body: 'When you request a quote or contact us, we collect what you enter in the form: your name, phone number, email address, service address, and what you tell us about the pest problem and your property. To block spam, we also record a scrambled (hashed) version of your IP address and your browser type.',
  },
  {
    title: 'How we use it',
    body: 'We use your information to respond to your request, give you a quote, schedule and provide service, and follow up about that service. We do not sell your personal information.',
  },
  {
    title: 'Who can see it',
    body: 'MaxBorder Pest Control, and the companies that host this website and deliver our email, only as far as they need to in order to run those services.',
  },
  {
    title: 'Cookies and storage',
    body: 'This site does not use advertising or analytics cookies. Your browser remembers your light or dark mode choice and whether you closed the announcement bar. That information stays on your device.',
  },
  {
    title: 'Your choices',
    body: `To see, correct or delete the information you have sent us, email ${EMAIL} or call ${PHONE}.`,
  },
];

export const Privacy = () => (
  <>
    <Meta title="Privacy Policy" description="How MaxBorder Pest Control handles the information you send us." />

    <PageHero
      eyebrow="Privacy"
      crumbs={[{ to: '/privacy', label: 'Privacy Policy' }]}
      title="Privacy policy"
      intro="Last updated September 12, 2026."
    />

    <Section tone="cream" size="narrow" className="!pt-4">
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-heading text-[1.3rem] font-800">{section.title}</h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{section.body}</p>
          </div>
        ))}
      </div>
    </Section>
  </>
);
