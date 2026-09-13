import {
  BadgeCheck,
  Bug,
  Droplets,
  FileText,
  MapPin,
  Mouse,
  Shield,
  Tag,
  type LucideIcon,
} from 'lucide-react';

/**
 * Single icon family (Lucide) at a consistent stroke width, mapped from the
 * content layer's icon keys so the API never ships component references.
 */
const registry: Record<string, LucideIcon> = {
  shield: Shield,
  mouse: Mouse,
  droplet: Droplets,
  bug: Bug,
  badge: BadgeCheck,
  tag: Tag,
  file: FileText,
  map: MapPin,
};

export const Icon = ({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) => {
  const Cmp = registry[name] ?? Bug;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
};
