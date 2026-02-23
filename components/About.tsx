import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Sobre Nós</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">A Facilco Engenharia</h2>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-justify text-lg">
            A Facilco Engenharia é uma empresa especializada em Construção Civil voltada para o setor industrial, oferecendo soluções completas para infraestrutura e estruturação de instalações.
          </p>
          <p className="text-gray-600 mb-10 leading-relaxed text-justify text-lg">
            Com abordagem técnica e integrada, atuamos em construção, projetos, gerenciamento de obras e instalações, incluindo projetos arquitetônicos, estruturais, hidráulicos, sanitários, elétricos, climatização, automação e soluções de proteção industrial para segurança e eficiência operacional.
          </p>
          
          <div
            className="bg-brand-light p-8 rounded-lg border-l-4 border-brand-yellow shadow-sm hover:shadow-md transition"
            style={{ fontFamily: 'Lato, Barlow, sans-serif', fontWeight: 500 }}
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Construção civil predial e industrial, com execução de bases e fundações</span>
                </li>
                <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Projetos executivos: arquitetônico, estrutural, hidráulico, sanitário, elétrico, climatização e automação</span>
                </li>
                <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Gerenciamento de obras com controle de prazo, orçamento, recursos e conformidade legal</span>
                </li>
                 <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Projetos especiais em engenharia: AVCB, NR-10, NR-12, NR-13, NR-20, NR-33 e NR-35</span>
                </li>
                <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Missão: fortalecer empresas com soluções inteligentes e integradas</span>
                </li>
                <li className="flex items-center text-brand-dark font-medium">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Valores: transparência, ética, respeito, qualidade e segurança</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
