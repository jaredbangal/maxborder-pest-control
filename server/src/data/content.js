/**
 * Single source of truth for site content. Served over the API so copy, pricing
 * and coverage can change without rebuilding the frontend.
 *
 * Every claim here has to be one the business can back up: no review counts,
 * customer numbers, years in business, absolute safety or guarantee language.
 */

export const company = {
  name: 'MaxBorder Pest Control',
  legalName: 'MaxBorder Pest Control LLC',
  shortName: 'MaxBorder',
  tagline: 'Pests Stop At The Border.',
  phone: '(888) 629-7378',
  phoneHref: 'tel:+18886297378',
  email: 'hello@maxborderpest.com',
  // Shown in the footer once the final number and display format are confirmed.
  licenseNumber: null,
};

export const serviceArea = {
  label: 'Serving Davis & Salt Lake Counties',
  counties: ['Davis County', 'Salt Lake County'],
  state: 'Utah',
};

/**
 * Mosquito pricing lives in one place so it can move between a starting price
 * and quote-only without touching the frontend. Set to null for "Get a quote".
 */
const MOSQUITO_PRICE = 'Starting at $79';

export const services = [
  {
    slug: 'general-pest-control',
    name: 'General Pest Control',
    icon: 'shield',
    price: 'Starting at $149',
    summary:
      'Protection against common household pests including spiders, cockroaches, ants, earwigs and other covered pests.',
    lead: 'Straightforward treatment for common household pests.',
    includesTitle: 'Service may include',
    includes: [
      'Property inspection',
      'Exterior perimeter treatment',
      'Entry and activity area treatment',
      'Targeted interior treatment when appropriate',
      'Spider web removal from accessible areas when appropriate',
      'Treatment based on the pest and property conditions',
      'Service report',
    ],
    pestsTitle: 'Common pests may include',
    pests: ['Spiders', 'Cockroaches', 'Ants', 'Earwigs', 'Occasional Invaders'],
  },
  {
    slug: 'rodent-control',
    name: 'Rodent Control',
    icon: 'mouse',
    price: 'Starting at $199',
    summary:
      "Inspection, trapping, baiting and monitoring based on the property's rodent activity and conditions.",
    lead: 'Help protect your property from mice and rats with a treatment plan based on inspection and activity.',
    includesTitle: 'Service may include',
    includes: [
      'Rodent inspection',
      'Identification of activity areas',
      'Interior trapping when appropriate',
      'Exterior baiting when appropriate',
      'Tamper-resistant bait stations when appropriate',
      'Monitoring',
      'Recommendations for possible entry points or conditions contributing to activity',
    ],
    note: 'Additional equipment, extensive trapping, cleanup, exclusion or repairs may require a separate quote.',
  },
  {
    slug: 'mosquito-control',
    name: 'Mosquito Control',
    icon: 'droplet',
    price: MOSQUITO_PRICE,
    seasonal: true,
    summary:
      'Targeted outdoor mosquito treatments focused on common resting and activity areas around the property.',
    lead: 'Outdoor mosquito treatments designed to reduce mosquito activity around residential properties.',
    includesTitle: 'Treatment focuses on resting and activity areas such as',
    includes: [
      'Shrubs',
      'Vegetation',
      'Shaded areas',
      'Areas around patios and outdoor living spaces',
      'Other appropriate treatment areas based on inspection and product label requirements',
    ],
    note: 'Mosquito control remains available seasonally while conditions are appropriate.',
  },
];

/**
 * Homepage promotions. Flip `active` to false to take one down without losing
 * its copy; the mosquito offer should come down when mosquito season ends.
 */
export const promotions = [
  {
    id: 'fall-rodent',
    active: true,
    badge: 'Limited time',
    title: 'Rodent Control + Exterior Pest Treatment',
    price: 'Rodent Control starting at $199',
    body: 'For a limited time, qualifying rodent-control initial services include a one-time exterior pest perimeter treatment at no additional charge.',
    fine: 'Restrictions may apply. Treatment depends on property conditions, target pests and product-label requirements.',
    service: 'rodent-control',
  },
  {
    id: 'mosquito-intro',
    active: true,
    badge: 'Seasonal',
    title: 'Mosquito Introductory Treatment',
    price: MOSQUITO_PRICE,
    body: 'A simple one-time mosquito treatment with no recurring plan required.',
    service: 'mosquito-control',
  },
];

/** Only claims the business can substantiate. */
export const trustPoints = [
  { icon: 'badge', label: 'Licensed in Utah' },
  { icon: 'shield', label: 'Insured' },
  { icon: 'tag', label: 'Straightforward Pricing' },
  { icon: 'file', label: 'Clear Service Reports' },
  { icon: 'map', label: 'Local Service' },
];

/** Stands in for safety and guarantee language the business cannot define. */
export const notes = {
  products:
    "Products are applied according to label directions and applicable requirements. We'll provide any preparation or re-entry instructions that apply to your service.",
  concerns:
    "If you have concerns after treatment, contact us and we'll review the situation and recommend the appropriate next step.",
};
