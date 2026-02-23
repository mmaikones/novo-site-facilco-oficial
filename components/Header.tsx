import React, { useState } from 'react';

interface HeaderProps {
  toggleChat: () => void;
}

const sharedShadow = { textShadow: '0 3px 12px rgba(0,0,0,0.18)' };

const Header: React.FC<HeaderProps> = ({ toggleChat }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div className="bg-white/90 backdrop-blur-md text-brand-dark/80 py-2 text-xs border-b border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="sm:hidden w-full text-center whitespace-nowrap overflow-hidden text-ellipsis">
            <span style={sharedShadow}>
              <i className="fas fa-map-marker-alt text-brand-yellow mr-2"></i>
              Rio Claro, SP | Jundiaí, SP | (19) 99622-3433
            </span>
          </div>
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-1 text-center">
            <span style={sharedShadow}><i className="fas fa-map-marker-alt text-brand-yellow mr-2"></i>Matriz: Rio Claro, SP  |  Filial: Jundiaí, SP  |  Atendimento Nacional</span>
            <span style={sharedShadow}><i className="fas fa-envelope text-brand-yellow mr-2"></i>engenharia@facilco.com.br</span>
            <span className="font-bold text-brand-dark inline-flex items-center" style={sharedShadow}>
              <i className="fas fa-phone text-brand-yellow mr-2"></i>(19) 99622-3433
            </span>
            <span className="inline-flex items-center gap-3 text-brand-dark">
              <a href="#" className="hover:text-brand-yellow transition" style={sharedShadow}><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-brand-yellow transition" style={sharedShadow}><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/5519996223433" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition" style={sharedShadow}><i className="fab fa-whatsapp"></i></a>
            </span>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between lg:justify-center">
          <a href="#" className="flex items-center gap-2 mx-auto lg:mx-0">
            <img
              src="/logo.png"
              alt="Facilco Engenharia"
              className="h-16 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            />
          </a>

          <nav className="hidden lg:flex items-center text-brand-dark" style={{ gap: '29px' }}>
            <a href="#home" className="nav-link text-brand-dark hover:text-brand-yellow transition" style={sharedShadow}>Início</a>
            <a href="#catalogo" className="nav-link hover:text-brand-yellow transition" style={sharedShadow}>Catálogo</a>
            <a href="#servicos-categorias" className="nav-link hover:text-brand-yellow transition" style={sharedShadow}>Segmentos</a>
            <a href="#sobre" className="nav-link hover:text-brand-yellow transition" style={sharedShadow}>Empresa</a>
            <button onClick={toggleChat} className="nav-link hover:text-brand-yellow transition flex items-center gap-1" style={sharedShadow}>
              <i className="fas fa-robot text-brand-yellow"></i> Consultoria IA
            </button>
          </nav>

          <div className="hidden lg:flex items-center ml-6">
            <a href="https://wa.me/5519996223433" target="_blank" rel="noreferrer" className="text-green-600 text-3xl hover:scale-110 transition drop-shadow-[0_3px_10px_rgba(0,0,0,0.18)]">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>

          <button className="lg:hidden text-2xl text-brand-dark drop-shadow-[0_3px_10px_rgba(0,0,0,0.18)] absolute right-6" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white/95 backdrop-blur-md text-brand-dark p-4 absolute w-full top-full left-0 border-t border-gray-200 shadow-2xl">
            <a href="#home" className="block py-3 border-b border-gray-200 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Início</a>
            <a href="#catalogo" className="block py-3 border-b border-gray-200 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Catálogo de Produtos</a>
            <a href="#servicos-categorias" className="block py-3 border-b border-gray-200 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Segmentos</a>
            <button
              onClick={() => { toggleChat(); toggleMobileMenu(); }}
              className="block w-full text-left py-3 border-b border-gray-200 hover:text-brand-yellow font-bold"
            >
              <i className="fas fa-robot text-brand-yellow mr-2"></i> Consultor Técnico IA
            </button>
            <a href="#contato" className="block py-3 hover:text-brand-yellow font-bold text-brand-dark" onClick={toggleMobileMenu}>Fale Conosco</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
