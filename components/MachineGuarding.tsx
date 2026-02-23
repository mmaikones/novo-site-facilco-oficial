import React, { useState, useEffect } from 'react';

const machineGuardingImages = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Industrial Robot/Automation
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Safety barrier
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Factory machinery
];

const MachineGuarding: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === machineGuardingImages.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                {/* Content Side (Left) */}
                <div className="lg:w-1/2 w-full order-2 lg:order-1">
                    <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">
                        Segurança de Máquinas e Equipamentos
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                        Adequação NR-12
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8 text-left md:text-justify">
                        Garantimos a segurança total de suas máquinas com projetos completos de adequação à NR-12. Desde a análise de risco inicial até a instalação de carenagens, sensores de segurança e intertravamentos.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-yellow mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <i className="fas fa-shield-alt text-lg"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark text-base mb-1">Proteções Físicas</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">Grades, enclausuramentos e barreiras fixas.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-yellow mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <i className="fas fa-microchip text-lg"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark text-base mb-1">Automação Segura</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">Relés, CLPs de segurança e cortinas de luz.</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-yellow mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                <i className="fas fa-file-signature text-lg"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark text-base mb-1">Laudos Técnicos</h4>
                            <p className="text-gray-500 text-xs leading-relaxed">Documentação completa e apreciação de risco.</p>
                        </div>
                    </div>
                </div>

                {/* Carousel Side (Right) */}
                <div className="lg:w-1/2 w-full order-1 lg:order-2">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-gray-200 border-4 border-white">
                        {machineGuardingImages.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <img
                                    src={img}
                                    alt={`Adequação NR-12 ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="inline-block px-3 py-1 bg-brand-yellow text-brand-dark text-xs font-bold uppercase rounded mb-2">Compliance</div>
                                    <p className="text-sm font-light">Proteção integral para operadores e equipamentos.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MachineGuarding;
