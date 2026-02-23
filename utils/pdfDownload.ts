import { PresentationSlide } from '../data/segments';
import { CatalogItem, CatalogImage } from '../types';

type LoadedImage = {
    dataUrl: string;
    width: number;
    height: number;
    format: 'JPEG' | 'PNG';
};

type ImagePlacement = {
    drawX: number;
    drawY: number;
    drawWidth: number;
    drawHeight: number;
};

type SegmentPdfInput = {
    id: string;
    title: string;
    subtitle?: string;
    slides: PresentationSlide[];
};

const MM_PAGE = {
    portrait: { width: 210, height: 297 },
    landscape: { width: 297, height: 210 }
};

const BRAND = {
    yellow: [255, 180, 0] as const,
    dark: [26, 26, 26] as const,
    gray: [100, 116, 139] as const
};

const chunkArray = <T,>(items: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += size) {
        chunks.push(items.slice(i, i + size));
    }
    return chunks;
};

const loadImageElement = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Falha ao carregar imagem: ${src}`));
        img.src = src;
    });

const loadImageForPdf = async (
    src: string,
    options?: { maxDimension?: number; quality?: number; format?: 'JPEG' | 'PNG' }
): Promise<LoadedImage | null> => {
    const maxDimension = options?.maxDimension ?? 1300;
    const quality = options?.quality ?? 0.76;
    const format = options?.format ?? 'JPEG';

    try {
        const image = await loadImageElement(src);
        const sourceWidth = image.naturalWidth || image.width;
        const sourceHeight = image.naturalHeight || image.height;
        const ratio = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
        const width = Math.max(1, Math.round(sourceWidth * ratio));
        const height = Math.max(1, Math.round(sourceHeight * ratio));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);

        const mimeType = format === 'PNG' ? 'image/png' : 'image/jpeg';
        return {
            dataUrl: canvas.toDataURL(mimeType, quality),
            width,
            height,
            format
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

const drawImageContain = (
    pdf: import('jspdf').jsPDF,
    image: LoadedImage,
    x: number,
    y: number,
    width: number,
    height: number,
    options?: { compression?: 'NONE' | 'FAST' | 'MEDIUM' | 'SLOW' }
) => {
    const placement = getContainPlacement(image, x, y, width, height);

    pdf.addImage(
        image.dataUrl,
        image.format,
        placement.drawX,
        placement.drawY,
        placement.drawWidth,
        placement.drawHeight,
        undefined,
        options?.compression ?? 'MEDIUM'
    );
    return placement;
};

const writeWrappedText = (
    pdf: import('jspdf').jsPDF,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
) => {
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + lines.length * lineHeight;
};

const writeWrappedTextClamped = (
    pdf: import('jspdf').jsPDF,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxY: number
) => {
    const lines = pdf.splitTextToSize(text, maxWidth) as string[];
    const fitted: string[] = [];
    let cursorY = y;

    for (const line of lines) {
        if (cursorY > maxY) break;
        fitted.push(line);
        cursorY += lineHeight;
    }

    if (fitted.length > 0) {
        pdf.text(fitted, x, y);
    }

    return cursorY;
};

const getContainPlacement = (
    image: LoadedImage,
    x: number,
    y: number,
    width: number,
    height: number
): ImagePlacement => {
    const scale = Math.min(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = x + (width - drawWidth) / 2;
    const drawY = y + (height - drawHeight) / 2;
    return { drawX, drawY, drawWidth, drawHeight };
};

const asText = (value?: string) => (value ?? '').replace(/\s+/g, ' ').trim();

export const buildSegmentPresentationPdf = async (segment: SegmentPdfInput): Promise<Blob> => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
        putOnlyUsedFonts: true
    });

    const pageWidth = MM_PAGE.landscape.width;
    const pageHeight = MM_PAGE.landscape.height;
    const margin = 10;
    const bodyTop = 42;
    const bodyHeight = pageHeight - bodyTop - 14;

    segment.slides.forEach((_slide, index) => {
        if (index > 0) {
            pdf.addPage('a4', 'landscape');
        }
    });

    for (let index = 0; index < segment.slides.length; index += 1) {
        if (index > 0) {
            pdf.setPage(index + 1);
        }

        const slide = segment.slides[index];
        const title = asText(slide.title) || `Slide ${index + 1}`;
        const subtitle = asText(slide.subtitle);
        const content = asText(slide.content);
        const bullets = (slide.bullets ?? []).map((bullet) => asText(bullet)).filter(Boolean);
        const stats = slide.stats ?? [];
        const hasTextPanel = Boolean(content) || bullets.length > 0 || stats.length > 0;
        const imageList = (slide.galleryImages?.length ? slide.galleryImages : slide.image ? [slide.image] : []).filter(Boolean) as string[];

        pdf.setFillColor(...BRAND.dark);
        pdf.rect(0, 0, pageWidth, 24, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(16);
        pdf.text(segment.title, margin, 10);
        pdf.setFontSize(9);
        pdf.setTextColor(...BRAND.yellow);
        pdf.text(`Slide ${index + 1}/${segment.slides.length}`, pageWidth - margin, 10, { align: 'right' });

        pdf.setTextColor(...BRAND.dark);
        pdf.setFontSize(18);
        pdf.text(title, margin, 30);
        if (subtitle) {
            pdf.setTextColor(...BRAND.gray);
            pdf.setFontSize(11);
            pdf.text(subtitle, margin, 35);
        }

        if (!imageList.length) {
            if (content) {
                pdf.setTextColor(...BRAND.dark);
                pdf.setFontSize(11);
                writeWrappedText(pdf, content, margin, 48, pageWidth - margin * 2, 6);
            }
            continue;
        }

        if (!hasTextPanel) {
            if (slide.type === 'gallery' && imageList.length > 1) {
                const shownImages = imageList.slice(0, 4);
                const cols = 2;
                const rows = 2;
                const gap = 4;
                const gridTop = 48;
                const gridWidth = pageWidth - margin * 2;
                const gridHeight = pageHeight - gridTop - 14;
                const cellWidth = (gridWidth - gap) / cols;
                const cellHeight = (gridHeight - gap) / rows;

                for (let i = 0; i < shownImages.length; i += 1) {
                    const image = await loadImageForPdf(shownImages[i], {
                        maxDimension: 1700,
                        quality: 0.84,
                        format: 'JPEG'
                    });
                    if (!image) continue;
                    const row = Math.floor(i / cols);
                    const col = i % cols;
                    const x = margin + col * (cellWidth + gap);
                    const y = gridTop + row * (cellHeight + gap);
                    drawImageContain(pdf, image, x, y, cellWidth, cellHeight, { compression: 'MEDIUM' });
                }
                continue;
            }

            const fullImage = await loadImageForPdf(imageList[0], {
                maxDimension: 2400,
                quality: 0.86,
                format: 'JPEG'
            });
            if (fullImage) {
                drawImageContain(pdf, fullImage, margin, bodyTop, pageWidth - margin * 2, bodyHeight, {
                    compression: 'MEDIUM'
                });
            }
            continue;
        }

        const leftWidth = 118;
        const layoutGap = 8;
        const rightX = margin + leftWidth + layoutGap;
        const rightWidth = pageWidth - margin * 2 - leftWidth - layoutGap;
        const panelTop = bodyTop;
        const panelHeight = bodyHeight;
        const textX = margin + 3;
        const textWidth = leftWidth - 6;

        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.3);
        pdf.roundedRect(margin, panelTop, leftWidth, panelHeight, 2, 2);
        pdf.roundedRect(rightX, panelTop, rightWidth, panelHeight, 2, 2);

        const mainImage = await loadImageForPdf(imageList[0], {
            maxDimension: 2200,
            quality: 0.86,
            format: 'JPEG'
        });

        let imagePlacement: ImagePlacement | null = null;
        if (mainImage) {
            imagePlacement = drawImageContain(pdf, mainImage, rightX + 2, panelTop + 2, rightWidth - 4, panelHeight - 4, {
                compression: 'MEDIUM'
            });
        }

        const textStartY = Math.max(
            panelTop + 8,
            imagePlacement ? imagePlacement.drawY + 4 : panelTop + 8
        );
        const maxTextY = Math.min(
            panelTop + panelHeight - 6,
            imagePlacement ? imagePlacement.drawY + imagePlacement.drawHeight - 4 : panelTop + panelHeight - 6
        );
        let cursorY = textStartY;

        pdf.setTextColor(...BRAND.dark);
        pdf.setFontSize(10);
        if (content && cursorY < maxTextY) {
            cursorY = writeWrappedTextClamped(pdf, content, textX, cursorY, textWidth, 5, maxTextY) + 2;
        }

        if (bullets.length > 0 && cursorY < maxTextY) {
            pdf.setFontSize(9.5);
            for (const bullet of bullets) {
                if (cursorY > maxTextY) break;
                const wrapped = pdf.splitTextToSize(`- ${bullet}`, textWidth) as string[];
                const fitted: string[] = [];
                let localY = cursorY;
                for (const line of wrapped) {
                    if (localY > maxTextY) break;
                    fitted.push(line);
                    localY += 4.3;
                }
                if (fitted.length === 0) break;
                pdf.text(fitted, textX, cursorY);
                cursorY = localY + 0.7;
            }
        }

        if (stats.length > 0 && cursorY + 20 <= maxTextY) {
            const statWidth = Math.max(30, (textWidth - 4) / Math.min(stats.length, 3));
            let statX = textX;
            const statY = Math.min(cursorY + 1.5, maxTextY - 20);
            stats.slice(0, 3).forEach((stat) => {
                pdf.setDrawColor(226, 232, 240);
                pdf.roundedRect(statX, statY, statWidth, 20, 2, 2);
                pdf.setTextColor(...BRAND.dark);
                pdf.setFontSize(11);
                pdf.text(stat.value, statX + statWidth / 2, statY + 8, { align: 'center' });
                pdf.setTextColor(...BRAND.gray);
                pdf.setFontSize(7.5);
                pdf.text(stat.label, statX + statWidth / 2, statY + 14, { align: 'center', maxWidth: statWidth - 3 });
                statX += statWidth + 2;
            });
        }
    }

    return pdf.output('blob');
};

const CATALOG_CATEGORY_ORDER = ['Logística', 'Proteção', 'Trabalho em Altura'] as const;
const CATALOG_PRODUCT_ORDER = [1, 4, 5, 6, 7, 8, 2, 10, 3, 9, 11, 12];
const CATALOG_PRODUCT_ORDER_INDEX = CATALOG_PRODUCT_ORDER.reduce<Record<number, number>>((acc, id, index) => {
    acc[id] = index;
    return acc;
}, {});

const sortCatalogProducts = (products: CatalogItem[]) =>
    products.slice().sort((a, b) => {
        const categoryA = CATALOG_CATEGORY_ORDER.indexOf(a.category as (typeof CATALOG_CATEGORY_ORDER)[number]);
        const categoryB = CATALOG_CATEGORY_ORDER.indexOf(b.category as (typeof CATALOG_CATEGORY_ORDER)[number]);
        const resolvedCategoryA = categoryA === -1 ? 999 : categoryA;
        const resolvedCategoryB = categoryB === -1 ? 999 : categoryB;

        if (resolvedCategoryA !== resolvedCategoryB) return resolvedCategoryA - resolvedCategoryB;

        const orderA = CATALOG_PRODUCT_ORDER_INDEX[a.id] ?? 999;
        const orderB = CATALOG_PRODUCT_ORDER_INDEX[b.id] ?? 999;
        if (orderA !== orderB) return orderA - orderB;

        return a.title.localeCompare(b.title, 'pt-BR');
    });

const drawCatalogPageHeader = (
    pdf: import('jspdf').jsPDF,
    options: { title: string; generatedAt: string; logo: LoadedImage | null }
) => {
    const pageWidth = MM_PAGE.portrait.width;
    const margin = 12;

    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, MM_PAGE.portrait.width, MM_PAGE.portrait.height, 'F');
    pdf.setFillColor(...BRAND.yellow);
    pdf.rect(0, 0, pageWidth, 6, 'F');

    if (options.logo) {
        drawImageContain(pdf, options.logo, margin, 9, 26, 12);
    }

    const textStartX = options.logo ? 42 : margin;
    pdf.setTextColor(...BRAND.dark);
    pdf.setFontSize(15);
    pdf.text(options.title, textStartX, 14);

    pdf.setTextColor(...BRAND.gray);
    pdf.setFontSize(8);
    pdf.text('Facilco Engenharia', textStartX, 18.5);
    pdf.text(`Gerado em ${options.generatedAt}`, pageWidth - margin, 14, { align: 'right' });

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.25);
    pdf.line(margin, 23, pageWidth - margin, 23);

    return 29;
};

const drawCatalogCategoryHeading = (
    pdf: import('jspdf').jsPDF,
    category: string,
    y: number
) => {
    const margin = 12;
    const boxWidth = MM_PAGE.portrait.width - margin * 2;

    pdf.setFillColor(255, 247, 224);
    pdf.roundedRect(margin, y, boxWidth, 9, 2, 2, 'F');
    pdf.setTextColor(...BRAND.dark);
    pdf.setFontSize(10);
    pdf.text(category.toUpperCase(), margin + 3, y + 5.8);

    return y + 12;
};

export const buildCatalogDownloadPdf = async (
    products: CatalogItem[],
    options?: { title?: string }
): Promise<Blob> => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
        putOnlyUsedFonts: true
    });

    const title = options?.title ?? 'Catalogo de Produtos Facilco';

    const pageWidth = MM_PAGE.portrait.width;
    const pageHeight = MM_PAGE.portrait.height;
    const margin = 12;

    const orderedProducts = sortCatalogProducts(products);
    const categoryMap = new Map<string, CatalogItem[]>();
    for (const product of orderedProducts) {
        if (!categoryMap.has(product.category)) categoryMap.set(product.category, []);
        categoryMap.get(product.category)?.push(product);
    }

    const orderedCategories = [
        ...CATALOG_CATEGORY_ORDER.filter((category) => categoryMap.has(category)),
        ...Array.from(categoryMap.keys())
            .filter((category) => !CATALOG_CATEGORY_ORDER.includes(category as (typeof CATALOG_CATEGORY_ORDER)[number]))
            .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    ];

    const logo = await loadImageForPdf('/logo.png', { maxDimension: 600, quality: 0.85 });
    const generatedAt = new Date().toLocaleDateString('pt-BR');

    const bottomLimit = pageHeight - 14;
    let cursorY = drawCatalogPageHeader(pdf, { title, generatedAt, logo });
    let currentCategory = '';

    const ensureSpace = (requiredHeight: number, continuationCategory?: string) => {
        if (cursorY + requiredHeight <= bottomLimit) return;
        pdf.addPage('a4', 'portrait');
        cursorY = drawCatalogPageHeader(pdf, { title, generatedAt, logo });
        if (continuationCategory) {
            cursorY = drawCatalogCategoryHeading(pdf, `${continuationCategory} (continuação)`, cursorY);
        }
    };

    for (const category of orderedCategories) {
        const items = categoryMap.get(category) ?? [];
        if (!items.length) continue;

        ensureSpace(14);
        cursorY = drawCatalogCategoryHeading(pdf, category, cursorY);
        currentCategory = category;

        for (const product of items) {
            const gallery: CatalogImage[] = product.gallery?.length
                ? product.gallery
                : [{ src: product.image, title: product.title, description: product.description }];

            const imageChunks = chunkArray(gallery, 6);

            for (let chunkIndex = 0; chunkIndex < imageChunks.length; chunkIndex += 1) {
                const pageImages = imageChunks[chunkIndex];
                const rows = Math.max(1, Math.ceil(pageImages.length / 2));
                const imageHeight = 41;
                const imageGap = 4;
                const titleHeight = 8;
                const blockPadding = 3;
                const blockHeight = blockPadding + titleHeight + rows * imageHeight + (rows - 1) * imageGap + 6;

                ensureSpace(blockHeight + 2, currentCategory);

                const boxWidth = pageWidth - margin * 2;
                const boxX = margin;
                const boxY = cursorY;
                pdf.setDrawColor(226, 232, 240);
                pdf.setLineWidth(0.35);
                pdf.roundedRect(boxX, boxY, boxWidth, blockHeight, 2, 2);

                pdf.setTextColor(...BRAND.dark);
                pdf.setFontSize(11);
                const blockTitle = chunkIndex === 0
                    ? product.title
                    : `${product.title} (continuação ${chunkIndex + 1}/${imageChunks.length})`;
                pdf.text(blockTitle, boxX + 3, boxY + 6.5);

                const cellGap = 4;
                const gridTop = boxY + 10;
                const gridWidth = boxWidth - 6;
                const cellWidth = (gridWidth - cellGap) / 2;

                for (let i = 0; i < pageImages.length; i += 1) {
                    const imageData = await loadImageForPdf(pageImages[i].src, { maxDimension: 1300, quality: 0.78 });
                    const row = Math.floor(i / 2);
                    const col = i % 2;
                    const cellX = boxX + 3 + col * (cellWidth + cellGap);
                    const cellY = gridTop + row * (imageHeight + imageGap);

                    pdf.setDrawColor(226, 232, 240);
                    pdf.roundedRect(cellX, cellY, cellWidth, imageHeight, 1.5, 1.5);

                    if (imageData) {
                        drawImageContain(pdf, imageData, cellX + 1.2, cellY + 1.2, cellWidth - 2.4, imageHeight - 2.4);
                    }
                }

                cursorY += blockHeight + 4;
            }
        }
    }

    const totalPages = pdf.getNumberOfPages();
    for (let page = 1; page <= totalPages; page += 1) {
        pdf.setPage(page);
        pdf.setTextColor(...BRAND.gray);
        pdf.setFontSize(7.5);
        pdf.text(`Página ${page} de ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
    }

    return pdf.output('blob');
};
