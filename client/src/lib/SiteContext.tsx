import { createContext, useContext, type ReactNode } from 'react';
import { api } from './api';
import { useAsync } from '@/hooks';
import type { Promotion, Service, SiteData } from './types';

type Bundle = {
  demo?: boolean;
  site: SiteData;
  services: Service[];
  promotions: Promotion[];
};

const SiteContext = createContext<Bundle | null>(null);

/** All site content is fetched once here and shared, so pages never refetch. */
export const SiteProvider = ({
  children,
  fallback,
  errorView,
}: {
  children: ReactNode;
  fallback: ReactNode;
  errorView: (error: string, retry: () => void) => ReactNode;
}) => {
  // One request for everything. See the /bootstrap route for why.
  const { data, error, loading, retry } = useAsync<Bundle>((signal) =>
    api.get<Bundle>('/bootstrap', signal)
  );

  if (loading) return <>{fallback}</>;
  if (error || !data) return <>{errorView(error ?? 'Content unavailable.', retry)}</>;

  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
};

export const useSite = (): Bundle => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside <SiteProvider>.');
  return ctx;
};
