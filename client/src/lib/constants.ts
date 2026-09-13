export const PHONE = '(888) 629-7378';
export const PHONE_HREF = 'tel:+18886297378';
export const EMAIL = 'hello@maxborderpest.com';

/** Primary navigation. Kept to four so the company reads as focused. */
export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

/** Shared by the home page's About section and the About page. */
export const ABOUT_INTRO =
  'MaxBorder Pest Control was created with a simple goal: provide dependable pest control without making the process complicated.';

export const PEACE_OF_MIND = {
  title: "Pest problems shouldn't leave you wondering what to do next.",
  body: "We're here to make the process easier — from understanding what's happening to choosing a practical treatment and knowing what comes next.",
};
