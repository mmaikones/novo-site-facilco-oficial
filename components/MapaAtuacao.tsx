import React, { useEffect } from 'react';

const MapaAtuacao: React.FC = () => {
    const statePins = [
        { uf: 'AC', top: '58%', left: '25%' },
        { uf: 'AL', top: '50%', left: '70%' },
        { uf: 'AP', top: '29%', left: '57%' },
        { uf: 'AM', top: '46%', left: '32%' },
        { uf: 'BA', top: '54%', left: '63%' },
        { uf: 'CE', top: '42%', left: '68%' },
        { uf: 'DF', top: '62%', left: '52%' },
        { uf: 'ES', top: '65%', left: '66%' },
        { uf: 'GO', top: '62%', left: '50%' },
        { uf: 'MA', top: '43%', left: '57%' },
        { uf: 'MT', top: '59%', left: '41%' },
        { uf: 'MS', top: '70%', left: '39%' },
        { uf: 'MG', top: '63%', left: '60%' },
        { uf: 'PA', top: '40%', left: '49%' },
        { uf: 'PB', top: '44%', left: '72%' },
        { uf: 'PR', top: '76%', left: '53%' },
        { uf: 'PE', top: '46%', left: '69%' },
        { uf: 'PI', top: '44%', left: '62%' },
        { uf: 'RJ', top: '68%', left: '64%' },
        { uf: 'RN', top: '40%', left: '73%' },
        { uf: 'RS', top: '89%', left: '49%' },
        { uf: 'RO', top: '56%', left: '30%' },
        { uf: 'RR', top: '27%', left: '34%' },
        { uf: 'SC', top: '82%', left: '52%' },
        { uf: 'SP', top: '69%', left: '57%' },
        { uf: 'SE', top: '49%', left: '68%' },
        { uf: 'TO', top: '50%', left: '48%' },
    ];

    useEffect(() => {
        const pins = document.querySelectorAll('.pin');
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const target = entry.target as HTMLElement;
                        target.style.opacity = '1';
                        target.style.transform = 'translate(-50%, -100%) scale(1)';
                    }, index * 100);
                }
            });
        });

        pins.forEach((pin) => {
            const element = pin as HTMLElement;
            element.style.opacity = '0';
            element.style.transform = 'translate(-50%, -100%) scale(0)';
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section id="mapa-atuacao">
            <div className="container mx-auto px-4">
                <div className="mapa-split">
                    <div className="mapa-copy">
                        <span className="section-tag">Nossa presença nacional</span>
                        <h2>Atuação em todo o Brasil</h2>
                        <p className="subtitle">
                            Obras realizadas em diversos estados, levando engenharia de excelência
                            para todo o país.
                        </p>
                    </div>

                    <div className="mapa-container">
                        <div className="mapa-brasil-placeholder">
                            <img src="/assets/mapa-brasil-nano.png" alt="Mapa do Brasil" />

                            {statePins.map((pin) => (
                                <div key={pin.uf} className="pin" style={{ top: pin.top, left: pin.left }} data-uf={pin.uf}>
                                    <span className="pin-icon" aria-hidden="true"></span>
                                    <span className="pin-label">{pin.uf}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MapaAtuacao;
