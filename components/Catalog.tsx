import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CatalogItem } from '../types';
import { CATALOG_PRODUCTS } from '../data/catalog';

const DISPLAY_ORDER = [1, 4, 5, 6, 7, 8, 2, 10, 3, 9, 11, 12];
const ORDER_INDEX = DISPLAY_ORDER.reduce<Record<number, number>>((acc, id, index) => {
  acc[id] = index;
  return acc;
}, {});

const allProducts = [...CATALOG_PRODUCTS].sort((a, b) => {
  const orderA = ORDER_INDEX[a.id] ?? 999;
  const orderB = ORDER_INDEX[b.id] ?? 999;
  if (orderA !== orderB) return orderA - orderB;
  return a.id - b.id;
});

const Catalog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [expandedZoom, setExpandedZoom] = useState(1);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const modalTouchStartX = useRef(0);
  const modalTouchEndX = useRef(0);

  const filteredProducts = allProducts;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || selectedProduct) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, selectedProduct, filteredProducts.length, itemsPerPage]);

  useEffect(() => {
    if (selectedProduct) setCurrentGalleryIndex(0);
    setIsImageExpanded(false);
    setExpandedZoom(1);
  }, [selectedProduct]);

  useEffect(() => {
    setIsImageExpanded(false);
    setExpandedZoom(1);
  }, [currentGalleryIndex]);

  useEffect(() => {
    const maxIndex = Math.max(0, filteredProducts.length - itemsPerPage);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [filteredProducts.length, itemsPerPage, currentIndex]);

  const nextSlide = () => {
    if (filteredProducts.length <= itemsPerPage) return;

    setCurrentIndex((prevIndex) => {
      const maxIndex = filteredProducts.length - itemsPerPage;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    if (filteredProducts.length <= itemsPerPage) return;

    setCurrentIndex((prevIndex) => {
      const maxIndex = filteredProducts.length - itemsPerPage;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  const getGallery = (product: CatalogItem) => {
    if (product.gallery && product.gallery.length > 0) return product.gallery;
    return [{ src: product.image, title: product.title, description: product.description }];
  };

  const nextGallery = () => {
    if (!selectedProduct) return;
    const gallery = getGallery(selectedProduct);
    setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevGallery = () => {
    if (!selectedProduct) return;
    const gallery = getGallery(selectedProduct);
    setCurrentGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.targetTouches[0].clientX;
  };

  const handleModalTouchMove = (e: React.TouchEvent) => {
    modalTouchEndX.current = e.targetTouches[0].clientX;
  };

  const handleModalTouchEnd = () => {
    if (modalTouchStartX.current - modalTouchEndX.current > 50) {
      nextGallery();
    }
    if (modalTouchStartX.current - modalTouchEndX.current < -50) {
      prevGallery();
    }
  };

  const getWhatsAppLink = (product: CatalogItem) => {
    const message = `Olá Facilco! Gostaria de um orçamento para: ${product.title}`;
    return `https://wa.me/5519996223433?text=${encodeURIComponent(message)}`;
  };

  const openExpandedImage = () => setIsImageExpanded(true);
  const closeExpandedImage = () => {
    setIsImageExpanded(false);
    setExpandedZoom(1);
  };
  const zoomInExpandedImage = () => setExpandedZoom((prev) => Math.min(3, Number((prev + 0.25).toFixed(2))));
  const zoomOutExpandedImage = () => setExpandedZoom((prev) => Math.max(1, Number((prev - 0.25).toFixed(2))));

  return (
    <section id="catalogo" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Catálogo de Produtos Facilco</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Tecnologia e robustez para garantir a segurança operacional da sua indústria.</p>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {filteredProducts.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Voltar carrossel"
                className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-brand-dark/90 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition shadow-lg md:-ml-6"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={nextSlide}
                aria-label="Avançar carrossel"
                className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-brand-dark/90 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition shadow-lg md:-mr-6"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: filteredProducts.length > itemsPerPage
                  ? `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
                  : 'none'
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ flex: `0 0 ${100 / itemsPerPage}%` }}
                  className="shrink-0 px-0 sm:px-3"
                >
                  <div
                    className="group/card relative bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer mx-auto max-w-[460px]"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-[2/3] bg-gray-200 flex items-center justify-center overflow-hidden relative">
                      <span className="absolute top-3 right-3 bg-brand-yellow text-brand-dark text-[10px] font-bold px-2 py-1 rounded uppercase z-10 shadow-sm">
                        {product.category}
                      </span>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <span className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-xs uppercase flex items-center gap-2">
                          <i className="fas fa-search-plus"></i> Ver Detalhes
                        </span>
                      </div>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain md:object-cover transition duration-500 group-hover/card:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-display font-bold text-brand-dark mb-2 leading-tight">{product.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3">{product.description}</p>
                      <span className="text-brand-yellow font-bold text-sm uppercase flex items-center gap-2 mt-auto">
                        Solicitar Cotação <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="w-full text-center py-10 text-gray-400">
                  Nenhum produto encontrado nesta categoria.
                </div>
              )}
            </div>
          </div>

          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(filteredProducts.length - itemsPerPage + 1) }).map((_, idx) => (
                idx % itemsPerPage === 0 && (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex >= idx && currentIndex < idx + itemsPerPage
                        ? 'w-8 bg-brand-yellow'
                        : 'w-2 bg-gray-300'
                      }`}
                    aria-label={`Go to slide group ${idx + 1}`}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/catalogo-completo"
          className="bg-brand-dark text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg hover:bg-brand-yellow hover:text-brand-dark transition-all"
        >
          Ver Catálogo Completo
        </Link>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          ></div>

          <div className="bg-white w-full max-w-5xl h-[92vh] md:h-[88vh] rounded-lg shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-20 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {(() => {
              const gallery = getGallery(selectedProduct);
              const currentItem = gallery[currentGalleryIndex];
              return (
                <>
                  <div
                    className="w-full h-[44%] md:h-full md:w-1/2 bg-gray-100 relative shrink-0"
                    onTouchStart={handleModalTouchStart}
                    onTouchMove={handleModalTouchMove}
                    onTouchEnd={handleModalTouchEnd}
                    style={{ touchAction: 'pan-y' }}
                  >
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-contain absolute inset-0 cursor-zoom-in"
                      onClick={openExpandedImage}
                    />
                    <div className="absolute top-4 left-4 rounded-full bg-black/60 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                      {selectedProduct.category} • {currentGalleryIndex + 1}/{gallery.length}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openExpandedImage();
                      }}
                      className="absolute bottom-4 right-4 rounded-full bg-black/65 text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black/80 transition"
                    >
                      Expandir
                    </button>

                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevGallery();
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextGallery();
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="w-full h-[56%] md:h-full md:w-1/2 p-5 md:p-8 flex flex-col overflow-y-auto">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">{selectedProduct.title}</h3>

                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                      <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2">Detalhe do slide</p>
                      <h4 className="text-lg font-bold text-brand-dark mb-1">{currentItem.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{currentItem.description}</p>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-6">
                      <p className="text-lg leading-relaxed">{selectedProduct.description}</p>

                      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                        <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                          <i className="fas fa-check-circle"></i> Disponibilidade
                        </h4>
                        <p className="text-sm text-blue-800">
                          Produto sob medida. Fabricação e instalação própria pela Facilco Engenharia.
                        </p>
                      </div>
                    </div>

                    {gallery.length > 1 && (
                      <div className="flex gap-2 mb-6">
                        {gallery.map((item, idx) => (
                          <button
                            key={`${item.title}-${idx}`}
                            onClick={() => setCurrentGalleryIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentGalleryIndex ? 'w-8 bg-brand-yellow' : 'w-2 bg-gray-300'}`}
                            aria-label={`Ir para o slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                      <a
                        href={getWhatsAppLink(selectedProduct)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-center hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                      >
                        <i className="fab fa-whatsapp text-2xl"></i>
                        <div className="text-left">
                          <span className="block text-xs font-normal opacity-90">Falar com Consultor</span>
                          <span className="uppercase tracking-wide">Pedir Orçamento Agora</span>
                        </div>
                      </a>
                      <p className="text-center text-xs text-gray-400">
                        *Atendimento técnico imediato.
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          {isImageExpanded && (() => {
            const gallery = getGallery(selectedProduct);
            const expandedItem = gallery[currentGalleryIndex];
            return (
              <div className="fixed inset-0 z-[90] bg-black/95 flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
                  <p className="text-white text-xs md:text-sm font-semibold truncate pr-3">
                    {expandedItem.title}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={zoomOutExpandedImage}
                      className="w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 transition"
                      aria-label="Diminuir zoom"
                    >
                      -
                    </button>
                    <span className="text-white text-xs font-bold w-12 text-center">
                      {Math.round(expandedZoom * 100)}%
                    </span>
                    <button
                      onClick={zoomInExpandedImage}
                      className="w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 transition"
                      aria-label="Aumentar zoom"
                    >
                      +
                    </button>
                    <button
                      onClick={closeExpandedImage}
                      className="w-9 h-9 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition"
                      aria-label="Fechar imagem ampliada"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  <div className="min-h-full min-w-full flex items-center justify-center p-4 md:p-8">
                    <div
                      style={{ width: `${expandedZoom * 100}%` }}
                      className="max-w-[2200px] transition-[width] duration-150 ease-out"
                    >
                      <img
                        src={expandedItem.src}
                        alt={expandedItem.title}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </section>
  );
};

export default Catalog;
