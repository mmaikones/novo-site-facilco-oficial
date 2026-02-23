import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';

const SegmentPage = lazy(() => import('./pages/SegmentPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CatalogPdfPrintPage = lazy(() => import('./pages/CatalogPdfPrintPage'));
const ManusCatalogPage = lazy(() => import('./pages/ManusCatalogPage'));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white text-brand-dark font-semibold">
            Carregando...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo-completo" element={<ManusCatalogPage />} />
          <Route path="/catalogo-manus" element={<ManusCatalogPage />} />
          <Route path="/catalogo-de-produtos" element={<CatalogPage />} />
          <Route path="/catalogo-pdf-print" element={<CatalogPdfPrintPage />} />
          {/* Dynamic Route for Segments - matches the paths in segments.ts data */}
          <Route path="/:id" element={<SegmentPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
