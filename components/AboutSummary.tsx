import React from 'react';
import { Building2, Users, MapPinned } from 'lucide-react';

const stats = [
  {
    icon: Building2,
    title: '15+ anos',
    subtitle: 'de experiência em engenharia'
  },
  {
    icon: Users,
    title: 'Equipe especializada',
    subtitle: 'engenheiros e técnicos dedicados'
  },
  {
    icon: MapPinned,
    title: 'Experiência nacional',
    subtitle: 'atuação em múltiplos segmentos'
  }
];

const AboutSummary: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] p-6 md:p-8">
          <p className="text-brand-yellow text-xs md:text-sm font-bold uppercase tracking-widest mb-3">Sobre a Facilco</p>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-brand-dark mb-3">
            Engenharia aplicada com foco em resultado e segurança
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            Atendemos operações industriais, logísticas e obras de infraestrutura com gestão técnica completa, do projeto à entrega.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-5">
                  <div className="w-10 h-10 rounded-lg bg-brand-dark text-brand-yellow flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-brand-dark font-bold text-lg md:text-xl">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
