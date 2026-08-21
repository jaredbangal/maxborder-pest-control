export const PHONE = '(888) 629-7378';
export const PHONE_HREF = 'tel:+18886297378';
export const EMAIL = 'hello@maxborderpest.com';

/** Primary navigation, centred in the header. */
export const NAV_LINKS = [
  { to: '/residential', label: 'Residential' },
  { to: '/commercial', label: 'Commercial' },
  { to: '/services', label: 'Services' },
  { to: '/plans', label: 'Plans' },
  { to: '/pests', label: 'Pest Library' },
  { to: '/about', label: 'About' },
] as const;

/** Secondary links, in the thin utility bar above the main row. */
export const UTILITY_LINKS = [
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
] as const;
