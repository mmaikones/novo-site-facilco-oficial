import { CATALOG_PRODUCTS } from './catalog';
import { productsData, type Category as ManusCategory, type Product as ManusProduct } from './manusBase';

const MANUS_IMAGE_PREFIX = '/manus-images/';

const TITLE_ALIAS_BY_MANUS_TITLE: Record<string, string> = {
    'guard rail industrial': 'guarda-corpo'
};

const normalize = (value: string) =>
    value
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const toManusImagePath = (path: string) => {
    if (path.startsWith('/images/')) {
        return `${MANUS_IMAGE_PREFIX}${path.slice('/images/'.length)}`;
    }
    return path;
};

const unique = (items: string[]) => {
    const seen = new Set<string>();
    return items.filter((item) => {
        const key = item.trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

const siteCatalogByTitle = new Map(
    CATALOG_PRODUCTS.map((product) => [normalize(product.title), product] as const)
);

const findSiteProduct = (manusTitle: string) => {
    const normalizedTitle = normalize(manusTitle);
    const aliasedTitle = TITLE_ALIAS_BY_MANUS_TITLE[normalizedTitle];
    if (aliasedTitle) {
        const aliased = siteCatalogByTitle.get(normalize(aliasedTitle));
        if (aliased) return aliased;
    }
    return siteCatalogByTitle.get(normalizedTitle) ?? null;
};

const mergeProduct = (product: ManusProduct): ManusProduct => {
    const matchedSiteProduct = findSiteProduct(product.title);
    const manusGallery = product.gallery.map(toManusImagePath);
    const siteGallery = matchedSiteProduct?.gallery?.map((item) => item.src) ?? [];
    const siteCover = matchedSiteProduct?.image ? [matchedSiteProduct.image] : [];

    return {
        ...product,
        // Prioriza capa técnica do site quando houver correspondência.
        image: matchedSiteProduct?.image ?? toManusImagePath(product.image),
        gallery: unique([...manusGallery, ...siteCover, ...siteGallery])
    };
};

const mergedCategories: ManusCategory[] = productsData.map((category) => ({
    ...category,
    products: category.products.map(mergeProduct)
}));

const DOCK_SIGNALING_PRODUCT_IDS = new Set(['dock-light', 'sinalizacao-docas']);

const dockSignalingProducts = mergedCategories.flatMap((category) =>
    category.products.filter((product) => DOCK_SIGNALING_PRODUCT_IDS.has(product.id))
);

const categoriesWithoutDockSignaling = mergedCategories
    .map((category) => ({
        ...category,
        products: category.products.filter((product) => !DOCK_SIGNALING_PRODUCT_IDS.has(product.id))
    }))
    .filter((category) => category.products.length > 0);

const dockSignalingCategory: ManusCategory = {
    id: 'sinalizacao-docas',
    title: 'Sinalização de Docas',
    description: 'Soluções dedicadas para iluminação, sinalização e segurança nas operações de docas.',
    products: dockSignalingProducts
};

const orderedCategories = [...categoriesWithoutDockSignaling];
if (dockSignalingProducts.length > 0) {
    const insertIndex = Math.min(1, orderedCategories.length);
    orderedCategories.splice(insertIndex, 0, dockSignalingCategory);
}

export const MANUS_MERGED_PRODUCTS_DATA: ManusCategory[] = orderedCategories;
