import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageError, PageLoader } from '@/components/ui/States';
import { SiteProvider, useSite } from '@/lib/SiteContext';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { ServiceDetail } from '@/pages/ServiceDetail';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Privacy } from '@/pages/Privacy';
import { NotFound } from '@/pages/NotFound';

/**
 * Pages retired when the site narrowed to three services. Each one points at
 * its nearest replacement so old links and search results don't 404.
 */
const RETIRED: Array<[string, string]> = [
  ['/residential', '/services'],
  ['/commercial', '/services'],
  ['/plans', '/services'],
  ['/pests', '/services'],
  ['/coverage', '/services'],
  ['/how-it-works', '/services'],
  ['/service-areas', '/'],
  ['/faqs', '/contact'],
  ['/faq', '/contact'],
  ['/services/mosquito-tick-flea', '/services/mosquito-control'],
  ['/services/bed-bug-treatment', '/services'],
  ['/services/commercial-pest-control', '/services'],
];

const Shell = () => {
  const { demo } = useSite();

  return (
    <>
      <ScrollToTop />
      <Header />

      {/* Bottom padding clears the mobile call bar so nothing hides behind it. */}
      <main id="main" className="pb-20 sm:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {RETIRED.map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer demo={demo} />
      <MobileCallBar />
    </>
  );
};

export const App = () => (
  <SiteProvider
    fallback={<PageLoader />}
    errorView={(error, retry) => <PageError message={error} onRetry={retry} />}
  >
    <Shell />
  </SiteProvider>
);
