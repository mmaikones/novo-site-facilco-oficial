import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SEGMENTS } from '../data/segments';

const DISPLAY_SEGMENT_IDS = [
  'templos-religiosos',
  'logistica',
  'alimenticia',
  'farmaceutica',
  'quimica',
  'agroindustria',
  'rodovias',
  'automotivo',
  'edificacoes'
];

const MOBILE_LAYOUT_CLASSES: Record<string, string> = {
  'templos-religiosos': 'col-span-2 min-h-[190px] lg:col-span-1 lg:min-h-[220px]',
  'logistica': 'col-span-1 min-h-[145px] lg:min-h-[220px]',
  'alimenticia': 'col-span-1 min-h-[145px] lg:min-h-[220px]',
  'farmaceutica': 'col-span-1 min-h-[145px] lg:min-h-[220px]',
  'quimica': 'col-span-1 min-h-[145px] lg:min-h-[220px]',
  'agroindustria': 'col-span-2 min-h-[175px] lg:col-span-1 lg:min-h-[220px]',
  'edificacoes': 'col-span-2 min-h-[175px] lg:col-span-1 lg:min-h-[220px]',
  'rodovias': 'col-span-1 min-h-[145px] lg:min-h-[220px]',
  'automotivo': 'col-span-1 min-h-[145px] lg:min-h-[220px]'
};

const AISegmentSelector: React.FC = () => {
  const navigate = useNavigate();

  const orderedSegments = useMemo(
    () =>
      DISPLAY_SEGMENT_IDS.map((id) => SEGMENTS.find((segment) => segment.id === id)).filter(
        (segment): segment is NonNullable<(typeof SEGMENTS)[number]> => Boolean(segment)
      ),
    []
  );

  return (
    <section id="servicos-categorias" className="relative" aria-label="Seletor inteligente de segmentos">
      <div id="seletor-ia" className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-6xl mx-auto rounded-3xl border border-gray-200 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] overflow-hidden"
        >
          <div className="px-5 py-6 md:px-8 md:py-8 border-b border-gray-100 bg-gradient-to-r from-white via-white to-gray-50 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl md:text-3xl font-display font-bold text-brand-dark">
                Escolha o seu segmento de atuação
              </h2>
            </div>
          </div>

          <div className="p-5 md:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {orderedSegments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => navigate(segment.path)}
                  className={`group relative overflow-hidden w-full text-left rounded-2xl border border-gray-200 bg-brand-dark transition-all duration-300 p-0 shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${MOBILE_LAYOUT_CLASSES[segment.id] ?? 'col-span-1 min-h-[145px] lg:min-h-[220px]'}`}
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <img
                      src={segment.details.heroImage}
                      alt={segment.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/85 group-hover:from-black/35 group-hover:via-black/50 group-hover:to-black/80 transition-colors duration-300"></div>
                  </div>

                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-5 pointer-events-none">
                    <h3 className="text-lg font-bold text-white drop-shadow">{segment.title}</h3>
                    <p className="mt-1 text-xs md:text-sm text-gray-100 line-clamp-2 drop-shadow">
                      {segment.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISegmentSelector;
