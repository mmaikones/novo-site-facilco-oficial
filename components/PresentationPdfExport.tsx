import React, { forwardRef } from 'react';
import { renderPresentationSlide } from './PresentationSlides';

const WHATSAPP_LINK = 'https://wa.me/5519996223433';

interface PresentationPdfExportProps {
    segment: any;
}

const PresentationPdfExport = forwardRef<HTMLDivElement, PresentationPdfExportProps>(({ segment }, ref) => {
    const slides = segment?.slides ?? [];

    return (
        <div ref={ref} style={{ position: 'fixed', left: '-9999px', top: 0 }}>
            {slides.map((slide: any, index: number) => (
                <div key={`${segment.id}-pdf-${index}`} className="pdf-slide" data-pdf-slide>
                    {renderPresentationSlide(slide, segment, { exportMode: true })}
                    <a
                        href={WHATSAPP_LINK}
                        data-contact-button
                        className="pdf-contact-button"
                    >
                        Falar no WhatsApp
                    </a>
                </div>
            ))}
        </div>
    );
});

PresentationPdfExport.displayName = 'PresentationPdfExport';

export default PresentationPdfExport;
