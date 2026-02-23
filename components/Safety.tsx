import React, { useState, useEffect } from 'react';

const carouselImages = [
  "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Trabalhador em altura
  "https://plus.unsplash.com/premium_photo-1661962360526-724575bf4321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Telhado industrial
  "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Construção
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"  // Industrial safety
];

const safetyTypes = [
  {
    title: "Linha de Vida Horizontal",
    description: "Usada em espaços elevados horizontais, como telhados e pontes; permite movimentação segura ao longo do local."
  },
  {
    title: "Linha de Vida Vertical",
    description: "Aplicada em estruturas verticais, como torres e silos; garante segurança ao subir ou descer."
  },
  {
    title: "Linha de Vida Flexível e Rígida",
    description: "Pode ser de cabos ou cordas (flexível) ou de barras/tubos de aço (rígida), oferecendo diferentes resistências."
  },
  {
    title: "Linha de Vida Móvel",
    description: "Projetada para mover-se com o trabalhador, proporcionando maior mobilidade e liberdade de movimento."
  }
];

const Safety: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Content Side */}
        <div className="lg:w-1/2">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Segurança para trabalhos verticais</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
            Linha de vida em segurança
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 text-justify">
            A linha de vida é um sistema de segurança essencial para proteger trabalhadores contra quedas em atividades de altura, como construção civil e manutenção de telhados. Composta por cabos ou cordas fixados a pontos de ancoragem seguros, permite que o trabalhador se conecte usando cintos ou talabartes, garantindo sua integridade física em ambientes de risco.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-yellow transition group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-yellow mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <i className={`fas ${index === 0 ? 'fa-arrows-alt-h' : index === 1 ? 'fa-arrows-alt-v' : index === 2 ? 'fa-link' : 'fa-running'} text-lg`}></i>
                </div>
                <h4 className="font-bold text-brand-dark text-base mb-1">{type.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href="#contato" className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded hover:bg-brand-yellow hover:text-brand-dark transition font-display uppercase font-bold tracking-wide shadow-lg">
              Solicitar Projeto NR-35 <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        {/* Carousel Side */}
        <div className="lg:w-1/2 w-full">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square bg-gray-200 border-4 border-white">
            {carouselImages.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <img
                  src={img}
                  alt={`Linha de Vida - Imagem ${index + 1}`}
                  className="w-full h-full object-cover rounded-[5px]"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
        </div>

      </div>
    </div>
  );
};

export default Safety;