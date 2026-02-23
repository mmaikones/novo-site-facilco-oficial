import React from 'react';

interface WhereWeAreProps {
    simplifiedFilial?: boolean;
    hideContactCard?: boolean;
}

const WhereWeAre: React.FC<WhereWeAreProps> = ({ simplifiedFilial = false, hideContactCard = false }) => {
    return (
        <section id="onde-estamos" className="relative py-20">
            <div className="absolute inset-0">
                <img src="/hero-cinematic.png" alt="Onde Estamos" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/80" />
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Onde Estamos</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Matriz e Filial</h2>
                </div>

                <div className="max-w-5xl mx-auto mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-center">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Matriz - Rio Claro/SP</h3>
                            <p className="text-white/85">R. Dr. Elói Chaves, 3412</p>
                            <p className="text-white/85">Rio Claro, SP</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">Filial - Jundiaí/SP</h3>
                            <p className="text-white/85">Maxime Office Tower</p>
                            <p className="text-white/85">Av. 9 de Julho, 3575</p>
                            <p className="text-white/85">Salas 1407/1408 - 14º andar</p>
                            {!simplifiedFilial && (
                                <>
                                    <p className="text-white/85">Anhangabaú - Jundiaí/SP</p>
                                    <p className="text-white/85">CEP: 13208-056</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {!hideContactCard && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-brand-dark/80 border border-white/10 rounded-2xl px-8 py-6">
                        <div className="text-white">
                            <p className="text-lg font-bold">Contatos</p>
                            <p className="text-white/80">engenharia@facilco.com.br</p>
                            <p className="text-white/80">(19) 99622-3433</p>
                        </div>
                        <a
                            href="https://wa.me/5519996223433"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-brand-yellow text-brand-dark font-bold px-6 py-3 rounded-lg hover:bg-white transition-all shadow-xl"
                        >
                            Falar no WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default WhereWeAre;
