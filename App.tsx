import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SegmentPage from './pages/SegmentPage';
import CatalogPage from './pages/CatalogPage';
import CatalogPdfPrintPage from './pages/CatalogPdfPrintPage';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/catalogo-completo" element={<CatalogPage />} />
        <Route path="/catalogo-de-produtos" element={<CatalogPage />} />
        <Route path="/catalogo-pdf-print" element={<CatalogPdfPrintPage />} />
        {/* Dynamic Route for Segments - matches the paths in segments.ts data */}
        <Route path="/:id" element={<SegmentPage />} />
      </Routes>
    </>
  );
};

export default App;
