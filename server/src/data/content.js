/**
 * Single source of truth for site content. Served over the API so copy, pricing
 * and coverage can change without rebuilding the frontend.
 */

export const company = {
  name: 'Maxborder Pest Control',
  shortName: 'Maxborder',
  tagline: 'Pests Stop At The Border.',
  phone: '(888) 629-7378',
  phoneHref: 'tel:+18886297378',
  email: 'hello@maxborderpest.com',
  address: { street: '1420 Ironwood Ave, Suite 300', city: 'Salt Lake City', state: 'UT', zip: '84101' },
  hours: [
    { days: 'Monday – Friday', open: '7:00 AM – 7:00 PM' },
    { days: 'Saturday', open: '8:00 AM – 4:00 PM' },
    { days: 'Sunday', open: 'Emergency service only' },
  ],
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
  founded: 2009,
};

export const stats = [
  { value: 42000, suffix: '+', label: 'Homes protected', detail: 'Across 6 counties' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Average rating', detail: 'From 3,800+ verified reviews' },
  { value: 24, suffix: 'hr', label: 'Response window', detail: 'Or the return visit is free' },
];

export const services = [
  {
    slug: 'general-pest-control',
    name: 'General Pest Control',
    icon: 'shield',
    summary: 'Year-round protection against the 50+ pests that actually show up at your door.',
    description:
      'Our flagship plan builds a treated barrier around the entire structure and refreshes it every quarter as the seasons shift. Ants in spring, spiders in summer, rodents pushing indoors in fall — each visit is tuned to what is active right now, not a generic spray.',
    covers: ['Ants', 'Spiders', 'Roaches', 'Silverfish', 'Earwigs', 'Crickets', 'Wasps', 'Millipedes'],
    highlights: [
      'Quarterly visits timed to seasonal pest pressure',
      'Interior treatment on request at no extra charge',
      'Free re-service between visits if pests return',
      'Pet- and child-safe products, applied by licensed techs',
    ],
    popular: true,
  },
  {
    slug: 'rodent-control',
    name: 'Rodent Control',
    icon: 'mouse',
    summary: 'Trap, remove, and seal the entry points so they cannot come back.',
    description:
      'Rodents are an exclusion problem, not a trapping problem. We map every entry point down to the quarter-inch, seal them with rodent-proof materials, and monitor the property until activity reaches zero.',
    covers: ['House mice', 'Roof rats', 'Norway rats', 'Voles', 'Squirrels'],
    highlights: [
      'Full-structure entry point inspection and sealing',
      'Tamper-resistant bait stations where appropriate',
      'Attic and crawlspace sanitation options',
      'Monitoring visits until activity stops',
    ],
  },
  {
    slug: 'mosquito-tick-flea',
    name: 'Mosquito, Tick & Flea',
    icon: 'droplet',
    summary: 'Take the yard back. Treatments target where they breed, not just where they bite.',
    description:
      'Mosquitoes rest in shaded foliage and breed in standing water measured in tablespoons. We treat harborage zones, eliminate breeding sites, and apply a residual barrier that keeps working between visits.',
    covers: ['Mosquitoes', 'Ticks', 'Fleas', 'Chiggers', 'Biting midges'],
    highlights: [
      'Monthly treatments through the active season',
      'Breeding-site elimination, not just fogging',
      'In-ground misting system installs available',
      'Event-day service for weddings and parties',
    ],
    seasonal: true,
  },
  {
    slug: 'bed-bug-treatment',
    name: 'Bed Bug Treatment',
    icon: 'bed',
    summary: 'Heat remediation that reaches lethal temperature in every crack, in a single day.',
    description:
      'Chemical-only bed bug treatments fail because eggs survive. We raise the entire space above the lethal threshold and hold it there, verified by wireless sensors placed in the hardest-to-heat corners of the room.',
    covers: ['Bed bugs', 'Bed bug eggs', 'Carpet beetles'],
    highlights: [
      'Whole-room thermal remediation in one visit',
      'Wireless sensor verification of lethal temps',
      'Follow-up inspection at 14 and 30 days',
      'Discreet unmarked vehicles on request',
    ],
  },
  {
    slug: 'commercial-pest-control',
    name: 'Commercial & Multi-Unit',
    icon: 'building',
    summary: 'Audit-ready pest management for food service, healthcare, and property managers.',
    description:
      'Built for properties that get inspected. Every visit is logged, every device is barcoded, and your documentation binder stays current and audit-ready — whether the inspector is from the health department, AIB, or your own corporate QA team.',
    covers: ['Roaches', 'Rodents', 'Stored product pests', 'Flies', 'Birds', 'Ants'],
    highlights: [
      'Digital service logs and barcoded device scanning',
      'AIB / SQF / health department documentation',
      'After-hours and overnight scheduling',
      'Dedicated account manager per property',
    ],
  },
];

export const plans = [
  {
    id: 'essential',
    name: 'Essential',
    blurb: 'Core protection for the pests that show up every single year.',
    features: [
      'Quarterly exterior treatments',
      'Coverage for 30+ common pests',
      'Free re-service between visits',
      'Eave sweep and web removal',
      'Digital service reports',
    ],
    notIncluded: ['Mosquito & tick control', 'Termite monitoring', 'Rodent exclusion work'],
  },
  {
    id: 'complete',
    name: 'Complete',
    blurb: 'Everything in Essential plus the seasonal pests that ruin your yard.',
    features: [
      'Everything in Essential',
      'Coverage for 50+ pests',
      'Mosquito, tick & flea barrier',
      'Rodent monitoring stations',
      'Interior treatments on request',
      'Priority 48-hour scheduling',
    ],
    notIncluded: ['Termite damage guarantee'],
    popular: true,
  },
  {
    id: 'fortress',
    name: 'Fortress',
    blurb: 'Total structural defense, including the damage repair guarantee.',
    features: [
      'Everything in Complete',
      'Monitored termite bait perimeter',
      'Damage repair guarantee',
      'Full rodent exclusion & sealing',
      'Annual certified inspection report',
      'Same-day emergency response',
      'No setup fee',
    ],
    notIncluded: [],
  },
];

export const processSteps = [
  {
    number: '01',
    title: '20-Point Inspection',
    body: 'Before anything is applied, a licensed technician walks the full perimeter and interior, logging every conducive condition — moisture, gaps, harborage, and entry points — into your property file.',
  },
  {
    number: '02',
    title: 'Eave Sweep & Dust',
    body: 'Webs, egg sacs, and wasp nests are physically removed from eaves, soffits, and corners, then a dry dust is placed in voids where liquid treatments cannot reach.',
  },
  {
    number: '03',
    title: 'Crack & Crevice Treatment',
    body: 'Targeted application into the gaps pests actually travel through — expansion joints, utility penetrations, weep holes, and door thresholds.',
  },
  {
    number: '04',
    title: 'Perimeter Barrier',
    body: 'A treated band is established around the foundation, creating the boundary that stops pests before they find a way inside.',
  },
  {
    number: '05',
    title: 'Granular Yard Barrier',
    body: 'Granules are broadcast across the turf line and mulch beds, intercepting ants, crickets, and fleas in the zone where they stage before approaching the house.',
  },
  {
    number: '06',
    title: 'Interior Protection',
    body: 'On request, we treat kitchens, baths, garages, and utility spaces — the interior moisture zones where anything that got through will try to settle.',
  },
];

/**
 * Four groups, not a wall of near-identical bug icons. Each maps to the service
 * that actually treats it, so the section is a route into the funnel rather
 * than a list nobody reads.
 */
export const pestCategories = [
  {
    slug: 'crawling-insects',
    name: 'Crawling Insects',
    icon: 'bug',
    count: '20+ species',
    blurb:
      'The ones that come in under the door and along the baseboards. Treated at the perimeter before they ever get inside.',
    examples: ['Ants', 'Cockroaches', 'Spiders', 'Silverfish', 'Crickets', 'Earwigs'],
    serviceSlug: 'general-pest-control',
  },
  {
    slug: 'rodents',
    name: 'Rodents',
    icon: 'mouse',
    count: '5 species',
    blurb:
      'An exclusion problem, not a trapping problem. We find the entry points, seal them, and monitor until activity stops.',
    examples: ['House mice', 'Roof rats', 'Norway rats', 'Voles', 'Squirrels'],
    serviceSlug: 'rodent-control',
  },
  {
    slug: 'biting-stinging',
    name: 'Biting & Stinging',
    icon: 'zap',
    count: '9 species',
    blurb:
      'The ones that carry a health risk or ruin the yard. Treated where they breed and rest, not just where they land.',
    examples: ['Mosquitoes', 'Ticks', 'Fleas', 'Wasps', 'Hornets', 'Bed bugs'],
    serviceSlug: 'mosquito-tick-flea',
  },
];

export const pests = [
  { name: 'Ants', slug: 'ants', season: 'Spring–Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Cockroaches', slug: 'cockroaches', season: 'Year-round', risk: 'Health', icon: 'bug' },
  { name: 'Spiders', slug: 'spiders', season: 'Summer–Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Mice', slug: 'mice', season: 'Fall–Winter', risk: 'Health', icon: 'mouse' },
  { name: 'Rats', slug: 'rats', season: 'Fall–Winter', risk: 'Health', icon: 'mouse' },
  { name: 'Termites', slug: 'termites', season: 'Spring', risk: 'Structural', icon: 'home' },
  { name: 'Mosquitoes', slug: 'mosquitoes', season: 'Summer', risk: 'Health', icon: 'droplet' },
  { name: 'Wasps', slug: 'wasps', season: 'Summer', risk: 'Sting', icon: 'zap' },
  { name: 'Bed Bugs', slug: 'bed-bugs', season: 'Year-round', risk: 'Health', icon: 'bed' },
  { name: 'Fleas', slug: 'fleas', season: 'Summer–Fall', risk: 'Health', icon: 'bug' },
  { name: 'Ticks', slug: 'ticks', season: 'Spring–Fall', risk: 'Health', icon: 'bug' },
  { name: 'Silverfish', slug: 'silverfish', season: 'Year-round', risk: 'Nuisance', icon: 'bug' },
  { name: 'Earwigs', slug: 'earwigs', season: 'Spring–Summer', risk: 'Nuisance', icon: 'bug' },
  { name: 'Crickets', slug: 'crickets', season: 'Summer–Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Millipedes', slug: 'millipedes', season: 'Spring–Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Centipedes', slug: 'centipedes', season: 'Year-round', risk: 'Sting', icon: 'bug' },
  { name: 'Carpenter Ants', slug: 'carpenter-ants', season: 'Spring–Summer', risk: 'Structural', icon: 'home' },
  { name: 'Hornets', slug: 'hornets', season: 'Summer', risk: 'Sting', icon: 'zap' },
  { name: 'Stink Bugs', slug: 'stink-bugs', season: 'Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Boxelder Bugs', slug: 'boxelder-bugs', season: 'Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Pantry Beetles', slug: 'pantry-beetles', season: 'Year-round', risk: 'Health', icon: 'bug' },
  { name: 'Scorpions', slug: 'scorpions', season: 'Summer', risk: 'Sting', icon: 'zap' },
  { name: 'Fruit Flies', slug: 'fruit-flies', season: 'Summer–Fall', risk: 'Nuisance', icon: 'bug' },
  { name: 'Voles', slug: 'voles', season: 'Fall–Winter', risk: 'Property', icon: 'mouse' },
];

export const testimonials = [
  {
    quote:
      'We had carpenter ants working through a support beam and two other companies told us to just spray and hope. Maxborder found the satellite nest in the crawlspace on the first visit. Eighteen months later, nothing.',
    name: 'Danielle Reyes',
    role: 'Homeowner',
    location: 'Sandy, UT',
    rating: 5,
  },
  {
    quote:
      'I manage 240 units. Their digital logs meant our last health inspection took forty minutes instead of half a day. Every device scanned, every visit documented, nothing to scramble for.',
    name: 'Marcus Bell',
    role: 'Property Manager',
    location: 'Salt Lake City, UT',
    rating: 5,
  },
  {
    quote:
      'Called on a Tuesday about wasps over the back door. Technician was out Wednesday morning, found a second nest in the soffit I had no idea about, and removed both. No upsell, no drama.',
    name: 'Priya Raman',
    role: 'Homeowner',
    location: 'Draper, UT',
    rating: 5,
  },
  {
    quote:
      'The mosquito service is the only reason we use our backyard in July. My kids play out there now without getting eaten alive. Worth every dollar.',
    name: 'Tom Whitaker',
    role: 'Homeowner',
    location: 'Bountiful, UT',
    rating: 5,
  },
  {
    quote:
      'Bed bugs in a rental turnover is a nightmare scenario. They did the heat treatment in one day, gave me sensor readings as proof, and the unit was re-leased that week.',
    name: 'Alicia Nnamdi',
    role: 'Landlord',
    location: 'West Jordan, UT',
    rating: 5,
  },
];

export const faqs = [
  {
    q: 'Are your treatments safe for children and pets?',
    a: 'Yes. We use EPA-registered products applied at label rate by licensed technicians, and we concentrate applications on the exterior perimeter, cracks, and voids rather than open living surfaces. The standard guidance is to keep kids and pets off treated areas until they dry, which is typically 30 to 60 minutes. If anyone in the home has a specific sensitivity, tell us when you book and we will build the plan around it.',
  },
  {
    q: 'How quickly can you get someone out?',
    a: 'Standard service is scheduled within 48 hours. Emergencies — active stinging insects near an entrance, a rodent inside the living space, or anything involving an allergy risk — get same-day dispatch whenever a technician is within range.',
  },
  {
    q: 'Do I need to be home for the service?',
    a: 'Not for exterior treatments, which is the bulk of the work. You will get a text when the technician is en route and a digital report when they finish. Interior treatments do require access, so we schedule those in a window that works for you.',
  },
  {
    q: 'What happens on the very first visit?',
    a: 'The first visit is the longest — usually 60 to 90 minutes. It covers the full 20-point inspection, the initial interior and exterior treatment, web and nest removal, and the granular yard barrier. Follow-up visits are shorter because the barrier is already established and we are maintaining it.',
  },
  {
    q: 'Do you service commercial properties?',
    a: 'Yes — restaurants, clinics, warehouses, schools, and multi-family properties. Commercial accounts get barcoded device scanning, digital service logs, and documentation formatted for AIB, SQF, and health department inspections.',
  },
  {
    q: 'Is the service eco-friendly?',
    a: 'We practice Integrated Pest Management, which means exclusion, sanitation, and habitat correction come first, and product is the targeted last step rather than the default first one. In practice that means less material applied, placed more precisely. We also route-optimize our fleet, which cut our per-visit fuel use by about a third.',
  },
  {
    q: 'TBD',
    a: 'TBD',
  },
];

export const serviceAreas = [
  {
    region: 'Salt Lake County',
    cities: [
      'Salt Lake City',
      'West Valley City',
      'West Jordan',
      'Sandy',
      'South Jordan',
      'Murray',
      'Draper',
      'Riverton',
      'Taylorsville',
      'Millcreek',
      'Cottonwood Heights',
      'Holladay',
    ],
  },
  {
    region: 'Utah County',
    cities: ['Provo', 'Orem', 'Lehi', 'American Fork', 'Pleasant Grove', 'Saratoga Springs', 'Springville'],
  },
  {
    region: 'Davis County',
    cities: ['Layton', 'Bountiful', 'Kaysville', 'Farmington', 'Clearfield', 'Syracuse', 'Centerville'],
  },
  {
    region: 'Weber County',
    cities: ['Ogden', 'Roy', 'South Ogden', 'North Ogden', 'Riverdale', 'Washington Terrace'],
  },
  {
    region: 'Summit County',
    cities: ['Park City', 'Coalville', 'Kamas', 'Francis'],
  },
  {
    region: 'Tooele County',
    cities: ['Tooele', 'Grantsville', 'Stansbury Park', 'Erda'],
  },
];

export const certifications = [
  { name: 'QualityPro Certified', abbr: 'QP', detail: 'NPMA standard' },
  { name: 'Google Reviews 4.9', abbr: '4.9', detail: '3,800+ reviews' },
];
