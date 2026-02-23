import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-[600px] md:h-[750px] flex items-center relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero-cinematic.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-02.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-white mx-auto text-center">
          <div className="flex items-center gap-4 mb-4 animate-bounce justify-center">
            <span className="uppercase tracking-widest text-sm font-bold text-brand-yellow">Soluções para Indústria</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8 drop-shadow-lg">
            ENGENHARIA E <br />
            <span className="text-brand-yellow">PROTEÇÃO INDUSTRIAL</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md mx-auto">
            Especialistas em construção civil, adequação normativa (NRs) e infraestrutura de segurança para grandes operações logísticas e fabris.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
