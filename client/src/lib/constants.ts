export const PHONE = '(888) 629-7378';
export const PHONE_HREF = 'tel:+18886297378';
export const EMAIL = 'hello@maxborderpest.com';

/**
 * Primary navigation: three, centred. They split the two buyer types and
 * answer the first question everyone asks (what does it cost).
 */
export const NAV_LINKS = [
  {
    to: '/residential',
    label: 'Residential',
    blurb: 'Year-round protection for your home, quoted after a free inspection.',
    items: [
      { to: '/services/general-pest-control', label: 'General Pest Control', note: 'Ants, roaches, spiders' },
      { to: '/services/rodent-control', label: 'Rodent Control', note: 'Mice, rats, exclusion' },
      { to: '/services/mosquito-tick-flea', label: 'Mosquito, Tick & Flea', note: 'Take the yard back' },
      { to: '/coverage', label: 'What we treat', note: 'The full coverage list' },
    ],
  },
  {
    to: '/commercial',
    label: 'Commercial',
    blurb: 'Audit-ready pest management for properties that get inspected.',
    items: [
      { to: '/services/commercial-pest-control', label: 'Commercial Program', note: 'Logs, scanning, compliance' },
      { to: '/how-it-works', label: 'How it works', note: 'The six-step visit' },
      { to: '/service-areas', label: 'Service areas', note: 'Six Utah counties' },
      { to: '/contact', label: 'Request a site visit', note: 'We walk it and quote' },
    ],
  },
  {
    to: '/plans',
    label: 'Plans',
    blurb: 'Three levels of cover. Every one quoted after a free inspection.',
    items: [
      { to: '/plans', label: 'Compare all plans', note: 'Essential, Complete, Fortress' },
      { to: '/faqs', label: 'Common questions', note: 'Safety, scheduling, guarantee' },
      { to: '/pests', label: 'Pest library', note: 'Identify what you have' },
      { to: '/contact', label: 'Get a quote', note: 'Free inspection first' },
    ],
  },
] as const;

/** Secondary links: utility bar on desktop, and the mobile drawer. */
export const UTILITY_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/coverage', label: 'Coverage' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/pests', label: 'Pest Library' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;
