import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PresentationSlide } from '../data/segments';

const SlideCover = ({
    slide,
    icon: Icon,
    exportMode = false
}: {
    slide: PresentationSlide;
    icon: any;
    exportMode?: boolean;
}) => {
    if (exportMode) {
        return (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-900">
                <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-yellow/90 p-4 rounded-full text-brand-dark backdrop-blur-sm shadow-xl">
                            <Icon size={48} />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight drop-shadow-lg">
                        {slide.title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md">
                        {slide.subtitle}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gray-900">
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-brand-yellow/90 p-4 rounded-full text-brand-dark backdrop-blur-sm shadow-xl">
                        <Icon size={48} />
                    </div>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display font-bold text-white mb-6 uppercase tracking-tight drop-shadow-lg"
                >
                    {slide.title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-3xl text-white/90 font-light drop-shadow-md"
                >
                    {slide.subtitle}
                </motion.p>
            </div>
        </div>
    );
};

const SlideIntro = ({ slide }: { slide: PresentationSlide }) => (
    <div className="w-full h-full flex flex-col md:flex-row bg-white">
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/20" />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 bg-white text-brand-dark overflow-y-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-brand-dark font-display">{slide.title}</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
                {slide.content}
            </p>
            {slide.stats && (
                <div className="grid grid-cols-3 gap-6">
                    {slide.stats.map((stat, idx) => (
                        <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                            <span className="block text-2xl md:text-3xl font-bold text-brand-yellow mb-1">{stat.value}</span>
                            <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const SlideList = ({
    slide,
    type,
    exportMode = false
}: {
    slide: PresentationSlide;
    type: 'challenge' | 'solution';
    exportMode?: boolean;
}) => {
    const isChallenge = type === 'challenge';
    const bgClass = isChallenge ? 'bg-gray-100' : 'bg-brand-dark';
    const textClass = isChallenge ? 'text-brand-dark' : 'text-white';

    return (
        <div className={`w-full h-full flex flex-col md:flex-row ${bgClass} ${textClass}`}>
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-20 order-2 md:order-1 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                    <span className={`text-sm font-bold uppercase tracking-widest px-3 py-1 rounded border ${isChallenge ? 'border-red-500 text-red-600' : 'border-brand-yellow text-brand-yellow'}`}>
                        {isChallenge ? 'DESAFIOS' : 'SOLUÇÃO FACILCO'}
                    </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-display">{slide.title}</h2>
                <p className={`text-lg mb-10 ${isChallenge ? 'text-gray-600' : 'text-white/80'}`}>{slide.content}</p>

                <ul className="space-y-4">
                    {slide.bullets?.map((bullet, idx) => {
                        if (exportMode) {
                            return (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className={`mt-1 min-w-6 min-h-6 w-6 h-6 rounded-full flex items-center justify-center ${isChallenge ? 'bg-red-100 text-red-600' : 'bg-brand-yellow text-brand-dark'}`}>
                                        {isChallenge ? '!' : <CheckCircle size={14} />}
                                    </div>
                                    <span className={`text-lg ${isChallenge ? 'text-gray-700' : 'text-gray-200'}`}>{bullet}</span>
                                </li>
                            );
                        }

                        return (
                            <motion.li
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                className="flex items-start gap-4"
                            >
                                <div className={`mt-1 min-w-6 min-h-6 w-6 h-6 rounded-full flex items-center justify-center ${isChallenge ? 'bg-red-100 text-red-600' : 'bg-brand-yellow text-brand-dark'}`}>
                                    {isChallenge ? '!' : <CheckCircle size={14} />}
                                </div>
                                <span className={`text-lg ${isChallenge ? 'text-gray-700' : 'text-gray-200'}`}>{bullet}</span>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-full relative order-1 md:order-2">
                <img src={slide.image} alt="Visual" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

const SlideSpecs = ({ slide }: { slide: PresentationSlide }) => (
    <div className="w-full h-full bg-gray-50 text-brand-dark flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 h-full overflow-y-auto p-8 md:p-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-4 block">Construção Civil Aplicada</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">{slide.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{slide.content}</p>

            {slide.bullets && slide.bullets.length > 0 && (
                <ul className="space-y-3 mb-10">
                    {slide.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm">
                            <CheckCircle size={18} className="text-brand-yellow mt-0.5" />
                            <span className="text-gray-700">{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}

            {slide.stats && slide.stats.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {slide.stats.map((stat, idx) => (
                        <div key={idx} className="bg-brand-dark rounded-xl p-4 text-center shadow-lg">
                            <span className="text-brand-yellow text-2xl font-bold block">{stat.value}</span>
                            <span className="text-white/70 text-xs uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="w-full md:w-2/5 h-72 md:h-full relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
        </div>
    </div>
);

const SlideGallery = ({ slide }: { slide: PresentationSlide }) => (
    <div className="w-full h-full bg-black flex flex-col justify-center p-8 md:p-12 overflow-y-auto">
        <div className="text-center mb-10 flex-shrink-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">{slide.title}</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">{slide.content}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[60vh]">
            {slide.galleryImages?.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-2xl h-64 md:h-full w-full">
                    <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${idx}`} />
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors" />
                </div>
            ))}
        </div>
    </div>
);

const SlideCTA = ({ slide, toggleChat }: { slide: PresentationSlide; toggleChat?: () => void }) => (
    <div className="w-full h-full relative flex items-center justify-center">
        <img src={slide.image} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-dark/90" />
        <div className="relative z-10 text-center max-w-4xl px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-display">{slide.title}</h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12">{slide.content}</p>
            {toggleChat && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button
                        onClick={toggleChat}
                        className="bg-brand-yellow text-brand-dark font-bold text-xl py-5 px-12 rounded-lg hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl flex items-center gap-3"
                        style={{ borderRadius: '6px' }}
                    >
                        Falar com um Consultor
                        <ArrowRight />
                    </button>
                </div>
            )}
        </div>
    </div>
);

export const renderPresentationSlide = (
    slide: PresentationSlide,
    segment: any,
    options?: { exportMode?: boolean; toggleChat?: () => void }
) => {
    const exportMode = options?.exportMode ?? false;
    const toggleChat = options?.toggleChat;

    switch (slide.type) {
        case 'cover':
            return <SlideCover slide={slide} icon={segment.icon} exportMode={exportMode} />;
        case 'intro':
            return <SlideIntro slide={slide} />;
        case 'challenge':
            return <SlideList slide={slide} type="challenge" exportMode={exportMode} />;
        case 'solution':
            return <SlideList slide={slide} type="solution" exportMode={exportMode} />;
        case 'gallery':
            return <SlideGallery slide={slide} />;
        case 'specs':
            return <SlideSpecs slide={slide} />;
        case 'cta':
            return <SlideCTA slide={slide} toggleChat={toggleChat} />;
        default:
            return <SlideIntro slide={slide} />;
    }
};
