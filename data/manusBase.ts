export interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  importance: string;
  specs: string[];
  gallery: string[];
}

export interface Category {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

export const productsData: Category[] = [
  {
    id: "seguranca-operacoes",
    title: "Sistemas de Segurança para Operações Industriais e Logísticas",
    description: "Soluções robustas projetadas para garantir a integridade física de colaboradores e ativos em ambientes de alto risco, em total conformidade com as normas regulamentadoras (NR-12, NR-35).",
    products: [
      {
        id: "rampa-niveladora",
        title: "Rampa Niveladora de Docas",
        image: "/images/rampa-01.jpeg",
        description: "Equipamento essencial para a otimização do fluxo logístico, a Rampa Niveladora de Docas Facilco atua como a ponte de conexão segura entre o piso do armazém e a carroceria do veículo de carga. Projetada para compensar desníveis positivos e negativos, garante a transitabilidade de empilhadeiras e paleteiras com máxima segurança e eficiência.",
        importance: "Elimina o 'degrau' entre doca e caminhão, prevenindo acidentes com empilhadeiras e lesões em operadores, além de reduzir drasticamente o tempo de carga e descarga.",
        specs: [
          "Capacidade de carga dinâmica: 6.000 kg a 10.000 kg",
          "Acionamento eletro-hidráulico robusto",
          "Pestana basculante de alta resistência",
          "Sistema de segurança com válvula antiqueda",
          "Atende integralmente à NR-12"
        ],
        gallery: ["/images/rampa-01.jpeg"]
      },
      {
        id: "protetor-coluna",
        title: "Protetores de Coluna Porta Pallet",
        image: "/images/porta-01.jpeg",
        description: "Dispositivo de proteção estrutural projetado para absorver impactos acidentais de empilhadeiras contra as colunas de sistemas de armazenagem (porta-pallets). Fabricado em aço de alta resistência com design envolvente, dissipa a energia do choque, preservando a integridade da estrutura e evitando colapsos catastróficos.",
        importance: "Protege o ativo mais crítico do armazém (a estrutura de armazenagem), prevenindo o efeito dominó de quedas e garantindo a continuidade operacional.",
        specs: [
          "Aço estrutural de alta espessura",
          "Fixação independente da coluna (não transfere impacto)",
          "Pintura eletrostática Amarelo Segurança (alta visibilidade)",
          "Design compatível com diversos perfis de coluna",
          "Instalação rápida e robusta"
        ],
        gallery: ["/images/porta-01.jpeg"]
      },
      {
        id: "bollards",
        title: "Bollards de Proteção (Balizadores)",
        image: "/images/bollard-01.jpeg",
        description: "Barreiras físicas verticais de alta resistência, projetadas para delimitar áreas e proteger equipamentos críticos, hidrantes, painéis elétricos e estruturas prediais contra impactos de veículos industriais. Construídos em tubo de aço com preenchimento de concreto (opcional) para máxima tenacidade.",
        importance: "Cria uma barreira intransponível para proteção de infraestruturas críticas e segregação segura de tráfego, sem obstruir a visibilidade.",
        specs: [
          "Tubo de aço carbono SCH 40 ou superior",
          "Diâmetros variados (4\", 6\", 8\") conforme necessidade",
          "Fixação por chumbamento profundo ou base flangeada",
          "Acabamento em Amarelo Segurança com faixas refletivas",
          "Alta resistência a impactos diretos"
        ],
        gallery: ["/images/bollard-01.jpeg"]
      },
      {
        id: "rampa-movel",
        title: "Rampa Móvel de Carga/Descarga",
        image: "/images/carga-01.jpeg",
        description: "Solução versátil para operações logísticas que não possuem docas elevadas ou necessitam de flexibilidade operacional. A Rampa Móvel permite o acesso de empilhadeiras diretamente do nível do solo até a carroceria do caminhão, transformando qualquer pátio em uma área de expedição eficiente.",
        importance: "Flexibiliza a operação logística, permitindo carga e descarga em qualquer ponto do pátio, ideal para picos de demanda ou instalações provisórias.",
        specs: [
          "Estrutura treliçada de alta capacidade",
          "Piso antiderrapante em grade de aço expandido",
          "Sistema de regulagem de altura manual ou hidráulico",
          "Correntes de travamento ao veículo",
          "Rodas para movimentação da própria rampa"
        ],
        gallery: ["/images/carga-01.jpeg"]
      },
      {
        id: "batente-doca",
        title: "Batente para Docas (Dock Bumper)",
        image: "/images/batente-01.jpeg",
        description: "Elemento de amortecimento instalado na face da doca para absorver o impacto da aproximação dos caminhões. Fabricado em borracha de alta densidade ou materiais poliméricos, protege tanto a estrutura civil da doca quanto a traseira do veículo de carga contra danos repetitivos.",
        importance: "Preserva a integridade estrutural do prédio e dos veículos, reduzindo custos de manutenção corretiva em alvenaria e parachoques.",
        specs: [
          "Borracha vulcanizada de alta absorção",
          "Modelos laminados ou moldados",
          "Fixação robusta com chumbadores mecânicos",
          "Resistente a intempéries e abrasão",
          "Diversas dimensões para diferentes tipos de frota"
        ],
        gallery: ["/images/batente-01.jpeg"]
      },
      {
        id: "bate-rodas",
        title: "Bate Rodas Limitador",
        image: "/images/bate-01.jpeg",
        description: "Dispositivo de contenção instalado no piso para delimitar o curso final de veículos em vagas de estacionamento ou docas. Garante que o veículo pare na posição correta, evitando colisões contra paredes, cercas ou outros veículos.",
        importance: "Organiza o estacionamento de frotas e previne danos por manobras incorretas em áreas restritas.",
        specs: [
          "Concreto de alta resistência ou material polimérico",
          "Fixação dupla no solo",
          "Pintura reflexiva para visibilidade noturna",
          "Design que não danifica os pneus",
          "Resistente a cargas pesadas"
        ],
        gallery: ["/images/bate-01.jpeg"]
      },
      {
        id: "dock-light",
        title: "Dock Light (Iluminação de Doca)",
        image: "/images/dock-01.jpeg",
        description: "Luminária articulada projetada especificamente para iluminar o interior de baús de caminhões e contêineres durante as operações de carga e descarga. Elimina zonas de sombra, permitindo que os operadores visualizem claramente a carga e o piso do veículo.",
        importance: "Aumenta a segurança operacional e a precisão na conferência de mercadorias, reduzindo erros e riscos de acidentes em ambientes confinados.",
        specs: [
          "Braço articulado de longo alcance",
          "Foco em LED de alta potência e baixo consumo",
          "Grade de proteção contra impactos acidentais",
          "Corpo resistente a vibrações",
          "Fácil manuseio e posicionamento"
        ],
        gallery: ["/images/dock-01.jpeg"]
      }
    ]
  },
  {
    id: "controle-trafego",
    title: "Controle de Tráfego em Áreas Internas",
    description: "Tecnologias e barreiras físicas para organização eficiente de fluxo, segregando pedestres de máquinas e prevenindo colisões em pátios logísticos e fabris.",
    products: [
      {
        id: "sinalizacao-docas",
        title: "Sinalização de Docas Inteligente",
        image: "/images/doca-01.jpeg",
        description: "Sistema integrado de gestão visual para controle de fluxo em docas. Utiliza semáforos LED (verde/vermelho) intertravados com sensores ou acionamento manual para comunicar status de liberação para motoristas e operadores de empilhadeira, prevenindo partidas acidentais.",
        importance: "Previne o gravíssimo acidente de partida prematura do caminhão enquanto a empilhadeira ainda está operando no interior, salvando vidas.",
        specs: [
          "Semáforos LED de alto brilho e longa vida útil",
          "Comunicação visual clara (Interno/Externo)",
          "Integração possível com porta e niveladora",
          "Sensores de presença de veículo",
          "Painel de comando intuitivo"
        ],
        gallery: ["/images/doca-01.jpeg", "/images/doca-02.jpeg"]
      },
      {
        id: "delimitador",
        title: "Delimitadores de Tráfego e Proteção",
        image: "/images/trafego-01.jpeg",
        description: "Soluções físicas para segregação de rotas de pedestres e veículos industriais. Inclui barreiras modulares, segregadores de solo e corrimãos industriais que disciplinam o trânsito interno, garantindo que empilhadeiras e pessoas circulem em zonas seguras e distintas.",
        importance: "Fundamental para atender à NR-12 e NR-26, criando corredores seguros e reduzindo drasticamente o risco de atropelamentos fabris.",
        specs: [
          "Sistema modular de fácil expansão",
          "Alta absorção de impacto (polímero ou aço)",
          "Cores vibrantes para alerta visual imediato",
          "Diversas configurações de altura e comprimento",
          "Fixação que preserva o piso industrial"
        ],
        gallery: ["/images/trafego-01.jpeg", "/images/trafego-02.jpeg", "/images/trafego-03.jpeg", "/images/trafego-04.jpeg", "/images/trafego-05.jpeg"]
      },
      {
        id: "guard-rail",
        title: "Guard-Rail Industrial",
        image: "/images/guard-01.jpeg",
        description: "Defensas metálicas robustas para proteção perimetral de áreas críticas, máquinas e corredores de tráfego intenso. Projetados para suportar impactos severos, impedindo a invasão de veículos em zonas proibidas ou protegidas.",
        importance: "Barreira física definitiva para proteção de patrimônio e vidas em áreas de alto risco de colisão.",
        specs: [
          "Perfil metálico de alta inércia",
          "Postes de sustentação reforçados",
          "Acabamento galvanizado ou pintado",
          "Atende normas de segurança viária interna",
          "Instalação em concreto armado"
        ],
        gallery: ["/images/guard-01.jpeg", "/images/guard-02.jpeg", "/images/guard-03.jpeg", "/images/guard-04.jpeg"]
      },
      {
        id: "escada-marinheiro",
        title: "Escada Marinheiro com Guarda-Corpo",
        image: "/images/escada-01.jpeg",
        description: "Estrutura de acesso vertical permanente, equipada com guarda-corpo de proteção (gaiola) conforme NR-12 e NR-35. Essencial para acesso seguro a telhados, reservatórios, pontes rolantes e níveis elevados de manutenção.",
        importance: "Garante acesso ergonômico e seguro a áreas elevadas, prevenindo quedas e facilitando manutenções rotineiras.",
        specs: [
          "Gaiola de proteção a partir de 2,0m",
          "Degraus antiderrapantes",
          "Patamar de descanso (para alturas elevadas)",
          "Portinhola de segurança no acesso superior",
          "Acabamento resistente a intempéries"
        ],
        gallery: ["/images/escada-01.jpeg", "/images/Gemini_Generated_Image_iv14zgiv14zgiv14.jpeg"]
      },
      {
        id: "linha-vida",
        title: "Linha de Vida (Sistemas de Ancoragem NR-35)",
        image: "/images/linha-01.jpeg",
        description: "Sistema de proteção contra quedas composto por cabos de aço, pontos de ancoragem e absorvedores de energia. Projetado para permitir a movimentação segura de trabalhadores em altura, garantindo retenção imediata em caso de queda acidental.",
        importance: "Obrigatório por lei (NR-35) para qualquer trabalho acima de 2,0m, é a principal garantia de vida para equipes de manutenção predial e industrial.",
        specs: [
          "Projeto e ART por engenheiro calculista",
          "Componentes em Aço Inox ou Galvanizado a Fogo",
          "Absorvedores de impacto de alta eficiência",
          "Passagem livre (sem desconexão do trole)",
          "Certificação de todos os componentes"
        ],
        gallery: ["/images/linha-01.jpeg", "/images/linha-02.jpeg"]
      }
    ]
  }
];
