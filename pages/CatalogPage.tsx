import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Package, Play, Home, ChevronRight, Sparkles, Layers, Shield, HardHat, Truck, ChevronDown } from 'lucide-react';
import { CATALOG_PRODUCTS, CATALOG_CATEGORIES } from '../data/catalog';
import { CatalogItem } from '../types';
import PresentationOverlay from '../components/PresentationOverlay';
import ChatWidget from '../components/ChatWidget';

const WHATSAPP_LINK = 'https://wa.me/5519996223433';
const CATEGORY_META: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }> = {
    Proteção: { icon: Shield, label: 'Proteção' },
    'Trabalho em Altura': { icon: HardHat, label: 'Trabalho em Altura' },
    Logística: { icon: Truck, label: 'Logística' }
};
const CATEGORY_ORDER = ['Logística', 'Proteção', 'Trabalho em Altura'] as const;
const PRODUCT_DISPLAY_ORDER = [1, 4, 5, 6, 7, 8, 2, 10, 3, 9, 11, 12];
const PRODUCT_ORDER_INDEX = PRODUCT_DISPLAY_ORDER.reduce<Record<number, number>>((acc, id, index) => {
    acc[id] = index;
    return acc;
}, {});

const SUBCATEGORY_BY_ID: Record<number, string> = {
    1: 'Docas e Nivelamento',
    4: 'Docas e Nivelamento',
    5: 'Docas e Nivelamento',
    6: 'Pátio e Delimitação',
    7: 'Iluminação e Sinalização',
    8: 'Iluminação e Sinalização',

    2: 'Proteção de Estruturas',
    3: 'Proteção de Estruturas',
    9: 'Gestão de Tráfego',
    10: 'Proteção de Estruturas',

    11: 'Acesso Seguro',
    12: 'Ancoragem NR-35'
};
const SUBCATEGORY_META: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }> = {
    'Docas e Nivelamento': { icon: Truck, label: 'Docas e Nivelamento' },
    'Pátio e Delimitação': { icon: Layers, label: 'Pátio e Delimitação' },
    'Iluminação e Sinalização': { icon: Sparkles, label: 'Iluminação e Sinalização' },
    'Proteção de Estruturas': { icon: Shield, label: 'Proteção de Estruturas' },
    'Gestão de Tráfego': { icon: Layers, label: 'Gestão de Tráfego' },
    'Acesso Seguro': { icon: HardHat, label: 'Acesso Seguro' },
    'Ancoragem NR-35': { icon: HardHat, label: 'Ancoragem NR-35' }
};
const SUBCATEGORY_ORDER_BY_CATEGORY: Record<string, string[]> = {
    Logística: ['Docas e Nivelamento', 'Pátio e Delimitação', 'Iluminação e Sinalização'],
    Proteção: ['Proteção de Estruturas', 'Gestão de Tráfego'],
    'Trabalho em Altura': ['Acesso Seguro', 'Ancoragem NR-35']
};

const CatalogPage: React.FC = () => {
    const [showPresentation, setShowPresentation] = useState(false);
    const [activeCategory, setActiveCategory] = useState<'Todos' | 'Proteção' | 'Trabalho em Altura' | 'Logística'>('Todos');
    const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [isImageExpanded, setIsImageExpanded] = useState(false);
    const [expandedZoom, setExpandedZoom] = useState(1);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const modalTouchStartX = useRef(0);
    const modalTouchEndX = useRef(0);
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
        Logística: true,
        Proteção: false,
        'Trabalho em Altura': false,
    });

    const categories = useMemo(
        () =>
            CATALOG_CATEGORIES
                .filter((category) => category !== 'Todos')
                .sort(
                    (a, b) =>
                        CATEGORY_ORDER.indexOf(a as (typeof CATEGORY_ORDER)[number]) -
                        CATEGORY_ORDER.indexOf(b as (typeof CATEGORY_ORDER)[number])
                ),
        []
    );

    const baseProducts = useMemo(
        () =>
            CATALOG_PRODUCTS.slice().sort((a, b) => {
                const orderA = PRODUCT_ORDER_INDEX[a.id] ?? 999;
                const orderB = PRODUCT_ORDER_INDEX[b.id] ?? 999;
                if (orderA !== orderB) return orderA - orderB;
                return a.id - b.id;
            }),
        []
    );

    const filteredProducts = useMemo(
        () => (activeCategory === 'Todos'
            ? baseProducts
            : baseProducts.filter((item) => item.category === activeCategory)),
        [baseProducts, activeCategory]
    );

    const grouped = useMemo(() => {
        const categoryOrder = activeCategory === 'Todos' ? categories : [activeCategory];
        return categoryOrder.map((category) => {
            const items = filteredProducts.filter((item) => item.category === category);
            const groupedSubcategories = items.reduce<Record<string, CatalogItem[]>>((acc, item) => {
                const sub = SUBCATEGORY_BY_ID[item.id] || 'Outros';
                if (!acc[sub]) acc[sub] = [];
                acc[sub].push(item);
                return acc;
            }, {});

            const preferredOrder = SUBCATEGORY_ORDER_BY_CATEGORY[category] ?? [];
            const orderedSubcategories = Object.entries(groupedSubcategories).sort((a, b) => {
                const aIndex = preferredOrder.indexOf(a[0]);
                const bIndex = preferredOrder.indexOf(b[0]);
                const resolvedA = aIndex === -1 ? 999 : aIndex;
                const resolvedB = bIndex === -1 ? 999 : bIndex;
                if (resolvedA !== resolvedB) return resolvedA - resolvedB;
                return a[0].localeCompare(b[0]);
            });

            return { category, items, orderedSubcategories };
        });
    }, [categories, filteredProducts, activeCategory]);

    const catalogPresentation = useMemo(
        () => ({
            id: 'catalogo',
            title: 'Catálogo de Produtos',
            icon: Package,
            slides: [
                {
                    type: 'cover',
                    title: 'Catálogo de Produtos',
                    subtitle: 'Proteção, Logística e Trabalho em Altura',
                    image: '/hero-cinematic.png'
                },
                {
                    type: 'intro',
                    title: 'Soluções Completas por Setor',
                    content: 'Uma linha completa de soluções industriais para proteger pessoas, estruturas e operações críticas em todo o Brasil.',
                    image: '/hero-cinematic.png',
                    stats: [
                        { label: 'Categorias', value: '3' },
                        { label: 'Produtos', value: String(CATALOG_PRODUCTS.length) },
                        { label: 'Cobertura', value: 'Nacional' }
                    ]
                },
                {
                    type: 'challenge',
                    title: 'Riscos Operacionais',
                    content: 'Ambientes industriais exigem proteção contínua para reduzir acidentes, paradas não programadas e perdas de operação.',
                    bullets: [
                        'Colisões com empilhadeiras e veículos industriais',
                        'Quedas em altura e acesso inseguro',
                        'Danos em docas e estruturas críticas',
                        'Fluxos não segregados e riscos de operação'
                    ],
                    image: '/hero-cinematic.png'
                },
                {
                    type: 'solution',
                    title: 'Linha Facilco de Proteção',
                    content: 'Produtos e soluções para mitigação de riscos em áreas industriais, docas e centros de distribuição.',
                    bullets: [
                        'Proteções de perímetro e guard-rails',
                        'Sinalização e controle de docas',
                        'Soluções para trabalho em altura',
                        'Infraestrutura para logística pesada'
                    ],
                    image: '/hero-cinematic.png'
                },
                {
                    type: 'specs',
                    title: 'Proteção Industrial',
                    content: 'Barreiras, protetores e sistemas de impacto para zonas críticas.',
                    bullets: [
                        'Guard-Rail Industrial',
                        'Bollards de alta absorção',
                        'Protetores de coluna e racking',
                        'Barreiras de tráfego flexíveis'
                    ],
                    image: '/catalog/guard-01.jpeg'
                },
                {
                    type: 'specs',
                    title: 'Logística e Docas',
                    content: 'Eficiência operacional e segurança para o fluxo de carga e descarga.',
                    bullets: [
                        'Rampa niveladora e rampa móvel',
                        'Dock light e batentes de doca',
                        'Sinalização de docas e calços de roda',
                        'Pintura de piso e gestão visual'
                    ],
                    image: '/catalog/dock-01.jpeg'
                },
                {
                    type: 'specs',
                    title: 'Trabalho em Altura',
                    content: 'Sistemas permanentes e móveis para acesso seguro.',
                    bullets: [
                        'Linhas de vida horizontais e verticais',
                        'Linhas de vida flexíveis e rígidas',
                        'Pontos de ancoragem certificados',
                        'Escada marinheiro com guarda-corpo'
                    ],
                    image: '/catalog/escada-01.jpeg'
                },
                {
                    type: 'cta',
                    title: 'Catálogo Completo Facilco',
                    content: 'Solicite seu catálogo completo e fale com um especialista para dimensionar a solução ideal.',
                    image: '/hero-cinematic.png'
                }
            ]
        }),
        []
    );

    useEffect(() => {
        if (selectedProduct) setCurrentGalleryIndex(0);
        setIsImageExpanded(false);
        setExpandedZoom(1);
    }, [selectedProduct]);

    useEffect(() => {
        setIsImageExpanded(false);
        setExpandedZoom(1);
    }, [currentGalleryIndex]);

    useEffect(() => {
        if (activeCategory === 'Todos') {
            setOpenCategories({
                Proteção: true,
                'Trabalho em Altura': true,
                Logística: true
            });
            return;
        }

        setOpenCategories((prev) => ({
            ...prev,
            [activeCategory]: true
        }));
    }, [activeCategory]);

    const getGallery = (product: CatalogItem) => {
        if (product.gallery && product.gallery.length > 0) return product.gallery;
        return [{ src: product.image, title: product.title, description: product.description }];
    };

    const nextGallery = () => {
        if (!selectedProduct) return;
        const gallery = getGallery(selectedProduct);
        setCurrentGalleryIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevGallery = () => {
        if (!selectedProduct) return;
        const gallery = getGallery(selectedProduct);
        setCurrentGalleryIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    const handleModalTouchStart = (e: React.TouchEvent) => {
        modalTouchStartX.current = e.targetTouches[0].clientX;
    };

    const handleModalTouchMove = (e: React.TouchEvent) => {
        modalTouchEndX.current = e.targetTouches[0].clientX;
    };

    const handleModalTouchEnd = () => {
        if (modalTouchStartX.current - modalTouchEndX.current > 50) nextGallery();
        if (modalTouchStartX.current - modalTouchEndX.current < -50) prevGallery();
    };

    const getWhatsAppLink = (product: CatalogItem) => {
        const message = `Olá Facilco! Gostaria de um orçamento para: ${product.title}`;
        return `https://wa.me/5519996223433?text=${encodeURIComponent(message)}`;
    };

    const openExpandedImage = () => setIsImageExpanded(true);
    const closeExpandedImage = () => {
        setIsImageExpanded(false);
        setExpandedZoom(1);
    };
    const zoomInExpandedImage = () => setExpandedZoom((prev) => Math.min(3, Number((prev + 0.25).toFixed(2))));
    const zoomOutExpandedImage = () => setExpandedZoom((prev) => Math.max(1, Number((prev - 0.25).toFixed(2))));

    return (
        <div className="min-h-screen bg-white text-brand-dark">
            <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                <Link to="/" className="flex items-center gap-2 text-brand-dark hover:text-brand-yellow transition-colors font-bold">
                    <Home size={18} />
                    <span className="uppercase text-xs tracking-widest font-display">HOME</span>
                </Link>
                <img src="/logo.png" alt="Facilco" className="h-10 w-auto object-contain" />
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-brand-yellow text-brand-dark px-5 py-2 rounded font-bold text-sm tracking-wide hover:bg-brand-dark hover:text-white transition-colors border-2 border-transparent"
                    style={{ borderRadius: '6px' }}
                >
                    FALAR COM ENGENHEIRO
                </button>
            </header>

            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/hero-cinematic.png" alt="Catálogo Facilco" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-brand-yellow rounded-lg text-brand-dark shadow-lg shadow-brand-yellow/20">
                                <Package size={32} />
                            </div>
                            <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Catálogo Completo</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                            Catálogo de Produtos
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg font-light leading-relaxed">
                            Todos os produtos Facilco organizados por setor, com visualização completa do catálogo técnico.
                        </p>

                        <div className="grid w-full max-w-xl grid-cols-1 gap-2 md:flex md:w-auto md:max-w-none md:gap-3">
                            <button
                                onClick={() => setShowPresentation(true)}
                                className="group min-w-0 w-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-brand-yellow text-brand-dark text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-2 sm:px-3 md:px-4 rounded hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                style={{ borderRadius: '6px' }}
                            >
                                <Play size={15} className="fill-current hidden sm:block" />
                                Ver Apresentação
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 space-y-16">
                    <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <button
                                onClick={() => setActiveCategory('Todos')}
                                className={`px-3 md:px-4 py-3 rounded-xl border transition flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wide ${activeCategory === 'Todos'
                                    ? 'bg-brand-dark text-white border-brand-dark shadow-lg'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-yellow/10 hover:border-brand-yellow'
                                    }`}
                            >
                                <Package size={16} />
                                <span>Todos</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === 'Todos' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>{baseProducts.length}</span>
                            </button>
                            {categories.map((category) => {
                                const meta = CATEGORY_META[category];
                                const Icon = meta.icon;
                                const count = baseProducts.filter((item) => item.category === category).length;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category as 'Proteção' | 'Trabalho em Altura' | 'Logística')}
                                        className={`px-3 md:px-4 py-3 rounded-xl border transition flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wide ${activeCategory === category
                                            ? 'bg-brand-dark text-white border-brand-dark shadow-lg'
                                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-brand-yellow/10 hover:border-brand-yellow'
                                            }`}
                                    >
                                        <Icon size={16} />
                                        <span>{meta.label}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeCategory === category ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {grouped.map((group) => {
                        const isForcedOpen = activeCategory !== 'Todos';
                        const isOpen = isForcedOpen || openCategories[group.category];
                        const CategoryIcon = CATEGORY_META[group.category]?.icon ?? Package;

                        return (
                            <div key={group.category}>
                                <button
                                    onClick={() => {
                                        if (isForcedOpen) return;
                                        setOpenCategories((prev) => ({
                                            ...prev,
                                            [group.category]: !prev[group.category]
                                        }));
                                    }}
                                    className="w-full flex items-center justify-between gap-3 mb-6 bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-brand-dark text-brand-yellow flex items-center justify-center">
                                            <CategoryIcon size={18} />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-xs uppercase tracking-widest text-brand-yellow font-bold block">Categoria principal</span>
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark">{group.category}</h2>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-600">{group.items.length} produtos</span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-brand-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="space-y-8">
                                        {group.orderedSubcategories.map(([subCategory, items]) => {
                                            const subMeta = SUBCATEGORY_META[subCategory];
                                            const SubIcon = subMeta?.icon ?? Package;
                                            return (
                                            <div key={`${group.category}-${subCategory}`} className="space-y-4">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                                                    <SubIcon size={14} className="text-brand-dark" />
                                                    <h3 className="text-xs uppercase tracking-widest text-gray-700 font-bold">
                                                        {subMeta?.label ?? subCategory}
                                                    </h3>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-gray-200 text-gray-600 font-bold">
                                                        {items.length}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {items.map((item) => (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => setSelectedProduct(item)}
                                                            className="text-left bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden group"
                                                        >
                                                            <div className="aspect-[2/3] bg-gray-100 overflow-hidden">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                            <div className="p-6">
                                                                <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2">{item.category}</p>
                                                                <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                                                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                                                                <div className="mt-4 flex items-center text-brand-dark font-bold text-sm gap-2">
                                                                    Ver detalhes <ChevronRight size={16} className="text-brand-yellow" />
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {grouped.every((group) => group.items.length === 0) && (
                        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
                            Nenhum produto encontrado para esse filtro.
                        </div>
                    )}
                </div>
            </section>

            {selectedProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedProduct(null)}
                    ></div>

                    <div className="bg-white w-full max-w-5xl h-[92vh] md:h-[88vh] rounded-lg shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-3 right-3 z-20 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>

                        {(() => {
                            const gallery = getGallery(selectedProduct);
                            const currentItem = gallery[currentGalleryIndex];
                            return (
                                <>
                                    <div
                                        className="w-full h-[44%] md:h-full md:w-1/2 bg-gray-100 relative shrink-0"
                                        onTouchStart={handleModalTouchStart}
                                        onTouchMove={handleModalTouchMove}
                                        onTouchEnd={handleModalTouchEnd}
                                        style={{ touchAction: 'pan-y' }}
                                    >
                                        <img
                                            src={currentItem.src}
                                            alt={currentItem.title}
                                            className="w-full h-full object-contain absolute inset-0 cursor-zoom-in"
                                            onClick={openExpandedImage}
                                        />
                                        <div className="absolute top-4 left-4 rounded-full bg-black/60 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                            {selectedProduct.category} • {currentGalleryIndex + 1}/{gallery.length}
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openExpandedImage();
                                            }}
                                            className="absolute bottom-4 right-4 rounded-full bg-black/65 text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black/80 transition"
                                        >
                                            Expandir
                                        </button>

                                        {gallery.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        prevGallery();
                                                    }}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                                >
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        nextGallery();
                                                    }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-brand-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-yellow transition"
                                                >
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="w-full h-[56%] md:h-full md:w-1/2 p-5 md:p-8 flex flex-col overflow-y-auto">
                                        <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-4">{selectedProduct.title}</h3>
                                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                                            <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2">Detalhe do slide</p>
                                            <h4 className="text-lg font-bold text-brand-dark mb-1">{currentItem.title}</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">{currentItem.description}</p>
                                        </div>
                                        <div className="prose prose-sm text-gray-600 mb-6">
                                            <p className="text-lg leading-relaxed">{selectedProduct.description}</p>
                                            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                                                <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                                                    <i className="fas fa-check-circle"></i> Disponibilidade
                                                </h4>
                                                <p className="text-sm text-blue-800">
                                                    Produto sob medida. Fabricação e instalação própria pela Facilco Engenharia.
                                                </p>
                                            </div>
                                        </div>
                                        {gallery.length > 1 && (
                                            <div className="flex gap-2 mb-6">
                                                {gallery.map((item, idx) => (
                                                    <button
                                                        key={`${item.title}-${idx}`}
                                                        onClick={() => setCurrentGalleryIndex(idx)}
                                                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentGalleryIndex ? 'w-8 bg-brand-yellow' : 'w-2 bg-gray-300'}`}
                                                        aria-label={`Ir para o slide ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                                            <a
                                                href={getWhatsAppLink(selectedProduct)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-center hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                                            >
                                                <i className="fab fa-whatsapp text-2xl"></i>
                                                <div className="text-left">
                                                    <span className="block text-xs font-normal opacity-90">Falar com Consultor</span>
                                                    <span className="uppercase tracking-wide">Pedir Orçamento Agora</span>
                                                </div>
                                            </a>
                                            <p className="text-center text-xs text-gray-400">
                                                *Atendimento técnico imediato.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    {isImageExpanded && (() => {
                        const gallery = getGallery(selectedProduct);
                        const expandedItem = gallery[currentGalleryIndex];
                        return (
                            <div className="fixed inset-0 z-[90] bg-black/95 flex flex-col">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/15">
                                    <p className="text-white text-xs md:text-sm font-semibold truncate pr-3">
                                        {expandedItem.title}
                                    </p>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={zoomOutExpandedImage}
                                            className="w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 transition"
                                            aria-label="Diminuir zoom"
                                        >
                                            -
                                        </button>
                                        <span className="text-white text-xs font-bold w-12 text-center">
                                            {Math.round(expandedZoom * 100)}%
                                        </span>
                                        <button
                                            onClick={zoomInExpandedImage}
                                            className="w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/30 transition"
                                            aria-label="Aumentar zoom"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={closeExpandedImage}
                                            className="w-9 h-9 rounded-full bg-white text-black hover:bg-red-500 hover:text-white transition"
                                            aria-label="Fechar imagem ampliada"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-auto">
                                    <div className="min-h-full min-w-full flex items-center justify-center p-4 md:p-8">
                                        <div
                                            style={{ width: `${expandedZoom * 100}%` }}
                                            className="max-w-[2200px] transition-[width] duration-150 ease-out"
                                        >
                                            <img
                                                src={expandedItem.src}
                                                alt={expandedItem.title}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            <PresentationOverlay
                isOpen={showPresentation}
                onClose={() => setShowPresentation(false)}
                segment={catalogPresentation}
            />

            <ChatWidget isOpen={isChatOpen} toggleChat={() => setIsChatOpen((prev) => !prev)} />
        </div>
    );
};

export default CatalogPage;
