import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
    Home,
    CheckCircle,
    Play,
    ArrowRight,
    AlertTriangle,
    Building2,
    HardHat,
    Layers,
    ClipboardList,
    ShieldCheck,
    TrendingUp,
    HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SEGMENTS, SEGMENT_ENHANCEMENTS } from '../data/segments';
import ChatWidget from '../components/ChatWidget';
import PresentationOverlay from '../components/PresentationOverlay';
import WhereWeAre from '../components/WhereWeAre';
import FullBleedImageCarousel from '../components/FullBleedImageCarousel';
import { buildSegmentPresentationPdf } from '../utils/pdfDownload';

const WHATSAPP_LINK = 'https://wa.me/5519996223433';

const normalizeText = (value: string) =>
    value
        .toLocaleLowerCase('pt-BR')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();

const SegmentPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showPresentation, setShowPresentation] = useState(false);
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
    const [selectedAutoModule, setSelectedAutoModule] = useState<string | null>(null);
    const automotivoModuleContentRef = useRef<HTMLElement>(null);

    const baseSegment = SEGMENTS.find((item) => item.id === id);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [id]);

    if (id === 'construcao-civil' || id === 'condominios') {
        return <Navigate to="/edificacoes" replace />;
    }
    if (id === 'ccr-rodovias') {
        return <Navigate to="/rodovias" replace />;
    }

    const segment = useMemo(() => {
        if (!baseSegment) return null;
        const enhancement = SEGMENT_ENHANCEMENTS[baseSegment.id];

        if (!enhancement) return baseSegment;

        return {
            ...baseSegment,
            ...enhancement,
            slides: [...baseSegment.slides, ...enhancement.additionalSlides]
        };
    }, [baseSegment]);

    if (!segment) {
        return <div className="p-10">Segmento não encontrado. <Link to="/">Voltar</Link></div>;
    }

    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const scrollToPageTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const scrollToAutomotivoModuleContent = () => {
        const element = automotivoModuleContentRef.current;
        if (!element) return;
        const headerOffset = 110;
        const targetTop = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
    };
    const handleAutomotivoModuleSelect = (moduleTitle: string) => {
        setSelectedAutoModule(moduleTitle);
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                scrollToAutomotivoModuleContent();
            });
        });
    };

    const startPdfDownload = async () => {
        if (isDownloadingPdf) return;

        const pendingWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (pendingWindow) {
            pendingWindow.document.write(`
                <html>
                    <head><title>Gerando PDF...</title></head>
                    <body style="font-family: Arial, sans-serif; padding: 24px;">
                        <h2 style="margin: 0 0 8px;">Gerando PDF em alta qualidade...</h2>
                        <p style="margin: 0; color: #555;">Aguarde alguns segundos.</p>
                    </body>
                </html>
            `);
            pendingWindow.document.close();
        }

        try {
            setIsDownloadingPdf(true);
            const pdfBlob = await buildSegmentPresentationPdf(presentationSegment);
            const blobUrl = URL.createObjectURL(pdfBlob);
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isMobile && pendingWindow && !pendingWindow.closed) {
                pendingWindow.location.href = blobUrl;
            } else {
                if (pendingWindow && !pendingWindow.closed) {
                    pendingWindow.close();
                }
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = `facilco-${segment.id}-apresentacao.pdf`;
                downloadLink.rel = 'noopener';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }

            setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
        } catch (error) {
            console.error(error);
            if (pendingWindow && !pendingWindow.closed) {
                pendingWindow.close();
            }
            window.alert('Nao foi possivel gerar o PDF agora. Tente novamente em alguns segundos.');
        } finally {
            setIsDownloadingPdf(false);
        }
    };

    const headerTitle = segment.id === 'templos-religiosos' ? 'Templos religiosos' : segment.title;
    const isEdificacoes = segment.id === 'edificacoes';
    const isAutomotivo = segment.id === 'automotivo';
    const panelRadiusClass = isAutomotivo ? 'rounded-[6px]' : 'rounded-2xl';
    const smallRadiusClass = isAutomotivo ? 'rounded-[6px]' : 'rounded-xl';
    const sectionTitleClass = 'text-center';
    const automotivoFontThemeClass = isAutomotivo ? 'automotivo-font-theme' : '';
    const automotivoSubtitleClass = isAutomotivo ? 'automotivo-subtitle' : '';
    const normalizeAutomotivoHeading = (text: string) => {
        if (!isAutomotivo) return text;
        const normalized = text.trim().replace(/\s+/g, ' ');
        const onlyLetters = normalized.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ]/g, '');
        const uppercaseLetters = onlyLetters.replace(/[^A-ZÀ-ÖØ-Þ]/g, '');
        const uppercaseRatio = onlyLetters.length > 0 ? uppercaseLetters.length / onlyLetters.length : 0;
        if (uppercaseRatio < 0.6) return normalized;
        const lower = normalized.toLocaleLowerCase('pt-BR');
        return `${lower.charAt(0).toLocaleUpperCase('pt-BR')}${lower.slice(1)}`;
    };
    const displayFaq = useMemo(() => {
        if (!segment.faq) return [];
        if (!isAutomotivo) return segment.faq;
        const blockedQuestions = new Set([
            'Fazem obras com prazos apertados?',
            'Fazem reformas sem parar a produção?'
        ]);
        return segment.faq.filter((faq) => !blockedQuestions.has(faq.question));
    }, [segment.faq, isAutomotivo]);
    const activeConstructionModule = useMemo(() => {
        if (!segment.constructionModules?.length) return null;
        return segment.constructionModules.find((module) => module.title === selectedAutoModule) ?? segment.constructionModules[0];
    }, [selectedAutoModule, segment.constructionModules]);
    const automotivoModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura Especializada': '/automotivo/automotivo-08-construcao.jpg',
        'Estruturas para Linhas de Montagem': '/automotivo/automotivo-04-robotica.jpg',
        'Pisos com Tolerância Milimétrica': '/automotivo/automotivo-05-gestao-visual.jpg',
        'Alvenaria Estrutural e Vedações': '/automotivo/hf_20260217_073707_4bb43a57-3dd4-4857-b9b0-e8ef3a5dbcda.png',
        'Coberturas e Estruturas de Telhado': '/automotivo/hf_20260217_073722_f7632abe-9677-48fd-b309-7fe8250dc7f0.png',
        'Instalações Elétricas e Utilidades': '/automotivo/automotivo-10-diferenciais-2.jpg',
        'Terraplenagem e Contenção': '/automotivo/hf_20260217_073747_5b1fca1e-dd5d-4c8e-9b0c-190436ff7196.png',
        'Compliance e Certificações': '/automotivo/hf_20260217_074359_571767df-55e5-4bf7-ac42-837a64ddcc81.png'
    };
    const farmaceuticaModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura Especializada': '/farmaceutica/farmaceutica-13-fundacoes-infraestrutura.jpg',
        'Estruturas para Operações Farmacêuticas': '/farmaceutica/farmaceutica-10-estruturas-operacoes.jpg',
        'Pisos e Paredes Sanitárias': '/farmaceutica/farmaceutica-11-pisos-paredes-sanitarias.jpg',
        'Sistemas de Gases Medicinais e Utilidades': '/farmaceutica/farmaceutica-12-gases-medicinais-utilidades.jpg'
    };
    const templosModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura': '/templos/templo-18-fundacoes-infraestrutura.jpg',
        'Estruturas para Grandes Vãos Livres': '/templos/templo-19-estrutura-grandes-vaos.jpg',
        'Coberturas e Estruturas de Telhado': '/templos/templo-20-coberturas-telhado.jpg',
        'Pisos e Contrapisos': '/templos/templo-21-instalacoes-hidrossanitarias-eletricas.jpg',
        'Instalações Hidrossanitárias e Elétricas': '/templos/templo-22-instalacoes-hidrossanitarias-eletricas.jpg',
        'Compliance e Certificações': '/templos/compliance.jpeg'
    };
    const rodoviasModuleImages: Record<string, string> = {
        'Pavimentação Asfáltica': '/ccr-rodovias/asfaltica.jpeg',
        'Sistemas de Drenagem Rodoviária': '/ccr-rodovias/drenagem.jpeg',
        'Terraplanagem e Preparo de Leito': '/ccr-rodovias/leito.jpeg',
        'Viadutos, Pontes e Estruturas': '/ccr-rodovias/viaduto.jpeg',
        'Compliance e Certificações Rodoviárias': '/ccr-rodovias/complicance.jpeg'
    };
    const logisticaModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura': '/logistica/logistica-10-fundacoes-infraestrutura.jpg',
        'Estruturas para Grandes Vãos Livres': '/logistica/logistica-11-estruturas-grandes-vaos.jpg',
        'Alvenaria Estrutural e Vedações': '/logistica/logistica-12-alvenaria-vedacoes.jpg',
        'Coberturas e Estruturas de Telhado': '/logistica/logistica-13-coberturas-telhado.jpg',
        'Pisos e Contrapisos': '/logistica/logistica-14-pisos-contrapisos.jpg',
        'Instalações Hidrossanitárias e Elétricas': '/logistica/logistica-15-instalacoes-hidrossanitarias-eletricas.jpg',
        'Terraplenagem e Contenção de Encostas': '/logistica/logistica-16-terraplenagem-contencao.jpg'
    };
    const edificacoesModuleImages: Record<string, string> = {
        'Estruturas em Concreto ou Aço': '/edificacoes/hf_20260217_071130_08735654-b4e2-4a69-a003-eb655f126d09.png',
        'Instalações Elétricas e Hidrossanitárias': '/edificacoes/hf_20260217_071140_1d3804fd-8734-4d3d-965e-d4c992413d21.png',
        'Acabamentos e Segurança': '/edificacoes/hf_20260217_071148_1be73440-6582-436c-b9b0-ad2113ae6f3f.png',
        'Acessibilidade e Conformidade': '/edificacoes/hf_20260217_071156_9634b35c-f169-4059-bcc6-dc756a774472.png',
        'Compliance e Certificações': '/edificacoes/hf_20260217_071207_5fb90051-8d5b-4a65-86f4-7a0fd921fa60.png'
    };
    const agroindustriaModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura Especializada': '/agroindustria/hf_20260217_072656_24605925-82b7-445c-a9e8-02e7e12542f2.png',
        'Estruturas para Silos e Armazenagem': '/agroindustria/hf_20260217_072706_6d4fc82a-6cc8-40a1-9bfd-6df1b3264c4f.png',
        'Pisos e Pátios Especializados': '/agroindustria/hf_20260217_072714_9600e37e-996e-48df-8835-ced52167dfd1.png',
        'Câmaras Frigoríficas Agrícolas': '/agroindustria/hf_20260217_073200_571ea7e5-2ae6-4e6b-a91b-cfcd72f107e1.png',
        'Instalações e Sistemas de Movimentação': '/agroindustria/hf_20260217_072737_7393d783-6798-4495-9db5-ff06e2305a2f.png',
        'Terraplenagem e Drenagem Agrícola': '/agroindustria/hf_20260217_072746_c3d06749-4b76-4825-a4a4-02f95b319c57.png',
        'Compliance e Certificações Ambientais': '/agroindustria/hf_20260217_072758_08662713-4800-4883-b655-629ffb13c1ab.png'
    };
    const alimenticiaModuleImages: Record<string, string> = {
        'Estruturas para Indústrias Alimentícias': '/alimenticia/hf_20260217_074924_0a9dd0ca-61f6-4466-8e62-348adad8400b.png',
        'Pisos e Paredes Sanitárias': '/alimenticia/hf_20260217_074943_43a6072b-566d-443a-a992-93c687f891bb.png',
        'Câmaras Frigoríficas e Congelamento': '/alimenticia/hf_20260217_074954_13ffc344-ea06-4eb1-b477-d1536a7d8aa5.png',
        'Instalações Hidrossanitárias Especiais': '/alimenticia/hf_20260217_075013_97c7f8ae-92da-4a0d-a028-2bac44994435.png',
        'Terraplenagem e Drenagem de Terreno': '/alimenticia/hf_20260217_075503_b9f4f568-580e-4f14-9870-4866b3fd19ee.png',
        'Compliance e Certificações': '/alimenticia/hf_20260217_075047_20963064-bf06-4b84-9e82-d05df0ca6fe4.png'
    };
    const quimicaModuleImages: Record<string, string> = {
        'Fundações e Infraestrutura Especial': '/quimica/hf_20260217_075750_177a191d-16cc-4540-8aec-cc0082b85fcd.png',
        'Pisos Especiais Resistentes a Químicos': '/quimica/hf_20260217_075821_c4cad1f9-a922-4c99-864d-8f90f690f306.png',
        'Alvenaria Estrutural e Vedações Especiais': '/quimica/hf_20260217_080403_123a5723-d1c9-48a1-b975-85128f255220.png',
        'Coberturas e Estruturas de Telhado': '/quimica/hf_20260217_075928_935e8ca5-9664-450d-afa3-e0a42f2954f6.png',
        'Instalações Hidrossanitárias Especiais': '/quimica/hf_20260217_075938_5999f01b-c8e4-4c05-83fe-b05d102f544f.png',
        'Terraplenagem e Contenção': '/quimica/hf_20260217_080005_bbe8f4da-c706-4356-bf11-f72b07e902b3.png',
        'Compliance e Certificações': '/quimica/hf_20260217_080021_721a3632-1fb6-4a1a-b2c1-494aec94975a.png'
    };
    const automotivoBackdropImage = '/automotivo/automotivo-08-construcao.jpg';
    const sectionBackdropImage = segment.id === 'automotivo' ? automotivoBackdropImage : segment.details.heroImage;
    const modulePreviewImages = useMemo(() => {
        const carouselImages = (segment.middleCarousel ?? []).map((item) => item.src);
        const slideImages = (segment.slides ?? [])
            .map((slide) => slide.image)
            .filter((image): image is string => Boolean(image));
        const imagePool = [...carouselImages, ...slideImages, segment.details.heroImage].filter(Boolean);
        const fallbackImage = imagePool[0] ?? '/hero-cinematic.png';
        const entries = (segment.constructionModules ?? []).map((module, index) => {
            const mappedAutomotivoImage = automotivoModuleImages[module.title];
            const mappedFarmaceuticaImage =
                segment.id === 'farmaceutica' ? farmaceuticaModuleImages[module.title] : undefined;
            const mappedTemplosImage =
                segment.id === 'templos-religiosos' ? templosModuleImages[module.title] : undefined;
            const mappedRodoviasImage =
                segment.id === 'rodovias' ? rodoviasModuleImages[module.title] : undefined;
            const mappedLogisticaImage =
                segment.id === 'logistica' ? logisticaModuleImages[module.title] : undefined;
            const mappedEdificacoesImage =
                segment.id === 'edificacoes' ? edificacoesModuleImages[module.title] : undefined;
            const mappedAgroindustriaImage =
                segment.id === 'agroindustria' ? agroindustriaModuleImages[module.title] : undefined;
            const mappedAlimenticiaImage =
                segment.id === 'alimenticia' ? alimenticiaModuleImages[module.title] : undefined;
            const mappedQuimicaImage =
                segment.id === 'quimica' ? quimicaModuleImages[module.title] : undefined;
            const image = mappedAutomotivoImage
                ?? mappedFarmaceuticaImage
                ?? mappedTemplosImage
                ?? mappedRodoviasImage
                ?? mappedLogisticaImage
                ?? mappedEdificacoesImage
                ?? mappedAgroindustriaImage
                ?? mappedAlimenticiaImage
                ?? mappedQuimicaImage
                ?? imagePool[index % imagePool.length]
                ?? fallbackImage;
            return [module.title, image] as const;
        });
        return Object.fromEntries(entries) as Record<string, string>;
    }, [segment.middleCarousel, segment.slides, segment.details.heroImage, segment.constructionModules, segment.id, isAutomotivo]);
    const presentationSegment = useMemo(() => {
        if (!segment.constructionModules?.length || !segment.slides?.length) return segment;

        const moduleEntries = segment.constructionModules
            .map((module) => ({
                title: module.title,
                normalizedTitle: normalizeText(module.title),
                image: modulePreviewImages[module.title]
            }))
            .filter((entry): entry is { title: string; normalizedTitle: string; image: string } => Boolean(entry.image));

        if (!moduleEntries.length) return segment;

        const moduleImageSequence = moduleEntries.map((entry) => entry.image);
        let sequenceIndex = 0;

        const getSequentialImage = () => {
            const image = moduleImageSequence[sequenceIndex % moduleImageSequence.length];
            sequenceIndex += 1;
            return image;
        };

        const getMatchedModuleImage = (slideTitle?: string, slideContent?: string) => {
            const normalizedSlideTitle = normalizeText(slideTitle ?? '');
            const normalizedSlideContent = normalizeText(slideContent ?? '');

            const directTitleMatch = moduleEntries.find(
                (entry) =>
                    normalizedSlideTitle === entry.normalizedTitle ||
                    normalizedSlideTitle.includes(entry.normalizedTitle) ||
                    entry.normalizedTitle.includes(normalizedSlideTitle)
            );
            if (directTitleMatch) return directTitleMatch.image;

            const contentMatch = moduleEntries.find(
                (entry) => normalizedSlideContent.length > 0 && normalizedSlideContent.includes(entry.normalizedTitle)
            );
            return contentMatch?.image;
        };

        const alignedSlides = segment.slides.map((slide) => {
            if (slide.type === 'gallery') {
                if (!moduleImageSequence.length) return slide;
                const galleryImages = Array.from({ length: 3 }, (_, index) => moduleImageSequence[index % moduleImageSequence.length]);
                return { ...slide, galleryImages };
            }

            if (!slide.image) return slide;
            const matchedImage = getMatchedModuleImage(slide.title, slide.content);
            const image = matchedImage ?? getSequentialImage();
            return { ...slide, image };
        });

        return {
            ...segment,
            slides: alignedSlides
        };
    }, [segment, modulePreviewImages]);
    const edificacoesMainModules = useMemo(() => {
        if (!isEdificacoes || !segment.constructionModules?.length) return [];
        const orderedTitles = [
            'Fundações e Infraestrutura',
            'Estruturas em Concreto ou Aço',
            'Instalações Elétricas e Hidrossanitárias',
            'Acabamentos e Segurança',
            'Acessibilidade e Conformidade',
            'Compliance e Certificações'
        ];
        const ordered = orderedTitles
            .map((title) => segment.constructionModules?.find((module) => module.title === title))
            .filter((module): module is NonNullable<typeof segment.constructionModules>[number] => Boolean(module));
        const remaining = segment.constructionModules.filter(
            (module) => !orderedTitles.includes(module.title)
        );
        return [...ordered, ...remaining];
    }, [isEdificacoes, segment.constructionModules]);

    if (false && isEdificacoes) {
        return (
            <div className="min-h-screen bg-white font-sans text-[#111111]">
                <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
                        <button onClick={scrollToPageTop} className="justify-self-start">
                            <img src="/logo.png" alt="Facilco" className="h-9 md:h-10 w-auto object-contain" />
                        </button>
                        <div className="justify-self-center text-center flex items-center gap-2">
                            <Link
                                to="/"
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#111111] hover:text-brand-yellow transition-colors"
                                aria-label="Ir para home"
                            >
                                <Home size={16} />
                            </Link>
                            <span className="font-semibold text-xs sm:text-sm md:text-lg text-[#111111]">
                                {headerTitle}
                            </span>
                        </div>
                        <div className="flex items-center justify-self-end">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="whitespace-nowrap bg-green-500 text-[#111111] px-2.5 py-2 sm:px-3 md:px-4 rounded text-[10px] sm:text-xs md:text-sm font-semibold hover:bg-green-400 transition-colors border border-transparent"
                                style={{ borderRadius: '6px' }}
                            >
                                Falar com a Facilco
                            </a>
                        </div>
                    </div>
                </header>

                <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        {segment.details.heroVideo ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster={segment.details.heroImage}
                                className="w-full h-full object-cover"
                            >
                                <source src={segment.details.heroVideo} type="video/mp4" />
                            </video>
                        ) : (
                            <img src={segment.details.heroImage} alt={segment.title} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center md:text-left"
                        >
                            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                                <div className="p-3 bg-brand-yellow rounded-lg text-brand-dark shadow-lg shadow-brand-yellow/20">
                                    <segment.icon size={32} />
                                </div>
                                <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">Setor de Atuação</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                {segment.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-lg font-light leading-relaxed drop-shadow-md mx-auto md:mx-0">
                                {segment.subtitle}
                            </p>
                            <div className="grid w-full max-w-4xl grid-cols-2 gap-2 md:gap-3">
                                <button
                                    onClick={() => setShowPresentation(true)}
                                    className="group min-w-0 w-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-brand-yellow text-brand-dark text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-2 sm:px-3 md:px-4 rounded hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    style={{ borderRadius: '6px' }}
                                >
                                    <Play size={15} className="fill-current hidden sm:block" />
                                    Ver Apresentação
                                </button>
                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="min-w-0 w-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md text-white border border-white/30 text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-2 sm:px-3 md:px-4 rounded hover:bg-white hover:text-brand-dark transition-all"
                                    style={{ borderRadius: '6px' }}
                                >
                                    Solicitar Orçamento
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <main className="bg-gray-50">
                    <section className="py-14 md:py-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <div className="mb-8">
                                <h2 className="text-[32px] md:text-[36px] font-display font-bold text-[#111111]">Engenharia Especializada</h2>
                                <p className="text-[17px] text-gray-600 mt-3 max-w-3xl">{segment.details.content}</p>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <article className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-brand-yellow mb-4">
                                        <Building2 size={22} />
                                    </div>
                                    <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-3">Construção Civil e Obras</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Gestão completa de obras industriais e comerciais, incluindo projetos arquitetônicos, instalações elétricas e hidrossanitárias, adequações normativas, pavimentação e terraplenagem.
                                    </p>
                                    <a href="#blocos-tecnicos" className="inline-flex items-center gap-1 text-brand-dark font-semibold mt-4 hover:text-brand-yellow transition-colors">
                                        Saiba mais <ArrowRight size={15} />
                                    </a>
                                </article>
                                <article className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-brand-yellow mb-4">
                                        <HardHat size={22} />
                                    </div>
                                    <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-3">Condomínios Residenciais e Industriais</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Manutenção preventiva e corretiva, reformas de áreas comuns, adequações de acessibilidade e gestão técnica para síndicos com foco em valorização patrimonial.
                                    </p>
                                    <a href="#blocos-tecnicos" className="inline-flex items-center gap-1 text-brand-dark font-semibold mt-4 hover:text-brand-yellow transition-colors">
                                        Saiba mais <ArrowRight size={15} />
                                    </a>
                                </article>
                            </div>
                        </div>
                    </section>

                    <section className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-4">Destaques Técnicos</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {segment.details.features.map((feature) => (
                                    <div key={feature} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full bg-brand-yellow"></span>
                                        <span className="text-sm font-medium text-[#111111]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {segment.extendedContent && (
                        <section className="pb-14 md:pb-16">
                            <div className="container mx-auto px-6 max-w-6xl">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                    <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                        <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <h4 className="text-xl font-bold text-[#111111] mb-3">Desafios</h4>
                                        <p className="text-gray-600 leading-relaxed">{segment.extendedContent.challenges}</p>
                                    </article>
                                    <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                        <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <h4 className="text-xl font-bold text-[#111111] mb-3">Solução</h4>
                                        <p className="text-gray-600 leading-relaxed">{segment.extendedContent.solutions}</p>
                                    </article>
                                    <article className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                        <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                            <TrendingUp size={20} />
                                        </div>
                                        <h4 className="text-xl font-bold text-[#111111] mb-3">Resultados</h4>
                                        <p className="text-gray-600 leading-relaxed">{segment.extendedContent.results}</p>
                                    </article>
                                </div>
                            </div>
                        </section>
                    )}

                    <section id="blocos-tecnicos" className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-5">Construção Civil Aplicada</h3>
                            <div className="space-y-4">
                                {edificacoesMainModules.map((module, moduleIndex) => (
                                    <details
                                        key={module.title}
                                        open={moduleIndex === 0}
                                        className={`${moduleIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border border-gray-200 rounded-2xl p-5`}
                                    >
                                        <summary className="list-none cursor-pointer flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-[22px] font-bold text-[#111111]">{module.title}</p>
                                                {module.subtitle && (
                                                    <p className="text-xs uppercase tracking-widest text-brand-yellow font-semibold mt-1">{module.subtitle}</p>
                                                )}
                                            </div>
                                            <span className="text-brand-yellow text-2xl leading-none">+</span>
                                        </summary>
                                        <p className="text-gray-600 leading-relaxed mt-4">{module.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                                            {module.sections.map((section) => (
                                                <div key={`${module.title}-${section.title}`} className="bg-white rounded-xl border border-gray-200 p-4">
                                                    <p className="text-xs uppercase tracking-widest text-brand-yellow font-bold mb-2">{section.title}</p>
                                                    <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                                                        {section.items.map((item) => (
                                                            <li key={item}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>

                    {segment.executionPhases && (
                        <section className="pb-14 md:pb-16">
                            <div className="container mx-auto px-6 max-w-6xl">
                                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-5">Sobre a implantação</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {segment.executionPhases.map((phase, index) => (
                                        <article key={phase.phase} className="bg-white border border-gray-200 rounded-2xl p-5">
                                            <p className="text-[11px] uppercase tracking-widest text-brand-yellow font-semibold mb-2">
                                                {['Mapeamento operacional', 'Implantação', 'Estabilização'][index] ?? phase.title}
                                            </p>
                                            <p className="text-gray-600">{phase.description}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {segment.faq && (
                        <section className="pb-14 md:pb-16">
                            <div className="container mx-auto px-6 max-w-6xl">
                                <h3 className="text-[22px] md:text-[24px] font-bold text-[#111111] mb-5">Perguntas Frequentes</h3>
                                <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-200">
                                    {segment.faq.map((faq) => (
                                        <details key={faq.question} className="group px-5 py-4">
                                            <summary className="list-none cursor-pointer flex items-start justify-between gap-3">
                                                <span className="font-semibold text-[#111111]">{faq.question}</span>
                                                <span className="text-brand-yellow text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                                            </summary>
                                            <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <WhereWeAre />

                <footer className="bg-[#111111] text-[#c9d0d8]">
                    <div className="container mx-auto px-6 py-10 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div>
                                <p className="text-white font-bold text-lg mb-2">Facilco Engenharia</p>
                                <p className="text-sm leading-relaxed">Soluções técnicas para construção civil, regularização e infraestrutura especializada.</p>
                            </div>
                            <div>
                                <p className="text-white font-semibold mb-2">Navegação</p>
                                <div className="space-y-2 text-sm">
                                    <Link to="/" className="block text-gray-300 hover:text-brand-yellow transition-colors">Início</Link>
                                    <Link to="/catalogo" className="block text-gray-300 hover:text-brand-yellow transition-colors">Catálogo</Link>
                                    <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="block text-brand-yellow hover:underline">Falar com a Facilco</a>
                                </div>
                            </div>
                            <div>
                                <p className="text-white font-semibold mb-2">Contato</p>
                                <p className="text-sm">engenharia@facilco.com.br</p>
                                <p className="text-sm mt-1">(19) 99622-3433</p>
                            </div>
                        </div>
                    </div>
                </footer>

                <PresentationOverlay
                    isOpen={showPresentation}
                    onClose={() => setShowPresentation(false)}
                    segment={presentationSegment}
                    onDownload={startPdfDownload}
                    isDownloading={isDownloadingPdf}
                />

                {isDownloadingPdf && (
                    <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center px-6">
                        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
                            <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">Gerando PDF</h3>
                            <p className="text-gray-600">Preparando a versão em alta qualidade para download.</p>
                        </div>
                    </div>
                )}

                <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-white font-sans text-brand-dark ${automotivoFontThemeClass}`}>
            <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 md:px-6 md:py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.12)]">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-4">
                    <button onClick={scrollToPageTop} className="justify-self-start">
                        <img src="/logo.png" alt="Facilco" className="h-9 md:h-10 w-auto object-contain" />
                    </button>
                    <div className="justify-self-center text-center flex items-center gap-2">
                        <Link
                            to="/"
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand-dark hover:text-brand-yellow transition-colors"
                            aria-label="Ir para home"
                        >
                            <Home size={16} />
                        </Link>
                        <span className="font-semibold text-xs sm:text-sm md:text-lg text-brand-dark">
                            {headerTitle}
                        </span>
                    </div>
                    <div className="flex items-center justify-self-end">
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noreferrer"
                            className="whitespace-nowrap bg-green-500 text-brand-dark px-2.5 py-2 sm:px-3 md:px-4 rounded text-[10px] sm:text-xs md:text-sm font-semibold hover:bg-green-400 transition-colors border border-transparent"
                            style={{ borderRadius: '6px' }}
                        >
                            Falar com a Facilco
                        </a>
                    </div>
                </div>
            </header>

            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    {segment.details.heroVideo ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={segment.details.heroImage}
                            className="w-full h-full object-cover"
                        >
                            <source src={segment.details.heroVideo} type="video/mp4" />
                        </video>
                    ) : (
                        <img src={segment.details.heroImage} alt={segment.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center md:text-left"
                    >
                        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                            <div className="p-3 bg-brand-yellow rounded-lg text-brand-dark shadow-lg shadow-brand-yellow/20">
                                <segment.icon size={32} />
                            </div>
                            <span className={`text-brand-yellow font-bold uppercase tracking-widest text-sm ${automotivoSubtitleClass}`}>Setor de Atuação</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                            {segment.title}
                        </h1>
                        <p className={`text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed drop-shadow-md mx-auto md:mx-0 ${isAutomotivo ? 'max-w-2xl' : 'max-w-lg'} ${automotivoSubtitleClass}`}>
                            {segment.subtitle}
                        </p>

                        <div className="grid w-full max-w-4xl grid-cols-2 gap-2 md:gap-3">
                            <button
                                onClick={() => setShowPresentation(true)}
                                className="group min-w-0 w-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-brand-yellow text-brand-dark text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-2 sm:px-3 md:px-4 rounded hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                style={{ borderRadius: '6px' }}
                            >
                                <Play size={15} className="fill-current hidden sm:block" />
                                Ver Apresentação
                            </button>
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="min-w-0 w-full whitespace-nowrap flex items-center justify-center gap-1.5 bg-white/10 backdrop-blur-md text-white border border-white/30 text-[10px] sm:text-xs md:text-sm font-semibold py-2 px-2 sm:px-3 md:px-4 rounded hover:bg-white hover:text-brand-dark transition-all"
                                style={{ borderRadius: '6px' }}
                            >
                                Solicitar Orçamento
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <main className="bg-gray-50">
                <section className="py-14 md:py-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="mb-8">
                            <h2 className={`text-[32px] md:text-[36px] font-display font-bold text-[#111111] ${sectionTitleClass}`}>Engenharia Especializada</h2>
                            {segment.id !== 'templos-religiosos' && (
                                <p className={`text-[17px] text-gray-600 mt-3 max-w-4xl leading-relaxed ${isAutomotivo ? 'text-center mx-auto' : ''} ${automotivoSubtitleClass}`}>
                                    {segment.details.content}
                                </p>
                            )}
                            {segment.id === 'templos-religiosos' && (
                                <div className="mt-4 space-y-4">
                                    <p className="text-sm uppercase tracking-widest font-semibold text-brand-yellow">
                                        Construção e Segurança para Templos
                                    </p>
                                    <p className="text-[17px] text-gray-600 leading-relaxed">
                                        Realizamos projetos completos de construção civil, incluindo AVCB (Corpo de Bombeiros), acessibilidade universal
                                        (rampas, corrimãos, pisos táteis) e adequações estruturais para grandes aglomerações de pessoas.
                                    </p>
                                    <p className="text-[17px] text-gray-600 leading-relaxed">Oferecemos serviços completos de:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm">
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Construção de templos novos (fundação ao acabamento estrutural)</li>
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Reformas e ampliações estruturais</li>
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Adequações de segurança (AVCB, rotas de fuga, iluminação de emergência)</li>
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Acessibilidade conforme NBR 9050</li>
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Reforço estrutural em templos históricos</li>
                                        <li className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3`}>Infraestrutura para instalações prediais (rasgos, dutos, shafts)</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {segment.constructionModules && segment.constructionModules.length > 0 && (
                    <section className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h3 className={`text-[22px] md:text-[24px] font-bold text-[#111111] mb-5 ${sectionTitleClass}`}>Construção Civil Aplicada</h3>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {segment.constructionModules.map((module) => {
                                        const isActive = activeConstructionModule?.title === module.title;
                                        const previewImage = modulePreviewImages[module.title] ?? segment.details.heroImage;
                                        return (
                                            <button
                                                key={module.title}
                                                type="button"
                                                onClick={() => handleAutomotivoModuleSelect(module.title)}
                                                className={`group relative overflow-hidden border ${panelRadiusClass} p-4 transition-all duration-300 aspect-[4/3] hover:scale-[1.03] ${
                                                    isActive
                                                        ? 'border-brand-yellow bg-white shadow-lg'
                                                        : 'border-gray-200 bg-white text-brand-dark hover:-translate-y-1 hover:shadow-lg hover:border-brand-yellow/70'
                                                }`}
                                            >
                                                <div className="absolute inset-0 opacity-100 transition-opacity duration-300 pointer-events-none">
                                                    <img
                                                        src={previewImage}
                                                        alt={module.title}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/80"></div>
                                                </div>
                                                <div className="relative z-10 h-full flex flex-col justify-between items-center text-center">
                                                    <p className="text-sm md:text-base font-semibold text-white drop-shadow-sm leading-tight">
                                                        {module.title}
                                                    </p>
                                                    <div className="w-8 h-px bg-white/70"></div>
                                                    <p className={`text-xs text-gray-100 font-light drop-shadow ${automotivoSubtitleClass}`}>Clique para ampliar</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {activeConstructionModule && (
                                    <article ref={automotivoModuleContentRef} className={`bg-white border border-gray-200 ${panelRadiusClass} p-6 md:p-8 shadow-sm`}>
                                        <h4 className="text-2xl font-bold text-brand-dark text-center mt-1 mb-3">{activeConstructionModule.title}</h4>
                                        {activeConstructionModule.subtitle && (
                                            <p className={`text-sm text-brand-yellow font-semibold text-center ${automotivoSubtitleClass}`}>
                                                {normalizeAutomotivoHeading(activeConstructionModule.subtitle)}
                                            </p>
                                        )}
                                        <p className="text-gray-600 leading-relaxed mt-6">{activeConstructionModule.description}</p>
                                        {!activeConstructionModule.title.toLocaleLowerCase('pt-BR').includes('terraplenagem') && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                                {activeConstructionModule.sections.map((section, sectionIndex) => (
                                                    <div
                                                        key={`${activeConstructionModule.title}-${section.title}`}
                                                        className={`${sectionIndex > 0 ? 'md:border-l md:border-gray-200 md:pl-6' : ''} py-1`}
                                                    >
                                                        <p className="text-sm font-bold text-brand-dark mb-3">{normalizeAutomotivoHeading(section.title)}</p>
                                                        <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                                                            {section.items.map((item) => (
                                                                <li key={item}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {activeConstructionModule.title.toLocaleLowerCase('pt-BR').includes('terraplenagem') && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                                {activeConstructionModule.sections.map((section) => (
                                                    <div key={`${activeConstructionModule.title}-${section.title}`} className={`bg-gray-50 border border-gray-200 ${panelRadiusClass} p-5 aspect-[4/3]`}>
                                                        <p className="text-sm font-bold text-brand-dark mb-3">{normalizeAutomotivoHeading(section.title)}</p>
                                                        <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                                                            {section.items.map((item) => (
                                                                <li key={item}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {segment.constructionModules && segment.constructionModules.length > 0 && (
                    <section className="pb-12 md:pb-14">
                        <div className="container mx-auto px-6 max-w-6xl text-center">
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center bg-green-500 text-brand-dark px-8 py-3 text-sm md:text-base font-semibold rounded hover:bg-green-400 transition-colors border border-transparent"
                                style={{ borderRadius: '6px' }}
                            >
                                Falar com a Facilco
                            </a>
                        </div>
                    </section>
                )}

                <section className="pb-14 md:pb-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <h3 className={`text-[22px] md:text-[24px] font-bold text-[#111111] mb-4 ${sectionTitleClass}`}>Destaques Técnicos</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {segment.details.features.map((feature) => (
                                <div key={feature} className={`bg-white border border-gray-200 ${smallRadiusClass} px-4 py-3 flex items-center gap-3`}>
                                    <CheckCircle size={16} className="text-brand-yellow shrink-0" />
                                    <span className="text-sm font-medium text-[#111111]">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {segment.extendedContent && (
                    <section className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                                <article className={`bg-white border border-gray-200 ${panelRadiusClass} p-6 shadow-sm`}>
                                    <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                        <AlertTriangle size={20} />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#111111] mb-3">Desafios</h4>
                                    <p className="text-gray-600 leading-relaxed">{segment.extendedContent.challenges}</p>
                                </article>
                                <article className={`bg-white border border-gray-200 ${panelRadiusClass} p-6 shadow-sm`}>
                                    <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#111111] mb-3">Solução</h4>
                                    <p className="text-gray-600 leading-relaxed">{segment.extendedContent.solutions}</p>
                                </article>
                                <article className={`bg-white border border-gray-200 ${panelRadiusClass} p-6 shadow-sm`}>
                                    <div className="w-11 h-11 rounded-full border border-brand-yellow/70 flex items-center justify-center text-brand-dark mb-4">
                                        <TrendingUp size={20} />
                                    </div>
                                    <h4 className="text-xl font-bold text-[#111111] mb-3">Resultados</h4>
                                    <p className="text-gray-600 leading-relaxed">{segment.extendedContent.results}</p>
                                </article>
                            </div>
                        </div>
                    </section>
                )}

                {segment.middleCarousel && segment.middleCarousel.length > 0 && (
                    <section className="pb-14 md:pb-16 bg-white">
                        <div className="pt-10 md:pt-12">
                            <FullBleedImageCarousel
                                title="Galeria Operacional"
                                subtitle="Centros de distribuição e galpões logísticos no Brasil."
                                images={segment.middleCarousel}
                            />
                        </div>
                    </section>
                )}

                {segment.constructionOverview && (
                    <section className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
                                <article className={`lg:col-span-3 bg-white p-8 ${panelRadiusClass} border border-gray-200 shadow-sm h-full`}>
                                    <h3 className={`text-2xl font-display font-bold text-brand-dark mb-4 flex items-center gap-3 ${isAutomotivo ? 'justify-center' : ''}`}>
                                        <Building2 className="text-brand-yellow" size={24} />
                                        Panorama da Construção Civil no Segmento
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">{segment.constructionOverview}</p>
                                </article>
                                <div className={`lg:col-span-2 ${panelRadiusClass} overflow-hidden border border-gray-200 shadow-sm h-full min-h-[260px]`}>
                                    <img
                                        src={segment.details.heroImage}
                                        alt={`${segment.title} - panorama`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {segment.civilScopes && segment.civilScopes.length > 0 && (
                    <section className="pb-14 md:pb-16">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h3 className={`text-[22px] md:text-[24px] font-bold text-[#111111] mb-5 ${sectionTitleClass}`}>Frentes de Obra e Infraestrutura Crítica</h3>
                            <div className="space-y-6">
                                {segment.civilScopes.map((scope) => (
                                    <div key={scope.title} className="border-b border-gray-300 pb-6 last:border-b-0">
                                        <h4 className="text-2xl font-bold text-brand-dark text-center mb-3">{scope.title}</h4>
                                        <p className="text-gray-600 leading-relaxed mb-4 text-center">{scope.description}</p>
                                        <ul className="space-y-2 max-w-4xl mx-auto">
                                            {scope.highlights.map((item) => (
                                                <li key={item} className="text-sm text-gray-700 list-disc ml-6">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {segment.executionPhases && segment.executionPhases.length > 0 && (
                    <section className="pb-14 md:pb-16 relative overflow-hidden pt-14 md:pt-16">
                        <div className="absolute inset-0">
                            <img src={sectionBackdropImage} alt={`Fundo ${segment.title}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/75" />
                        </div>
                        <div className="container mx-auto px-6 max-w-6xl relative z-10">
                            <h3 className={`text-[22px] md:text-[24px] font-bold mb-5 ${sectionTitleClass} text-brand-yellow`}>Sobre a implantação</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {segment.executionPhases.map((phase, index) => (
                                    <article key={`${phase.phase}-${phase.title}`} className="bg-[#f5f5ef] border border-gray-200 rounded-[6px] p-6 shadow-sm h-full">
                                        <p className={`text-[11px] uppercase tracking-widest text-brand-yellow font-semibold mb-2 ${automotivoSubtitleClass}`}>
                                            {['Mapeamento operacional', 'Implantação', 'Estabilização'][index] ?? phase.title}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {segment.complianceHighlights && segment.complianceHighlights.length > 0 && (
                    <section className="pb-14 md:pb-16 relative overflow-hidden pt-14 md:pt-16">
                        <div className="absolute inset-0">
                            <img src={sectionBackdropImage} alt={`Fundo ${segment.title}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/75" />
                        </div>
                        <div className="container mx-auto px-6 max-w-6xl relative z-10">
                            <h3 className={`text-[22px] md:text-[24px] font-bold mb-5 ${sectionTitleClass} text-brand-yellow`}>Requisitos e Normas Aplicáveis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {segment.complianceHighlights.map((item) => (
                                    <article key={`${item.title}-${item.norm}`} className="bg-[#f5f5ef] border border-gray-200 rounded-[6px] p-6 shadow-sm h-full">
                                        <p className={`text-xs uppercase tracking-widest font-bold text-brand-yellow mb-2 ${automotivoSubtitleClass}`}>{item.norm}</p>
                                        <h4 className="text-lg font-bold text-brand-dark mb-3">{item.title}</h4>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {segment.businessOutcomes && segment.businessOutcomes.length > 0 && (
                    <section className="pb-14 md:pb-16 relative overflow-hidden pt-14 md:pt-16">
                        <div className="absolute inset-0">
                            <img src={sectionBackdropImage} alt={`Fundo ${segment.title}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/75" />
                        </div>
                        <div className="container mx-auto px-6 max-w-6xl relative z-10">
                            <h3 className={`text-[22px] md:text-[24px] font-bold mb-5 ${sectionTitleClass} text-brand-yellow`}>Indicadores de Ganho e Resultado</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {segment.businessOutcomes.map((outcome) => (
                                    <article key={outcome.metric} className="bg-[#f5f5ef] border border-gray-200 rounded-[6px] p-6 shadow-sm h-full">
                                        <p className={`text-brand-yellow font-bold uppercase text-xs tracking-widest mb-2 ${automotivoSubtitleClass}`}>{outcome.metric}</p>
                                        <p className="text-sm leading-relaxed text-gray-700">{outcome.impact}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {displayFaq && displayFaq.length > 0 && (
                    <section className="pb-14 md:pb-16 pt-6 md:pt-10">
                        <div className="container mx-auto px-6 max-w-6xl">
                            <h3 className={`text-[22px] md:text-[24px] font-bold text-[#111111] mb-5 ${sectionTitleClass}`}>Perguntas Frequentes</h3>
                            <div className={`bg-white border border-gray-200 ${panelRadiusClass} divide-y divide-gray-200`}>
                                {displayFaq.map((faq) => (
                                    <details key={faq.question} className="group px-5 py-4">
                                        <summary className="list-none cursor-pointer flex items-start justify-between gap-3">
                                            <span className="font-semibold text-[#111111]">{faq.question}</span>
                                            <span className="text-brand-yellow text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="pb-14 md:pb-16">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className={`bg-brand-yellow p-8 ${panelRadiusClass} text-center shadow-lg shadow-brand-yellow/20`}>
                            <h4 className="font-bold text-brand-dark text-2xl mb-2">Precisa de um projeto?</h4>
                            <p className="text-brand-dark/80 mb-6 text-base">Fale agora com nossos especialistas técnicos.</p>
                            <a
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-brand-dark text-white py-3 px-8 rounded font-semibold hover:bg-black transition-colors inline-flex items-center justify-center"
                                style={{ borderRadius: '6px' }}
                            >
                                Iniciar Conversa
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <WhereWeAre simplifiedFilial={isAutomotivo} hideContactCard={isAutomotivo} />

            <PresentationOverlay
                isOpen={showPresentation}
                onClose={() => setShowPresentation(false)}
                segment={presentationSegment}
                onDownload={startPdfDownload}
                isDownloading={isDownloadingPdf}
            />

            {isDownloadingPdf && (
                <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center px-6">
                    <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
                        <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">Gerando PDF</h3>
                        <p className="text-gray-600">Preparando a versão em alta qualidade para download.</p>
                    </div>
                </div>
            )}

            <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
        </div>
    );
};

export default SegmentPage;
