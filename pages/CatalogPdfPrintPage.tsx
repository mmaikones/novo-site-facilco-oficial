import React, { useEffect, useMemo, useState } from 'react';
import { CATALOG_PRODUCTS } from '../data/catalog';
import { CatalogItem } from '../types';

declare global {
    interface Window {
        __CATALOG_PDF_READY__?: boolean;
    }
}

const CATEGORY_ORDER = ['Logística', 'Proteção', 'Trabalho em Altura'] as const;
const PRODUCT_ORDER = [1, 4, 5, 6, 7, 8, 2, 10, 3, 9, 11, 12];
const PRODUCT_ORDER_INDEX = PRODUCT_ORDER.reduce<Record<number, number>>((acc, id, index) => {
    acc[id] = index;
    return acc;
}, {});

const sortProducts = (items: CatalogItem[]) =>
    items.slice().sort((a, b) => {
        const categoryA = CATEGORY_ORDER.indexOf(a.category as (typeof CATEGORY_ORDER)[number]);
        const categoryB = CATEGORY_ORDER.indexOf(b.category as (typeof CATEGORY_ORDER)[number]);
        const resolvedCategoryA = categoryA === -1 ? 999 : categoryA;
        const resolvedCategoryB = categoryB === -1 ? 999 : categoryB;

        if (resolvedCategoryA !== resolvedCategoryB) return resolvedCategoryA - resolvedCategoryB;

        const orderA = PRODUCT_ORDER_INDEX[a.id] ?? 999;
        const orderB = PRODUCT_ORDER_INDEX[b.id] ?? 999;
        if (orderA !== orderB) return orderA - orderB;

        return a.title.localeCompare(b.title, 'pt-BR');
    });

const optimizeImageForPdf = async (src: string): Promise<string | null> =>
    new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            const maxDimension = 1300;
            const quality = 0.68;
            const sourceWidth = image.naturalWidth || image.width;
            const sourceHeight = image.naturalHeight || image.height;
            const ratio = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
            const width = Math.max(1, Math.round(sourceWidth * ratio));
            const height = Math.max(1, Math.round(sourceHeight * ratio));

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(null);
                return;
            }

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);

            try {
                resolve(canvas.toDataURL('image/jpeg', quality));
            } catch {
                resolve(null);
            }
        };
        image.onerror = () => resolve(null);
        image.src = src;
    });

const CatalogPdfPrintPage: React.FC = () => {
    const [optimizedImages, setOptimizedImages] = useState<Record<string, string>>({});
    const grouped = useMemo(() => {
        const ordered = sortProducts(CATALOG_PRODUCTS);
        const map = new Map<string, CatalogItem[]>();

        ordered.forEach((product) => {
            if (!map.has(product.category)) map.set(product.category, []);
            map.get(product.category)?.push(product);
        });

        const categories = [
            ...CATEGORY_ORDER.filter((category) => map.has(category)),
            ...Array.from(map.keys())
                .filter((category) => !CATEGORY_ORDER.includes(category as (typeof CATEGORY_ORDER)[number]))
                .sort((a, b) => a.localeCompare(b, 'pt-BR'))
        ];

        return categories.map((category) => ({
            category,
            products: map.get(category) ?? []
        }));
    }, []);

    useEffect(() => {
        let active = true;

        const prepareImages = async () => {
            const uniqueSources = new Set<string>();

            grouped.forEach(({ products }) => {
                products.forEach((product) => {
                    const images = product.gallery?.length ? product.gallery.map((entry) => entry.src) : [product.image];
                    images.forEach((src) => uniqueSources.add(src));
                });
            });

            const map: Record<string, string> = {};
            for (const src of uniqueSources) {
                const optimized = await optimizeImageForPdf(src);
                map[src] = optimized ?? src;
            }

            if (!active) return;
            setOptimizedImages(map);
            requestAnimationFrame(() => {
                window.__CATALOG_PDF_READY__ = true;
            });
        };

        window.__CATALOG_PDF_READY__ = false;
        prepareImages();

        return () => {
            active = false;
        };
    }, [grouped]);

    return (
        <div className="pdf-root">
            <style>{`
                :root {
                    --pdf-dark: #171717;
                    --pdf-gray: #5f6470;
                    --pdf-light: #f6f8fb;
                    --pdf-line: #e5e7eb;
                    --pdf-yellow: #ffb400;
                }

                * { box-sizing: border-box; }

                body {
                    margin: 0;
                    font-family: 'Barlow', 'Segoe UI', Arial, sans-serif;
                    color: var(--pdf-dark);
                    background: #ffffff;
                }

                .pdf-root {
                    width: 100%;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 28px 26px 30px;
                }

                .pdf-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 2px solid var(--pdf-line);
                    padding-bottom: 14px;
                    margin-bottom: 18px;
                }

                .pdf-brand {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .pdf-brand img {
                    height: 40px;
                    width: auto;
                    object-fit: contain;
                }

                .pdf-title {
                    margin: 0;
                    font-size: 26px;
                    line-height: 1.1;
                    letter-spacing: 0.1px;
                }

                .pdf-subtitle {
                    margin: 4px 0 0;
                    font-size: 12px;
                    color: var(--pdf-gray);
                }

                .pdf-meta {
                    text-align: right;
                    font-size: 11px;
                    color: var(--pdf-gray);
                }

                .category-block {
                    margin: 20px 0 0;
                }

                .category-label {
                    margin: 0 0 12px;
                    padding: 6px 10px;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    background: #fff7e3;
                    border: 1px solid #ffe0a1;
                    border-radius: 8px;
                    break-after: avoid-page;
                    page-break-after: avoid;
                }

                .product-block {
                    margin: 0 0 14px;
                    padding: 10px;
                    border: 1px solid var(--pdf-line);
                    border-radius: 10px;
                    background: #fff;
                    break-inside: avoid;
                    page-break-inside: avoid;
                }

                .product-title {
                    margin: 0 0 8px;
                    font-size: 16px;
                    line-height: 1.2;
                }

                .product-images {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 8px;
                }

                .image-frame {
                    background: var(--pdf-light);
                    border: 1px solid var(--pdf-line);
                    border-radius: 8px;
                    overflow: hidden;
                    aspect-ratio: 4 / 3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    display: block;
                }

                @media print {
                    @page {
                        size: A4;
                        margin: 10mm;
                    }

                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    .pdf-root {
                        max-width: none;
                        margin: 0;
                        padding: 0;
                    }
                }
            `}</style>

            <header className="pdf-header">
                <div className="pdf-brand">
                    <img src="/logo.png" alt="Facilco" />
                    <div>
                        <h1 className="pdf-title">Catálogo de Produtos Facilco</h1>
                        <p className="pdf-subtitle">Produtos organizados por categoria e por item</p>
                    </div>
                </div>
                <div className="pdf-meta">
                    <div>Facilco Engenharia</div>
                    <div>{new Date().toLocaleDateString('pt-BR')}</div>
                </div>
            </header>

            {grouped.map(({ category, products }) => (
                <section key={category} className="category-block">
                    <h2 className="category-label">{category}</h2>

                    {products.map((product) => {
                        const images = product.gallery?.length ? product.gallery.map((entry) => entry.src) : [product.image];

                        return (
                            <article key={product.id} className="product-block">
                                <h3 className="product-title">{product.title}</h3>
                                <div className="product-images">
                                    {images.map((src, index) => (
                                        <div className="image-frame" key={`${product.id}-${index}`}>
                                            <img src={optimizedImages[src] ?? src} alt={product.title} loading="eager" />
                                        </div>
                                    ))}
                                </div>
                            </article>
                        );
                    })}
                </section>
            ))}
        </div>
    );
};

export default CatalogPdfPrintPage;
