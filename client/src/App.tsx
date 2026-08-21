import { Route, Routes } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageError, PageLoader } from '@/components/ui/States';
import { SiteProvider, useSite } from '@/lib/SiteContext';
import { Home } from '@/pages/Home';
import { Services } from '@/pages/Services';
import { ServiceDetail } from '@/pages/ServiceDetail';
import { Plans } from '@/pages/Plans';
import { Pests } from '@/pages/Pests';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Faq } from '@/pages/Faq';
import { NotFound } from '@/pages/NotFound';

const Shell = () => {
  const { site, demo } = useSite();

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
          <Route path="/plans" element={<Plans />} />
          <Route path="/pests" element={<Pests />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer areas={site.serviceAreas} demo={demo} />
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
