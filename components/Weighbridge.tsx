import React, { useState, useEffect } from 'react';

const carouselImages = [
  "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Logistics/Truck
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Construction/Excavation
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Technical Plan
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Installation
];

const steps = [
  {
    title: "Estudo de Viabilidade",
    description: "Avaliar a necessidade da balança em determinada região e a frequência do tráfego de veículos pesados."
  },
  {
    title: "Escolha do Local",
    description: "O local deve ser de fácil acesso para os veículos e deve ter espaço suficiente para manobras."
  },
  {
    title: "Projeto Técnico",
    description: "Desenvolver um projeto que inclua a estrutura da balança, a instalação elétrica e de sensores, e o sistema de software para controle e monitoramento."
  },
  {
    title: "Escavação e Preparação do Solo",
    description: "O local deve ser preparado, com escavação adequada para a instalação da balança."
  },
  {
    title: "Instalação da Estrutura",
    description: "Montagem da estrutura da balança, fixando as células de carga."
  }
];

const Weighbridge: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">

        {/* Content Side (Right) */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Infraestrutura Logística</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-dark mb-6">
            Balança Rodoviária
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 text-left md:text-justify">
            A construção de uma balança rodoviária é um processo que envolve diversas etapas, desde o planejamento inicial até a instalação e manutenção. A balança rodoviária é um equipamento essencial para o controle de pesos de veículos, especialmente em estradas e rodovias, garantindo que os limites de peso sejam respeitados para evitar danos à infraestrutura e garantir a segurança nas vias.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                <div className="w-8 h-8 flex items-center justify-center bg-brand-light rounded-full text-brand-dark font-bold text-sm group-hover:bg-brand-yellow transition-colors mb-2">
                  {index + 1}
                </div>
                <h4 className="font-bold text-brand-dark text-base mb-1">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#contato" className="flex md:inline-flex justify-center items-center gap-2 border-2 border-brand-dark text-brand-dark px-8 py-3 rounded hover:bg-brand-dark hover:text-white transition font-display uppercase font-bold tracking-wide w-full md:w-auto">
              Solicitar Cotação de Obra <i className="fas fa-file-invoice-dollar"></i>
            </a>
          </div>
        </div>

        {/* Carousel Side (Left) */}
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
                  alt={`Construção de Balança - Etapa ${index + 1}`}
                  className="w-full h-full object-cover rounded-[5px]"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
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
          </div>
          {/* Decorative Element */}
          <div className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 bg-brand-yellow z-0 -z-10 rounded-bl-3xl"></div>
        </div>

      </div>
    </div>
  );
};

export default Weighbridge;