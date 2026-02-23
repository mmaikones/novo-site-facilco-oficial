import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    X,
    Download,
    RotateCw
} from 'lucide-react';
import { renderPresentationSlide } from './PresentationSlides';
import ChatWidget from '../components/ChatWidget';

interface PresentationOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    segment: any;
    onDownload?: () => void;
    isDownloading?: boolean;
}

const PresentationOverlay: React.FC<PresentationOverlayProps> = ({ isOpen, onClose, segment, onDownload, isDownloading }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showRotateHint, setShowRotateHint] = useState(false);

    useEffect(() => {
        if (isOpen) setCurrentSlide(0);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setShowRotateHint(false);
            return;
        }

        const handleViewportChange = () => {
            const isMobileViewport = window.matchMedia('(max-width: 1024px)').matches;
            const isPortrait = window.innerHeight > window.innerWidth;
            setShowRotateHint(isMobileViewport && isPortrait);
        };

        handleViewportChange();
        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('orientationchange', handleViewportChange);
        return () => {
            window.removeEventListener('resize', handleViewportChange);
            window.removeEventListener('orientationchange', handleViewportChange);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentSlide, segment.slides.length]);

    if (!isOpen || !segment.slides) return null;

    const totalSlides = segment.slides.length;

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) setCurrentSlide((curr) => curr + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide((curr) => curr - 1);
    };

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <div className="fixed inset-0 z-[100] bg-black">
            <div className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 hover:bg-white/20"
                    >
                        <X size={18} />
                        <span className="uppercase text-xs font-bold tracking-widest font-display">FECHAR</span>
                    </button>
                </div>
                <div className="pointer-events-auto">
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            disabled={isDownloading}
                            className="flex items-center gap-2 bg-brand-yellow text-brand-dark px-4 py-2 rounded-lg font-bold text-sm tracking-wide hover:bg-white transition-colors shadow-lg disabled:opacity-70"
                        >
                            <Download size={16} />
                            Baixar PDF
                        </button>
                    )}
                </div>
            </div>

            {showRotateHint && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                        <RotateCw size={14} />
                        Gire o celular para paisagem (16:9)
                    </div>
                </div>
            )}

            <div className="absolute inset-0 z-50 pointer-events-none">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="pointer-events-auto absolute left-3 top-[40%] md:left-6 md:top-1/2 md:-translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-black/25 flex items-center justify-center text-white hover:bg-white hover:text-brand-dark disabled:opacity-30 disabled:hover:bg-black/25 disabled:hover:text-white transition-all backdrop-blur-sm"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="pointer-events-auto absolute right-3 top-[40%] md:right-6 md:top-1/2 md:-translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/30 bg-white text-brand-dark flex items-center justify-center hover:bg-brand-yellow transition-all disabled:opacity-50 disabled:bg-gray-500"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="w-full h-full relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-full h-full"
                    >
                        {(() => {
                            const slide = segment.slides[currentSlide];
                            return renderPresentationSlide(slide, segment, { toggleChat });
                        })()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between z-50 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <div className="flex items-center gap-4 text-white/50 text-sm font-mono pointer-events-auto">
                    <span className="text-brand-yellow font-bold">{currentSlide + 1}</span>
                    <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-yellow transition-all duration-300"
                            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                        />
                    </div>
                    <span>{totalSlides}</span>
                </div>

                <div />
            </div>

            <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
        </div>
    );
};

export default PresentationOverlay;
