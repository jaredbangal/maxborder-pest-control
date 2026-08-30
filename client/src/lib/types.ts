export type Service = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  description: string;
  covers: string[];
  highlights: string[];
  popular?: boolean;
  seasonal?: boolean;
  related?: Service[];
};

export type Plan = {
  id: string;
  name: string;
  blurb: string;
  features: string[];
  notIncluded: string[];
  popular?: boolean;
};

export type Pest = {
  name: string;
  slug: string;
  season: string;
  risk: 'Nuisance' | 'Health' | 'Structural' | 'Sting' | 'Property';
  icon: string;
};

export type PestCategory = {
  slug: string;
  name: string;
  icon: string;
  count: string;
  blurb: string;
  examples: string[];
  serviceSlug: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
};

export type Faq = { q: string; a: string };

export type ProcessStep = { number: string; title: string; body: string };

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  detail: string;
};

export type Certification = { name: string; abbr: string; detail: string };

export type ServiceArea = { region: string; cities: string[] };

export type Company = {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: { street: string; city: string; state: string; zip: string };
  hours: Array<{ days: string; open: string }>;
  social: Record<string, string>;
  founded: number;
};

export type SiteData = {
  company: Company;
  stats: Stat[];
  certifications: Certification[];
  serviceAreas: ServiceArea[];
};

export type Coverage = { zip: string; covered: boolean; message: string };

export type LeadKind = 'quote' | 'contact' | 'callback';
