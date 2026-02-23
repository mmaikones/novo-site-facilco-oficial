import React, { useState, useEffect } from 'react';

const logisticsImages = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Dock
    "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Loading Bay
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Warehouse door
];

const DockSolutions: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === logisticsImages.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                {/* Carousel Side (Left - Alternated) */}
                <div className="lg:w-1/2 w-full order-1">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-gray-200 border-4 border-white">
                        {logisticsImages.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img
                                    src={img}
                                    alt={`Soluções para Docas ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded mb-2">Alta Performance</div>
                                    <p className="text-sm font-light">Agilidade e vedação para operações logísticas.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Side (Right) */}
                <div className="lg:w-1/2 w-full order-2">
                    <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">
                        Logística e Operações
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                        Soluções para Docas
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 text-left md:text-justify">
                        Maximize a eficiência da sua cadeia logística com equipamentos de ponta. Oferecemos soluções completas para carga e descarga seguras, rápidas e protegidas contra intempéries.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <i className="fas fa-door-open text-2xl text-brand-yellow mb-3 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="font-bold text-brand-dark mb-1">Portas Rápidas</h4>
                            <p className="text-xs text-gray-500">Abertura automática de alta velocidade para controle térmico e de pragas.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <i className="fas fa-warehouse text-2xl text-brand-yellow mb-3 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="font-bold text-brand-dark mb-1">Abrigos de Doca</h4>
                            <p className="text-xs text-gray-500">Vedação perfeita entre o caminhão e o armazém.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <i className="fas fa-level-up-alt text-2xl text-brand-yellow mb-3 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="font-bold text-brand-dark mb-1">Niveladoras</h4>
                            <p className="text-xs text-gray-500">Hidráulicas e mecânicas para compensar desníveis.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <i className="fas fa-traffic-light text-2xl text-brand-yellow mb-3 group-hover:scale-110 transition-transform block"></i>
                            <h4 className="font-bold text-brand-dark mb-1">Sinalização</h4>
                            <p className="text-xs text-gray-500">Semáforos e calços para evitar acidentes na doca.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DockSolutions;
