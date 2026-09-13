export type Service = {
  slug: string;
  name: string;
  icon: string;
  /** e.g. "Starting at $149". Null means quote-only. */
  price: string | null;
  seasonal?: boolean;
  summary: string;
  lead: string;
  includesTitle: string;
  includes: string[];
  pestsTitle?: string;
  pests?: string[];
  note?: string;
};

export type Promotion = {
  id: string;
  badge: string;
  title: string;
  price: string | null;
  body: string;
  fine?: string;
  service: string;
};

export type TrustPoint = { icon: string; label: string };

export type Company = {
  name: string;
  legalName: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  email: string;
  licenseNumber: string | null;
};

export type ServiceArea = { label: string; counties: string[]; state: string };

export type SiteData = {
  company: Company;
  serviceArea: ServiceArea;
  trustPoints: TrustPoint[];
  notes: { products: string; concerns: string };
};

export type LeadKind = 'quote' | 'contact' | 'callback';
