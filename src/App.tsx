import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PartnerDialogProvider } from './components/PartnerDialog';
import { RegistrationDialogProvider } from './components/RegistrationDialog';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Mahola } from './pages/Mahola';
import { Programme } from './pages/Programme';
import { Speakers } from './pages/Speakers';
import { SiteContentProvider } from './content/SiteContentProvider';
import { LanguageProvider, useLang, useT } from './i18n/LanguageProvider';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function Layout() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="flex min-h-screen w-full flex-col bg-sand">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-sand">
        
        {t.common.skipToContent}
      </a>
      <ScrollToTop />
      <Header />
      {/* key : les filtres portent sur des libellés traduits, on repart de zéro à chaque changement de langue */}
      <div id="contenu" className="flex-1" key={lang}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/mahola" element={<Mahola />} />
          <Route path="/programme" element={<Programme />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>);

}

export function App() {
  return (
    <LanguageProvider>
    <SiteContentProvider>
    <BrowserRouter>
      <PartnerDialogProvider>
      <RegistrationDialogProvider>
        <Layout />
      </RegistrationDialogProvider>
      </PartnerDialogProvider>
    </BrowserRouter>
    </SiteContentProvider>
    </LanguageProvider>);

}
