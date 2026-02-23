import React, { forwardRef } from 'react';
import { CatalogItem } from '../types';

const WHATSAPP_LINK = 'https://wa.me/5519996223433';

interface CatalogPdfExportProps {
    products: CatalogItem[];
    categories: string[];
    title?: string;
}

const chunkArray = <T,>(items: T[], size: number) => {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        result.push(items.slice(i, i + size));
    }
    return result;
};

const CatalogPdfExport = forwardRef<HTMLDivElement, CatalogPdfExportProps>(
    ({ products, categories, title = 'Catálogo de Produtos Facilco' }, ref) => {
        const usableCategories = categories.filter((category) => category !== 'Todos');

        return (
            <div ref={ref} style={{ position: 'fixed', left: '-9999px', top: 0 }}>
                {usableCategories.map((category) => {
                    const categoryItems = products.filter((item) => item.category === category);
                    const pages = chunkArray(categoryItems, 6);

                    return pages.map((pageItems, pageIndex) => (
                        <div
                            key={`${category}-${pageIndex}`}
                            className="pdf-slide"
                            data-pdf-slide
                        >
                            <div className="w-full h-full bg-white p-12 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <img src="/logo.png" alt="Facilco" className="h-12 w-auto object-contain" />
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold">Catálogo Completo</p>
                                            <h2 className="text-2xl font-bold text-brand-dark">{title}</h2>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Categoria</p>
                                        <p className="text-lg font-bold text-brand-dark">{category}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 flex-1">
                                    {pageItems.map((item) => (
                                        <div key={item.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                            <div className="aspect-[2/3] bg-gray-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold mb-2">{item.category}</p>
                                                <h3 className="text-sm font-bold text-brand-dark mb-2">{item.title}</h3>
                                                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <a href={WHATSAPP_LINK} className="pdf-contact-button" data-contact-button>
                                    Falar no WhatsApp
                                </a>
                            </div>
                        </div>
                    ));
                })}
            </div>
        );
    }
);

CatalogPdfExport.displayName = 'CatalogPdfExport';

export default CatalogPdfExport;
