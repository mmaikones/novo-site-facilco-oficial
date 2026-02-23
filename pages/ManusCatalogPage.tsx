import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Expand, Home, MessageCircle, X } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import { MANUS_MERGED_PRODUCTS_DATA } from '../data/manusCatalogMerged';
import type { Product } from '../data/manusBase';

const WHATSAPP_LINK = 'https://wa.me/5519996223433';

const ManusCatalogPage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    useEffect(() => {
        setCurrentGalleryIndex(0);
        setIsImageExpanded(false);
    }, [selectedProduct?.id]);

    const selectedGallery = useMemo(
        () => (selectedProduct?.gallery && selectedProduct.gallery.length > 0 ? selectedProduct.gallery : []),
        [selectedProduct]
    );

    const nextGallery = () => {
        if (!selectedGallery.length) return;
        setCurrentGalleryIndex((prev) => (prev + 1) % selectedGallery.length);
    };

    const prevGallery = () => {
        if (!selectedGallery.length) return;
        setCurrentGalleryIndex((prev) => (prev - 1 + selectedGallery.length) % selectedGallery.length);
    };

    const closeProductModal = () => {
        setIsImageExpanded(false);
        setSelectedProduct(null);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchStartY.current = e.targetTouches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - touchStartX.current;
        const deltaY = endY - touchStartY.current;

        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (deltaX < 0) nextGallery();
        if (deltaX > 0) prevGallery();
    };

    const openExpandedImage = () => setIsImageExpanded(true);
    const closeExpandedImage = () => setIsImageExpanded(false);

    return (
        <div className="min-h-screen bg-[#f7f7f4] text-brand-dark">
            <header className="fixed top-0 left-0 right-0 z-40 p-4 md:p-6 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <Link to="/" className="justify-self-start flex items-center gap-2 text-brand-dark hover:text-brand-yellow transition-colors font-bold">
                        <Home size={18} />
                        <span className="uppercase text-xs tracking-widest font-display">Home</span>
                    </Link>
                    <img src="/logo.png" alt="Facilco" className="h-9 md:h-10 w-auto object-contain justify-self-center" />
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="justify-self-end inline-flex items-center gap-2 bg-brand-yellow text-brand-dark px-3 md:px-4 py-2 rounded-[6px] text-[11px] md:text-xs uppercase tracking-wide font-bold hover:bg-brand-dark hover:text-white transition"
                    >
                        <MessageCircle size={14} />
                        Falar com Engenheiro
                    </button>
                </div>
            </header>

            <section className="relative pt-28 md:pt-32 h-[62vh] min-h-[460px] overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/catalog/rampa-movel-carga:descarga/rampa-movel-capa.jpg" alt="Rampa Móvel de Carga e Descarga" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/65 to-black/35" />
                </div>
                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-center text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                            Catálogo de Produtos Facilco
                        </h1>
                        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl">
                            Explore nossa linha completa de soluções industriais com detalhes técnicos e galeria de aplicações.
                        </p>
                        <a
                            href="#catalogo-manus"
                            className="inline-flex items-center mt-6 bg-brand-yellow text-brand-dark px-5 py-3 rounded-[6px] text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-white transition mx-auto"
                        >
                            Ver Produtos
                        </a>
                    </div>
                </div>
            </section>

            <main id="catalogo-manus" className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-14 md:space-y-20">
                {MANUS_MERGED_PRODUCTS_DATA.map((category) => (
                    <section key={category.id} className="space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark border-l-4 border-brand-yellow pl-4">
                                {category.title}
                            </h2>
                            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-4xl">{category.description}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                            {category.products.map((product) => (
                                <button
                                    key={product.id}
                                    type="button"
                                    onClick={() => setSelectedProduct(product)}
                                    className="text-left group relative bg-white border border-gray-200 rounded-[10px] shadow-sm hover:shadow-xl transition-all overflow-hidden"
                                >
                                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <h3 className="text-lg md:text-xl font-bold text-brand-dark leading-snug">{product.title}</h3>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{product.description}</p>
                                        <div className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-yellow">
                                            Ver detalhes
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            {selectedProduct && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-5">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                        onClick={closeProductModal}
                        aria-label="Fechar modal"
                    />

                    <div className="relative z-10 w-full max-w-6xl h-[94vh] md:max-h-[95vh] bg-white rounded-[10px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <button
                            onClick={closeProductModal}
                            className="absolute top-3 right-3 z-20 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
                            aria-label="Fechar"
                        >
                            <X size={18} />
                        </button>

                        <div
                            className="w-full md:w-3/5 bg-gray-100 relative h-[44vh] min-h-[280px] md:h-auto md:min-h-[580px] flex items-center justify-center"
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            style={{ touchAction: 'pan-y' }}
                        >
                            <img
                                src={selectedGallery[currentGalleryIndex] ?? selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-full object-contain p-3 md:p-5 cursor-zoom-in"
                                onClick={openExpandedImage}
                            />

                            <button
                                onClick={openExpandedImage}
                                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 inline-flex items-center gap-1.5 bg-black/70 text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full hover:bg-black/85 transition"
                            >
                                <Expand size={13} />
                                Ampliar
                            </button>

                            {selectedGallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevGallery}
                                        className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-white/85 text-brand-dark w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                        aria-label="Imagem anterior"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <button
                                        onClick={nextGallery}
                                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-white/85 text-brand-dark w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                        aria-label="Próxima imagem"
                                    >
                                        <ChevronRight size={18} />
                                    </button>

                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                        {selectedGallery.map((_, index) => (
                                            <button
                                                key={`${selectedProduct.id}-gallery-${index}`}
                                                onClick={() => setCurrentGalleryIndex(index)}
                                                className={`h-2 rounded-full transition-all ${index === currentGalleryIndex ? 'w-7 bg-brand-yellow' : 'w-2 bg-gray-300'}`}
                                                aria-label={`Ir para foto ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] md:text-xs uppercase tracking-widest font-bold px-2.5 py-1 rounded-full">
                                        {currentGalleryIndex + 1}/{selectedGallery.length}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="w-full md:w-2/5 p-5 md:p-7 overflow-y-auto">
                            <p className="text-[11px] uppercase tracking-widest font-bold text-brand-yellow mb-2">Detalhes Técnicos</p>
                            <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark leading-tight">{selectedProduct.title}</h3>

                            <div className="mt-5 bg-yellow-50 border-l-4 border-brand-yellow p-4 rounded-r-[8px]">
                                <p className="text-sm text-brand-dark">
                                    <strong className="font-bold">Por que é essencial:</strong> {selectedProduct.importance}
                                </p>
                            </div>

                            <p className="mt-5 text-sm md:text-base text-gray-600 leading-relaxed">{selectedProduct.description}</p>

                            <div className="mt-6">
                                <h4 className="text-sm md:text-base font-bold text-brand-dark mb-3 uppercase tracking-wide">Especificações</h4>
                                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                                    {selectedProduct.specs.map((spec) => (
                                        <li key={`${selectedProduct.id}-${spec}`}>{spec}</li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={`${WHATSAPP_LINK}?text=${encodeURIComponent(`Olá Facilco! Quero cotação para: ${selectedProduct.title}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-7 block w-full text-center py-3.5 bg-green-600 text-white font-bold uppercase tracking-wide rounded-[6px] hover:bg-green-700 transition"
                            >
                                Solicitar Cotação
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {selectedProduct && isImageExpanded && (
                <div className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center p-3 md:p-6">
                    <button
                        type="button"
                        className="absolute inset-0"
                        aria-label="Fechar visualização da imagem"
                        onClick={closeExpandedImage}
                    />

                    <div
                        className="relative z-10 w-full h-full max-w-6xl flex items-center justify-center"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        style={{ touchAction: 'pan-y' }}
                    >
                        <button
                            onClick={closeExpandedImage}
                            className="absolute top-3 right-3 z-20 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
                            aria-label="Fechar visualização"
                        >
                            <X size={18} />
                        </button>

                        <img
                            src={selectedGallery[currentGalleryIndex] ?? selectedProduct.image}
                            alt={selectedProduct.title}
                            className="max-w-full max-h-full object-contain"
                        />

                        {selectedGallery.length > 1 && (
                            <>
                                <button
                                    onClick={prevGallery}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/85 text-brand-dark w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                    aria-label="Imagem anterior"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextGallery}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/85 text-brand-dark w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                    aria-label="Próxima imagem"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                    {selectedGallery.map((_, index) => (
                                        <button
                                            key={`${selectedProduct.id}-expanded-gallery-${index}`}
                                            onClick={() => setCurrentGalleryIndex(index)}
                                            className={`h-2 rounded-full transition-all ${index === currentGalleryIndex ? 'w-7 bg-brand-yellow' : 'w-2 bg-gray-400'}`}
                                            aria-label={`Ir para foto ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <ChatWidget isOpen={isChatOpen} toggleChat={() => setIsChatOpen((prev) => !prev)} />
        </div>
    );
};

export default ManusCatalogPage;
