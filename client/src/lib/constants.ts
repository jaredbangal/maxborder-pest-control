export const PHONE = '(888) 629-7378';
export const PHONE_HREF = 'tel:+18886297378';
export const EMAIL = 'hello@maxborderpest.com';

/**
 * Primary navigation: three, centred. They split the two buyer types and
 * answer the first question everyone asks (what does it cost).
 */
export const NAV_LINKS = [
  { to: '/residential', label: 'Residential' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/plans', label: 'Plans' },
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
