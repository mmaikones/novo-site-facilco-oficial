import React, { useState, useEffect } from 'react';

const carouselImages = [
  "https://images.unsplash.com/photo-1565514020176-db79234dd723?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Factory Interior/Piping
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Industrial Construction
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Automation/Electrical
  "https://images.unsplash.com/photo-1535198276662-7945db844fb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Maintenance
];

const servicesList = [
  "Construção, reforma e manutenção industrial em grande escala",
  "Projetos arquitetônicos, instalações elétricas, hidrossanitários, climatização e automação",
  "Pavimentação e terraplenagem",
  "Obras de segurança e acessibilidade",
  "Reformas, expansões e Gerenciamento de obras",
  "Projetos Especiais (AVCB, NR-10, NR-12, NR-13, NR-20, NR-33 e NR-35)",
  "Manutenção em máquinas, equipamentos e caldeiraria",
  "Paradas de fábricas"
];

const IndustrialProjects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

        {/* Content Side (Left) */}
        <div className="lg:w-1/2 w-full order-2 lg:order-1">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">
            Inovação e qualidade para atender o setor Industrial
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-6">
            Projetos para Fábricas e Indústrias
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 text-left md:text-justify">
            Com experiência e compromisso, entregamos projetos de qualidade, executados com precisão e eficiência, para atender às demandas do setor industrial com excelência. Atuamos desde a fundação até a manutenção complexa de ativos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {servicesList.map((service, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-brand-yellow flex items-start gap-3">
                <i className="fas fa-check text-brand-dark mt-1 text-xs flex-shrink-0"></i>
                <p className="text-brand-dark font-medium text-xs leading-tight">{service}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#contato" className="flex md:inline-flex justify-center items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded hover:bg-brand-yellow hover:text-brand-dark transition font-display uppercase font-bold tracking-wide shadow-lg w-full md:w-auto">
              Agendar Visita Técnica <i className="fas fa-calendar-check"></i>
            </a>
          </div>
        </div>

        {/* Carousel Side (Right) */}
        <div className="lg:w-1/2 w-full order-1 lg:order-2">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-gray-200 border-4 border-white">
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <img
                  src={img}
                  alt={`Projeto Industrial ${index + 1}`}
                  className="w-full h-full object-cover rounded-[5px]"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent"></div>
              </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-brand-yellow' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-brand-yellow text-brand-dark px-3 py-1 md:px-4 md:py-2 rounded font-bold uppercase text-[10px] md:text-xs shadow-lg z-20">
              Turnkey & Manutenção
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndustrialProjects;