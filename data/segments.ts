import {
    Megaphone,
    ShieldCheck,
    Cpu,
    Warehouse,
    HardHat,
    Building2,
    FileText,
    Car,
    Truck,
    Utensils,
    Pill,
    FlaskConical,
    Wheat,
    Church,
    LucideIcon,
    ArrowRight,
    CheckCircle,
    AlertTriangle,
    BarChart
} from 'lucide-react';

export type SlideType = 'cover' | 'intro' | 'challenge' | 'solution' | 'gallery' | 'specs' | 'cta';

export interface PresentationSlide {
    type: SlideType;
    title: string;
    subtitle?: string;
    content?: string;
    image?: string;
    bullets?: string[];
    stats?: { label: string; value: string }[];
    galleryImages?: string[];
}

export interface ServiceCategory {
    id: string;
    path: string;
    title: string;
    subtitle: string;
    cardBadge?: string;
    icon: LucideIcon;
    description: string; // Keep for cards
    details: {
        heroImage: string;
        heroVideo?: string;
        features: string[]; // Restored
        content: string;    // Restored
    };
    slides: PresentationSlide[];
    extendedContent: {      // Restored
        challenges: string;
        solutions: string;
        results: string;
    };
    constructionOverview?: string;
    constructionModules?: SegmentConstructionModule[];
    civilScopes?: SegmentCivilScope[];
    executionPhases?: SegmentExecutionPhase[];
    complianceHighlights?: SegmentComplianceHighlight[];
    businessOutcomes?: SegmentBusinessOutcome[];
    faq?: SegmentFaqItem[];
    middleCarousel?: { src: string; alt: string; label?: string }[];
}

export interface SegmentConstructionModule {
    title: string;
    subtitle?: string;
    description: string;
    sections: { title: string; items: string[] }[];
}

export interface SegmentCivilScope {
    title: string;
    description: string;
    highlights: string[];
}

export interface SegmentExecutionPhase {
    phase: string;
    title: string;
    description: string;
}

export interface SegmentComplianceHighlight {
    title: string;
    norm: string;
    description: string;
}

export interface SegmentBusinessOutcome {
    metric: string;
    impact: string;
}

export interface SegmentFaqItem {
    question: string;
    answer: string;
}

export interface SegmentEnhancement {
    constructionOverview: string;
    constructionModules?: SegmentConstructionModule[];
    civilScopes: SegmentCivilScope[];
    executionPhases: SegmentExecutionPhase[];
    complianceHighlights: SegmentComplianceHighlight[];
    businessOutcomes: SegmentBusinessOutcome[];
    faq: SegmentFaqItem[];
    additionalSlides: PresentationSlide[];
}

export const SEGMENTS: ServiceCategory[] = [
    // --- 1. AUTOMOTIVO ---
    {
        id: 'automotivo',
        path: '/automotivo',
        title: 'Automotivo',
        subtitle: 'Soluções Técnicas para Fábricas e Linhas de Montagem Automotiva',
        icon: Car,
        description: 'Infraestrutura de alta precisão para fabricação automotiva com linhas de montagem sincronizadas e operação contínua.',
        details: {
            heroImage: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2070&auto=format&fit=crop',
            heroVideo: '/automotivo/automotivo-hero-video.mp4',
            features: [
                'Linhas de montagem serial otimizadas',
                'Estruturas para robótica industrial de alta precisão',
                'Pisos com tolerância milimétrica',
                'Sistemas de utilities redundantes (energia, ar, óleo)',
                'Infraestrutura de grande porte e vãos livres',
                'Estruturas flexíveis para múltiplos modelos de veículos'
            ],
            content: 'Realizamos projetos completos de construção civil para fábricas automotivas, incluindo fundação, estrutura para máquinas de soldagem, robôs, plataformas de operadores, pisos com tolerâncias milimétricas e infraestrutura elétrica trifásica de alta potência.'
        },
        extendedContent: {
            challenges: 'A linha de montagem é o coração pulsante da fábrica moderna e requer integração entre tecnologia, pessoas e fornecedores, com equipamentos sincronizados em ritmo coordenado. Documentação rigorosa é mandatória para rastreabilidade de produção e conformidade com normas de segurança ocupacional.',
            solutions: 'Projetos que integram estrutura física com fluxo operacional de produção. Infraestrutura dimensionada para operações contínuas com segurança rigorosa, permitindo fabricação de múltiplos modelos na mesma linha através de layout inteligente.',
            results: 'Fábrica automotiva estruturalmente preparada para produção em massa. Linhas de montagem otimizadas para eficiência contínua, ambiente seguro para operadores e equipamentos robóticos, com capacidade de produção previsível e escalável.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Engenharia para Indústria Automotiva',
                subtitle: 'Segurança, Eficiência e Tecnologia para Linhas de Montagem de Alta Performance',
                image: '/automotivo/automotivo-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Onde a Precisão Encontra a Segurança',
                content: 'A indústria automotiva opera nos mais altos padrões de exigência do mundo. Não há margem para paradas não programadas ou acidentes. A Facilco entende a dinâmica das montadoras e systémistas (Tier 1), entregando soluções que se integram perfeitamente ao ritmo do Takt Time.',
                image: '/automotivo/automotivo-02-intro.jpg',
                stats: [
                    { label: 'Conformidade', value: '100% NR-12' },
                    { label: 'Durabilidade', value: 'Heavy Duty' },
                    { label: 'Impacto', value: 'Zero Paradas' }
                ]
            },
            {
                type: 'challenge',
                title: 'Desafios Críticos',
                content: 'O ambiente automotivo é hostil e veloz. A interação entre robôs, AGVs, empilhadeiras e operadores humanos cria riscos constantes.',
                bullets: [
                    'Colisões frequentes entre empilhadeiras e estruturas',
                    'Risco de esmagamento em células robotizadas',
                    'Desgaste prematuro de pisos devido ao tráfego intenso',
                    'Necessidade de alterações rápidas de layout (Flexibilidade)'
                ],
                image: '/automotivo/automotivo-03-desafios.jpg'
            },
            {
                type: 'solution',
                title: 'Proteção de Perímetro e Robótica',
                content: 'Desenvolvemos o enclausuramento seguro de células robóticas com barreiras monitoradas.',
                bullets: [
                    'Grades de proteção modulares (Troax/Satech compatible)',
                    'Sistemas de Intertravamento com chaves de segurança',
                    'Barreiras ópticas de segurança (Cortinas de Luz)',
                    'Adequação completa à NR-12 para Prensas e Robôs'
                ],
                image: '/automotivo/automotivo-04-robotica.jpg'
            },
            {
                type: 'solution',
                title: 'Gestão Visual e Tráfego (5S)',
                content: 'A organização visual é a base do Lean Manufacturing. Nossas soluções de sinalização orientam o fluxo de forma intuitiva.',
                bullets: [
                    'Demarcação de rotas de AGVs com resinas de alta durabilidade',
                    'Sinalização aérea para identificação de ruas e estoques',
                    'Passarelas seguras para pedestres segregadas do tráfego de carga',
                    'Totens de segurança e quadros de gestão à vista'
                ],
                image: '/automotivo/automotivo-05-gestao-visual.jpg'
            },
            {
                type: 'gallery',
                title: 'Cases de Sucesso',
                galleryImages: [
                    '/automotivo/automotivo-06-cases-1.jpg',
                    '/automotivo/automotivo-06-cases-2.jpg',
                    '/automotivo/automotivo-06-cases-3.jpg'
                ]
            },
            {
                type: 'cta',
                title: 'Eleve o Padrão da sua Montadora',
                content: 'Agende uma visita técnica com nossos engenheiros especialistas em setor automotivo.',
                image: '/automotivo/automotivo-07-cta.jpg'
            }
        ]
    },

    // --- 2. LOGÍSTICA ---
    {
        id: 'logistica',
        path: '/logistica',
        title: 'Logística',
        subtitle: 'Centros de Distribuição',
        icon: Truck,
        description: 'Eficiência operacional e segurança patrimonial para CD\'s, armazéns e grandes transportadoras.',
        details: {
            heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
            heroVideo: '/logistica/logistica-hero-video.mp4',
            features: ['Protetores de Racks', 'Niveladoras de Docas', 'Barreiras de Tráfego Pesado', 'Gestão Visual de Estoque'],
            content: 'Maximizamos a segurança operacional em centros logísticos de alto giro. Nossas soluções protegem estruturas críticas de armazenagem contra impactos de empilhadeiras e organizam o fluxo complexo de entrada e saída de mercadorias.'
        },
        extendedContent: {
            challenges: 'Em CDs modernos, a velocidade é essencial, o que aumenta o risco de colisões contra estruturas de porta-paletes e acidentes em docas de carregamento. O layout dinâmico exige sinalizações que sejam claras, mas resistentes ao tráfego pesado constante.',
            solutions: 'Instalamos protetores de coluna deformáveis que não transferem o impacto para o piso. Utilizamos niveladoras de doca eletro-hidráulicas para agilizar o setup de carga/descarga e aplicamos sinalização projetada (luz) para áreas onde a pintura tradicional se desgasta rapidamente.',
            results: 'Eliminação do colapso de estruturas de armazenagem (efeito dominó). Redução de custos de manutenção com pisos e equipamentos. Aumento da velocidade de expedição com docas mais seguras e eficientes.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Logística 4.0 e Intra-Logística',
                subtitle: 'Protegendo o Fluxo da Cadeia de Suprimentos Global',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop'
            },
            {
                type: 'intro',
                title: 'Velocidade com Segurança',
                content: 'Em um Centro de Distribuição moderno, cada segundo conta. A Facilco oferece soluções que permitem alta velocidade de operação sem comprometer a integridade das estruturas de armazenagem ou a vida dos colaboradores.',
                image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070&auto=format&fit=crop',
                stats: [
                    { label: 'Proteção', value: 'Anti-Colapso' },
                    { label: 'Eficiência', value: '+30% Agilidade' },
                    { label: 'Manutenção', value: 'Reduzida' }
                ]
            },
            {
                type: 'challenge',
                title: 'O Risco do Efeito Dominó',
                content: 'Colisões de empilhadeiras contra montantes de porta-paletes são a causa número 1 de colapsos estruturais catastróficos em CDs.',
                bullets: [
                    'Danos estruturais invisíveis em bases de racks',
                    'Queda de mercadorias de níveis elevados',
                    'Acidentes graves em docas de carregamento (Veleículo saindo antes da hora)',
                    'Pisos danificados e buracos que quebram rodas de empilhadeiras'
                ],
                image: '/logistica/logistica-03-efeito-domino.jpg'
            },
            {
                type: 'solution',
                title: 'Blindagem de Estruturas',
                content: 'Nossa tecnologia de polímeros de memória absorve impactos sem transferir energia para o piso ou estrutura.',
                bullets: [
                    'Protetores de coluna deformáveis (Bounce-back technology)',
                    'Barreiras de tráfego flexíveis para cabeceiras de rack',
                    'Limitadores de altura e profundidade para paletes',
                    'Redes de proteção anti-queda para corredores'
                ],
                image: '/logistica/logistica-04-blindagem.jpg'
            },
            {
                type: 'solution',
                title: 'Docas de Alta Performance',
                content: 'Transformamos a área de expedição no ponto mais eficiente do CD.',
                bullets: [
                    'Niveladoras de doca eletro-hidráulicas automáticas',
                    'Abrigos de doca para vedação térmica e sanitária',
                    'Sistemas de Retenção de Veículos (Vehicle Restraints)',
                    'Semáforos e calços de roda integrados com porta'
                ],
                image: '/logistica/logistica-05-docas.jpg'
            },
            {
                type: 'cta',
                title: 'Segurança para seu CD',
                content: 'Evite prejuízos milionários. Solicite uma auditoria de riscos gratuita.',
                image: '/logistica/logistica-06-cta.jpg'
            }
        ]
    },

    // --- 3. ALIMENTÍCIA ---
    {
        id: 'alimenticia',
        path: '/alimenticia',
        title: 'Alimentícia',
        subtitle: 'Soluções Técnicas para Fábricas de Alimentos com Controle Sanitário',
        icon: Utensils,
        description: 'Infraestrutura higiênica para processamento de alimentos e bebidas com conformidade sanitária rigorosa.',
        details: {
            heroImage: '/alimenticia/alimenticia-hero-21x9.png',
            heroVideo: '/alimenticia/alimenticia-hero-video.mp4',
            features: [
                'Layout sanitário conforme RDC 275/2002 (ANVISA)',
                'Pisos drenantes, laváveis e impermeáveis',
                'Barreiras físicas entre áreas de processamento',
                'Câmaras frigoríficas especializadas',
                'Sistema de drenagem higiênico integrado',
                'Acabamentos laváveis em todas as superfícies'
            ],
            content: 'Realizamos projetos completos de construção civil para fábricas de alimentos conforme RDC 275/2002 (ANVISA), incluindo fundação, estrutura, infraestrutura especializada, áreas segregadas por risco, sistemas de drenagem higiênica, câmaras frigoríficas e acabamentos que garantem conformidade com normas sanitárias rigorosas.'
        },
        extendedContent: {
            challenges: 'O fluxo de produção deve cumprir requisitos rígidos incluindo isolamento completo de áreas de pré-preparo, prevenção de contaminação cruzada entre produtos e capacidade de limpeza contínua sem parar produção. O layout deve ser simultaneamente sanitário e produtivo, otimizando movimentação de materiais enquanto respeita segregação de áreas conforme risco microbiológico.',
            solutions: 'Projetos que otimizam produção sem comprometer segurança alimentar. Layout que reduz movimentação desnecessária mantendo conformidade integral com normas sanitárias. Cada espaço é dimensionado conforme processamento específico, com documentação completa para auditorias e operação contínua.',
            results: 'Fábrica de alimentos legalizada, certificada e operacional. Fluxo de produção otimizado, conformidade integral com ANVISA e ambiente preparado para altas capacidades de processamento com máxima higiene e rastreabilidade.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Engenharia Sanitária e BPF',
                subtitle: 'Soluções higiênicas para processamento de alimentos que garantem segurança alimentar total.',
                image: '/alimenticia/alimenticia-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Higiene é Inegociável',
                content: 'Na indústria de alimentos, a infraestrutura deve ser uma aliada da limpeza, não um foco de contaminação. Desenvolvemos projetos focados em design sanitário, eliminando pontos de acúmulo de sujeira e facilitando os processos de higienização (CIP/SIP).',
                image: '/alimenticia/alimenticia-02-higiene.jpg',
                stats: [
                    { label: 'Padrão', value: 'Anvisa/SIF' },
                    { label: 'Material', value: 'Inox 304/316' },
                    { label: 'Limpeza', value: 'Fácil' }
                ]
            },
            {
                type: 'challenge',
                title: 'Ambientes Agressivos e Úmidos',
                content: 'A combinação de umidade constante, ácidos orgânicos (leite, sangue, frutas) e variações térmicas extremas destrói instalações comuns.',
                bullets: [
                    'Corrosão acelerada de guardas-corpos e proteções de aço carbono',
                    'Desplacamento de pisos e pinturas epóxi comuns',
                    'Proliferação de bactérias em juntas e trincas',
                    'Risco de contaminação física (tinta descascando) no produto'
                ],
                image: '/alimenticia/alimenticia-03-ambientes.jpg'
            },
            {
                type: 'solution',
                title: 'Revestimentos Uretânicos',
                content: 'Aplicamos pisos monolíticos de uretano cimentício, a solução definitiva para áreas molhadas.',
                bullets: [
                    'Resistência a choques térmicos (-40°C a +120°C)',
                    'Aditivos antimicrobianos (Íons de Prata) na formulação',
                    'Superfície antiderrapante mesmo molhada',
                    'Cura rápida para intervenções em finais de semana'
                ],
                image: '/alimenticia/alimenticia-04-uretano.jpg'
            },
            {
                type: 'solution',
                title: 'Proteção em Aço Inox',
                content: 'Fabricação própria de elementos de proteção sanitária.',
                bullets: [
                    'Bate-carrinhos em Aço Inox maciço ou tubular preenchido',
                    'Guarda-corpos com soldas sanitárias (sem frestas)',
                    'Drenagem industrial com ralos em inox e cesto coletor',
                    'Painéis elétricos com vedação IP69K para lavagem pesada'
                ],
                image: '/alimenticia/alimenticia-05-inox.jpg'
            },
            {
                type: 'cta',
                title: 'Auditoria de BPF Gratuita',
                content: 'Verifique se sua planta atende aos requisitos atuais da ANVISA e normas internacionais.',
                image: '/alimenticia/alimenticia-06-auditoria.jpg'
            }
        ]
    },

    // --- 4. FARMACÊUTICA ---
    {
        id: 'farmaceutica',
        path: '/farmaceutica',
        title: 'Farmacêutica',
        subtitle: 'Soluções Técnicas para Fábricas Farmacêuticas com Boas Práticas de Fabricação',
        icon: Pill,
        description: 'Infraestrutura para manufatura farmacêutica com conformidade ANVISA, salas limpas e utilidades críticas.',
        details: {
            heroImage: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2070&auto=format&fit=crop',
            heroVideo: '/farmaceutica/farmaceutica-hero-video.mp4',
            features: [
                'Salas limpas controladas (ISO 14644 - Classes A, B, C, D)',
                'Sistemas de ar filtrado, pressurizado e com controle de umidade',
                'Redes de gases medicinais especializados',
                'Armazenagem climatizada para produtos sensíveis',
                'Áreas de quarentena e testes de conformidade',
                'Conformidade RDC 17/10 (ANVISA) e QI/QO'
            ],
            content: 'Realizamos projetos completos de construção civil para plantas farmacêuticas conforme RDC 17/10 (ANVISA), incluindo fundação, estrutura, infraestrutura especializada, salas limpas controladas, sistemas críticos de ar, gases medicinais e acabamentos que garantem conformidade regulatória.'
        },
        extendedContent: {
            challenges: 'Instalações farmacêuticas requerem conformidade rigorosa com Boas Práticas de Fabricação e regulamentações ANVISA. Toda mudança de infraestrutura requer QI e QO, com pessoal qualificado, instalações adequadas, equipamentos validados, armazenamento e transporte controlados.',
            solutions: 'Projetos que atendem QI/QO desde a construção. Infraestrutura que garante integridade dos produtos, rastreabilidade completa e conformidade regulatória, com cada espaço dimensionado conforme função crítica e nível de contaminação permitido.',
            results: 'Planta farmacêutica legalizada, qualificada e pronta para operação comercial. Conformidade integral com ANVISA e ambiente controlado para medicamentos, compostos sensíveis e produtos biofarmacêuticos.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Salas Limpas e Ambientes Críticos',
                subtitle: 'Controle Absoluto de Contaminação para a Indústria da Vida.',
                image: '/farmaceutica/farmaceutica-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Pureza e Validação',
                content: 'Na indústria farmacêutica, a infraestrutura é parte do produto. Garantimos que suas instalações atendam aos requisitos de qualificação (DQ, IQ, OQ, PQ) e mantenham as classificações ISO necessárias.',
                image: '/farmaceutica/farmaceutica-02-pureza.jpg',
                stats: [
                    { label: 'ISO', value: 'Classe 5 a 8' },
                    { label: 'Pressão', value: 'Controlada' },
                    { label: 'Segurança', value: 'BMS Integrado' }
                ]
            },
            {
                type: 'challenge',
                title: 'Contaminação Cruzada e Partículas',
                content: 'O maior inimigo é o invisível. Partículas, microrganismos e a mistura de princípios ativos diferentes podem comprometer lotes milionários.',
                bullets: [
                    'Controle rigoroso de fluxo de pessoas e materiais',
                    'Necessidade de superfícies que não geram partículas',
                    'Vedação hermética de portas e passagens',
                    'Controle estático (ESD) em áreas de pós'
                ],
                image: '/farmaceutica/farmaceutica-03-desafios.jpg'
            },
            {
                type: 'solution',
                title: 'Arquitetura de Salas Limpas',
                content: 'Sistemas construtivos modulares e certificados.',
                bullets: [
                    'Painéis divisórios com miolo em PIR/PUR ou Lã de Rocha',
                    'Visores duplos nivelados (flush) para fácil limpeza',
                    'Cantos arredondados (canto curvo) em alumínio ou PVC',
                    'Forros caminháveis para manutenção externa à área limpa'
                ],
                image: '/farmaceutica/farmaceutica-04-paineis.jpg'
            },
            {
                type: 'solution',
                title: 'Controle de Acesso e Eclusas',
                content: 'Gerenciamos o fluxo através de sistemas de intertravamento inteligentes.',
                bullets: [
                    'Portas rápidas intertravadas (Sistemas de Eclusa/SAS)',
                    'Pass-throughs para transferência segura de materiais',
                    'Pisos condutivos e dissipativos homologados',
                    'Controle de acesso biométrico sem toque'
                ],
                image: '/farmaceutica/farmaceutica-05-eclusas.jpg'
            },
            {
                type: 'cta',
                title: 'Qualificação Garantida',
                content: 'Projetos prontos para validação da garantia da qualidade.',
                image: '/farmaceutica/farmaceutica-06-cta.jpg'
            }
        ]
    },

    // --- 5. QUÍMICA ---
    {
        id: 'quimica',
        path: '/quimica',
        title: 'Química',
        subtitle: 'Soluções Técnicas para Plantas e Fábricas Químicas',
        icon: FlaskConical,
        description: 'Soluções técnicas para plantas químicas com infraestrutura resistente, contenção segura e conformidade rigorosa.',
        details: {
            heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
            heroVideo: '/quimica/quimica-hero-video.mp4',
            features: [
                'Estruturas resistentes a agentes químicos e corrosivos',
                'Sistemas de contenção e drenagem especializados',
                'Pisos com impermeabilização química avançada',
                'Controle de ar e ventilação especializada',
                'Infraestrutura para segurança (Corpo de Bombeiros)',
                'Conformidade com normas técnicas rigorosas ABNT'
            ],
            content: 'Realizamos projetos completos de construção civil para plantas químicas, incluindo fundação, estrutura, infraestrutura especializada, sistemas de contenção, drenagem e acabamentos resistentes a agentes químicos. Plantas químicas exigem projetos de engenharia seguros e confiáveis, com processos altamente técnicos e regulamentações severas.'
        },
        extendedContent: {
            challenges: 'Processos químicos complexos exigem infraestrutura que suporte múltiplos sistemas simultaneamente com segurança absoluta. Eficiência operacional, sustentabilidade ambiental e segurança ocupacional precisam andar juntas em operações de transformação química.',
            solutions: 'Projetos dimensionados para operações químicas complexas, integrando segurança estrutural com funcionalidade operacional. Estruturas otimizadas para conter eventos de extravasamento, facilitar descontaminação completa e permitir manutenção sem interrupção de operações críticas.',
            results: 'Planta química estruturalmente segura, operacional e controlada. Ambiente protegido contra agentes corrosivos e contaminação. Conformidade total com regulamentações ambientais e de segurança ocupacional.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Proteção Extrema contra Corrosão',
                subtitle: 'Infraestrutura de alta resistência para ambientes quimicamente agressivos e áreas classificadas.',
                image: '/quimica/quimica-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Resistência e Contenção',
                content: 'Lidar com ácidos concentrados, solventes e bases fortes exige mais do que construção civil comum. Exige engenharia de materiais avançada para evitar desastres ambientais e proteger a integridade das instalações.',
                image: '/quimica/quimica-02-resistencia.jpg',
                stats: [
                    { label: 'Proteção', value: 'Anti-Ácida' },
                    { label: 'Ambiente', value: 'Zero Vazamento' },
                    { label: 'Segurança', value: 'Área EX' }
                ]
            },
            {
                type: 'challenge',
                title: 'Ataque Químico Severo',
                content: 'O concreto armado é vulnerável. Um vazamento de ácido sulfúrico ou soda cáustica pode comprometer as fundações de um galpão em poucos dias.',
                bullets: [
                    'Degradação rápida de pisos e bases de tanques',
                    'Risco de contaminação do lençol freático',
                    'Atmosferas explosivas (Vapores inflamáveis)',
                    'Segurança do operador no manuseio de produtos'
                ],
                image: '/quimica/quimica-03-desafios.jpg'
            },
            {
                type: 'solution',
                title: 'Tecnologia Novolac e Viniléster',
                content: 'Utilizamos as resinas mais resistentes do mercado para blindar sua planta.',
                bullets: [
                    'Revestimentos anticorrosivos à base de Epóxi Novolac',
                    'Laminação com fibra de vidro e resina Viniléster para tanques e diques',
                    'Reconstrução de bacias de contenção degradadas',
                    'Argamassas poliméricas de cura rápida'
                ],
                image: '/quimica/quimica-04-novolac.jpg'
            },
            {
                type: 'solution',
                title: 'Segurança Operacional',
                content: 'Equipamentos e sinalização para salvar vidas em emergências.',
                bullets: [
                    'Chuveiros de emergência e lava-olhos conforme norma ANSI',
                    'Sinalização de tubulações conforme Norma GHS',
                    'Pisos antiderrapantes de textura agressiva para áreas oleosas',
                    'Exaustão localizada para vapores tóxicos'
                ],
                image: '/quimica/quimica-05-seguranca.jpg'
            },
            {
                type: 'cta',
                title: 'Proteção Ambiental',
                content: 'Previna multas ambientais e acidentes com nossa consultoria especializada.',
                image: '/quimica/quimica-06-cta.jpg'
            }
        ]
    },

    // --- 6. AGROINDÚSTRIA ---
    {
        id: 'agroindustria',
        path: '/agroindustria',
        title: 'Agroindústria',
        subtitle: 'Soluções Técnicas para Agroindústria - Usinas de Açúcar, Etanol e Silos de Armazenagem',
        icon: Wheat,
        description: 'Infraestrutura para processamento e armazenagem agrícola com foco em usinas, silos e operação sazonal de alta capacidade.',
        details: {
            heroImage: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2070&auto=format&fit=crop',
            heroVideo: '/agroindustria/agroindustria-hero-video.mp4',
            features: [
                'Silos com grandes capacidades de armazenagem',
                'Estruturas para equipamentos pesados de processamento',
                'Câmaras frigoríficas especializadas',
                'Sistemas de movimentação mecanizada',
                'Infraestrutura de drenagem agrícola',
                'Conformidade com regulamentações ambientais'
            ],
            content: 'Realizamos projetos completos de construção civil para agroindústrias, incluindo fundação especializada para máquinas pesadas, estruturas para usinas de açúcar e etanol, silos de armazenagem de grãos, câmaras frigoríficas, pátios de produção e infraestrutura logística integrada.'
        },
        extendedContent: {
            challenges: 'Agroindústria opera sazonalmente com picos de produção intensos. Armazenagem de grãos precisa manter qualidade em condições ambientais diversas e a operação em ambiente rural exige infraestrutura robusta com drenagem e contenção ambiental rigorosa.',
            solutions: 'Projetos que integram estrutura física robusta com eficiência operacional. Infraestrutura dimensionada para processamento em escala agroindustrial, com flexibilidade para diferentes produtos e capacidade para futuras expansões.',
            results: 'Agroindústria operacional e de alta capacidade, com silos preservando qualidade de grãos e infraestrutura preparada para múltiplas safras sem perda de eficiência.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Agroindústria - Usinas e Silos Agrícolas',
                subtitle: 'Soluções técnicas para processamento e armazenagem agrícola em grande escala.',
                image: '/agroindustria/agroindustria-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Infraestrutura para Operação Sazonal',
                content: 'A operação agroindustrial exige estruturas robustas para suportar picos de processamento, armazenagem de grandes volumes e logística interna intensa com segurança e previsibilidade.',
                image: '/agroindustria/agroindustria-02-intro.jpg',
                stats: [
                    { label: 'Escala', value: 'Grande Porte' },
                    { label: 'Operação', value: 'Sazonal' },
                    { label: 'Foco', value: 'Produtividade' }
                ]
            },
            {
                type: 'challenge',
                title: 'Desafios do Setor',
                content: 'Picos de safra, variação de umidade, movimentação pesada e exigências ambientais elevam o nível de complexidade das obras agroindustriais.',
                bullets: [
                    'Operação intensa em períodos de alta demanda',
                    'Preservação de qualidade durante armazenagem',
                    'Infraestrutura rural com drenagem técnica',
                    'Integração entre produção, armazenagem e expedição'
                ],
                image: '/agroindustria/agroindustria-03-desafios.jpg'
            },
            {
                type: 'solution',
                title: 'Silos e Estruturas de Armazenagem',
                content: 'Projetos para silos metálicos e de alvenaria, pátios de recepção e sistemas de movimentação interna com desempenho operacional.',
                bullets: [
                    'Silos para diferentes perfis de grãos',
                    'Estruturas para correias e transportadores',
                    'Plataformas para beneficiamento e secagem',
                    'Layout para carga, descarga e expedição'
                ],
                image: '/agroindustria/agroindustria-04-vida.jpg'
            },
            {
                type: 'solution',
                title: 'Usinas e Processamento',
                content: 'Infraestrutura para usinas de açúcar, etanol e bioenergia, com fundações críticas, utilidades e áreas operacionais especializadas.',
                bullets: [
                    'Fundações para equipamentos pesados',
                    'Pátios industriais e pisos de alta resistência',
                    'Câmaras frigoríficas e armazenagem sensível',
                    'Drenagem e contenção ambiental integrada'
                ],
                image: '/agroindustria/agroindustria-05-confinado.jpg'
            },
            {
                type: 'cta',
                title: 'Precisa de silos ou agroindústria?',
                content: 'Fale agora com nossos especialistas técnicos em infraestrutura agroindustrial.',
                image: '/agroindustria/agroindustria-06-cta.jpg'
            }
        ]
    },

    // --- 7. EDIFICAÇÕES ---
    {
        id: 'edificacoes',
        path: '/edificacoes',
        title: 'Edificações',
        subtitle: 'Soluções Técnicas para Edificações Residenciais e Comerciais',
        cardBadge: 'CONSTRUÇÃO CIVIL E IMOBILIÁRIO',
        icon: HardHat,
        description: 'Infraestrutura para empreendimentos imobiliários residenciais e comerciais com segurança, conformidade e qualidade construtiva.',
        details: {
            heroImage: '/edificacoes/edificacoes-hero.jpg',
            heroVideo: '/edificacoes/edificacoes-hero-video.mp4',
            features: [
                'Projetos arquitetônicos personalizados',
                'Estruturas robustas em concreto ou aço',
                'Sistemas integrados de instalações',
                'Infraestrutura completa de segurança',
                'Acessibilidade universal conforme normas',
                'Conformidade com códigos de obra'
            ],
            content: 'Realizamos projetos completos de construção civil para edificações, incluindo fundação especializada, estrutura em concreto ou aço, infraestrutura elétrica, hidrossanitária, climatização, acabamentos e segurança integrada.'
        },
        extendedContent: {
            challenges: 'Edificações enfrentam requisitos complexos: conformidade com códigos de obra municipais, aprovações de órgãos reguladores, gestão de riscos de construção e conformidade ambiental. O layout deve equilibrar funcionalidade, estética, segurança e sustentabilidade.',
            solutions: 'Projetos que integram arquitetura funcional com engenharia robusta. Infraestrutura completa desde fundação até acabamento, com coordenação integrada de todas as especialidades.',
            results: 'Edificação legalizada, segura e pronta para ocupação. Infraestrutura conforme aprovações de órgãos reguladores e ambientes funcionais para moradores ou empresas.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Edificações - Construção Civil Imobiliária',
                subtitle: 'Soluções técnicas para edificações residenciais e comerciais.',
                image: '/edificacoes/edificacoes-hero.jpg'
            },
            {
                type: 'intro',
                title: 'Infraestrutura para Empreendimentos Imobiliários',
                content: 'Edificações residenciais e comerciais exigem coordenação técnica completa, desde fundações até sistemas prediais e segurança integrada.',
                image: '/edificacoes/edificacoes-obra.jpg',
                stats: [
                    { label: 'Segmento', value: 'Residencial e Comercial' },
                    { label: 'Foco', value: 'Conformidade' },
                    { label: 'Entrega', value: 'Habite-se' }
                ]
            },
            {
                type: 'challenge',
                title: 'Desafios do Setor',
                content: 'Conformidade regulatória, integração de disciplinas e controle de qualidade construtiva são críticos para segurança e valorização do ativo.',
                bullets: [
                    'Compatibilização entre arquitetura, estrutura e instalações',
                    'Aprovações em órgãos reguladores',
                    'Controle técnico em todas as fases',
                    'Segurança e acessibilidade conforme normas'
                ],
                image: '/edificacoes/edificacoes-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Estruturas e Instalações Integradas',
                content: 'Execução de estruturas em concreto ou aço e integração de utilidades para ocupação segura e funcional.',
                bullets: [
                    'Estrutura em concreto armado ou mista',
                    'Sistemas elétricos, hidráulicos, gás e climatização',
                    'Infraestrutura de segurança e controle de acesso',
                    'Compatibilização técnica entre disciplinas'
                ],
                image: '/edificacoes/edificacoes-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Acabamentos, Segurança e Acessibilidade',
                content: 'Acabamentos de qualidade e sistemas de proteção para durabilidade, funcionalidade e conformidade.',
                bullets: [
                    'Sistemas de combate e prevenção a incêndio',
                    'Acessibilidade universal conforme NBR 9050',
                    'Materiais de primeira linha',
                    'Documentação completa para aprovação e entrega'
                ],
                image: '/edificacoes/edificacoes-regularizacao.jpg'
            },
            {
                type: 'cta',
                title: 'Precisa construir um edifício?',
                content: 'Fale agora com nossos especialistas técnicos em edificações imobiliárias.',
                image: '/edificacoes/edificacoes-cta.jpg'
            }
        ]
    },

    // --- 9. RODOVIAS ---
    {
        id: 'rodovias',
        path: '/rodovias',
        title: 'Rodovias',
        subtitle: 'Soluções Técnicas para Rodovias, Duplicações e Melhorias em Infraestrutura Rodoviária',
        cardBadge: 'INFRAESTRUTURA RODOVIÁRIA',
        icon: Truck,
        description: 'Infraestrutura rodoviária com pavimentação, drenagem, duplicações e obras de mobilidade com tráfego contínuo.',
        details: {
            heroImage: '/ccr-rodovias/ccr-rodovias-01-capa.jpg',
            heroVideo: '/ccr-rodovias/ccr-rodovias-hero-video.mp4',
            features: [
                'Pavimentação asfáltica de alta qualidade e durabilidade',
                'Engenharia de tráfego sofisticada',
                'Drenagem rodoviária especializada',
                'Estruturas de pontes e viadutos',
                'Conformidade com normas de segurança rodoviária',
                'Gestão de obra com tráfego contínuo'
            ],
            content: 'Realizamos projetos completos de infraestrutura rodoviária, incluindo pavimentação asfáltica, drenagem rodoviária, viadutos, pontes, alargamentos de pista, duplicações e obras de mobilidade urbana.'
        },
        extendedContent: {
            challenges: 'Obras rodoviárias enfrentam desafios únicos: operação contínua de tráfego durante construção, controle ambiental rigoroso, variabilidade climática e conformidade com regulamentações de segurança viária.',
            solutions: 'Projetos que integram engenharia de pavimentação com gestão de tráfego durante execução. Cada frente é planejada para minimizar impacto na mobilidade enquanto as melhorias críticas são implantadas.',
            results: 'Rodovia operacional com pavimentação de qualidade superior, segurança viária melhorada e mobilidade mais fluida para pessoas e cargas.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Rodovias',
                subtitle: 'Infraestrutura rodoviária para duplicações, mobilidade e segurança viária.',
                image: '/ccr-rodovias/ccr-rodovias-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Infraestrutura Rodoviária de Grande Escala',
                content: 'Executamos obras de pavimentação, drenagem, alargamento e estruturas viárias com governança técnica e foco em continuidade de tráfego.',
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg',
                stats: [
                    { label: 'Normas', value: 'DNIT/CONTRAN' },
                    { label: 'Tráfego', value: 'Contínuo' },
                    { label: 'Foco', value: 'Segurança' }
                ]
            },
            {
                type: 'challenge',
                title: 'Desafios do Setor',
                content: 'Duplicações e melhorias em rodovias exigem engenharia de tráfego para manter operação ativa com segurança em todas as fases.',
                bullets: [
                    'Planejamento de desvios e interdições parciais',
                    'Controle de qualidade de pavimento em condições variáveis',
                    'Conformidade técnica e ambiental',
                    'Segurança operacional em frentes simultâneas'
                ],
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Pavimentação e Drenagem Rodoviária',
                content: 'Estruturação do leito, drenagem e camadas de pavimento para garantir durabilidade, aderência e desempenho operacional.',
                bullets: [
                    'Terraplanagem e preparo técnico da base',
                    'Drenagem superficial e profunda',
                    'Aplicação de camadas de pavimento asfáltico',
                    'Controle tecnológico de execução'
                ],
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Estruturas e Segurança Viária',
                content: 'Implantação de viadutos, pontes, sinalização e dispositivos de proteção para ampliar segurança e fluidez.',
                bullets: [
                    'Viadutos e pontes para desnivelamento',
                    'Sinalização horizontal e vertical',
                    'Defensas, barreiras e proteção lateral',
                    'Melhorias de acesso e mobilidade'
                ],
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg'
            },
            {
                type: 'cta',
                title: 'Precisa de rodovia ou duplicação?',
                content: 'Fale agora com nossos especialistas técnicos em infraestrutura rodoviária.',
                image: '/ccr-rodovias/ccr-rodovias-03-cta.jpg'
            }
        ]
    },

    // --- 7. TEMPLOS RELIGIOSOS (MASSIVE UPDATE) ---
    {
        id: 'templos-religiosos',
        path: '/templos-religiosos',
        title: 'Templos Religiosos',
        subtitle: 'Soluções Técnicas para Templos e Instituições Religiosas',
        icon: Church,
        description: 'Engenharia especializada para construção, regularização e infraestrutura de grandes espaços de celebração.',
        details: {
            heroImage: '/templos/templo-hero.jpg',
            heroVideo: '/templos/templos-01.mp4',
            features: [
                'Projetos de Pânico e Incêndio (AVCB)',
                'Acessibilidade Universal (NBR 9050)',
                'Estruturas de Grandes Vãos',
                'Fundações Especiais',
                'Reformas Estruturais'
            ],
            content: 'Realizamos projetos completos de construção civil para templos, incluindo AVCB (Corpo de Bombeiros), acessibilidade universal (rampas, corrimãos, pisos táteis) e adequações estruturais para grandes aglomerações. Oferecemos serviços completos de construção de templos novos, reformas e ampliações estruturais, adequações de segurança (rotas de fuga e iluminação de emergência), reforço estrutural em templos históricos e infraestrutura para instalações prediais.'
        },
        extendedContent: {
            challenges: 'Grandes vãos livres, aglomeração de pessoas e a necessidade de circulação segura e acessível. Além disso, a regularização junto aos Bombeiros (AVCB) e adequações de acessibilidade são críticas para o funcionamento legal.',
            solutions: 'Cálculo dimensionado de saídas de emergência e sinalização de rota de fuga estética. Estruturas de grandes vãos que harmonizam com a arquitetura sacra. Projetos completos de acessibilidade que acolhem a todos com dignidade.',
            results: 'Templo 100% legalizado e seguro. Ambiente estruturalmente robusto e acessível para os fiéis. Valorização do imóvel e da experiência dos frequentadores.'
        },
        slides: [
            {
                type: 'cover',
                title: 'Construindo o Sagrado',
                subtitle: 'Engenharia e Arquitetura para Templos Modernos e Monumentais.',
                image: '/templos/templo-01-capa.jpg'
            },
            {
                type: 'intro',
                title: 'Espaços de Fé e Excelência',
                content: 'A construção de um templo vai muito além de erguer paredes. Trata-se de criar um ambiente seguro, acolhedor e funcional para a pregação. A Facilco entende a responsabilidade de construir a casa de Deus, aliando grandiosidade arquitetônica com segurança para multidões.',
                image: '/templos/templo-02-intro.jpg',
                stats: [
                    { label: 'Capacidade', value: 'Grandes Multidões' },
                    { label: 'Estrutura', value: 'Grandes Vãos' },
                    { label: 'Segurança', value: 'AVCB' }
                ]
            },
            {
                type: 'challenge',
                title: 'O Desafio dos Grandes Vãos',
                content: 'Grandes vãos livres, aglomeração de pessoas e a necessidade de circulação segura e acessível. Além disso, a regularização junto aos Bombeiros (AVCB) e adequações de acessibilidade são críticas para o funcionamento legal.',
                bullets: [
                    'Vãos livres para visibilidade total do altar',
                    'Circulação segura e acessível para grandes públicos',
                    'Adequações para AVCB e rotas de fuga',
                    'Acessibilidade universal com rampas e corrimãos'
                ],
                image: '/templos/templo-03-desafio.jpg'
            },
            {
                type: 'gallery',
                title: 'Estruturas Monumentais',
                content: 'Nossa experiência em calcular e executar estruturas que desafiam a gravidade.',
                galleryImages: [
                    '/templos/templo-04-estrutura-1.jpg',
                    '/templos/templo-05-estrutura-2.jpg',
                    '/templos/templo-06-estrutura-3.jpg'
                ]
            },
            {
                type: 'solution',
                title: 'Circulação e Fluxo do Público',
                content: 'Projetamos o templo para garantir circulação segura, orientação clara e rotas eficientes em eventos de grande porte.',
                bullets: [
                    'Fluxo de entrada e saída otimizado',
                    'Dimensionamento de portas e corredores',
                    'Sinalização e orientação espacial',
                    'Rotas internas seguras para grandes aglomerações'
                ],
                image: '/templos/templo-07-acustica.jpg'
            },
            {
                type: 'solution',
                title: 'Segurança e Legalização (AVCB)',
                content: 'Garantimos que o templo esteja 100% regularizado para receber o público com total segurança.',
                bullets: [
                    'Projeto Técnico de Combate a Incêndio (AVCB completo)',
                    'Sinalização de abandono e iluminação de emergência estética',
                    'Portas de emergência com barras antipânico certificadas',
                    'Acessibilidade total (Rampas, Elevadores) conforme NBR 9050'
                ],
                image: '/templos/templo-08-avcb.jpg'
            },
            {
                type: 'gallery',
                title: 'Obras Entregues',
                galleryImages: [
                    '/templos/templo-09-obras-1.jpg',
                    '/templos/templo-10-obras-2.jpg',
                    '/templos/templo-11-obras-3.jpg'
                ]
            },
            {
                type: 'cta',
                title: 'Construa com Propósito',
                content: 'Entre em contato para projetar a expansão ou construção do seu novo templo.',
                image: '/templos/templo-12-cta.jpg'
            }
        ]
    }
];

export const SEGMENT_ENHANCEMENTS: Record<string, SegmentEnhancement> = {
    automotivo: {
        constructionOverview: 'A engenharia automotiva moderna integra automação avançada com infraestrutura civil robusta. Fábricas contemporâneas precisam de estruturas que permitam flexibilidade operacional, segurança absoluta e capacidade para futuras ampliações. A competitividade global exige que cada detalhe da infraestrutura contribua para eficiência de produção.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura Especializada',
                subtitle: 'Sistemas de Fundação para Plantas Automotivas',
                description: 'Plantas automotivas exigem fundações robustas para máquinas de soldagem, prensas, robôs e linhas de montagem com operação contínua.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas especiais para máquinas de soldagem de grande peso',
                            'Fundações isoladas para robôs e máquinas com vibração',
                            'Radier para distribuição uniforme de cargas em áreas de linha de montagem',
                            'Fundações em profundidade para estruturas de grandes vãos',
                            'Blocos de fundação com amortecimento de vibrações'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações para máquinas de soldagem a ponto de grande porte',
                            'Fundações para prensas hidráulicas e pneumáticas',
                            'Reforço de piso para robôs de movimentação pesada',
                            'Fundações em planta existente sem parar produção',
                            'Projeto geotécnico especializado com sondagem SPT',
                            'Análise de capacidade de carga para equipamentos dinâmicos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de vibrações para máquinas de precisão',
                            'Fundações dimensionadas para cargas dinâmicas e impactos',
                            'Projeto geotécnico especializado em ambientes automotivos',
                            'Memorial de cálculo estrutural detalhado',
                            'ART específica para fundações'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Linhas de Montagem',
                subtitle: 'Sistemas Estruturais para Fábricas Automotivas',
                description: 'Fábricas automotivas exigem estruturas que permitam grandes vãos livres, flexibilidade operacional e facilidade para reconfiguração de linhas.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Estrutura metálica para máxima flexibilidade de layout',
                            'Estrutura mista (concreto + metálica) para máxima eficiência',
                            'Plataformas de trabalho em múltiplos níveis para operadores',
                            'Suportes especializados para máquinas de soldagem e robôs',
                            'Estruturas para equipamentos auxiliares'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Naves de soldagem com estruturas para máquinas de grande porte',
                            'Naves de montagem com linhas sincronizadas em múltiplos andares',
                            'Áreas de pintura com ventilação integrada',
                            'Áreas de testes e verificação final de veículos',
                            'Áreas de armazenagem de peças e componentes',
                            'Zonas de logística interna (recebimento, kitting, expedição)'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Grandes vãos livres para máxima flexibilidade operacional',
                            'Estrutura modular para reconfigurações futuras',
                            'Facilidade para instalação e manutenção de equipamentos',
                            'Projeto executivo com compatibilização de todas as disciplinas'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos com Tolerância Milimétrica',
                subtitle: 'Pavimentação para Linhas de Montagem',
                description: 'Pisos especializados com tolerâncias milimétricas para garantir movimento preciso de veículos em transportadores e resistência ao tráfego intenso de equipamentos.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Piso de concreto alisado com tolerância milimétrica',
                            'Piso industrial de alta resistência para tráfego de equipamentos',
                            'Lajes de piso elevadas em áreas de logística interna',
                            'Piso drenante em áreas de limpeza de componentes',
                            'Pisos especiais com propriedades antiestáticas quando necessário'
                        ]
                    },
                    {
                        title: 'Acabamento Especializado',
                        items: [
                            'Nivelamento de superfície conforme projeto',
                            'Selagem de juntas para impermeabilidade',
                            'Caimento técnico para drenagem quando necessário',
                            'Juntas de dilatação controladas conforme projeto'
                        ]
                    },
                    {
                        title: 'Marcação e Sinalização',
                        items: [
                            'Linhas de fluxo de produção marcadas',
                            'Áreas de trabalho delimitadas',
                            'Rotas de evacuação e emergência sinalizadas',
                            'Identificação de zonas por cor conforme segurança'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Pisos nivelados conforme tolerâncias de projeto',
                            'Resistência para equipamentos pesados e tráfego contínuo',
                            'Acabamento que facilita limpeza industrial',
                            'Rastreabilidade de tolerâncias com documentação completa'
                        ]
                    }
                ]
            },
            {
                title: 'Alvenaria Estrutural e Vedações',
                subtitle: 'Sistemas de Vedação para Fábricas',
                description: 'Construção de paredes estruturais e de vedação com foco em durabilidade, resistência mecânica e funcionalidade operacional.',
                sections: [
                    {
                        title: 'Tipos de Alvenaria Executados',
                        items: [
                            'Alvenaria estrutural em blocos de concreto',
                            'Alvenaria de vedação em blocos cerâmicos ou concreto',
                            'Paredes duplas com câmara de ar',
                            'Alvenaria armada para paredes de grande altura',
                            'Paredes em concreto moldado in loco'
                        ]
                    },
                    {
                        title: 'Acabamento Estrutural',
                        items: [
                            'Chapisco, emboço e reboco',
                            'Massa única de regularização',
                            'Pintura industrial com duas camadas',
                            'Impermeabilização de paredes em contato com solo'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Alvenaria de primeira qualidade',
                            'Execução conforme projeto estrutural',
                            'Prumo e nível rigorosamente controlados',
                            'Resistência adequada para grandes cargas'
                        ]
                    }
                ]
            },
            {
                title: 'Coberturas e Estruturas de Telhado',
                subtitle: 'Sistemas de Cobertura para Fábricas Automotivas',
                description: 'Execução de estruturas de telhado robustas e duráveis, projetadas para suportar grandes vãos, cargas de vento e impermeabilização completa.',
                sections: [
                    {
                        title: 'Estruturas de Cobertura',
                        items: [
                            'Estrutura metálica em perfis soldados ou parafusados',
                            'Tesouras metálicas para grandes vãos sem intermediários',
                            'Estrutura em concreto para lajes impermeabilizadas',
                            'Terças, caibros e ripamento conforme projeto'
                        ]
                    },
                    {
                        title: 'Tipos de Telhado Executados',
                        items: [
                            'Telhado metálico com telhas termoacústicas',
                            'Laje impermeabilizada (telhado plano)',
                            'Coberturas com ventilação integrada para áreas críticas',
                            'Estruturas especiais para sistemas de exaustão'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem',
                        items: [
                            'Calhas em chapa galvanizada com capacidade dimensionada',
                            'Condutores verticais duplos para drenagem eficiente',
                            'Rufos, cumeeiras e arremates',
                            'Captação de águas pluviais com pré-tratamento'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estrutura dimensionada para grandes vãos sem pilares intermediários',
                            'Resistência a ventos conforme norma técnica',
                            'Garantia estrutural para longa vida útil',
                            'Previsão para expansões futuras'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Elétricas e Utilidades',
                subtitle: 'Infraestrutura Crítica para Fábricas',
                description: 'A Facilco executa infraestrutura civil para sistemas elétricos trifásicos de alta potência, ar comprimido, óleo hidráulico e outras utilidades críticas.',
                sections: [
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos de grande diâmetro para circuitos trifásicos',
                            'Caixas de passagem e inspeção especializadas',
                            'Shafts técnicos para painéis de distribuição e controle',
                            'Aterramento em malha completa para segurança',
                            'Infraestrutura para SPDA (para-raios)',
                            'Canaletas para cabeamento de força e controle'
                        ]
                    },
                    {
                        title: 'Sistemas de Utilities (Infraestrutura)',
                        items: [
                            'Tubulações para ar comprimido com canaletas',
                            'Tubulações para óleo hidráulico com suportes',
                            'Canaletas para água de processo e resfriamento',
                            'Shafts verticais para passagem de utilidades',
                            'Suportes estruturais para tubulações pesadas'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Instalações elétricas, utilities e equipamentos são concluídos por especialistas',
                            'Coordenação entre disciplinas em todas as etapas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Infraestrutura completa conforme projeto de processo',
                            'Shafts dimensionados para futuras expansões',
                            'Suportes estruturais para cargas pesadas de utilidades',
                            'Coordenação permanente com engenheiros de equipamentos'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Contenção',
                subtitle: 'Preparação de Terreno para Fábricas',
                description: 'Execução de serviços de movimentação de terra, escavação e aterro para viabilizar construção de plantas automotivas.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada com equipamentos de grande porte',
                            'Corte e aterro para nivelamento',
                            'Compactação de solo conforme especificação',
                            'Remoção de material excedente'
                        ]
                    },
                    {
                        title: 'Obras de Contenção (quando necessário)',
                        items: [
                            'Muros de arrimo em concreto armado',
                            'Cortinas ancoradas para encostas',
                            'Drenagem de encostas para estabilidade'
                        ]
                    },
                    {
                        title: 'Drenagem de Terreno',
                        items: [
                            'Canaletas perimetrais para coleta de água',
                            'Drenos superficiais',
                            'Caixas de captação estratégicas',
                            'Direcionamento de águas para pontos baixos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia precisa e projeto geométrico profissional',
                            'Execução com equipamentos de grande porte',
                            'Controle tecnológico de compactação'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais e documentação completa para construção e operação segura da fábrica.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'NBR 9050, NBR 8681, NBR 5410',
                            'NBR 6118, NBR 8800',
                            'NR-12, NR-17 e NR-35',
                            'Código de Obras Municipal, Alvará de Construção e Licença de Funcionamento'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'ART (Anotação de Responsabilidade Técnica)',
                            'Projeto executivo completo (arquitetônico + estrutural)',
                            'Projeto de compatibilização de linhas e equipamentos',
                            'Memorial descritivo e memorial de cálculo estrutural',
                            'As-built (projeto como construído)',
                            'Certificados de materiais e laudos de ensaios tecnológicos',
                            'Manual de operação e manutenção'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Grandes Vãos',
                description: 'Projetos para naves amplas com boa visibilidade, estabilidade estrutural e integração com operação de linhas de montagem otimizada.',
                highlights: [
                    'Estruturas metálicas e concreto protendido',
                    'Coberturas de grande vão sem pilares intermediários',
                    'Compatibilização com fluxos de produção automotiva'
                ]
            },
            {
                title: 'Circulação e Fluxo de Produção',
                description: 'Planejamento de fluxos operacionais e circulação viária para movimentação de componentes, pessoas e veículos finalizados.',
                highlights: [
                    'Fluxo de entrada de componentes e matérias-primas otimizado',
                    'Fluxo de saída de veículos acabados controlado',
                    'Dimensionamento de portas, rampas e corredores de emergência',
                    'Sinalização de segurança e procedimentos',
                    'Áreas de estacionamento e manobra'
                ]
            },
            {
                title: 'Segurança e Regularização',
                description: 'Adequações para segurança operacional, acessibilidade e conformidade com regulamentações de corpo de bombeiros e normas trabalhistas.',
                highlights: [
                    'Rotas de fuga e saídas de emergência dimensionadas',
                    'Iluminação de emergência especializada',
                    'Rampas e acessos conforme NBR 9050',
                    'Sistemas de detecção e alarme',
                    'Sinalização de perigo e segurança'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade de produção, layout de linhas, circulação de utilidades e estratégia de implantação por fases.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, acabamentos, infraestrutura especializada, linhas e equipamentos conforme cronograma com foco em segurança.' },
            { phase: '03', title: 'Estabilização', description: 'Validação de precisão de pisos, testes de equipamentos, ajustes finais e apoio para startup da produção.' }
        ],
        complianceHighlights: [
            { title: 'Segurança Operacional', norm: 'Corpo de Bombeiros', description: 'Projeto para fluxo seguro, sinalização de rotas de emergência e sistemas conforme regulamentações estaduais.' },
            { title: 'Acessibilidade Universal', norm: 'NBR 9050', description: 'Acessos, circulação e uso do espaço por todos os públicos com autonomia e segurança.' },
            { title: 'Segurança em Máquinas e Trabalho em Altura', norm: 'NR-12 e NR-35', description: 'Controle técnico para operações com máquinas pesadas e trabalho em altura durante construção.' }
        ],
        businessOutcomes: [
            { metric: 'Produtividade', impact: 'Fábrica automotiva otimizada para operação em múltiplos turnos, com linhas de montagem precisas e eficientes.' },
            { metric: 'Segurança Operacional', impact: 'Ambiente estruturalmente robusto e conforme normas, com segurança para operadores e equipamentos robóticos.' },
            { metric: 'Flexibilidade Produtiva', impact: 'Infraestrutura preparada para múltiplos modelos de veículos na mesma linha e futuras ampliações.' },
            { metric: 'Valorização', impact: 'Infraestrutura durável, especializada e dimensionada para evolução tecnológica e novos processos.' }
        ],
        faq: [
            { question: 'É possível fazer em etapas?', answer: 'Sim. Podemos estruturar a construção em fases e liberar produção parcial enquanto as próximas áreas são implantadas.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, temos expertise em plantas automotivas em múltiplas regiões e nos adaptamos às exigências locais.' },
            { question: 'Fazem reformas sem parar a produção?', answer: 'Sim, com planejamento rigoroso e execução por fases isoladas para manter a continuidade operacional.' },
            { question: 'Atendem fabricantes de qualquer porte?', answer: 'Sim. Desde fabricantes de componentes até grandes montadoras, com escopo ajustado ao volume de produção.' },
            { question: 'Como garantem a tolerância milimétrica dos pisos?', answer: 'Aplicamos topografia de precisão, nivelamento a laser e controle rigoroso durante a execução com documentação técnica.' },
            { question: 'Fazem o projeto de layout de linha também?', answer: 'O layout de processo é da montadora/engenharia de processo; nós executamos a infraestrutura civil conforme projeto aprovado.' },
            { question: 'Atendem plantas de eletrodomésticos ou outros segmentos similares?', answer: 'Sim, aplicamos a mesma expertise para plantas que exigem linhas de montagem precisas em qualquer segmento industrial.' },
            { question: 'Fazem obras com prazos apertados?', answer: 'Sim, utilizamos métodos construtivos modernos para reduzir prazo mantendo qualidade e segurança.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura para Linhas de Montagem Modernas',
                content: 'Projetos completos da fundação ao acabamento para linhas de montagem serial com precisão, segurança e escala.',
                bullets: ['Estruturas para robótica industrial', 'Pisos com tolerância milimétrica', 'Utilities e energia de alta potência'],
                stats: [{ label: 'Operação', value: 'Contínua' }, { label: 'Foco', value: 'Precisão' }, { label: 'Modelo', value: 'Escalável' }],
                image: '/automotivo/automotivo-08-construcao.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Mapeamento operacional, implantação e estabilização para startup seguro da produção automotiva.',
                bullets: ['Planejamento por fases', 'Execução com foco em segurança', 'Validação de piso e equipamentos'],
                image: '/automotivo/automotivo-09-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Diferenciais em Campo',
                content: 'Projeto, obra e proteção industrial em uma única governança técnica.',
                galleryImages: [
                    '/automotivo/automotivo-10-diferenciais-1.jpg',
                    '/automotivo/automotivo-10-diferenciais-2.jpg',
                    '/automotivo/automotivo-10-diferenciais-3.jpg'
                ]
            }
        ]
    },
    logistica: {
        constructionOverview: 'Em centros de distribuição modernos, a engenharia precisa equilibrar funcionalidade, segurança e escalabilidade. Infraestrutura adequada melhora a eficiência operacional e otimiza os processos logísticos, representando diferencial competitivo para empresas de distribuição, e-commerce e redes de varejo.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura',
                subtitle: 'Sistemas de Fundação Especializados',
                description: 'A construção de centros de distribuição exige fundações robustas, projetadas para suportar grandes cargas de armazenagem, máquinas de movimentação e operação contínua intensiva.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas de grande porte para distribuição de cargas concentradas',
                            'Radier (laje de fundação) para distribuição uniforme de cargas',
                            'Estacas escavadas (hélice contínua e perfuradas) para terrenos complexos',
                            'Tubulões a céu aberto para capacidades especiais',
                            'Fundações isoladas para equipamentos rotativos'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações em terrenos com baixa capacidade de carga',
                            'Reforço de pisos para equipamentos pesados e rotativos',
                            'Fundações em terrenos irregulares ou encostas',
                            'Projeto geotécnico com sondagem SPT completa',
                            'Análise de capacidade de carga para máquinas de grande porte'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Fundações dimensionadas para grandes cargas distribuídas e concentradas',
                            'Nivelamento preciso de pisos (tolerâncias controladas)',
                            'Estudo de solo obrigatório com engenheiro geotécnico',
                            'Memorial de cálculo e ART específica para fundações'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Grandes Vãos Livres',
                subtitle: 'Sistemas Estruturais Avançados',
                description: 'Centros de distribuição exigem naves amplas e livres de obstáculos para otimizar o armazenamento horizontal e vertical, bem como permitir movimentação eficiente de equipamentos de transporte interno.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Concreto protendido para grandes vãos',
                            'Estrutura metálica treliçada com pilares periféricos',
                            'Estrutura mista (concreto + metálica) para máxima eficiência',
                            'Vigas curvas de altura variável para redução de peso',
                            'Lajes nervuradas e coberturas treliçadas'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Naves principais com pé-direito elevado e grandes vãos livres',
                            'Mezzaninos e mezaninos de armazenagem vertical',
                            'Plataformas de carga elevadas com rampas de acesso',
                            'Coberturas autoportantes para máxima utilidade de espaço'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Vãos livres sem interferência de pilares na área central',
                            'Redução de seção estrutural (menor peso, mais espaço)',
                            'Alta durabilidade para operações contínuas',
                            'Resistência a cargas concentradas e dinâmicas',
                            'Projeto executivo completo com detalhamento'
                        ]
                    }
                ]
            },
            {
                title: 'Alvenaria Estrutural e Vedações',
                subtitle: 'Sistemas de Vedação para Centros de Distribuição',
                description: 'Construção de paredes estruturais e de vedação com foco em durabilidade, resistência mecânica e funcionalidade operacional para ambientes de armazenagem intensa.',
                sections: [
                    {
                        title: 'Tipos de Alvenaria Executados',
                        items: [
                            'Alvenaria estrutural em blocos de concreto',
                            'Alvenaria de vedação em blocos cerâmicos ou concreto',
                            'Paredes duplas com câmara de ar (isolamento térmico)',
                            'Alvenaria armada para paredes de grande altura',
                            'Paredes em concreto aparente moldado in loco'
                        ]
                    },
                    {
                        title: 'Reforços Estruturais',
                        items: [
                            'Cintas de amarração em concreto armado',
                            'Vergas e contravergas em todas as aberturas',
                            'Reforço para fixação de equipamentos pesados nas paredes',
                            'Paredes com resistência estrutural comprovada'
                        ]
                    },
                    {
                        title: 'Acabamento Estrutural',
                        items: [
                            'Chapisco, emboço e reboco',
                            'Massa única de regularização',
                            'Preparação de superfície para pintura final',
                            'Impermeabilização de paredes em contato com solo'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Alvenaria de primeira qualidade e durabilidade',
                            'Execução conforme projeto estrutural especificado',
                            'Prumo e nível rigorosamente controlados',
                            'Resistência adequada para grandes cargas e equipamentos'
                        ]
                    }
                ]
            },
            {
                title: 'Coberturas e Estruturas de Telhado',
                subtitle: 'Sistemas de Cobertura para Centros de Distribuição',
                description: 'Execução de estruturas de telhado robustas e duráveis, projetadas para suportar grandes vãos, cargas de vento e impermeabilização contra intempéries, fundamental para proteção de mercadorias armazenadas.',
                sections: [
                    {
                        title: 'Estruturas de Cobertura',
                        items: [
                            'Estrutura metálica em perfis soldados ou parafusados',
                            'Estrutura em madeira de lei tratada',
                            'Tesouras metálicas para grandes vãos',
                            'Estrutura em concreto para lajes impermeabilizadas',
                            'Terças, caibros e ripamento conforme projeto'
                        ]
                    },
                    {
                        title: 'Tipos de Telhado Executados',
                        items: [
                            'Telhado convencional em telhas cerâmicas ou concreto',
                            'Telhado metálico (telhas termoacústicas com isolamento)',
                            'Laje impermeabilizada (telhado plano para futuras ampliações)',
                            'Coberturas curvas e especiais'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem',
                        items: [
                            'Calhas em chapa galvanizada ou alumínio com capacidade dimensionada',
                            'Condutores verticais e horizontais para escoamento',
                            'Rufos, cumeeiras e arremates adequados',
                            'Captação de águas pluviais com direcionamento controlado'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estrutura dimensionada para vencer grandes vãos sem intermediários',
                            'Resistência a ventos conforme norma técnica',
                            'Garantia estrutural e longevidade',
                            'Previsão de sobrecarga para manutenção futura'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos e Contrapisos',
                subtitle: 'Sistemas de Pavimentação Industrial',
                description: 'Execução de pisos robustos e nivelados para alto tráfego de pessoas e equipamentos, incluindo rampas de acessibilidade conforme legislação.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Contrapiso em concreto armado com espessura adequada',
                            'Piso de concreto alisado/queimado de alta resistência',
                            'Piso industrial com camada de desgaste reforçada',
                            'Lajes de piso elevadas',
                            'Piso drenante para áreas de carga externa'
                        ]
                    },
                    {
                        title: 'Preparação para Operação',
                        items: [
                            'Regularização de superfície com tolerâncias apertadas',
                            'Impermeabilização de pisos contra infiltrações',
                            'Caimento técnico para escoamento de água pluvial',
                            'Juntas de dilatação e movimentação conforme norma'
                        ]
                    },
                    {
                        title: 'Rampas de Acessibilidade',
                        items: [
                            'Rampas conforme NBR 9050',
                            'Piso tátil direcional e de alerta',
                            'Corrimãos laterais em ambos os lados',
                            'Patamares intermediários para segurança'
                        ]
                    },
                    {
                        title: 'Áreas Externas',
                        items: [
                            'Calçadas em concreto ou piso intertravado',
                            'Estacionamento com vagas para PCD sinalizadas',
                            'Drenagem superficial e canaletas adequadas',
                            'Meio-fio e sarjetas para direcionamento de águas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Pisos nivelados conforme norma para movimentação sem obstáculos',
                            'Resistência para tráfego de equipamentos pesados',
                            'Acabamento que facilita limpeza e higiene operacional',
                            'Conformidade com acessibilidade universal'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Hidrossanitárias e Elétricas',
                subtitle: 'Preparação de Infraestrutura para Instalações',
                description: 'A Facilco executa toda a infraestrutura civil para passagem de instalações, prumadas, shafts e dutos que permitem flexibilidade operacional e expansão futura do centro de distribuição.',
                sections: [
                    {
                        title: 'Instalações Hidrossanitárias (Infraestrutura)',
                        items: [
                            'Rasgos e furos para tubulações de água, esgoto e pluviais',
                            'Caixas de passagem e inspeção para manutenção',
                            'Prumadas de esgoto, água potável e águas pluviais',
                            'Reservatórios de água (estrutura civil)',
                            'Poços de recalque (quando necessário)',
                            'Sistemas de drenagem de piso (canaletas perimetrais)'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos embutidos em lajes e paredes',
                            'Caixas de passagem e inspeção',
                            'Shafts técnicos para quadros elétricos de distribuição',
                            'Aterramento profissional (hastes e malha de terra)',
                            'Infraestrutura para SPDA (para-raios em pontos altos)',
                            'Canaletas para cabeamento de energia'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Instalações elétricas, hidráulicas e equipamentos são concluídos por especialistas',
                            'Coordenação entre disciplinas é realizada em todas as etapas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Infraestrutura completa conforme projeto especificado',
                            'Prumadas dimensionadas para futuras ampliações operacionais',
                            'Coordenação permanente com instaladores especializados',
                            'Flexibilidade para modificações futuras'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Contenção de Encostas',
                subtitle: 'Preparação de Terreno e Obras de Terra',
                description: 'Execução de serviços de movimentação de terra, escavação, aterro compactado e contenções para viabilizar construção em diversos tipos de terrenos.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada com equipamentos de grande porte',
                            'Corte e aterro para nivelamento do terreno',
                            'Compactação de solo conforme especificação técnica',
                            'Remoção e bota-fora de material excedente'
                        ]
                    },
                    {
                        title: 'Obras de Contenção',
                        items: [
                            'Muros de arrimo em concreto armado',
                            'Muros de gabião para contenção leve',
                            'Cortinas ancoradas (solo grampeado)',
                            'Contenções em blocos de concreto',
                            'Drenagem de encostas para estabilidade'
                        ]
                    },
                    {
                        title: 'Drenagem de Terreno',
                        items: [
                            'Canaletas perimetrais para coleta de água',
                            'Drenos profundos',
                            'Caixas de captação e dissipação',
                            'Direcionamento de águas pluviais para pontos baixos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia e projeto geométrico profissional',
                            'Execução com equipamentos de grande porte',
                            'Controle tecnológico de compactação',
                            'Laudo de estabilidade de taludes (quando necessário)'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Grandes Vãos',
                description: 'Projetos para naves amplas com boa visibilidade, estabilidade estrutural e integração com operação logística otimizada.',
                highlights: ['Estruturas metálicas e concreto protendido', 'Coberturas de grande vão sem pilares intermediários', 'Compatibilização com fluxos de operação logística']
            },
            {
                title: 'Circulação e Experiência Operacional',
                description: 'Planejamento de fluxos internos, dimensionamento de acessos e circulação viária para movimentação eficiente de equipamentos e pessoas.',
                highlights: ['Fluxo de entrada e saída de veículos otimizado', 'Dimensionamento de portas, rampas e corredores', 'Sinalização e orientação espacial para operadores', 'Estacionamento e áreas de manobra adequadas']
            },
            {
                title: 'Segurança e Regularização',
                description: 'Adequações para segurança operacional, acessibilidade universal e conformidade com regulamentações de corpo de bombeiros.',
                highlights: ['Rotas de fuga e saídas de emergência', 'Iluminação de emergência especializada', 'Rampas e acessos conforme NBR 9050', 'Sistemas de detecção e alarme', 'Sinalização de segurança operacional']
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade, estrutura logística, circulação e estratégia de implantação por fases, minimizando impactos operacionais.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, acabamentos, infraestrutura predial e sistemas conforme cronograma estabelecido.' },
            { phase: '03', title: 'Estabilização', description: 'Validação de segurança, documentação final, testes de operação e apoio para abertura com operação em plena capacidade.' }
        ],
        complianceHighlights: [
            { title: 'Segurança Operacional', norm: 'Corpo de Bombeiros', description: 'Projeto para fluxo seguro, sinalização de rotas e sistemas de emergência conforme regulamentações estaduais.' },
            { title: 'Acessibilidade Universal', norm: 'NBR 9050', description: 'Acessos, circulação e uso do espaço por todos os públicos com autonomia e segurança.' },
            { title: 'Execução de Obra com Segurança', norm: 'NR-18 e NR-35', description: 'Controle técnico para estruturas elevadas e frentes de montagem em altura durante construção.' }
        ],
        businessOutcomes: [
            { metric: 'Operacionalidade', impact: 'Centro de distribuição otimizado para fluxo contínuo, seguro e eficiente de materiais durante operação.' },
            { metric: 'Segurança Jurídica', impact: 'Maior previsibilidade para regulação, operação com conformidade total e documentação completa para auditorias.' },
            { metric: 'Valorização', impact: 'Infraestrutura durável, moderna e dimensionada para futuras ampliações sem perda de eficiência operacional.' }
        ],
        faq: [
            { question: 'É possível fazer em etapas?', answer: 'Sim, totalmente. Podemos estruturar a obra em fases, começando pela fundação e estrutura, depois cobertura, pisos e acabamentos. Isso permite iniciar operações parciais enquanto ampliamos.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, temos expertise em centros de distribuição em diversas regiões. Trabalhamos com logística nacional e regional, adaptando soluções à realidade de cada local.' },
            { question: 'Fazem expansão sem parar as operações?', answer: 'Sim, podemos executar ampliações e reformas em fases, isolando setores para que a operação continue funcionando.' },
            { question: 'Atendem centros de distribuição de qualquer tamanho?', answer: 'Sim. Desde pequenos centros de consolidação até grandes hubs logísticos. Adaptamos a solução ao volume de operação.' },
            { question: 'Como funciona a garantia?', answer: 'Oferecemos garantia estrutural de 5 anos a partir da conclusão da obra. Coberturas e impermeabilização têm garantias específicas de fabricante.' },
            { question: 'Fazem o projeto estrutural também?', answer: 'Sim, executamos ou coordenamos projetos estruturais completos. Trabalhamos com calculistas especializados em estruturas de grande porte.' },
            { question: 'Atendem centros de distribuição em terrenos complexos?', answer: 'Sim, realizamos fundações em terrenos irregulares, com sondagem SPT, análises geotécnicas e soluções de contenção quando necessário.' },
            { question: 'Coordenam outras empresas (sistemas de automação, WMS, racking)?', answer: 'Sim, coordenamos a interface entre infraestrutura civil e sistemas logísticos. Trabalhamos com fornecedores de racks, sistemas de armazenagem e integração de tecnologia.' }
        ],
        middleCarousel: [
            { src: '/logistica/galeria-01-facilco.jpg', alt: 'Centro de distribuicao no Brasil', label: 'Centro de distribuição de grande porte' },
            { src: '/logistica/galeria-02-facilco.jpg', alt: 'Corredor de racks em CD', label: 'Armazenagem vertical otimizada' },
            { src: '/logistica/galeria-03-facilco.jpg', alt: 'Docas com caminhões', label: 'Docas e operação de expedição' },
            { src: '/logistica/galeria-04-facilco.jpg', alt: 'Linha de separacao e esteiras', label: 'Picking e automação logística' },
            { src: '/logistica/galeria-05-facilco.jpg', alt: 'Patio logistico com carretas', label: 'Pátio logístico e fluxo viário' },
            { src: '/logistica/galeria-06-facilco.jpg', alt: 'Galpao pronto para operacao', label: 'Galpão com grande vão livre' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Construção Civil para Centros de Distribuição e Galpões Logísticos',
                content: 'Construção e otimização com fundação, estrutura, infraestrutura, pisos, drenagem e integração operacional.',
                bullets: ['Projeto orientado por fluxo', 'Frentes por turnos para evitar parada', 'Entrega com foco em SLA logístico'],
                stats: [{ label: 'Docas', value: 'Alta Rotação' }, { label: 'Piso', value: 'Heavy Traffic' }, { label: 'Meta', value: 'Giro Rápido' }],
                image: '/logistica/galeria-02-facilco.jpg'
            },
            {
                type: 'solution',
                title: 'Etapas da Obra Logística',
                content: 'Planejamento operacional, execução por zonas e validação com indicadores de produtividade.',
                bullets: ['Intervenção inteligente em docas', 'Proteção de estruturas críticas', 'Comissionamento com operação'],
                image: '/logistica/logistica-08-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Infraestrutura que Escala com o Negócio',
                content: 'Soluções para operação diária e para picos de demanda.',
                galleryImages: [
                    '/logistica/logistica-09-escala-1.jpg',
                    '/logistica/logistica-09-escala-2.jpg',
                    '/logistica/logistica-09-escala-3.jpg'
                ]
            },
            {
                type: 'solution',
                title: 'Compliance e Certificações',
                content: 'Projetos alinhados às exigências legais e documentação completa para entrega segura e operacional do centro de distribuição.',
                bullets: [
                    'NBR 9050, NBR 15524-2, NBR 8681, NBR 5410',
                    'NBR 10897, NBR 6118, NBR 8800 e Código de Obras',
                    'ART, projeto executivo, memorial descritivo e de cálculo',
                    'As-built, certificados de materiais e laudos tecnológicos'
                ],
                image: '/logistica/galeria-01-facilco.jpg'
            }
        ]
    },
    alimenticia: {
        constructionOverview: 'A indústria alimentícia é um dos setores mais regulados em termos de segurança. A engenharia civil deve estar integrada com requisitos sanitários, protocolos de limpeza e conceitos de rastreabilidade. Investimentos em infraestrutura adequada garantem conformidade regulatória, eficiência operacional, redução de desperdícios e proteção da qualidade do produto.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura Especializada',
                subtitle: 'Sistemas de Fundação para Indústrias Alimentícias',
                description: 'Indústrias alimentícias exigem fundações robustas dimensionadas para suportar equipamentos de transformação pesados e operação contínua em ambiente úmido.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas especiais para máquinas de transformação pesadas',
                            'Fundações isoladas para equipamentos com vibração',
                            'Radier para distribuição uniforme em áreas de processamento',
                            'Fundações em profundidade para estruturas de grandes vãos',
                            'Blocos de fundação com sistemas anti-vibração'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações para silos de armazenagem de matérias-primas',
                            'Fundações para câmaras frigoríficas de grande porte',
                            'Reforço de piso para máquinas de enchimento rápido',
                            'Fundações em plantas existentes sem parar produção',
                            'Projeto geotécnico especializado com controle de umidade',
                            'Análise de capacidade de carga para equipamentos pesados'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de vibrações para máquinas de precisão',
                            'Fundações dimensionadas para ambiente úmido',
                            'Projeto geotécnico especializado em indústrias alimentícias',
                            'Memorial de cálculo estrutural detalhado',
                            'ART específica para fundações'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Indústrias Alimentícias',
                subtitle: 'Sistemas Estruturais para Fábricas',
                description: 'Fábricas alimentícias exigem estruturas que permitam isolamento de áreas conforme risco microbiológico, facilidade de limpeza profunda e reconfiguração de linhas.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Estrutura metálica para flexibilidade operacional',
                            'Estrutura mista (concreto + metálica) para máxima eficiência',
                            'Plataformas de trabalho em múltiplos níveis com isolamento',
                            'Suportes especializados para máquinas de processamento',
                            'Divisões internas removíveis para diferentes processamentos'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Áreas de limpeza e sanitização de matérias-primas',
                            'Salas de processamento e transformação de produtos',
                            'Áreas de envase e embalagem com linhas integradas',
                            'Salas de controle de qualidade e laboratórios',
                            'Câmaras frigoríficas com estrutura integrada',
                            'Áreas de estocagem de produtos prontos (refrigeradas ou secas)'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Flexibilidade para reconfiguração conforme linhas de produto',
                            'Isolamento funcional entre áreas conforme risco',
                            'Facilidade de limpeza e desinfecção',
                            'Projeto executivo com compatibilização de utilidades'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos e Paredes Sanitárias',
                subtitle: 'Pavimentação e Vedação Higiênica',
                description: 'Pisos e paredes especializados que facilitam limpeza contínua, desinfecção, resistência química e impermeabilidade absoluta contra penetração de água e vapor.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Piso epóxi bicomponente com acabamento liso e antiderrapante',
                            'Piso vinílico especial para indústria alimentícia',
                            'Piso em concreto com selante sanitário',
                            'Rodapé integrado com vedação completa',
                            'Pisos em cerâmica sanitária para áreas não críticas'
                        ]
                    },
                    {
                        title: 'Paredes Sanitárias',
                        items: [
                            'Revestimento em laminado HPL antibactericida',
                            'Azulejos cerâmicos com rejunte epóxi em áreas úmidas',
                            'Pintura epóxi em áreas de menor criticidade',
                            'Cantos arredondados em todas as superfícies',
                            'Vedação de pontos críticos com silicone alimentar aprovado'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem Integrado',
                        items: [
                            'Canaletas com caimento para escoamento de água de limpeza',
                            'Grelhas removíveis para limpeza profunda',
                            'Drenos estratégicos em pontos baixos',
                            'Caixas de gordura em áreas de processamento de carnes e óleos',
                            'Direcionamento controlado de água para tratamento'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Materiais aprovados por ANVISA para contato com alimentos',
                            'Resistência a agentes desinfetantes',
                            'Acabamento que resiste a ciclos de limpeza repetidos',
                            'Conformidade com RDC 275/2002'
                        ]
                    }
                ]
            },
            {
                title: 'Câmaras Frigoríficas e Congelamento',
                subtitle: 'Infraestrutura para Armazenagem Refrigerada',
                description: 'Câmaras de armazenagem com controle rigoroso de temperatura e umidade para preservar segurança alimentar e qualidade de produtos sensíveis.',
                sections: [
                    {
                        title: 'Tipos de Câmaras Executados',
                        items: [
                            'Câmaras frigoríficas para produtos refrigerados',
                            'Câmaras de congelamento para conservação longa',
                            'Câmaras de maturação com temperatura e umidade controladas',
                            'Salas de quarentena de matérias-primas',
                            'Áreas de validação de conformidade'
                        ]
                    },
                    {
                        title: 'Características Construtivas',
                        items: [
                            'Isolamento térmico de paredes, pisos e coberturas',
                            'Portas duplas com selos de ar',
                            'Estrutura de piso com drenagem integrada',
                            'Luzes LED especializadas para ambientes frios',
                            'Monitoramento contínuo de temperatura'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de alta performance',
                            'Monitoramento contínuo com alarmes de desvio',
                            'Backup de energia para segurança de produto',
                            'Calibração e validação de sensores',
                            'Rastreabilidade completa de armazenagem'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Hidrossanitárias Especiais',
                subtitle: 'Infraestrutura para Operações Higiênicas',
                description: 'A Facilco executa infraestrutura civil para sistemas de água potável, águas residuais e higienização especializada.',
                sections: [
                    {
                        title: 'Instalações Hidrossanitárias (Infraestrutura)',
                        items: [
                            'Tubulações de água potável com isolamento de contaminação',
                            'Canaletas para águas residuais com declividade controlada',
                            'Caixas de gordura e areia para pré-tratamento',
                            'Tanques de equalização (infraestrutura civil)',
                            'Sistemas de tratamento preliminar (estrutura)',
                            'Drenos de limpeza estratégicos em toda planta'
                        ]
                    },
                    {
                        title: 'Sistemas de Higienização (Infraestrutura)',
                        items: [
                            'Tubulações para água quente (desinfecção)',
                            'Canaletas de distribuição de ar comprimido',
                            'Pontos de conexão para equipamentos CIP',
                            'Infraestrutura para vapor quando necessário',
                            'Suportes estruturais para mangueiras e conectores'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos especializados para ambientes úmidos',
                            'Caixas de passagem seladas e impermeáveis',
                            'Shafts técnicos para painéis de distribuição',
                            'Aterramento em malha completa',
                            'Infraestrutura para SPDA',
                            'Cabeamento para sensores de temperatura e umidade'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Sistemas especializados são concluídos por empresas habilitadas',
                            'Coordenação entre disciplinas ocorre em todas as etapas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Infraestrutura completa conforme projeto alimentício',
                            'Canaletas e shafts dimensionados para futuras ampliações',
                            'Facilidade de acesso para manutenção e limpeza',
                            'Documentação completa para auditorias sanitárias'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Drenagem de Terreno',
                subtitle: 'Preparação de Terreno para Indústrias Alimentícias',
                description: 'Execução de serviços de movimentação de terra, escavação e drenagem para viabilizar construção em diversos tipos de terreno, inclusive com nível freático elevado.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada com controle de umidade',
                            'Corte e aterro para nivelamento adequado',
                            'Compactação de solo conforme especificação',
                            'Remoção de material excedente'
                        ]
                    },
                    {
                        title: 'Obras de Drenagem',
                        items: [
                            'Canaletas perimetrais profundas para coleta de água',
                            'Drenos profundos em solos com umidade elevada',
                            'Caixas de captação e dissipação estratégicas',
                            'Sistemas de rebaixamento de lençol freático quando necessário',
                            'Direcionamento controlado de águas pluviais'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia precisa com controle de drenagem',
                            'Execução com equipamentos de grande porte',
                            'Controle tecnológico de compactação',
                            'Estudo geotécnico com análise de nível freático'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais e documentação completa para construção e operação segura de fábrica alimentícia.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'RDC 275/2002 (ANVISA) - Boas Práticas de Fabricação',
                            'NBR 9050, NBR 8681, NBR 5410',
                            'NBR 6118, NBR 8800',
                            'NR-36 para ambientes de abate e processamento de carnes',
                            'Código de Obras Municipal, Alvará de Construção e Licença de Funcionamento'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'ART (Anotação de Responsabilidade Técnica)',
                            'Projeto executivo completo (arquitetônico + estrutural)',
                            'Projeto de layout com fluxo de produção higiênico',
                            'Memorial descritivo e memorial de cálculo estrutural',
                            'Projeto de sistemas de drenagem e higienização',
                            'As-built (projeto como construído)',
                            'Certificados de materiais e componentes',
                            'Laudos de testes de impermeabilidade',
                            'Manual de operação, limpeza, manutenção e rastreabilidade'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Configuração de Áreas',
                description: 'Projetos para naves que segregam áreas conforme risco microbiológico, com funcionalidade operacional e fluxo otimizado.',
                highlights: [
                    'Estruturas metálicas e concreto resistente',
                    'Áreas de processamento isoladas conforme risco',
                    'Compatibilização com fluxos de produção alimentícia'
                ]
            },
            {
                title: 'Circulação e Fluxo de Produção',
                description: 'Planejamento de fluxos operacionais e segregação de áreas para movimentação segura de matérias-primas e produtos.',
                highlights: [
                    'Fluxo de entrada de matérias-primas controlado e segregado',
                    'Fluxo de saída de produtos acabados isolado',
                    'Dimensionamento de portas, rampas e corredores de emergência',
                    'Sinalização de riscos e procedimentos de higiene',
                    'Áreas de vestiário e higienização pessoal'
                ]
            },
            {
                title: 'Segurança e Regularização',
                description: 'Adequações para segurança operacional, conformidade com ANVISA, acessibilidade e Corpo de Bombeiros.',
                highlights: [
                    'Rotas de fuga e saídas de emergência dimensionadas',
                    'Iluminação de emergência especializada',
                    'Rampas e acessos conforme NBR 9050',
                    'Sistemas de detecção e alarme',
                    'Sinalização de segurança e procedimentos'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade de produção, layout de processos, fluxo de utilidades e estratégia de implantação por fases.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, acabamentos, infraestrutura especializada, câmaras frigoríficas e sistemas conforme cronograma com foco em qualidade.' },
            { phase: '03', title: 'Estabilização', description: 'Testes de conformidade sanitária, validação de drenagem, auditorias pré-operacionais e apoio para operação comercial.' }
        ],
        complianceHighlights: [
            { title: 'Boas Práticas de Fabricação', norm: 'ANVISA (RDC 275/2002)', description: 'Projeto para conformidade integral, segregação de áreas, fluxos higiênicos e rastreabilidade dos processos.' },
            { title: 'Acessibilidade Universal', norm: 'NBR 9050', description: 'Acessos, circulação e uso do espaço por todos os públicos com autonomia e segurança.' },
            { title: 'Segurança e Saúde no Trabalho', norm: 'NR-36', description: 'Controle técnico para operações seguras com equipamentos pesados conforme regulamentações ocupacionais.' }
        ],
        businessOutcomes: [
            { metric: 'Segurança Alimentar', impact: 'Fábrica conforme RDC 275/2002 com fluxo higiênico controlado do recebimento à expedição.' },
            { metric: 'Eficiência Operacional', impact: 'Fluxo de produção otimizado que reduz movimentação desnecessária mantendo conformidade sanitária.' },
            { metric: 'Segurança Jurídica', impact: 'Previsibilidade para conformidade regulatória, operação autorizada e documentação completa para inspeções.' },
            { metric: 'Valorização', impact: 'Infraestrutura durável e especializada, preparada para expansões e mudanças de linha de produto.' }
        ],
        faq: [
            { question: 'É possível fazer em etapas?', answer: 'Sim. Podemos estruturar em fases com liberação gradual de operação enquanto as próximas áreas são implantadas.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, atendemos fábricas alimentícias em múltiplas regiões e com adaptação a exigências locais.' },
            { question: 'Fazem reformas sem parar produção?', answer: 'Sim, com planejamento rigoroso e execução em fases isoladas para manter a operação ativa.' },
            { question: 'Atendem fabricantes de qualquer porte?', answer: 'Sim. De pequenas plantas a grandes indústrias de processamento, com escopo ajustado ao volume e tipo de alimento.' },
            { question: 'Como garantem conformidade com ANVISA?', answer: 'Trabalhamos com diretrizes sanitárias durante projeto e execução e realizamos validações de conformidade antes da operação.' },
            { question: 'Fazem o layout de produção?', answer: 'Coordenamos com especialistas de processo e executamos a infraestrutura civil conforme layout aprovado.' },
            { question: 'Atendem diferentes tipos de alimento?', answer: 'Sim, com soluções para carnes, lácteos, bebidas e outras categorias com requisitos específicos.' },
            { question: 'Fazem obras com prazos apertados?', answer: 'Sim, aplicamos sistemas construtivos modernos para reduzir prazo mantendo qualidade e conformidade sanitária.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura Higiênica para Processamento de Alimentos',
                content: 'Projetos completos para fábricas de alimentos e bebidas com segregação de áreas, drenagem sanitária e conformidade regulatória.',
                bullets: ['Layout sanitário conforme RDC 275/2002', 'Pisos e paredes laváveis e impermeáveis', 'Câmaras frigoríficas e fluxo de produção otimizado'],
                stats: [{ label: 'Foco', value: 'RDC 275' }, { label: 'Controle', value: 'Sanitário' }, { label: 'Entrega', value: 'Auditável' }],
                image: '/alimenticia/alimenticia-07-construcao.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Mapeamento operacional, implantação e estabilização com testes de conformidade antes da operação comercial.',
                bullets: ['Estudo de capacidade e layout de processos', 'Execução por fases com foco em qualidade', 'Validação sanitária e apoio de startup'],
                image: '/alimenticia/alimenticia-08-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Estruturas de Alto Padrão Higiênico',
                content: 'Infraestrutura civil e proteção industrial para ambientes de processamento sensível.',
                galleryImages: [
                    '/alimenticia/alimenticia-09-estrutura-1.jpg',
                    '/alimenticia/alimenticia-09-estrutura-2.jpg',
                    '/alimenticia/alimenticia-09-estrutura-3.jpg'
                ]
            }
        ]
    },
    farmaceutica: {
        constructionOverview: 'A indústria farmacêutica é um dos setores mais regulados da construção. A engenharia civil deve estar integrada com regulamentações sanitárias, requisitos de qualidade e conformidade ambiental. Investimentos em infraestrutura adequada garantem conformidade regulatória, eficiência operacional e proteção da qualidade do produto final.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura Especializada',
                subtitle: 'Sistemas de Fundação para Plantas Farmacêuticas',
                description: 'Plantas farmacêuticas exigem fundações robustas dimensionadas para suportar equipamentos de transformação, centrifugadoras, liofilizadores e máquinas de envase de precisão.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas especiais para equipamentos de precisão com isolamento de vibrações',
                            'Fundações isoladas para máquinas críticas com amortecimento',
                            'Radier para distribuição uniforme de cargas em áreas de processamento',
                            'Fundações em profundidade para grandes estruturas e silos de matérias-primas',
                            'Blocos de fundação com sistemas anti-vibração'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações para autoclaves e equipamentos sob pressão',
                            'Reforço de piso para máquinas de envase de alta velocidade',
                            'Fundações em instalações existentes sem parar operação',
                            'Fundações para sala limpa com piso elevado',
                            'Projeto geotécnico especializado com sondagem SPT',
                            'Análise de capacidade de carga para equipamentos críticos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de vibrações para máquinas de precisão',
                            'Fundações dimensionadas para cargas dinâmicas e estáticas',
                            'Projeto geotécnico especializado em ambientes farmacêuticos',
                            'Memorial de cálculo estrutural detalhado',
                            'ART específica para fundações'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Operações Farmacêuticas',
                subtitle: 'Sistemas Estruturais para Plantas Farmacêuticas',
                description: 'Plantas farmacêuticas exigem estruturas que permitam flexibilidade operacional, isolamento de áreas conforme risco e facilidade de limpeza e descontaminação.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Estrutura metálica para flexibilidade de layout operacional',
                            'Estrutura mista (concreto + metálica) para máxima eficiência',
                            'Plataformas de trabalho em múltiplos níveis com isolamento',
                            'Suportes especializados para equipamentos de transformação',
                            'Divisões internas com divisórias desmontáveis para reclassificação'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Salas limpas de síntese e reação com controle ambiental',
                            'Áreas de envase asséptico com isolamento total',
                            'Salas de produção de comprimidos e cápsulas',
                            'Áreas de liofilização com equipamentos especializados',
                            'Salas de controle de qualidade e testes analíticos',
                            'Áreas de armazenagem climatizada'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Flexibilidade para reconfiguração de áreas conforme evolução regulatória',
                            'Isolamento acústico e ambiental entre áreas',
                            'Facilidade de limpeza e descontaminação',
                            'Projeto executivo com compatibilização QI/QO'
                        ]
                    }
                ]
            },
            {
                title: 'Salas Limpas e Controle de Contaminação',
                subtitle: 'Infraestrutura de Salas Limpas Classificadas',
                description: 'Salas limpas são ambientes críticos controlados conforme ISO 14644. Cada classificação tem requisitos específicos de ar, filtração, pressão e partículas.',
                sections: [
                    {
                        title: 'Classificações de Sala Limpa',
                        items: [
                            'Classe A: envase asséptico',
                            'Classe B: suporte próximo',
                            'Classe C: preparação de matérias-primas',
                            'Classe D: armazenagem e pesagem inicial'
                        ]
                    },
                    {
                        title: 'Características de Construção',
                        items: [
                            'Pisos em epóxi com acabamento contínuo sem frestas',
                            'Paredes em laminado HPL ou divisórias desmontáveis',
                            'Tetos em laminado especial de fácil limpeza',
                            'Cantos arredondados para facilitar descontaminação',
                            'Portas com fechamento automático e dupla passagem',
                            'Câmaras de ar filtrado entre áreas'
                        ]
                    },
                    {
                        title: 'Sistemas de Ar Condicionado Especializado',
                        items: [
                            'Filtros HEPA de alta eficiência',
                            'Pressão diferencial mantida automaticamente (A > B > C > D)',
                            'Controle de temperatura e umidade conforme processo',
                            'Renovação de ar conforme classe de sala limpa'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Construção com materiais aprovados para descontaminação',
                            'Validação de limpeza conforme guias aplicáveis',
                            'Qualificação de operação antes da produção',
                            'Documentação completa de classificação'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos e Paredes Sanitárias',
                subtitle: 'Pavimentação e Vedação Farmacêutica',
                description: 'Pisos especializados que facilitam limpeza, descontaminação, resistem a produtos químicos e mantêm impermeabilidade absoluta.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Piso epóxi bicomponente com acabamento sanitário liso',
                            'Piso vinílico de alta performance com soldagem de juntas',
                            'Rodapé integrado com vedação completa',
                            'Pisos com propriedades antiestáticas quando necessário',
                            'Pisos em cerâmica especial para áreas não críticas'
                        ]
                    },
                    {
                        title: 'Paredes Sanitárias',
                        items: [
                            'Revestimento em laminado HPL antibactericida',
                            'Divisórias em vidro temperado com vedação completa',
                            'Pintura epóxi em áreas de menor criticidade',
                            'Cantos arredondados em todas as superfícies',
                            'Selagem de pontos críticos com silicone farmacêutico aprovado'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Materiais aprovados para ambiente farmacêutico',
                            'Resistência a agentes desinfetantes',
                            'Acabamento para ciclos repetidos de limpeza/desinfecção',
                            'Conformidade com BPF'
                        ]
                    }
                ]
            },
            {
                title: 'Sistemas de Gases Medicinais e Utilidades',
                subtitle: 'Infraestrutura para Redes Críticas',
                description: 'A Facilco executa infraestrutura civil para redes de gases medicinais, água purificada e outros sistemas críticos de utilidade.',
                sections: [
                    {
                        title: 'Sistemas de Gases Medicinais (Infraestrutura)',
                        items: [
                            'Canaletas para tubulações de gases (nitrogênio, CO2, ar comprimido)',
                            'Suportes estruturais para tubulações de cobre ou aço inoxidável',
                            'Shafts verticais para passagem de utilidades',
                            'Caixas de inspeção e regulação de pressão',
                            'Infraestrutura para cilindros armazenados de forma segura'
                        ]
                    },
                    {
                        title: 'Sistemas de Água (Infraestrutura)',
                        items: [
                            'Canaletas para água purificada e destilada',
                            'Tubulações de volta para manutenção de temperatura',
                            'Tanques de armazenamento (infraestrutura civil)',
                            'Filtragem preliminar e tratamento (infraestrutura)'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos especializados para salas limpas',
                            'Caixas de passagem e inspeção',
                            'Shafts técnicos para painéis de controle',
                            'Aterramento profissional em malha completa',
                            'Infraestrutura para SPDA',
                            'Cabeamento para sensores de monitoramento'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Sistemas especializados são concluídos por empresas habilitadas',
                            'Coordenação entre disciplinas com validação QI/QO'
                        ]
                    }
                ]
            },
            {
                title: 'Armazenagem Climatizada',
                subtitle: 'Áreas de Armazenagem com Controle Ambiental',
                description: 'Infraestrutura de armazenagem com temperatura e umidade controladas para preservar integridade de produtos sensíveis.',
                sections: [
                    {
                        title: 'Tipos de Armazenagem Executados',
                        items: [
                            'Câmaras frigoríficas para produtos biologicamente lábeis',
                            'Câmaras de temperatura controlada para medicamentos',
                            'Salas de quarentena com controle ambiental',
                            'Áreas de validação e testes conforme especificação',
                            'Prateleiras e estruturas de armazenagem integradas'
                        ]
                    },
                    {
                        title: 'Controle Ambiental',
                        items: [
                            'Sistemas de ar condicionado especializado',
                            'Monitoramento contínuo de temperatura e umidade',
                            'Sistemas de alarme e registro de conformidade',
                            'Backup de energia para manutenção da cadeia fria'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento térmico de paredes e coberturas',
                            'Sistemas redundantes para segurança de produto',
                            'Calibração e validação de sensores',
                            'Rastreabilidade completa das condições de armazenagem'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Isolamento de Áreas',
                description: 'Projetos para naves com estruturas que isolam áreas conforme risco, com boa funcionalidade operacional e flexibilidade para reclassificação.',
                highlights: [
                    'Estruturas metálicas e concreto resistente',
                    'Salas limpas com sistemas de controle de ar integrados',
                    'Compatibilização com fluxos de processo farmacêutico'
                ]
            },
            {
                title: 'Circulação e Fluxo de Operação',
                description: 'Planejamento de fluxos operacionais, dimensionamento de acessos e circulação para movimentação segura de pessoas, materiais e produtos.',
                highlights: [
                    'Fluxo de entrada de matérias-primas controlado',
                    'Fluxo de saída de produtos acabados segregado',
                    'Dimensionamento de portas, rampas e corredores de emergência',
                    'Sinalização de riscos e procedimentos',
                    'Áreas de vestiário e higienização pessoal'
                ]
            },
            {
                title: 'Segurança e Regularização',
                description: 'Adequações para segurança operacional, conformidade com ANVISA, acessibilidade e regulamentações do Corpo de Bombeiros.',
                highlights: [
                    'Rotas de fuga e saídas de emergência dimensionadas',
                    'Iluminação de emergência especializada',
                    'Rampas e acessos conforme NBR 9050',
                    'Sistemas de detecção e alarme',
                    'Sinalização de segurança e procedimentos'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade de produção, layout de processos, fluxo de utilidades e estratégia de implantação por fases.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, acabamentos, infraestrutura especializada, salas limpas e sistemas conforme cronograma com foco em qualidade.' },
            { phase: '03', title: 'Estabilização', description: 'Validação de classificação de salas limpas, testes de conformidade e qualificação de instalação e operação antes da produção.' }
        ],
        complianceHighlights: [
            { title: 'Boas Práticas de Fabricação', norm: 'ANVISA (RDC 17/10)', description: 'Projeto para conformidade integral, segregação de áreas, controle ambiental e rastreabilidade dos processos.' },
            { title: 'Salas Limpas Classificadas', norm: 'ISO 14644', description: 'Classificação, projeto e validação de ambientes controlados com requisitos de partículas, ar e pressão.' },
            { title: 'Segurança em Altura e Emergência', norm: 'NR-35 e Corpo de Bombeiros', description: 'Controle técnico para estruturas elevadas e sistemas de segurança conforme regulamentações estaduais.' }
        ],
        businessOutcomes: [
            { metric: 'Conformidade Regulatória', impact: 'Planta farmacêutica conforme ANVISA com qualificações de instalação e operação validadas.' },
            { metric: 'Qualidade de Produto', impact: 'Ambiente controlado que garante integridade, pureza e eficácia durante produção e armazenagem.' },
            { metric: 'Segurança Jurídica', impact: 'Previsibilidade para aprovações regulatórias e documentação completa para inspeções e auditorias.' },
            { metric: 'Valorização', impact: 'Infraestrutura durável e especializada, preparada para futuras expansões ou novas linhas.' }
        ],
        faq: [
            { question: 'É possível construir em etapas?', answer: 'Sim. Podemos estruturar em fases e liberar áreas gradualmente para operações parciais enquanto o projeto evolui.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, atendemos múltiplas regiões com adaptação às exigências locais e estaduais.' },
            { question: 'Fazem reformas e ampliações sem parar produção?', answer: 'Sim, com planejamento rigoroso e isolamento de áreas para manter operação com qualidade.' },
            { question: 'Atendem fabricantes de qualquer porte?', answer: 'Sim. Desde laboratórios menores até grandes indústrias farmacêuticas, ajustando escopo ao processo.' },
            { question: 'Como funciona a qualificação QI/QO?', answer: 'QI valida a instalação conforme especificação e QO valida o funcionamento conforme esperado para operação.' },
            { question: 'Fazem projeto de salas limpas?', answer: 'Sim, executamos projeto e validação de salas limpas conforme ISO 14644 com coordenação de HVAC.' },
            { question: 'Atendem plantas biofarmacêuticas?', answer: 'Sim, com soluções para biotecnologia e produtos sensíveis com requisitos elevados de controle.' },
            { question: 'Como é a documentação para ANVISA?', answer: 'Entregamos documentação técnica de engenharia e qualificação para apoiar processos regulatórios e auditorias.' },
            { question: 'Fazem obras com cronogramas apertados?', answer: 'Sim, utilizamos métodos construtivos modernos para reduzir prazo mantendo conformidade e qualidade.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura para BPF e Regulamentações ANVISA',
                content: 'Projetos para manufatura farmacêutica com salas limpas, utilidades críticas e documentação completa para conformidade.',
                bullets: [
                    'Conformidade com BPF e regulamentações ANVISA',
                    'Salas limpas com controle de contaminação',
                    'Infraestrutura para gases medicinais e armazenagem climatizada'
                ],
                stats: [{ label: 'Padrão', value: 'BPF' }, { label: 'Controle', value: 'ISO 14644' }, { label: 'Entrega', value: 'QI/QO' }],
                image: '/farmaceutica/farmaceutica-07-construcao.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Mapeamento operacional, implantação e estabilização com validações antes da operação comercial.',
                bullets: [
                    'Mapeamento de layout, utilidades e riscos críticos',
                    'Execução faseada com controle de qualidade',
                    'Validação de conformidade e liberação operacional'
                ],
                image: '/farmaceutica/farmaceutica-08-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Infraestrutura para Produção Segura',
                content: 'Soluções civis e de proteção para laboratórios e áreas de fabricação farmacêutica.',
                galleryImages: [
                    '/farmaceutica/farmaceutica-09-infra-1.jpg',
                    '/farmaceutica/farmaceutica-09-infra-2.jpg',
                    '/farmaceutica/farmaceutica-09-infra-3.jpg'
                ]
            }
        ]
    },
    quimica: {
        constructionOverview: 'A engenharia química na construção civil é protagonista na inovação de materiais e processos. Materiais inovadores e estruturas especializadas garantem rentabilidade, modernidade e sustentabilidade. A construção civil requer integração entre engenheiros civis e engenheiros químicos para otimizar qualidade, reduzir custos e garantir conformidade com normas severas de segurança ambiental.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura Especial',
                subtitle: 'Sistemas de Fundação Especializados',
                description: 'Plantas químicas exigem fundações robustas projetadas para suportar equipamentos pesados, tanques de armazenagem e máquinas de transformação com operação contínua.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas especiais para equipamentos rotativos de grande peso',
                            'Fundações isoladas para máquinas com vibração',
                            'Radier para distribuição uniforme de cargas em áreas de processo',
                            'Fundações em profundidade para grandes estruturas e torres',
                            'Blocos de fundação com amortecimento de vibrações'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações para tanques de armazenagem',
                            'Reforço de piso para máquinas de grande porte em instalações existentes',
                            'Fundações em terrenos com baixa capacidade de carga',
                            'Fundações para reatores sob pressão',
                            'Projeto geotécnico especializado com sondagem SPT completa',
                            'Análise de capacidade de carga para equipamentos dinâmicos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de vibrações para máquinas críticas',
                            'Fundações dimensionadas para cargas dinâmicas e estáticas',
                            'Projeto geotécnico especializado em plantas químicas',
                            'Memorial de cálculo estrutural detalhado',
                            'ART específica do engenheiro geotécnico'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Operações Químicas',
                subtitle: 'Sistemas Estruturais para Plantas',
                description: 'Plantas químicas exigem estruturas que permitam flexibilidade operacional, segurança absoluta e fácil manutenção de equipamentos e tubulações complexas.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Estrutura metálica para flexibilidade operacional e facilidade de expansão',
                            'Estrutura mista (concreto + metálica) para máxima eficiência',
                            'Plataformas de trabalho e operação em múltiplos níveis',
                            'Suportes e racks especializados para tubulações e equipamentos',
                            'Estruturas para piping pesado e utilidades'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Salas de reação e processamento com controle ambiental',
                            'Áreas de destilação com equipamentos de grande peso',
                            'Salas de envase, embalagem e acabamento de produtos',
                            'Áreas de armazenagem de matérias-primas com segregação',
                            'Torres de destilação e reatores de pressão',
                            'Estruturas para sistemas de filtração e tratamento'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Flexibilidade para reconfiguração de linhas de processo',
                            'Resistência a cargas concentradas e dinâmicas',
                            'Facilidade para instalação e manutenção de equipamentos',
                            'Projeto executivo com compatibilização de todas as disciplinas'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos Especiais Resistentes a Químicos',
                subtitle: 'Pavimentação Resistente a Agentes Químicos',
                description: 'Pisos especializados que resistem a derramamentos químicos, ácidos e solventes, facilitando limpeza, descontaminação e manutenção operacional.',
                sections: [
                    {
                        title: 'Tipos Executados',
                        items: [
                            'Piso epóxi industrial com acabamento antiderrapante',
                            'Piso de concreto com selante químico de alta performance',
                            'Piso drenante para contenção de vazamentos',
                            'Soleiras e diques de contenção estratégicos',
                            'Piso em concreto armado com camada de proteção química'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem Especializado',
                        items: [
                            'Canaletas de coleta de resíduos e derramamentos',
                            'Caixas de contenção especiais com separação de fases',
                            'Direcionamento controlado para tratamento de efluentes',
                            'Sumps e fossas de contenção emergencial',
                            'Sistemas de escoamento gradual'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Resistência comprovada a produtos químicos específicos',
                            'Acabamento que facilita limpeza e descontaminação',
                            'Sistema de drenagem que contém vazamentos',
                            'Impermeabilização total do substrato'
                        ]
                    }
                ]
            },
            {
                title: 'Alvenaria Estrutural e Vedações Especiais',
                subtitle: 'Sistemas de Vedação para Operações Químicas',
                description: 'Construção de paredes estruturais e de vedação com foco em durabilidade, resistência a agentes químicos e funcionalidade operacional.',
                sections: [
                    {
                        title: 'Tipos de Alvenaria Executados',
                        items: [
                            'Alvenaria estrutural em blocos de concreto com revestimento químico',
                            'Alvenaria de vedação em blocos cerâmicos com acabamento especial',
                            'Paredes duplas com câmara de ar',
                            'Alvenaria armada para paredes de grande altura',
                            'Paredes em concreto moldado in loco com acabamento resistente'
                        ]
                    },
                    {
                        title: 'Acabamento Estrutural Especializado',
                        items: [
                            'Chapisco, emboço e reboco com aditivos de proteção química',
                            'Revestimento com tinta epóxi industrial',
                            'Preparação de superfície para máxima aderência',
                            'Impermeabilização em paredes internas e externas',
                            'Sealing completo em encontros e cantos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Alvenaria com acabamento químico comprovado',
                            'Execução conforme especificação de resistência química',
                            'Prumo e nível rigorosamente controlados',
                            'Resistência comprovada a produtos corrosivos específicos'
                        ]
                    }
                ]
            },
            {
                title: 'Coberturas e Estruturas de Telhado',
                subtitle: 'Sistemas de Cobertura para Plantas Químicas',
                description: 'Execução de estruturas de telhado robustas e duráveis, projetadas para suportar grandes vãos, cargas de vento e impermeabilização absoluta contra intempéries.',
                sections: [
                    {
                        title: 'Estruturas de Cobertura',
                        items: [
                            'Estrutura metálica em perfis soldados ou parafusados',
                            'Estrutura em madeira tratada para ambientes não corrosivos',
                            'Tesouras metálicas para grandes vãos sem intermediários',
                            'Estrutura em concreto para lajes impermeabilizadas',
                            'Terças, caibros e ripamento conforme projeto'
                        ]
                    },
                    {
                        title: 'Tipos de Telhado Executados',
                        items: [
                            'Telhado convencional em telhas de cerâmica ou concreto',
                            'Telhado metálico com telhas termoacústicas isoladas',
                            'Laje impermeabilizada para ventilação',
                            'Coberturas com ventilação cruzada para exaustão',
                            'Estruturas especiais para exaustores e ventiladores'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem',
                        items: [
                            'Calhas com descida reforçada',
                            'Condutores verticais duplos para maior capacidade',
                            'Rufos, cumeeiras e arremates com selante específico',
                            'Captação de águas pluviais com pré-tratamento'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estrutura dimensionada para vencer grandes vãos',
                            'Resistência a ventos conforme norma técnica',
                            'Garantia estrutural para longa vida útil',
                            'Previsão de cargas para futuras expansões'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Hidrossanitárias Especiais',
                subtitle: 'Preparação de Infraestrutura para Instalações Críticas',
                description: 'A Facilco executa a infraestrutura civil para passagem de instalações especiais, tubulações de processo e sistemas de utilidades críticas para operações químicas.',
                sections: [
                    {
                        title: 'Instalações para Processos (Infraestrutura)',
                        items: [
                            'Rasgos e furos para tubulações de processo',
                            'Canaletas especializadas para pipe racks',
                            'Suportes estruturais para tubulações pesadas e de pressão',
                            'Shafts verticais para redes de utilidades',
                            'Caixas de inspeção e passagem para manutenção',
                            'Infraestrutura para válvulas de isolamento e controle'
                        ]
                    },
                    {
                        title: 'Instalações Hidrossanitárias (Infraestrutura)',
                        items: [
                            'Rasgos e furos para água de processo, refrigeração e resfriamento',
                            'Canaletas para águas pluviais com separação de efluentes',
                            'Prumadas de esgoto e efluentes especiais',
                            'Tanques de equalização (infraestrutura civil)',
                            'Sistemas de tratamento preliminar (estrutura)',
                            'Poços de recalque com bombeamento para tratamento'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos de grande diâmetro para circuitos de alta potência',
                            'Caixas de passagem e inspeção especializadas',
                            'Shafts técnicos para painéis de controle e distribuição',
                            'Aterramento profissional em malha completa',
                            'Infraestrutura para SPDA (para-raios em áreas altas)',
                            'Canaletas para cabeamento de força e controle'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Instalações elétricas, hidráulicas, de processo e equipamentos são concluídos por especialistas',
                            'A coordenação entre disciplinas ocorre em todas as etapas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Infraestrutura completa conforme projeto de processo',
                            'Shafts dimensionados para tubulações futuras',
                            'Suportes estruturais para cargas dinâmicas de utilidades',
                            'Coordenação permanente com engenheiros de processo'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Contenção',
                subtitle: 'Preparação de Terreno para Plantas',
                description: 'Execução de serviços de movimentação de terra, escavação e aterro para viabilizar construção de plantas químicas em diversos tipos de terrenos.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada com equipamentos de grande porte',
                            'Corte e aterro para nivelamento do terreno',
                            'Compactação de solo conforme especificação técnica',
                            'Remoção de material excedente'
                        ]
                    },
                    {
                        title: 'Obras de Contenção (quando necessário)',
                        items: [
                            'Muros de arrimo em concreto armado',
                            'Cortinas ancoradas para encostas',
                            'Muros de gabião para contenção leve',
                            'Drenagem de encostas para estabilidade'
                        ]
                    },
                    {
                        title: 'Drenagem de Terreno',
                        items: [
                            'Canaletas perimetrais para coleta de água de chuva',
                            'Drenos profundos em solos argilosos',
                            'Caixas de captação e dissipação estratégicas',
                            'Direcionamento de águas pluviais para pontos baixos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia precisa e projeto geométrico profissional',
                            'Execução com equipamentos de grande porte',
                            'Controle tecnológico de compactação',
                            'Laudo de estabilidade quando necessário'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Sistemas de Suporte',
                description: 'Projetos para naves com estruturas que suportam equipamentos pesados, máquinas rotatórias e sistemas integrados com boa funcionalidade operacional.',
                highlights: [
                    'Estruturas metálicas e concreto resistente',
                    'Coberturas com sistemas de exaustão integrados',
                    'Compatibilização com fluxos de processo químico'
                ]
            },
            {
                title: 'Circulação e Fluxo de Operação',
                description: 'Planejamento de fluxos operacionais, dimensionamento de acessos e circulação viária para movimentação segura de pessoas e materiais.',
                highlights: [
                    'Fluxo de entrada de matérias-primas otimizado',
                    'Fluxo de saída de produtos acabados controlado',
                    'Dimensionamento de portas, rampas e corredores de emergência',
                    'Sinalização química e orientação de risco',
                    'Áreas de armazenagem segregada por classe de risco'
                ]
            },
            {
                title: 'Segurança e Regularização',
                description: 'Adequações para segurança operacional, controle ambiental e conformidade com regulamentações de corpo de bombeiros e órgãos ambientais.',
                highlights: [
                    'Rotas de fuga e saídas de emergência dimensionadas',
                    'Iluminação de emergência especializada',
                    'Rampas e acessos conforme NBR 9050',
                    'Sistemas de detecção e alarme de vazamentos',
                    'Sinalização de perigo e segurança química'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade de processo, estrutura química, circulação de utilidades e estratégia de implantação por fases.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, acabamentos, infraestrutura especializada e sistemas conforme cronograma estabelecido com foco em segurança.' },
            { phase: '03', title: 'Estabilização', description: 'Validação de segurança, testes de vazamento e contenção, documentação final e apoio para startup da operação.' }
        ],
        complianceHighlights: [
            { title: 'Segurança Operacional', norm: 'Corpo de Bombeiros', description: 'Projeto para fluxo seguro, sinalização de rotas de emergência, sistemas de detecção e conformidade com regulamentações estaduais específicas.' },
            { title: 'Acessibilidade Universal', norm: 'NBR 9050', description: 'Acessos, circulação e uso do espaço por todos os públicos com autonomia e segurança.' },
            { title: 'Execução de Obra com Segurança', norm: 'NR-12 e NR-35', description: 'Controle técnico para estruturas elevadas, trabalho em altura e operações de montagem segura durante construção.' }
        ],
        businessOutcomes: [
            { metric: 'Operacionalidade', impact: 'Planta química otimizada para processos contínuos, segura e confiável.' },
            { metric: 'Segurança Jurídica', impact: 'Maior previsibilidade para regularização ambiental, operação com conformidade total e documentação completa para auditorias regulatórias.' },
            { metric: 'Valorização', impact: 'Infraestrutura durável, especializada e dimensionada para futuras ampliações ou modificações de processo sem perda de eficiência operacional.' }
        ],
        faq: [
            { question: 'É possível fazer em etapas?', answer: 'Sim. Podemos estruturar a construção em fases: fundação e estrutura, depois sistemas de utilidades, pisos especiais e acabamentos.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, temos expertise em plantas químicas em múltiplas regiões e nos adaptamos às regulamentações estaduais específicas.' },
            { question: 'Fazem reformas sem parar a operação?', answer: 'Sim, podemos executar ampliações e reformas em fases, isolando setores, com planejamento rigoroso e coordenação com a operação.' },
            { question: 'Atendem plantas de qualquer tamanho?', answer: 'Sim. Desde pequenas unidades de síntese até grandes complexos petroquímicos, com solução ajustada ao volume e complexidade do processo.' },
            { question: 'Como é a garantia estrutural?', answer: 'Oferecemos garantia estrutural e garantias específicas de pisos e revestimentos conforme fabricante e escopo contratado.' },
            { question: 'Fazem o projeto estrutural também?', answer: 'Sim, executamos ou coordenamos projetos estruturais completos com calculistas especializados em estruturas industriais.' },
            { question: 'Atendem plantas em terrenos complexos?', answer: 'Sim, realizamos fundações em terrenos difíceis com sondagem SPT, análises geotécnicas e soluções de contenção quando necessário.' },
            { question: 'Coordenam sistemas de processo e utilidades?', answer: 'Sim, coordenamos a interface entre infraestrutura civil e sistemas de processo em conjunto com engenheiros de processo.' },
            { question: 'Fazem obras com prazos apertados?', answer: 'Sim, utilizamos sistemas construtivos modernos para reduzir prazo mantendo qualidade e rigor em segurança.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Construção e Infraestrutura para Indústria Química',
                content: 'Projetos para plantas químicas com fundação, contenção, drenagem e acabamentos de alta resistência.',
                bullets: [
                    'Estruturas resistentes a agentes químicos e corrosivos',
                    'Sistemas de contenção e drenagem especializados',
                    'Infraestrutura para segurança, ventilação e exaustão'
                ],
                stats: [{ label: 'Foco', value: 'Conformidade' }, { label: 'Proteção', value: 'Operacional' }, { label: 'Modelo', value: 'Confiável' }],
                image: '/quimica/quimica-07-construcao.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Mapeamento operacional, implantação e estabilização para startup seguro da operação química.',
                bullets: ['Mapeamento da planta e utilidades', 'Execução por fases com controle de risco', 'Validação final e entrega documental'],
                image: '/quimica/quimica-08-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Proteção de Estruturas Críticas',
                content: 'Soluções de construção civil para ambientes severos e processos contínuos.',
                galleryImages: [
                    '/quimica/quimica-09-criticas-1.jpg',
                    '/quimica/quimica-09-criticas-2.jpg',
                    '/quimica/quimica-09-criticas-3.jpg'
                ]
            }
        ]
    },
    agroindustria: {
        constructionOverview: 'Agroindústria é motor econômico de regiões inteiras no Brasil. A engenharia civil especializada em armazenagem e processamento agrícola é fundamental para redução de desperdícios, preservação de qualidade e otimização de logística. Novas usinas de etanol e biocombustíveis exigem infraestrutura de ponta para competitividade global.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura Especializada',
                subtitle: 'Sistemas de Fundação para Agroindústrias',
                description: 'Agroindústrias exigem fundações robustas para suportar máquinas de processamento, peneiras centrífugas, turbinas, silos elevados e equipamentos rotatórios contínuos.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas especiais para máquinas de processamento pesadas',
                            'Fundações isoladas para equipamentos com vibração',
                            'Radier para distribuição uniforme em áreas de processamento',
                            'Fundações profundas para silos elevados',
                            'Blocos de fundação com amortecimento de vibrações'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações para moenda de cana de grande porte',
                            'Fundações para turbinas geradoras de energia',
                            'Fundações para silos de alta capacidade',
                            'Reforço de fundações em plantas existentes',
                            'Fundações em terrenos com nível freático elevado',
                            'Projeto geotécnico com sondagem SPT'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de vibrações para máquinas contínuas',
                            'Fundações para cargas dinâmicas intensas',
                            'Projeto geotécnico especializado em terrenos agrícolas',
                            'Memorial de cálculo estrutural detalhado',
                            'ART específica para fundações críticas'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Silos e Armazenagem',
                subtitle: 'Sistemas Estruturais para Armazenagem Agrícola',
                description: 'Silos e armazéns devem permitir armazenagem de grandes volumes, carregamento e descarregamento eficiente e deslocamento seguro de equipamentos internos.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Silos metálicos cilíndricos para grãos',
                            'Silos de alvenaria com estrutura em concreto armado',
                            'Galpões para armazenagem horizontal de produtos',
                            'Plataformas para peneiramento e beneficiamento',
                            'Estruturas para correias transportadoras e redlers'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Silos para milho, soja, trigo, arroz e grãos diversos',
                            'Estruturas para processamento de cana de açúcar',
                            'Áreas de secagem com pátios pavimentados',
                            'Câmaras de armazenagem climatizada',
                            'Galpões para insumos e produtos acabados',
                            'Estruturas de elevação para movimentação de grãos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Silos com descarga eficiente',
                            'Flexibilidade para diferentes tipos de grãos',
                            'Facilidade para limpeza e manutenção de equipamentos',
                            'Projeto executivo com compatibilização de sistemas'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos e Pátios Especializados',
                subtitle: 'Pavimentação para Operações Agroindustriais',
                description: 'Pisos e pátios especializados para tráfego de maquinário pesado, resistência a umidade elevada e drenagem eficiente.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Piso de concreto armado para pátios de recepção e processamento',
                            'Piso industrial resistente a cargas concentradas de veículos',
                            'Pisos drenantes em áreas de limpeza',
                            'Contrapisos com caimento para drenagem eficiente',
                            'Pisos elevados para áreas de processamento úmido'
                        ]
                    },
                    {
                        title: 'Características Especiais',
                        items: [
                            'Pistas para movimentação de maquinário agrícola',
                            'Raios de curvatura para manobras',
                            'Resistência para cargas concentradas de alto porte',
                            'Drenagem superficial com canaletas adequadas'
                        ]
                    },
                    {
                        title: 'Áreas Específicas',
                        items: [
                            'Pátio de recepção com balanças',
                            'Áreas de processamento com pisos resistentes',
                            'Zonas de armazenagem com pisos nivelados',
                            'Áreas de limpeza com drenagem controlada'
                        ]
                    }
                ]
            },
            {
                title: 'Câmaras Frigoríficas Agrícolas',
                subtitle: 'Infraestrutura de Armazenagem Climatizada',
                description: 'Câmaras especializadas para preservação de produtos sensíveis à temperatura durante períodos de não processamento.',
                sections: [
                    {
                        title: 'Tipos de Câmaras Executados',
                        items: [
                            'Câmaras de congelamento para produtos processados',
                            'Câmaras frigoríficas para produtos refrigerados',
                            'Câmaras de maturação com temperatura e umidade controladas',
                            'Áreas de quarentena para matérias-primas',
                            'Câmaras para armazenagem de insumos sensíveis'
                        ]
                    },
                    {
                        title: 'Características Construtivas',
                        items: [
                            'Isolamento térmico especializado',
                            'Portas com selos herméticos',
                            'Estrutura de piso com drenagem integrada',
                            'Sistemas de ar condicionado redundantes',
                            'Monitoramento contínuo de temperatura'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Isolamento de alta performance',
                            'Capacidade para grandes volumes de produto',
                            'Redundância de sistemas para segurança',
                            'Rastreabilidade de condições de armazenagem'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações e Sistemas de Movimentação',
                subtitle: 'Infraestrutura para Automação Agroindustrial',
                description: 'Infraestrutura civil para sistemas de movimentação mecânica, tubulações de processo e utilidades agroindustriais.',
                sections: [
                    {
                        title: 'Sistemas de Movimentação (Infraestrutura)',
                        items: [
                            'Galerias estruturadas para correias transportadoras',
                            'Suportes para redlers e transportadores',
                            'Túneis de fundação para passagem de equipamentos',
                            'Estruturas para elevadores de grãos',
                            'Canaletas e tubulações para fluxo de produtos'
                        ]
                    },
                    {
                        title: 'Instalações Hidráulicas (Infraestrutura)',
                        items: [
                            'Tubulações para água de processo e refrigeração',
                            'Canaletas para drenagem de pátios e pisos',
                            'Tanques de captação de água para reutilização',
                            'Sistemas de tratamento de efluentes (estrutura)',
                            'Fossas sépticas e decantadores (infraestrutura)'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos para motores de grande potência',
                            'Shafts técnicos para painéis de distribuição',
                            'Aterramento em malha completa',
                            'Infraestrutura para SPDA',
                            'Cabeamento para sensores de temperatura e umidade'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil completa',
                            'Sistemas elétricos, hidráulicos e mecânicos são finalizados por especialistas',
                            'Coordenação entre disciplinas em todas as etapas'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Drenagem Agrícola',
                subtitle: 'Preparação de Terreno para Agroindústrias',
                description: 'Movimentação de terra, escavação, drenagem e contenção para construção em terrenos rurais e ambientes sazonais.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada com equipamentos de grande porte',
                            'Corte e aterro para nivelamento',
                            'Compactação de solo conforme especificação',
                            'Remoção e bota-fora de material'
                        ]
                    },
                    {
                        title: 'Sistemas de Drenagem Agrícola',
                        items: [
                            'Canaletas perimetrais de grande capacidade',
                            'Drenos profundos para controle de nível freático',
                            'Caixas de captação e dissipação',
                            'Lagoas de retenção de efluentes',
                            'Sistemas de tratamento preliminar'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia precisa para operações agroindustriais',
                            'Execução com equipamentos pesados',
                            'Controle técnico de compactação',
                            'Compatibilidade com operação sazonal'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações Ambientais',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais e ambientais com documentação para construção e operação segura da agroindústria.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'NBR 9050 (Acessibilidade Universal)',
                            'NBR 8681 (Ações e Segurança nas Estruturas)',
                            'NBR 5410 (Instalações Elétricas - infraestrutura)',
                            'NBR 6118 (Estruturas de Concreto)',
                            'CONAMA (Regulamentações Ambientais)',
                            'Código de Obras Municipal'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'ART do engenheiro responsável',
                            'Projeto executivo completo',
                            'Projeto de drenagem e contenção ambiental',
                            'Memorial descritivo e memorial de cálculo estrutural',
                            'As-built (projeto como construído)',
                            'Laudos de ensaios tecnológicos',
                            'Manual de operação e manutenção'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Silos e Armazenagem',
                description: 'Estruturas especializadas para capacidade elevada e eficiência operacional em armazenagem agrícola.',
                highlights: [
                    'Silos metálicos e de alvenaria',
                    'Pátios de recepção pavimentados',
                    'Sistemas de descarga por gravidade'
                ]
            },
            {
                title: 'Processamento e Transformação',
                description: 'Infraestrutura para operação de máquinas pesadas em ambiente agroindustrial.',
                highlights: [
                    'Áreas de processamento com pisos resistentes',
                    'Câmaras frigoríficas',
                    'Galpões de armazenagem'
                ]
            },
            {
                title: 'Drenagem Ambiental',
                description: 'Sistemas de contenção e tratamento de efluentes agroindustriais.',
                highlights: [
                    'Canaletas e fossas',
                    'Lagoas de retenção',
                    'Sistemas de drenagem profunda'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Mapeamento operacional', description: 'Estudo de capacidade de processamento, fluxo de produto e estratégia de implantação por fases.' },
            { phase: '02', title: 'Implantação', description: 'Execução estrutural, fundações críticas e sistemas de drenagem conforme cronograma.' },
            { phase: '03', title: 'Estabilização', description: 'Testes de operação e apoio para início de processamento agroindustrial.' }
        ],
        complianceHighlights: [
            { title: 'Segurança e Licenciamento', norm: 'Corpo de Bombeiros e Meio Ambiente', description: 'Projeto para conformidade com aprovações ambientais e segurança ocupacional.' },
            { title: 'Acessibilidade', norm: 'NBR 9050', description: 'Acessos e circulação segura para todos os públicos.' },
            { title: 'Regulamentações Ambientais', norm: 'CONAMA', description: 'Conformidade com normas de drenagem, contenção e controle de efluentes.' }
        ],
        businessOutcomes: [
            { metric: 'Capacidade Operacional', impact: 'Agroindústria com alta capacidade de processamento e armazenagem em escala.' },
            { metric: 'Preservação de Qualidade', impact: 'Infraestrutura que mantém qualidade de produtos durante armazenagem e processamento sazonal.' },
            { metric: 'Eficiência Operacional', impact: 'Logística interna otimizada com redução de desperdícios e maior fluidez operacional.' },
            { metric: 'Sustentabilidade Ambiental', impact: 'Infraestrutura preparada com drenagem e contenção ambiental em conformidade regulatória.' }
        ],
        faq: [
            { question: 'É possível fazer silos em etapas?', answer: 'Sim. Podemos executar por fases, liberando capacidade parcial enquanto a expansão continua.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, temos atuação nacional com adaptação às condições agrícolas regionais.' },
            { question: 'Como é a drenagem em terrenos com nível freático elevado?', answer: 'Projetamos drenagem profunda e soluções de retenção conforme as características do terreno.' },
            { question: 'Qual é a capacidade típica de um silo?', answer: 'A capacidade varia conforme diâmetro e altura do silo, com dimensionamento técnico conforme demanda operacional.' },
            { question: 'Como é a descarga por gravidade?', answer: 'Projetamos o fundo e os sistemas de descarga para escoamento eficiente e contínuo.' },
            { question: 'Atendem usinas de açúcar e etanol?', answer: 'Sim, atuamos em usinas com estruturas para moendas, turbinas, armazenagem e logística interna.' },
            { question: 'Fazem obras no período de entressafra?', answer: 'Sim, coordenamos execução em janelas operacionais para reduzir impacto na produção.' },
            { question: 'Como é a manutenção de silos?', answer: 'O projeto prevê acessos seguros para inspeção, limpeza e manutenção periódica.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura para Processamento e Armazenagem Agrícola',
                content: 'Projetos para usinas, silos e operações agroindustriais com alta capacidade e controle técnico.',
                bullets: ['Fundações críticas para equipamentos pesados', 'Silos, pátios e movimentação mecanizada', 'Drenagem e contenção ambiental integrada'],
                stats: [{ label: 'Escala', value: 'Alta Capacidade' }, { label: 'Operação', value: 'Sazonal' }, { label: 'Foco', value: 'Produtividade' }],
                image: '/agroindustria/agroindustria-07-construcao.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Mapeamento operacional, implantação por fases e estabilização para início de processamento com segurança.',
                bullets: ['Planejamento por fluxo de produto', 'Execução estrutural e drenagem', 'Testes operacionais e startup assistido'],
                image: '/agroindustria/agroindustria-08-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Infraestrutura para Safra Segura',
                content: 'Soluções que mantêm produtividade alta com segurança e previsibilidade.',
                galleryImages: [
                    '/agroindustria/agroindustria-09-safra-1.jpg',
                    '/agroindustria/agroindustria-09-safra-2.jpg',
                    '/agroindustria/agroindustria-09-safra-3.jpg'
                ]
            }
        ]
    },
    edificacoes: {
        constructionOverview: 'Edificações residenciais e comerciais são motor do desenvolvimento urbano. Engenharia civil especializada em construção vertical é fundamental para criar ambientes seguros, funcionais e valorizados. Modernidade exige integração de BIM, sustentabilidade e conformidade regulatória rigorosa desde projeto até conclusão.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura',
                subtitle: 'Sistemas de Fundação para Edificações',
                description: 'Edificações exigem fundações robustas dimensionadas para suportar cargas de estrutura em múltiplos andares, distribuindo pesos uniformemente e garantindo estabilidade.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Sapatas corridas para alinhamento de pilares',
                            'Blocos de fundação para pilares isolados',
                            'Vigas de fundação',
                            'Estacas escavadas para terrenos de baixa capacidade',
                            'Fundações profundas para edifícios altos ou solos fracos'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Fundações em terrenos com nível freático elevado',
                            'Reforço de fundações em edifícios existentes',
                            'Fundações em encostas ou terrenos irregulares',
                            'Projeto geotécnico com sondagem SPT',
                            'Análise de capacidade de carga para ações permanentes e dinâmicas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Fundações dimensionadas para vida útil prolongada',
                            'Projeto geotécnico especializado em ambiente urbano',
                            'Memorial de cálculo estrutural completo',
                            'ART específica para fundações'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas em Concreto ou Aço',
                subtitle: 'Sistemas Estruturais para Edifícios',
                description: 'Estruturas em concreto armado, aço ou sistema misto para resistir a cargas, ações de vento e requisitos de estabilidade com flexibilidade de layout interno.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Estrutura em concreto armado moldado in loco',
                            'Estrutura em pré-moldados de concreto',
                            'Estrutura metálica em perfis de aço',
                            'Estrutura mista (concreto + aço)',
                            'Lajes nervuradas e lajes cogumelo'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Edifícios residenciais multifamiliares',
                            'Edifícios comerciais e corporativos',
                            'Garagens e áreas de circulação vertical',
                            'Áreas comuns e espaços de serviço',
                            'Cobertura com acesso para manutenção'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estrutura compatibilizada com arquitetura',
                            'Vãos e pés-direitos conforme projeto',
                            'Facilidade para instalações elétricas e hidráulicas',
                            'Projeto executivo detalhado'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Elétricas e Hidrossanitárias',
                subtitle: 'Infraestrutura de Utilidades para Edificações',
                description: 'Instalações elétricas, hidráulicas, gás, climatização e sistemas auxiliares integrados à estrutura da edificação.',
                sections: [
                    {
                        title: 'Instalações Elétricas',
                        items: [
                            'Entrada de energia com dimensionamento para ocupação',
                            'Quadro geral de distribuição e quadros das unidades',
                            'Iluminação conforme normas',
                            'Pontos de energia estrategicamente distribuídos',
                            'Circuitos especializados para equipamentos',
                            'Infraestrutura para SPDA'
                        ]
                    },
                    {
                        title: 'Instalações Hidrossanitárias',
                        items: [
                            'Água fria pressurizada',
                            'Água quente com sistema centralizado quando aplicável',
                            'Esgoto e água pluvial em redes separadas',
                            'Colunas de ventilação sanitária',
                            'Pontos de água em cozinhas, banheiros e áreas de serviço'
                        ]
                    },
                    {
                        title: 'Sistemas Especiais',
                        items: [
                            'Ar condicionado individual ou central',
                            'Gás canalizado quando aplicável',
                            'Infraestrutura para internet e TV',
                            'Sistemas de incêndio com hidrantes, sprinklers e detectores',
                            'Controle de acesso eletrônico'
                        ]
                    }
                ]
            },
            {
                title: 'Acabamentos e Segurança',
                subtitle: 'Sistemas de Acabamento e Proteção',
                description: 'Acabamentos de qualidade e sistemas de segurança para garantir durabilidade, funcionalidade e proteção dos ocupantes.',
                sections: [
                    {
                        title: 'Acabamentos',
                        items: [
                            'Revestimentos de pisos',
                            'Revestimentos de paredes',
                            'Tetos em gesso, forro removível ou concreto aparente',
                            'Esquadrias com desempenho adequado',
                            'Vidraças e elementos de vedação'
                        ]
                    },
                    {
                        title: 'Sistemas de Segurança',
                        items: [
                            'Hidrantes e mangueiras conforme Corpo de Bombeiros',
                            'Escadas de emergência com sinalização',
                            'Detecção de fumaça e alarme',
                            'Iluminação de emergência',
                            'Portas corta-fogo',
                            'SPDA em cobertura',
                            'Controle de acesso e CFTV'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Acabamentos que preservam valor imobiliário',
                            'Materiais de primeira qualidade',
                            'Segurança conforme regulamentações vigentes',
                            'Documentação completa de sistemas'
                        ]
                    }
                ]
            },
            {
                title: 'Acessibilidade e Conformidade',
                subtitle: 'Sistemas de Acessibilidade Universal',
                description: 'Conformidade com NBR 9050 e legislações correlatas para garantir uso seguro e autônomo das áreas comuns.',
                sections: [
                    {
                        title: 'Elementos de Acessibilidade',
                        items: [
                            'Rampas com inclinação conforme norma',
                            'Elevadores em edifícios que exigem circulação vertical acessível',
                            'Portas com largura mínima adequada',
                            'Banheiros adaptados em áreas comuns',
                            'Piso tátil em áreas de circulação',
                            'Corrimãos duplos em rampas e escadas',
                            'Vagas de garagem para PCD sinalizadas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Acessibilidade integrada desde o início do projeto',
                            'Conformidade total com NBR 9050',
                            'Ambiente utilizável por todos os públicos',
                            'Documentação de conformidade entregue'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais com documentação completa para construção e ocupação segura.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'Código de Obras Municipal',
                            'NBR 9050 (Acessibilidade Universal)',
                            'NBR 8681 (Ações e Segurança nas Estruturas)',
                            'NBR 5410 (Instalações Elétricas)',
                            'NBR 6118 (Estruturas de Concreto)',
                            'NBR 8800 (Estruturas de Aço)',
                            'Regulamentações do Corpo de Bombeiros',
                            'Regulamentações de vigilância sanitária quando aplicável'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'ART do engenheiro responsável',
                            'Projeto arquitetônico aprovado',
                            'Projetos complementares (estrutural, elétrico e hidráulico)',
                            'Memorial descritivo e especificações',
                            'Orçamento detalhado',
                            'Cronograma de execução',
                            'As-built (projeto como construído)',
                            'Certificados de materiais',
                            'Laudos de ensaios tecnológicos',
                            'Manual de operação e manutenção',
                            'Documentação de habite-se'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e Segurança',
                description: 'Infraestrutura que garante estabilidade estrutural e segurança dos ocupantes em edificações de múltiplos andares.',
                highlights: [
                    'Estrutura dimensionada para vida útil prolongada',
                    'Sistemas de proteção contra incêndio',
                    'Conformidade regulatória completa'
                ]
            },
            {
                title: 'Instalações Integradas',
                description: 'Sistemas de utilidades com funcionamento integrado para operação confiável da edificação.',
                highlights: [
                    'Instalações elétricas, hidráulicas, gás e climatização',
                    'Sistemas de segurança e controle de acesso',
                    'Infraestrutura de conectividade e telecom'
                ]
            },
            {
                title: 'Acabamentos de Qualidade',
                description: 'Ambientes funcionais e esteticamente agradáveis com foco em durabilidade e valorização.',
                highlights: [
                    'Materiais de primeira qualidade',
                    'Acabamentos que preservam valor',
                    'Acessibilidade universal'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Projeto e planejamento', description: 'Estudos de viabilidade, projetos arquitetônicos, aprovações e orçamentação.' },
            { phase: '02', title: 'Execução', description: 'Construção com gestão técnica de prazo, qualidade e segurança em todas as frentes.' },
            { phase: '03', title: 'Conclusão e entrega', description: 'Testes de sistemas, conformidades, obtenção de habite-se e entrega da edificação.' }
        ],
        complianceHighlights: [
            { title: 'Segurança Contra Incêndio', norm: 'Corpo de Bombeiros', description: 'Projeto conforme instruções técnicas estaduais, com rotas de fuga e sistemas de proteção adequados.' },
            { title: 'Acessibilidade Universal', norm: 'NBR 9050', description: 'Acessibilidade em áreas públicas e comuns com circulação segura e autônoma.' },
            { title: 'Códigos de Obra e Alvará', norm: 'Prefeitura Municipal', description: 'Conformidade com regulamentações municipais para aprovação, construção e ocupação.' }
        ],
        businessOutcomes: [
            { metric: 'Segurança Estrutural', impact: 'Edificação segura e durável para uso contínuo ao longo da vida útil projetada.' },
            { metric: 'Conformidade Regulatória', impact: 'Habite-se e aprovações obtidas com documentação técnica completa.' },
            { metric: 'Valor Imobiliário', impact: 'Empreendimento que preserva e valoriza o patrimônio com qualidade construtiva.' },
            { metric: 'Funcionalidade', impact: 'Ambientes preparados para atender necessidades de moradores e operações corporativas.' }
        ],
        faq: [
            { question: 'Qual é o prazo típico de construção?', answer: 'O prazo varia conforme altura, escopo e complexidade da edificação, sendo definido no planejamento executivo.' },
            { question: 'Vocês trabalham com projetos já aprovados?', answer: 'Sim, executamos obras com projeto aprovado e também coordenamos aprovações quando necessário.' },
            { question: 'Como é o orçamento?', answer: 'Trabalhamos com orçamento detalhado, contemplando materiais, mão de obra, gestão e premissas técnicas do projeto.' },
            { question: 'É possível fazer modificações durante construção?', answer: 'Sim, com análise técnica e avaliação de impactos em custo, prazo e compatibilidade.' },
            { question: 'Vocês fazem reforma de edifícios existentes?', answer: 'Sim, realizamos reformas estruturais, adequações de conformidade e modernizações de infraestrutura.' },
            { question: 'Como é a garantia construtiva?', answer: 'A garantia segue as normas e os termos contratuais aplicáveis ao escopo contratado.' },
            { question: 'Como funciona o acompanhamento durante a obra?', answer: 'Realizamos acompanhamento técnico com relatórios periódicos de progresso e controle de qualidade.' },
            { question: 'Quando obtém-se o habite-se?', answer: 'Após conclusão, testes, inspeções e conformidade documental junto aos órgãos competentes.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura para Edificações Residenciais e Comerciais',
                content: 'Projetos completos com estrutura, instalações e segurança para empreendimentos imobiliários de alto padrão técnico.',
                bullets: ['Fundações e estruturas em concreto ou aço', 'Sistemas integrados de utilidades', 'Conformidade com códigos de obra e segurança'],
                stats: [{ label: 'Segmento', value: 'Imobiliário' }, { label: 'Foco', value: 'Conformidade' }, { label: 'Entrega', value: 'Habite-se' }],
                image: '/edificacoes/edificacoes-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Projeto, execução e conclusão com governança técnica para entrega segura e regularizada.',
                bullets: ['Planejamento e aprovações', 'Execução com qualidade e segurança', 'Testes finais e documentação de entrega'],
                image: '/edificacoes/edificacoes-regularizacao.jpg'
            },
            {
                type: 'gallery',
                title: 'Edificações de Alto Desempenho',
                content: 'Estruturas funcionais, seguras e valorizadas para moradia e negócios.',
                galleryImages: [
                    '/edificacoes/edificacoes-hero.jpg',
                    '/edificacoes/edificacoes-obra.jpg',
                    '/edificacoes/edificacoes-regularizacao.jpg'
                ]
            }
        ]
    },
    'rodovias': {
        constructionOverview: 'Infraestrutura rodoviária é base do desenvolvimento econômico nacional. Engenharia especializada em pavimentação, drenagem e mobilidade é fundamental para eficiência de transportes, redução de acidentes e qualidade de vida. Concessões rodoviárias investem continuamente em melhorias para conectar regiões e cidades.',
        constructionModules: [
            {
                title: 'Terraplanagem e Preparo de Leito',
                subtitle: 'Preparação de Terreno para Rodovias',
                description: 'Rodovias exigem preparação profunda do terreno com escavação, aterro, compactação e drenagem para suportar tráfego pesado.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de faixa de domínio',
                            'Escavação mecanizada em grandes volumes',
                            'Corte em rocha quando necessário',
                            'Aterro compactado em camadas',
                            'Bota-fora controlado de material excedente'
                        ]
                    },
                    {
                        title: 'Preparo do Leito',
                        items: [
                            'Escarificação de material inadequado',
                            'Reposição com material selecionado',
                            'Compactação conforme densidade de projeto',
                            'Controle tecnológico de compactação',
                            'Aplicação de geotêxtil quando necessário'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia de alta precisão',
                            'Equipamentos de grande porte',
                            'Controle tecnológico rigoroso',
                            'Base preparada para longa vida útil'
                        ]
                    }
                ]
            },
            {
                title: 'Sistemas de Drenagem Rodoviária',
                subtitle: 'Infraestrutura de Drenagem Especializada',
                description: 'A drenagem adequada preserva o pavimento e mantém segurança operacional em eventos de chuva.',
                sections: [
                    {
                        title: 'Tipos de Drenagem',
                        items: [
                            'Canaletas de concreto em laterais de pista',
                            'Valas com geotêxtil para captura de água',
                            'Galerias de concreto em áreas críticas',
                            'Saídas de água com dissipação de energia',
                            'Obras de arte correntes (bueiros, caixas e sifões)'
                        ]
                    },
                    {
                        title: 'Drenagem Profunda',
                        items: [
                            'Drenos longitudinais',
                            'Drenos transversais para alívio de pressão',
                            'Canaletas de berma para desvio de água',
                            'Sistemas de proteção em taludes'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Drenagem dimensionada para eventos severos',
                            'Prevenção de erosão e afundamentos',
                            'Preservação da integridade da base',
                            'Segurança em operação com pista molhada'
                        ]
                    }
                ]
            },
            {
                title: 'Pavimentação Asfáltica',
                subtitle: 'Aplicação de Camadas de Pavimento',
                description: 'A pavimentação é etapa crítica para durabilidade, segurança, conforto e desempenho da via.',
                sections: [
                    {
                        title: 'Camadas de Pavimento',
                        items: [
                            'Regularização do subleito',
                            'Sub-base granular quando aplicável',
                            'Base de brita graduada',
                            'Camada de ligação (binder)',
                            'Camada de rolamento em CBUQ'
                        ]
                    },
                    {
                        title: 'Características Técnicas',
                        items: [
                            'Espessuras conforme estudo de tráfego',
                            'Agregados de qualidade superior',
                            'Ligante asfáltico conforme especificação',
                            'Temperatura de aplicação controlada',
                            'Compactação conforme especificação técnica'
                        ]
                    },
                    {
                        title: 'Aplicação do Asfalto',
                        items: [
                            'Transporte com controle de temperatura',
                            'Distribuição uniforme com equipamentos apropriados',
                            'Compactação em múltiplas passagens',
                            'Controle de execução em campo'
                        ]
                    }
                ]
            },
            {
                title: 'Viadutos, Pontes e Estruturas',
                subtitle: 'Estruturas de Desnivelamento e Transposição',
                description: 'Viadutos e pontes permitem transposição de obstáculos e separação segura de fluxos de tráfego.',
                sections: [
                    {
                        title: 'Tipos de Estruturas Executadas',
                        items: [
                            'Viadutos em concreto armado ou sistema misto',
                            'Pontes com tramos metálicos ou concreto',
                            'Estruturas para marginais e vias internas',
                            'Passarelas para travessia segura',
                            'Rampas e conexões de acesso'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Desnivelamento de cruzamentos críticos',
                            'Transposição de rios e corpos d água',
                            'Reconfiguração de acessos rodoviários',
                            'Melhorias em alças e entroncamentos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estruturas para grandes vãos',
                            'Durabilidade de longo ciclo operacional',
                            'Segurança em eventos climáticos severos',
                            'Projeto executivo com compatibilização completa'
                        ]
                    }
                ]
            },
            {
                title: 'Sinalização e Segurança Rodoviária',
                subtitle: 'Sistemas de Orientação e Proteção',
                description: 'Sinalização e proteção viária reduzem acidentes e elevam a orientação operacional em toda a malha.',
                sections: [
                    {
                        title: 'Sinalização Horizontal',
                        items: [
                            'Pintura de faixas de trânsito',
                            'Demarcação de áreas de risco',
                            'Aplicação de materiais refletivos',
                            'Orientação de fluxo em trechos críticos'
                        ]
                    },
                    {
                        title: 'Sinalização Vertical',
                        items: [
                            'Placas de regulamentação',
                            'Placas de advertência',
                            'Placas indicativas e quilometragem',
                            'Sinalização de obras e desvios'
                        ]
                    },
                    {
                        title: 'Sistemas de Proteção',
                        items: [
                            'Defensas metálicas em laterais',
                            'Barreiras de concreto quando necessário',
                            'Iluminação em trechos críticos',
                            'Dispositivos de proteção em obra'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações Rodoviárias',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais rodoviárias com documentação técnica de implantação e operação.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'DNIT (manuais de pavimentação e drenagem)',
                            'Resoluções CONTRAN',
                            'Normas ABNT para asfalto e concreto',
                            'Legislação ambiental federal e estadual'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'Projeto executivo completo',
                            'Projeto de drenagem especializado',
                            'Projetos de estruturas especiais',
                            'Especificações técnicas de pavimentação',
                            'Plano de qualidade e ensaios',
                            'As-built (projeto como construído)',
                            'Certificados de materiais',
                            'Laudos de ensaios de asfalto e agregados',
                            'Documentação de conformidade ambiental'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Terraplanagem e Drenagem',
                description: 'Preparação completa do terreno com drenagem especializada para desempenho estrutural de longo prazo.',
                highlights: [
                    'Compactação controlada',
                    'Drenagem profunda',
                    'Proteção contra erosão'
                ]
            },
            {
                title: 'Pavimentação Asfáltica',
                description: 'Aplicação de camadas estruturais em sequência técnica para durabilidade e aderência.',
                highlights: [
                    'Sub-base e base',
                    'Camada de ligação (binder)',
                    'Camada de rolamento (CBUQ)'
                ]
            },
            {
                title: 'Estruturas e Segurança',
                description: 'Viadutos, pontes, sinalização e dispositivos de proteção para ampliar mobilidade e segurança.',
                highlights: [
                    'Viadutos em concreto e aço',
                    'Sinalização horizontal e vertical',
                    'Defensas e proteção lateral'
                ]
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Projeto e planejamento', description: 'Estudos de tráfego, projetos executivos, aprovações ambientais e alinhamento com órgãos reguladores.' },
            { phase: '02', title: 'Execução', description: 'Terraplanagem, drenagem e pavimentação conforme cronograma com gestão de tráfego operacional.' },
            { phase: '03', title: 'Conclusão e operação', description: 'Testes de pavimento, validações de sinalização, segurança e entrega para operação.' }
        ],
        complianceHighlights: [
            { title: 'Padrões Rodoviários', norm: 'DNIT e Órgãos Rodoviários', description: 'Projeto conforme manuais técnicos e especificações de infraestrutura rodoviária.' },
            { title: 'Conformidade Ambiental', norm: 'CONAMA', description: 'Licenciamento ambiental e mitigação de impactos durante execução e operação.' },
            { title: 'Segurança de Tráfego', norm: 'CONTRAN', description: 'Conformidade com regulamentações de sinalização e segurança viária.' }
        ],
        businessOutcomes: [
            { metric: 'Mobilidade Facilitada', impact: 'Rodovias operacionais conectando regiões com maior fluidez de deslocamento.' },
            { metric: 'Segurança Viária', impact: 'Infraestrutura e sinalização que reduzem riscos e melhoram a experiência dos usuários.' },
            { metric: 'Durabilidade', impact: 'Pavimentação com desempenho de longo ciclo operacional e manutenção planejada.' },
            { metric: 'Economia e Eficiência', impact: 'Redução de tempo de viagem e otimização de custos logísticos de transporte.' }
        ],
        faq: [
            { question: 'Como obras rodoviárias não interrompem tráfego?', answer: 'Com engenharia de tráfego e execução faseada, usando desvios progressivos e sinalização de obra para manter fluxo contínuo.' },
            { question: 'Como é o acompanhamento de qualidade?', answer: 'Com ensaios de campo e laboratório, controle de compactação, temperatura de aplicação e rastreabilidade de materiais.' },
            { question: 'É possível fazer obra em trechos?', answer: 'Sim. Duplicações e melhorias são executadas por etapas para reduzir impacto operacional.' },
            { question: 'Como é a drenagem em regiões chuvosas?', answer: 'Com sistemas de drenagem superficial e profunda dimensionados para o regime hidrológico local.' },
            { question: 'Vocês trabalham em concessões rodoviárias?', answer: 'Sim, temos experiência em obras para concessionárias com restrições operacionais e padrões técnicos rigorosos.' },
            { question: 'Fazem obras de viadutos e pontes?', answer: 'Sim, executamos estruturas especiais com foco em segurança, desempenho e integração ao fluxo viário.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Infraestrutura Rodoviária para Mobilidade e Segurança',
                content: 'Projetos completos para rodovias, duplicações e melhorias com foco em desempenho, segurança e conformidade.',
                bullets: ['Pavimentação asfáltica de alta durabilidade', 'Drenagem especializada', 'Gestão de tráfego durante obra'],
                stats: [{ label: 'Foco', value: 'Segurança' }, { label: 'Operação', value: 'Contínua' }, { label: 'Entrega', value: 'Escalável' }],
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg'
            },
            {
                type: 'solution',
                title: 'Sobre a Implantação',
                content: 'Projeto, execução e conclusão com governança técnica para entrega de infraestrutura operacional e segura.',
                bullets: ['Estudos de tráfego e planejamento', 'Execução com frentes faseadas', 'Validações finais e entrega'],
                image: '/ccr-rodovias/ccr-rodovias-02-obra.jpg'
            },
            {
                type: 'gallery',
                title: 'Mobilidade com Infraestrutura de Alto Desempenho',
                content: 'Soluções para conexão regional, segurança viária e eficiência logística.',
                galleryImages: [
                    '/ccr-rodovias/ccr-rodovias-01-capa.jpg',
                    '/ccr-rodovias/ccr-rodovias-02-obra.jpg',
                    '/ccr-rodovias/ccr-rodovias-03-cta.jpg'
                ]
            }
        ]
    },
    'templos-religiosos': {
        constructionOverview: 'Em templos e igrejas de grande porte, a engenharia precisa equilibrar estética, segurança e fluxo de pessoas. A Facilco conduz projetos para novas construções e ampliações com foco em acessibilidade, rotas de emergência, estruturas robustas e entrega em etapas para manter agendas e eventos ativos.',
        constructionModules: [
            {
                title: 'Fundações e Infraestrutura',
                subtitle: 'Sistemas de Fundação Especializados',
                description: 'A construção de templos exige fundações robustas, projetadas para suportar grandes cargas estruturais, vãos livres amplos e, em muitos casos, torres e campanários elevados.',
                sections: [
                    {
                        title: 'Tipos de Fundação Executados',
                        items: [
                            'Tubulões a céu aberto e a ar comprimido',
                            'Estacas escavadas (hélice contínua e perfuradas)',
                            'Sapatas e blocos de fundação de grande porte',
                            'Radier (laje de fundação) para solos uniformes',
                            'Fundações especiais para contrabalanço de torres'
                        ]
                    },
                    {
                        title: 'Casos Especiais',
                        items: [
                            'Reforço de fundações existentes em templos históricos',
                            'Fundações em terrenos irregulares ou encostas',
                            'Projeto geotécnico com sondagem SPT completa',
                            'Análise de capacidade de carga para grandes aglomerações'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Fundações dimensionadas para grandes cargas estruturais',
                            'Projeto estrutural para vencer grandes vãos sem pilares centrais',
                            'Estudo de solo obrigatório com engenheiro geotécnico',
                            'Memorial de cálculo e ART específica'
                        ]
                    }
                ]
            },
            {
                title: 'Estruturas para Grandes Vãos Livres',
                subtitle: 'Sistemas Estruturais Avançados',
                description: 'Templos religiosos exigem naves amplas e livres de pilares internos para garantir visibilidade total do altar/púlpito. A Facilco executa estruturas especializadas para vencer grandes vãos com segurança e durabilidade.',
                sections: [
                    {
                        title: 'Soluções Estruturais',
                        items: [
                            'Concreto protendido (para grandes vãos)',
                            'Estrutura metálica treliçada',
                            'Estrutura mista (concreto + metálica)',
                            'Vigas curvas de altura variável',
                            'Lajes nervuradas e cogumelo'
                        ]
                    },
                    {
                        title: 'Exemplos de Aplicação',
                        items: [
                            'Naves principais com grandes vãos livres',
                            'Mezaninos e galerias superiores',
                            'Torres e campanários',
                            'Coberturas autoportantes'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Vãos livres sem interferência de pilares centrais',
                            'Redução de seção estrutural (estética limpa)',
                            'Alta durabilidade',
                            'Resistência a ventos e sismos conforme norma',
                            'Projeto executivo completo com detalhamento'
                        ]
                    }
                ]
            },
            {
                title: 'Alvenaria Estrutural e Vedações',
                subtitle: 'Sistemas de Vedação para Templos',
                description: 'Construção de paredes estruturais e de vedação com foco em durabilidade, resistência mecânica e preparação para instalações pesadas (vitrais, painéis, quadros).',
                sections: [
                    {
                        title: 'Tipos de Alvenaria Executados',
                        items: [
                            'Alvenaria estrutural em blocos de concreto',
                            'Alvenaria de vedação em blocos cerâmicos ou concreto',
                            'Paredes duplas com câmara de ar',
                            'Alvenaria armada para paredes de grande altura',
                            'Paredes em concreto aparente moldado in loco'
                        ]
                    },
                    {
                        title: 'Reforços Estruturais',
                        items: [
                            'Cintas de amarração em concreto armado',
                            'Vergas e contravergas em todas as aberturas',
                            'Reforço para fixação de vitrais pesados',
                            'Paredes corta-fogo conforme AVCB'
                        ]
                    },
                    {
                        title: 'Acabamento Estrutural',
                        items: [
                            'Chapisco, emboço e reboco',
                            'Massa única de regularização',
                            'Preparação de superfície para pintura final',
                            'Impermeabilização de paredes em contato com solo'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Alvenaria de primeira qualidade',
                            'Execução conforme projeto estrutural',
                            'Prumo e nível rigorosamente controlados',
                            'Resistência adequada para grandes vãos'
                        ]
                    }
                ]
            },
            {
                title: 'Coberturas e Estruturas de Telhado',
                subtitle: 'Sistemas de Cobertura para Templos',
                description: 'Execução de estruturas de telhado robustas e duráveis, projetadas para suportar grandes vãos, cargas de vento e peso próprio elevado.',
                sections: [
                    {
                        title: 'Estruturas de Cobertura',
                        items: [
                            'Estrutura metálica em perfis soldados ou parafusados',
                            'Estrutura em madeira de lei tratada',
                            'Tesouras metálicas para grandes vãos',
                            'Estrutura em concreto para lajes impermeabilizadas',
                            'Terças, caibros e ripamento conforme projeto'
                        ]
                    },
                    {
                        title: 'Tipos de Telhado Executados',
                        items: [
                            'Telhado convencional em telhas cerâmicas ou concreto',
                            'Telhado metálico (telhas termoacústicas)',
                            'Laje impermeabilizada (telhado plano)',
                            'Coberturas curvas e especiais'
                        ]
                    },
                    {
                        title: 'Sistema de Drenagem',
                        items: [
                            'Calhas em chapa galvanizada ou alumínio',
                            'Condutores verticais e horizontais',
                            'Rufos, cumeeiras e arremates',
                            'Captação de águas pluviais'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Estrutura dimensionada para vencer grandes vãos',
                            'Resistência a ventos conforme norma',
                            'Garantia estrutural',
                            'Previsão de sobrecarga para manutenção futura'
                        ]
                    }
                ]
            },
            {
                title: 'Pisos e Contrapisos',
                subtitle: 'Sistemas de Pavimentação Interna e Externa',
                description: 'Execução de pisos robustos e nivelados para alto tráfego de pessoas, incluindo rampas de acessibilidade e áreas externas.',
                sections: [
                    {
                        title: 'Tipos de Piso Executados',
                        items: [
                            'Contrapiso em concreto armado',
                            'Piso de concreto alisado/queimado',
                            'Piso industrial de alta resistência',
                            'Lajes de piso elevadas',
                            'Piso drenante para áreas externas'
                        ]
                    },
                    {
                        title: 'Preparação para Revestimentos',
                        items: [
                            'Regularização de superfície',
                            'Impermeabilização de pisos',
                            'Caimento técnico para escoamento de água',
                            'Juntas de dilatação e movimentação'
                        ]
                    },
                    {
                        title: 'Rampas de Acessibilidade',
                        items: [
                            'Rampas conforme NBR 9050',
                            'Piso tátil direcional e de alerta',
                            'Corrimãos laterais em ambos os lados',
                            'Patamares intermediários'
                        ]
                    },
                    {
                        title: 'Áreas Externas',
                        items: [
                            'Calçadas em concreto ou piso intertravado',
                            'Estacionamento com vagas para PCD sinalizadas',
                            'Drenagem superficial e canaletas',
                            'Meio-fio e sarjetas'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Pisos nivelados conforme norma',
                            'Resistência para grandes aglomerações',
                            'Acabamento para facilitar limpeza',
                            'Conformidade com acessibilidade universal'
                        ]
                    }
                ]
            },
            {
                title: 'Instalações Hidrossanitárias e Elétricas',
                subtitle: 'Preparação de Infraestrutura para Instalações',
                description: 'A Facilco executa toda a infraestrutura civil para passagem de instalações, prumadas, shafts e dutos técnicos.',
                sections: [
                    {
                        title: 'Instalações Hidrossanitárias (Infraestrutura)',
                        items: [
                            'Rasgos e furos para tubulações',
                            'Caixas de passagem e inspeção',
                            'Prumadas de esgoto, água e águas pluviais',
                            'Caixas d’água e reservatórios (estrutura)',
                            'Poços de recalque e fossas (se necessário)'
                        ]
                    },
                    {
                        title: 'Instalações Elétricas (Infraestrutura)',
                        items: [
                            'Eletrodutos embutidos em lajes e paredes',
                            'Caixas de passagem',
                            'Shafts técnicos para quadros elétricos',
                            'Aterramento (hastes e malha de terra)',
                            'Infraestrutura para SPDA (para-raios)'
                        ]
                    },
                    {
                        title: 'Importante',
                        items: [
                            'Executamos a infraestrutura civil. Instalações elétricas, hidráulicas e equipamentos são concluídos por empresas especializadas.'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Infraestrutura completa conforme projeto',
                            'Prumadas dimensionadas para futuras ampliações',
                            'Coordenação com instaladores especializados'
                        ]
                    }
                ]
            },
            {
                title: 'Terraplenagem e Contenção de Encostas',
                subtitle: 'Preparação de Terreno e Obras de Terra',
                description: 'Execução de serviços de movimentação de terra, escavação, aterro compactado e contenções para viabilizar a construção em terrenos irregulares.',
                sections: [
                    {
                        title: 'Serviços de Terraplenagem',
                        items: [
                            'Limpeza e desmatamento de terreno',
                            'Escavação mecanizada',
                            'Corte e aterro para nivelamento',
                            'Compactação de solo',
                            'Remoção e bota-fora de material excedente'
                        ]
                    },
                    {
                        title: 'Obras de Contenção',
                        items: [
                            'Muros de arrimo em concreto armado',
                            'Muros de gabião',
                            'Cortinas ancoradas (solo grampeado)',
                            'Contenções em blocos de concreto',
                            'Drenagem de encostas'
                        ]
                    },
                    {
                        title: 'Drenagem de Terreno',
                        items: [
                            'Canaletas perimetrais',
                            'Drenos profundos',
                            'Caixas de captação e dissipação',
                            'Direcionamento de águas pluviais'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Topografia e projeto geométrico profissional',
                            'Execução com equipamentos de grande porte',
                            'Controle tecnológico de compactação',
                            'Laudo de estabilidade de taludes (se necessário)'
                        ]
                    }
                ]
            },
            {
                title: 'Demolições e Reforço Estrutural',
                subtitle: 'Reforma e Adequação de Templos Existentes',
                description: 'Serviços de demolição controlada, reforço estrutural e ampliações em templos já construídos, incluindo templos históricos.',
                sections: [
                    {
                        title: 'Demolições Controladas',
                        items: [
                            'Demolição parcial ou total de estruturas',
                            'Remoção de paredes não estruturais',
                            'Demolição de pisos, lajes e coberturas',
                            'Escoramento prévio de estruturas adjacentes',
                            'Controle de vibrações e poeira'
                        ]
                    },
                    {
                        title: 'Reforço Estrutural',
                        items: [
                            'Reforço de fundações com microestacas',
                            'Reforço de vigas e pilares (encamisamento)',
                            'Recuperação de estruturas de concreto',
                            'Injeção de resinas estruturais',
                            'Chumbadores químicos e ancoragem'
                        ]
                    },
                    {
                        title: 'Ampliações',
                        items: [
                            'Construção de mezaninos e galerias',
                            'Ampliação de naves laterais',
                            'Construção de anexos (salões, salas administrativas)',
                            'Elevação de torres e campanários'
                        ]
                    },
                    {
                        title: 'Obras em Templos Históricos',
                        items: [
                            'Restauração estrutural com preservação de características originais',
                            'Laudo técnico de estabilidade estrutural',
                            'Aprovação de órgãos de patrimônio (quando aplicável)'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Obras sem interrupção das atividades religiosas',
                            'Execução por fases (isolamento de áreas)',
                            'Engenheiro responsável com ART específica',
                            'Seguro de obra para proteção do patrimônio'
                        ]
                    }
                ]
            },
            {
                title: 'Soluções Construtivas Especiais',
                subtitle: 'Sistemas Construtivos Modernos para Templos',
                description: 'Oferecemos sistemas construtivos alternativos que reduzem prazo de obra e custos, mantendo qualidade e durabilidade.',
                sections: [
                    {
                        title: 'Steel Frame (Estrutura Leve em Aço)',
                        items: [
                            'Construção rápida',
                            'Estrutura em perfis galvanizados',
                            'Ideal para anexos, salas administrativas e salões'
                        ]
                    },
                    {
                        title: 'Pré-Moldados de Concreto',
                        items: [
                            'Pilares, vigas e lajes pré-fabricadas',
                            'Redução no prazo de obra',
                            'Controle de qualidade industrial',
                            'Ideal para coberturas de grandes vãos'
                        ]
                    },
                    {
                        title: 'Diferenciais Técnicos',
                        items: [
                            'Sistemas testados e certificados',
                            'Redução de resíduos em obra',
                            'Maior previsibilidade de prazo'
                        ]
                    }
                ]
            },
            {
                title: 'Compliance e Certificações',
                subtitle: 'Certificações e Documentação',
                description: 'Projetos alinhados às exigências legais e documentação completa para entrega segura.',
                sections: [
                    {
                        title: 'Normas e Regulamentações',
                        items: [
                            'IT do Corpo de Bombeiros (específica do estado)',
                            'NBR 9050 (Acessibilidade)',
                            'NBR 5410 (Instalações Elétricas - infraestrutura)',
                            'NBR 10897 (Proteção contra incêndio)',
                            'NBR 6118 (Estruturas de concreto)',
                            'NBR 8800 (Estruturas de aço)',
                            'Código de Obras Municipal',
                            'Licença de Funcionamento (Prefeitura)'
                        ]
                    },
                    {
                        title: 'Documentação Entregue',
                        items: [
                            'ART (Anotação de Responsabilidade Técnica) - Engenheiro Civil',
                            'Projeto executivo completo (arquitetônico + estrutural)',
                            'Memorial descritivo e especificações técnicas',
                            'Memorial de cálculo estrutural',
                            'As-built (projeto como construído)',
                            'Certificados de materiais (aço, concreto, blocos)',
                            'Laudos de ensaios tecnológicos',
                            'Manual de operação e manutenção'
                        ]
                    }
                ]
            }
        ],
        civilScopes: [
            {
                title: 'Estrutura e grandes vãos',
                description: 'Projetos para naves amplas com boa visibilidade, estabilidade estrutural e integração arquitetônica.',
                highlights: ['Estruturas metálicas e concreto', 'Coberturas de grande vão', 'Compatibilização com arquitetura']
            },
            {
                title: 'Circulação e experiência do público',
                description: 'Planejamento de fluxos, dimensionamento de acessos e orientação espacial para eventos e celebrações.',
                highlights: ['Fluxo de entrada e saída otimizado', 'Dimensionamento de portas e corredores', 'Sinalização e orientação espacial']
            },
            {
                title: 'Segurança e regularização',
                description: 'Adequações para AVCB, acessibilidade universal e operação segura em eventos de alta lotação.',
                highlights: ['Rotas de fuga e pânico', 'Iluminação de emergência', 'Rampas e acessos NBR 9050']
            }
        ],
        executionPhases: [
            { phase: '01', title: 'Concepção e viabilidade', description: 'Estudo de capacidade, estrutura, circulação e estratégia de implantação por etapas.' },
            { phase: '02', title: 'Obra e instalações especiais', description: 'Execução estrutural, acabamentos, infraestrutura predial e sistemas de segurança.' },
            { phase: '03', title: 'Regularização e entrega final', description: 'Validação de segurança, documentação e apoio para abertura com público.' }
        ],
        complianceHighlights: [
            { title: 'Segurança contra incêndio', norm: 'AVCB / Corpo de Bombeiros', description: 'Projeto para abandono seguro, sinalização e sistemas de emergência.' },
            { title: 'Acessibilidade universal', norm: 'NBR 9050', description: 'Acessos, circulação e uso do espaço por todos os públicos com autonomia.' },
            { title: 'Execução de obra com segurança', norm: 'NR-18 e NR-35', description: 'Controle técnico para estruturas elevadas e frentes de montagem em altura.' }
        ],
        businessOutcomes: [
            { metric: 'Experiência', impact: 'Estruturas amplas e seguras para conforto e bem-estar dos fiéis durante celebrações.' },
            { metric: 'Segurança jurídica', impact: 'Maior previsibilidade para regularização e operação com público.' },
            { metric: 'Valorização', impact: 'Infraestrutura mais durável e patrimônio institucional valorizado.' }
        ],
        faq: [
            { question: 'É possível fazer em etapas?', answer: 'Sim. Muitos clientes iniciam pela estrutura principal e depois fazem ampliações conforme arrecadação.' },
            { question: 'Vocês trabalham em todo o Brasil?', answer: 'Sim, atendemos todo território nacional com equipe própria ou parceiros homologados.' },
            { question: 'Fazem reforma sem parar as atividades?', answer: 'Sim, planejamos a obra por fases para manter os cultos e eventos ativos durante toda a execução.' },
            { question: 'Atendem templos pequenos?', answer: 'Sim, atendemos templos de todos os portes, desde capelas até grandes catedrais.' },
            { question: 'Como funciona a garantia?', answer: 'Garantia estrutural conforme norma técnica e ABNT. Detalhes específicos em contrato.' },
            { question: 'Fazem o projeto estrutural também?', answer: 'Sim, temos equipe de engenheiros para projeto arquitetônico, estrutural, hidrossanitário e elétrico completo.' },
            { question: 'Atendem templos históricos?', answer: 'Sim, com técnicas especializadas em restauração e aprovação de órgãos de patrimônio.' },
            { question: 'Coordenam outras empresas (elétrica, hidráulica, som, iluminação)?', answer: 'Sim, fazemos a gestão completa da obra coordenando todas as empresas especializadas.' },
            { question: 'Fazem obras em terrenos irregulares?', answer: 'Sim, executamos terraplenagem, contenções e fundações especiais para qualquer tipo de terreno.' }
        ],
        additionalSlides: [
            {
                type: 'specs',
                title: 'Construção Civil para Templos de Grande Porte',
                content: 'Projetos que combinam identidade arquitetônica, circulação e segurança para multidões.',
                bullets: ['Estruturas de grande vão com estabilidade', 'Circulação e acessibilidade integradas', 'Rotas de emergência e segurança'],
                stats: [{ label: 'Capacidade', value: 'Alta Lotação' }, { label: 'Acessibilidade', value: 'NBR 9050' }, { label: 'Segurança', value: 'AVCB' }],
                image: '/templos/templo-13-construcao.jpg'
            },
            {
                type: 'specs',
                title: 'Fundações e Infraestrutura',
                content: 'A construção de templos exige fundações robustas para suportar grandes cargas e vãos livres amplos.',
                bullets: [
                    'Tubulões a céu aberto e a ar comprimido',
                    'Estacas escavadas (hélice contínua e perfuradas)',
                    'Sapatas e blocos de fundação de grande porte',
                    'Radier (laje de fundação) para solos uniformes',
                    'Fundações especiais para contrabalanço de torres',
                    'Reforço de fundações existentes em templos históricos',
                    'Fundações em terrenos irregulares ou encostas',
                    'Projeto geotécnico com sondagem SPT completa',
                    'Fundações dimensionadas para grandes cargas estruturais',
                    'Memorial de cálculo e ART específica'
                ],
                image: '/templos/templo-03-desafio.jpg'
            },
            {
                type: 'specs',
                title: 'Estruturas para Grandes Vãos Livres',
                content: 'Estruturas especializadas para naves amplas e livres de pilares internos.',
                bullets: [
                    'Concreto protendido (para grandes vãos)',
                    'Estrutura metálica treliçada',
                    'Estrutura mista (concreto + metálica)',
                    'Vigas curvas de altura variável',
                    'Lajes nervuradas e cogumelo',
                    'Naves principais com grandes vãos livres',
                    'Mezaninos e galerias superiores',
                    'Torres e campanários',
                    'Coberturas autoportantes',
                    'Projeto executivo completo com detalhamento'
                ],
                image: '/templos/templo-04-estrutura-1.jpg'
            },
            {
                type: 'specs',
                title: 'Alvenaria Estrutural e Vedações',
                content: 'Paredes estruturais e de vedação com foco em durabilidade e resistência mecânica.',
                bullets: [
                    'Alvenaria estrutural em blocos de concreto',
                    'Alvenaria de vedação em blocos cerâmicos ou concreto',
                    'Paredes duplas com câmara de ar',
                    'Alvenaria armada para paredes de grande altura',
                    'Paredes em concreto aparente moldado in loco',
                    'Cintas de amarração em concreto armado',
                    'Vergas e contravergas em todas as aberturas',
                    'Reforço para fixação de vitrais pesados',
                    'Paredes corta-fogo conforme AVCB',
                    'Chapisco, emboço e reboco com regularização'
                ],
                image: '/templos/templo-05-estrutura-2.jpg'
            },
            {
                type: 'specs',
                title: 'Coberturas e Estruturas de Telhado',
                content: 'Estruturas de telhado robustas e duráveis para grandes vãos e cargas de vento.',
                bullets: [
                    'Estrutura metálica em perfis soldados ou parafusados',
                    'Estrutura em madeira de lei tratada',
                    'Tesouras metálicas para grandes vãos',
                    'Estrutura em concreto para lajes impermeabilizadas',
                    'Terças, caibros e ripamento conforme projeto',
                    'Telhado convencional em telhas cerâmicas ou concreto',
                    'Telhado metálico (telhas termoacústicas)',
                    'Laje impermeabilizada (telhado plano)',
                    'Coberturas curvas e especiais',
                    'Calhas, condutores, rufos e captação pluvial'
                ],
                image: '/templos/templo-06-estrutura-3.jpg'
            },
            {
                type: 'specs',
                title: 'Pisos e Contrapisos',
                content: 'Pisos robustos e nivelados para alto tráfego de pessoas e acessibilidade.',
                bullets: [
                    'Contrapiso em concreto armado',
                    'Piso de concreto alisado/queimado',
                    'Piso industrial de alta resistência',
                    'Lajes de piso elevadas',
                    'Piso drenante para áreas externas',
                    'Regularização de superfície e impermeabilização de pisos',
                    'Caimento técnico e juntas de dilatação',
                    'Rampas conforme NBR 9050 com piso tátil',
                    'Calçadas e estacionamentos com vagas PCD',
                    'Drenagem superficial e canaletas'
                ],
                image: '/templos/templo-09-obras-1.jpg'
            },
            {
                type: 'specs',
                title: 'Instalações Hidrossanitárias e Elétricas',
                content: 'Infraestrutura civil para passagem de instalações, prumadas, shafts e dutos técnicos.',
                bullets: [
                    'Rasgos e furos para tubulações',
                    'Caixas de passagem e inspeção',
                    'Prumadas de esgoto, água e águas pluviais',
                    'Caixas d’água e reservatórios (estrutura)',
                    'Poços de recalque e fossas (se necessário)',
                    'Eletrodutos embutidos em lajes e paredes',
                    'Shafts técnicos para quadros elétricos',
                    'Aterramento (hastes e malha de terra)',
                    'Infraestrutura para SPDA (para-raios)',
                    'Executamos a infraestrutura civil conforme projeto'
                ],
                image: '/templos/templo-10-obras-2.jpg'
            },
            {
                type: 'specs',
                title: 'Terraplenagem e Contenção de Encostas',
                content: 'Movimentação de terra e contenções para viabilizar a construção em terrenos irregulares.',
                bullets: [
                    'Limpeza e desmatamento de terreno',
                    'Escavação mecanizada',
                    'Corte e aterro para nivelamento',
                    'Compactação de solo',
                    'Remoção e bota-fora de material excedente',
                    'Muros de arrimo em concreto armado',
                    'Muros de gabião e contenções em blocos',
                    'Cortinas ancoradas (solo grampeado)',
                    'Drenagem de encostas e canaletas',
                    'Laudo de estabilidade de taludes quando necessário'
                ],
                image: '/templos/templo-11-obras-3.jpg'
            },
            {
                type: 'specs',
                title: 'Demolições e Reforço Estrutural',
                content: 'Reforma e adequação de templos existentes com segurança e planejamento por fases.',
                bullets: [
                    'Demolição parcial ou total de estruturas',
                    'Remoção de paredes não estruturais',
                    'Demolição de pisos, lajes e coberturas',
                    'Escoramento prévio de estruturas adjacentes',
                    'Controle de vibrações e poeira',
                    'Reforço de fundações com microestacas',
                    'Reforço de vigas e pilares (encamisamento)',
                    'Ampliação de naves e construção de anexos',
                    'Restauração estrutural em templos históricos',
                    'Obras sem interrupção das atividades religiosas'
                ],
                image: '/templos/templo-13-construcao.jpg'
            },
            {
                type: 'specs',
                title: 'Soluções Construtivas Especiais',
                content: 'Sistemas alternativos que reduzem prazo de obra e custos com qualidade e durabilidade.',
                bullets: [
                    'Steel Frame: construção rápida',
                    'Steel Frame: perfis galvanizados para anexos e salas',
                    'Pré-moldados: pilares, vigas e lajes pré-fabricadas',
                    'Pré-moldados: redução no prazo de obra',
                    'Controle de qualidade industrial',
                    'Sistemas testados e certificados',
                    'Redução de resíduos em obra',
                    'Maior previsibilidade de prazo'
                ],
                image: '/templos/templo-04-estrutura-1.jpg'
            },
            {
                type: 'specs',
                title: 'Compliance e Certificações',
                content: 'Normas aplicáveis e documentação entregue para garantir segurança e regularização.',
                bullets: [
                    'IT do Corpo de Bombeiros (específica do estado)',
                    'NBR 9050 (Acessibilidade)',
                    'NBR 5410 (Instalações Elétricas - infraestrutura)',
                    'NBR 10897 (Proteção contra incêndio)',
                    'NBR 6118 (Estruturas de concreto)',
                    'NBR 8800 (Estruturas de aço)',
                    'Código de Obras Municipal e Licença de Funcionamento',
                    'ART e projeto executivo completo',
                    'Memorial descritivo e memorial de cálculo estrutural',
                    'As-built, certificados de materiais e laudos tecnológicos'
                ],
                image: '/templos/templo-08-avcb.jpg'
            },
            {
                type: 'specs',
                title: 'Perguntas Frequentes',
                content: 'Principais dúvidas sobre construção e adequação de templos religiosos.',
                bullets: [
                    'É possível fazer em etapas? Sim, muitos clientes iniciam pela estrutura principal e ampliam depois.',
                    'Vocês trabalham em todo o Brasil? Sim, atendemos todo território nacional.',
                    'Fazem reforma sem parar as atividades? Sim, planejamos por fases para manter cultos ativos.',
                    'Atendem templos pequenos? Sim, de capelas a grandes catedrais.',
                    'Como funciona a garantia? Garantia estrutural conforme norma técnica e ABNT.',
                    'Fazem o projeto estrutural também? Sim, projeto arquitetônico e estrutural completo.',
                    'Atendem templos históricos? Sim, com técnicas especializadas e aprovação de patrimônio.',
                    'Coordenam outras empresas (elétrica, hidráulica, som, iluminação)? Sim, gestão completa.',
                    'Fazem obras em terrenos irregulares? Sim, terraplenagem, contenções e fundações especiais.'
                ],
                image: '/templos/templo-12-cta.jpg'
            },
            {
                type: 'solution',
                title: 'Implantação por Etapas para Eventos Ativos',
                content: 'A obra é organizada para reduzir impacto na rotina da comunidade e manter calendário de celebrações.',
                bullets: ['Planejamento de frentes independentes', 'Controle de ruído e segurança de público', 'Entrega progressiva por ambientes'],
                image: '/templos/templo-14-etapas.jpg'
            },
            {
                type: 'gallery',
                title: 'Ambientes que Inspiram',
                content: 'Engenharia aplicada para espaços acolhedores, seguros e tecnicamente preparados.',
                galleryImages: [
                    '/templos/templo-15-inspira-1.jpg',
                    '/templos/templo-16-inspira-2.jpg',
                    '/templos/templo-17-inspira-3.jpg'
                ]
            }
        ]
    }
};
