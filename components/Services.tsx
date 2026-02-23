import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 1,
    icon: "fas fa-hard-hat",
    title: "Construção",
    description: "Somos especialistas em construção civil predial e industrial, oferecendo soluções completas, desde o planejamento até a entrega final. Executamos bases e fundações, garantindo projetos sólidos e seguros para edificações de qualquer porte."
  },
  {
    id: 2,
    icon: "fas fa-drafting-compass",
    title: "Projetos",
    description: "Oferecemos uma abordagem integrada no desenvolvimento de projetos, desde a concepção até a entrega dos planos executivos, personalizados para cada cliente. Atuamos com projetos arquitetônicos, estruturais, hidráulicos, sanitários, elétricos, climatização e automação."
  },
  {
    id: 3,
    icon: "fas fa-clipboard-check",
    title: "Gerenciamento de obras",
    description: "O gerenciamento de obras controla todas as etapas para garantir a conclusão dentro do prazo, orçamento e padrões de qualidade. Inclui a administração de recursos materiais, financeiros e humanos, assegurando conformidade com normas legais."
  },
  {
    id: 4,
    icon: "fas fa-tools",
    title: "Instalações",
    description: "Nossa equipe é especializada em projetar e executar instalações para edificações e infraestruturas. Oferecemos soluções completas em instalações elétricas, instalações hidráulicas e sistemas de climatização, garantindo eficiência e qualidade em cada projeto."
  }
];

const Services: React.FC = () => {
  return (
    <section id="servicos" className="py-20 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="max-w-4xl">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Soluções Completas</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">Soluções integradas para o setor industrial</h2>
            <p className="text-gray-600 text-lg leading-relaxed mx-auto">
              Com uma abordagem técnica e integrada, oferecemos serviços especializados em construção, projetos, gerenciamento de obras e instalações, garantindo eficiência, segurança e alto padrão de qualidade para o setor industrial.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-white shadow-sm hover:shadow-xl transition border-t-4 border-transparent hover:border-brand-yellow h-full flex flex-col relative overflow-hidden">

              {/* Image Header if available */}
              {service.image ? (
                <div className="h-56 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              ) : (
                /* Standard Icon Header */
                <div className="pt-8 px-8">
                  <div className="text-5xl text-brand-dark mb-2 group-hover:text-brand-yellow transition duration-300">
                    <i className={service.icon}></i>
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1 pt-6">
                <h3 className="text-xl font-display font-bold text-brand-dark mb-4">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1 text-justify leading-relaxed">{service.description}</p>

                {service.image && (
                  <span className="text-brand-yellow text-xs font-bold uppercase tracking-wider mt-auto group-hover:underline">
                    Saiba Mais <i className="fas fa-arrow-right ml-1"></i>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;