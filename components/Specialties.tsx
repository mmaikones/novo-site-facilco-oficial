import React, { useState, useEffect } from 'react';

interface SpecialtyItem {
  title: string;
  image?: string;
  images?: string[];
}

const specialties: SpecialtyItem[] = [
  {
    title: "Sinalização e sensores",
    image: "/sinalizacao-sensores.png"
  },
  {
    title: "Delimitadores",
    image: "/delimitadores.jpg"
  },
  {
    title: "Escada marinheiro",
    images: [
      "/escada-marinheiro-1.jpg",
      "/escada-marinheiro-2.png"
    ]
  }
];

const Carousel: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="w-full h-full relative group-hover:scale-110 transition duration-700">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${title} - Imagem ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  );
};

const Specialties: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Alta Performance</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
            Especialistas em proteção e automação industrial
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Desenvolvemos sistemas e equipamentos especializados para segurança e eficiência operacional em ambientes industriais e logísticos. Desde sinalização inteligente até estruturas de proteção, nossos projetos atendem às normas técnicas e garantem conformidade legal para sua operação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] mb-4">
                {item.images ? (
                  <Carousel images={item.images} title={item.title} />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>

                {/* Title overlay for mobile/aesthetic or simple bottom text */}
                <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                  <div className="w-10 h-1 bg-brand-yellow mb-2 transform origin-left group-hover:scale-x-150 transition duration-300"></div>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-dark group-hover:text-brand-yellow transition-colors uppercase tracking-wide">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;