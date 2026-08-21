import {
  Bed,
  Bug,
  Building2,
  Droplets,
  Home,
  Mouse,
  Shield,
  Zap,
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
  home: Home,
  bed: Bed,
  building: Building2,
  bug: Bug,
  zap: Zap,
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
