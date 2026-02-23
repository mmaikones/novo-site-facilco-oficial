import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEGMENTS } from '../data/segments';

// --- Main Category Grid Component ---
const ServiceCategories: React.FC = () => {
    // We no longer need state for selectedId since we are navigating to pages

    return (
        <section className="py-24 bg-gray-50" id="servicos-categorias">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-3 block">
                        NOSSAS ESPECIALIDADES
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                        Setores de Atuação
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Explore nossas divisões especializadas. Clique em um card para acessar o portal exclusivo de cada serviço.
                    </p>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {[
                        'templos-religiosos',
                        'logistica',
                        'alimenticia',
                        'farmaceutica',
                        'quimica',
                        'agroindustria',
                        'edificacoes',
                        'rodovias',
                        'automotivo'
                    ]
                        .map((id) => SEGMENTS.find((segment) => segment.id === id))
                        .filter((segment): segment is NonNullable<typeof segment> => Boolean(segment))
                        .map((category) => (
                        <Link
                            to={category.path}
                            key={category.id}
                            className="block"
                        >
                            <motion.div
                                layoutId={`card-${category.id}`}
                                className="group cursor-pointer rounded-2xl relative overflow-hidden h-[260px] sm:h-[320px] md:h-[420px] lg:h-[450px] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* Background Cover Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={category.details.heroImage}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                                </div>

                                {/* Card Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center sm:items-start sm:text-left">
                                    {/* Floating Icon Top Right */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-brand-yellow group-hover:text-brand-dark group-hover:border-brand-yellow transition-all duration-300">
                                        <category.icon size={24} />
                                    </div>

                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
                                        <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider mb-2 block">
                                            {category.cardBadge ?? category.subtitle}
                                        </span>
                                        <h3 className="text-3xl font-display font-bold text-white mb-3">
                                            {category.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 leading-relaxed">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center justify-center sm:justify-start text-white font-bold text-sm tracking-wide gap-2 group-hover:gap-4 transition-all duration-300">
                                            ACESSAR
                                            <ArrowRight size={16} className="text-brand-yellow" />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Border Glow */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-yellow/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceCategories;
