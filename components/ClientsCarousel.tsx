import React from 'react';

const clients = [
    { name: "Mercado Livre", logo: "/clients/mercadolivre.png" },
    { name: "GM", logo: "/clients/gm.png" },
    { name: "Petrobras", logo: "/clients/petrobras.png" },
    { name: "Nutrien", logo: "/clients/nutrien.png" },
    { name: "Vale", logo: "/clients/vale.png" }
];

// Duplicate clients for seamless scrolling
const allClients = [...clients, ...clients, ...clients, ...clients];

const ClientsCarousel: React.FC = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                    Empresas que confiam na Facilco
                </span>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients for smooth fade edges */}
                <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                    {allClients.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[180px] md:w-[250px] flex items-center justify-center px-4"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-10 md:h-14 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsCarousel;
