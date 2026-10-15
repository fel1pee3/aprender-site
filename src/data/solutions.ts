export type StageId =
  "infantil" | "anos-iniciais" | "anos-finais" | "educadores";
export type ObjectiveId =
  | "desenvolvimento"
  | "alfabetizacao"
  | "linguagens"
  | "matematica"
  | "aprendizagem"
  | "ciencias"
  | "cidadania"
  | "leitura"
  | "gestao"
  | "socioemocional";

export interface Solution {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  stage: string;
  stageId: StageId;
  stageIds: StageId[];
  objectiveId: ObjectiveId;
  audience: string;
  image: string;
  accent: string;
  goals: string[];
  components: string[];
  support: string[];
  sourcePages: number[];
  featured?: boolean;
  aliases?: string[];
  sourceLabel?: string;
  sourceUrl?: string;
}

export const stages: { id: StageId; label: string }[] = [
  { id: "infantil", label: "Educação Infantil" },
  { id: "anos-iniciais", label: "Anos iniciais" },
  { id: "anos-finais", label: "Anos finais" },
  { id: "educadores", label: "Educadores e gestão" },
];

export const objectives: { id: ObjectiveId; label: string }[] = [
  { id: "desenvolvimento", label: "Desenvolvimento infantil" },
  { id: "alfabetizacao", label: "Alfabetização" },
  { id: "linguagens", label: "Linguagens" },
  { id: "matematica", label: "Matemática" },
  { id: "aprendizagem", label: "Consolidação da aprendizagem" },
  { id: "ciencias", label: "Ciências" },
  { id: "cidadania", label: "Diversidade e cidadania" },
  { id: "leitura", label: "Formação de leitores" },
  { id: "gestao", label: "Gestão escolar" },
  { id: "socioemocional", label: "Desenvolvimento socioemocional" },
];

// Resumos originais baseados nas páginas indicadas do catálogo institucional de 2025.
// Cargas horárias e componentes representam a oferta documentada nessa edição.
export const solutions: Solution[] = [
  {
    slug: "brincando-e-aprendendo",
    name: "Brincando e Aprendendo",
    subtitle: "A descoberta começa no brincar.",
    description:
      "Interações e brincadeiras dão sentido a uma rotina de descobertas. A coleção reúne propostas articuladas aos campos de experiências e aos direitos de aprendizagem da Educação Infantil.",
    stage: "Educação Infantil",
    stageId: "infantil",
    stageIds: ["infantil"],
    objectiveId: "desenvolvimento",
    audience: "Bebês, crianças bem pequenas, crianças pequenas e educadores.",
    image: "/images/collections/brincando-e-aprendendo.webp",
    accent: "#EFE2A7",
    featured: true,
    goals: [
      "Organizar experiências lúdicas com intenção pedagógica.",
      "Ampliar habilidades e conhecimentos por meio de interações.",
      "Apoiar intervenções diversas, criativas e desafiadoras.",
    ],
    components: [
      "Livros ou pastas de atividades, conforme o volume",
      "Guias de orientações para o professor",
      "Livros da família e cartazes",
      "Caderno de registros e fascículo nos volumes indicados",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico e observação em sala",
    ],
    sourcePages: [14, 15],
  },
  {
    slug: "miudezas-e-descobertas",
    name: "Miudezas e Descobertas",
    subtitle: "Um mundo inteiro nos primeiros encontros.",
    description:
      "Vivências ligadas ao cotidiano dos bebês, em espaços internos, externos e em contato com a natureza. As propostas acolhem a curiosidade e as primeiras relações com o outro e com o mundo.",
    stage: "Educação Infantil",
    stageId: "infantil",
    stageIds: ["infantil"],
    objectiveId: "desenvolvimento",
    audience: "Bebês de 0 a 1 ano e 6 meses e educadores.",
    image: "/images/collections/miudezas-e-descobertas.webp",
    accent: "#E0E6D5",
    goals: [
      "Promover interações contextualizadas na vida dos bebês.",
      "Favorecer a participação na coletividade e a construção da individualidade.",
      "Explorar diferentes ambientes e experiências com a natureza.",
    ],
    components: [
      "Caderno de experiências e agenda do bebê",
      "Livro do professor e guia de orientações didáticas",
      "Livro da família e Brincando em Família",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico e observação em sala",
    ],
    sourcePages: [16],
  },
  {
    slug: "cataventos",
    name: "Cataventos",
    subtitle: "Experiências que convidam a explorar.",
    description:
      "Literatura, narrativas, música e brincadeiras se encontram em experiências sensoriais, motoras e artísticas. Um repertório para organizar espaços que convidam as crianças a descobrir e aprender.",
    stage: "Educação Infantil",
    stageId: "infantil",
    stageIds: ["infantil"],
    objectiveId: "desenvolvimento",
    audience: "Crianças de 2 e 3 anos e educadores.",
    image: "/images/collections/cataventos.webp",
    accent: "#F3DEC9",
    goals: [
      "Integrar diferentes linguagens em atividades socialmente contextualizadas.",
      "Criar ambientes de exploração e interação.",
      "Ampliar vivências sensoriais, motoras, artísticas e musicais.",
    ],
    components: [
      "Volumes Cataventos 1 e 2",
      "Livro pasta do bebê",
      "Guia do professor, livro da família e cartazes",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico e observação em sala",
    ],
    sourcePages: [18],
  },
  {
    slug: "uni-duni-te",
    name: "Uni Duni Tê",
    subtitle: "Aprender nas relações do dia a dia.",
    description:
      "Atividades e experiências partem das situações sociais vividas pelas crianças. As interações entre professores e crianças, e entre as próprias crianças, orientam a proposta de desenvolvimento integral.",
    stage: "Educação Infantil",
    stageId: "infantil",
    stageIds: ["infantil"],
    objectiveId: "desenvolvimento",
    audience: "Crianças de 4 e 5 anos e educadores.",
    image: "/images/collections/uni-duni-te.webp",
    accent: "#DEE8D2",
    goals: [
      "Promover experiências significativas nos diferentes espaços da escola.",
      "Valorizar a mediação e as interações entre as crianças.",
      "Relacionar aprendizagem às atividades sociais do cotidiano.",
    ],
    components: [
      "Uni Duni Tê 1 e 2, com dois volumes de atividades",
      "Livro da família",
      "Guia de orientações e cartazes",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico e observação em sala",
    ],
    sourcePages: [20],
  },
  {
    slug: "novo-lendo-voce-fica-sabendo",
    name: "Novo Lendo Você Fica Sabendo",
    subtitle: "Ler, escrever e participar do mundo.",
    description:
      "Uma proposta de alfabetização e letramento que aproxima a aprendizagem da escrita de seus usos sociais. Gêneros orais e escritos sustentam atividades planejadas para compreender o sistema de escrita alfabética.",
    stage: "Anos iniciais · 1º e 2º anos",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais"],
    objectiveId: "alfabetizacao",
    audience:
      "Estudantes e educadores do 1º e do 2º ano do Ensino Fundamental.",
    image: "/images/collections/novo-lendo-voce-fica-sabendo.webp",
    accent: "#E9E5B3",
    featured: true,
    goals: [
      "Desenvolver a leitura e a escrita em práticas de letramento.",
      "Compreender o sistema de escrita alfabética.",
      "Explorar gêneros orais e escritos em situações comunicativas.",
    ],
    components: [
      "Livros de atividades, volumes 1 e 2, para cada ano",
      "Tarefas de casa e livro da família",
      "Guia de orientações e cartazes",
      "Brincando com o Alfabeto ou Brincando com as Palavras, conforme o ano",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento, observação em sala e aplicação de provinhas",
      "Sugestões de intervenções a partir da aprendizagem",
    ],
    sourcePages: [24, 25],
  },
  {
    slug: "amma",
    name: "AMMA",
    subtitle: "Aprender Mais Matemática.",
    description:
      "Noções matemáticas conectadas às vivências dos estudantes. O projeto propõe atividades contextualizadas e interdisciplinares para desenvolver o letramento matemático no início do Ensino Fundamental.",
    stage: "Anos iniciais · 1º e 2º anos",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais"],
    objectiveId: "matematica",
    audience:
      "Estudantes e educadores do 1º e do 2º ano do Ensino Fundamental.",
    image: "/images/collections/amma.webp",
    accent: "#EADBEF",
    featured: true,
    goals: [
      "Desenvolver o letramento matemático.",
      "Relacionar conhecimentos matemáticos às experiências cotidianas.",
      "Explorar habilidades matemáticas de forma contextualizada.",
    ],
    components: [
      "Livros de atividades para sala, volumes 1 e 2",
      "Livros de atividades para casa, volumes 1 e 2",
      "Guias de orientações e cartazes",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento, observação em sala e aplicação de provinhas",
      "Sugestões de atividades interventoras",
    ],
    sourcePages: [26, 27],
  },
  {
    slug: "projeto-tema",
    name: "Projeto TEMA",
    subtitle: "Tempo de mais aprender.",
    description:
      "Uma proposta para estudantes que ainda precisam consolidar a alfabetização. Atividades de leitura e escrita partem de situações comunicativas e dos interesses de quem está aprendendo.",
    stage: "Anos iniciais · 3º ao 5º ano",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais"],
    objectiveId: "alfabetizacao",
    audience:
      "Estudantes, educadores e coordenadores do 3º, 4º e 5º anos do Ensino Fundamental.",
    image: "/images/collections/projeto-tema.webp",
    accent: "#F3D6CB",
    goals: [
      "Apoiar estudantes que não consolidaram a alfabetização no ciclo previsto.",
      "Trabalhar sistematicamente habilidades do sistema de escrita alfabética.",
      "Articular alfabetização, conhecimento linguístico e letramento.",
    ],
    components: [
      "TEMA 1, 2 e 3",
      "Livros de atividades para sala e casa, volumes 1 e 2",
      "Guias de orientações e cartazes",
    ],
    support: [
      "Formação híbrida: 40 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento, observação em sala e aplicação de provinhas",
      "Sugestões de intervenções pedagógicas",
    ],
    sourcePages: [28, 29],
  },
  {
    slug: "escrever-comunicar-e-ser",
    name: "Escrever, Comunicar e Ser",
    subtitle: "Toda escrita tem algo a dizer.",
    description:
      "Produção textual, oralidade e leitura em práticas comunicativas. A coleção acompanha o processo de planejar, produzir, revisar e editar textos, com temas próximos ao universo dos estudantes.",
    stage: "Anos iniciais · 1º ao 5º ano",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais"],
    objectiveId: "linguagens",
    audience: "Estudantes e educadores do 1º ao 5º ano do Ensino Fundamental.",
    image: "/images/collections/escrever-comunicar-e-ser.webp",
    accent: "#E7D5E9",
    goals: [
      "Ampliar a produção de gêneros orais e escritos.",
      "Desenvolver o planejamento, a revisão e a edição de textos.",
      "Relacionar a escrita a diferentes contextos de comunicação.",
    ],
    components: ["Cinco livros de atividades, do 1º ao 5º ano"],
    support: [
      "Formação remota: 16 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [30],
  },
  {
    slug: "superativar",
    name: "Superativar",
    subtitle: "Compreender, resolver, pensar sobre aprender.",
    description:
      "Linguagens e Matemática em atividades que aproximam compreensão leitora e resolução de problemas. A proposta convida os estudantes a refletir sobre seu próprio percurso de aprendizagem.",
    stage: "Anos iniciais · 3º ao 5º ano",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais"],
    objectiveId: "aprendizagem",
    audience:
      "Estudantes e educadores do 3º, 4º e 5º anos do Ensino Fundamental.",
    image: "/images/collections/superativar.webp",
    accent: "#DDE6F2",
    goals: [
      "Desenvolver habilidades em Linguagens e Matemática.",
      "Trabalhar compreensão leitora e resolução de problemas.",
      "Estimular a reflexão sobre os processos de aprendizagem.",
    ],
    components: [
      "Livros de atividades de Linguagens e Matemática",
      "Guias de orientações",
      "Provas e questões bônus para estudantes e professores",
    ],
    support: [
      "Formação híbrida: 16 h/a anuais por área de conhecimento",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento, instrumentos avaliativos e sugestões de intervenções",
    ],
    sourcePages: [32, 33],
  },
  {
    slug: "vida-e-linguagem",
    name: "Vida & Linguagem",
    subtitle: "A linguagem em diferentes campos da vida.",
    description:
      "Atividades complementares de Língua Portuguesa que aproximam os estudantes dos gêneros orais e escritos. A proposta articula práticas de linguagem, planejamento pedagógico e avaliações processuais.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "linguagens",
    audience: "Estudantes e educadores do 6º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/vida-e-linguagem.webp",
    accent: "#DADBF0",
    featured: true,
    goals: [
      "Ampliar habilidades em Língua Portuguesa.",
      "Explorar os campos jornalístico, da vida pública, de estudo e artístico-literário.",
      "Relacionar o acompanhamento da aprendizagem ao currículo.",
    ],
    components: [
      "Livros de atividades do 6º ao 9º ano",
      "Sugestões e orientações para o professor",
      "Suplementos SAEB",
      "Avaliações para estudantes e professores",
    ],
    support: [
      "Formação híbrida: 16 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento pedagógico, avaliações e sugestões de intervenções",
    ],
    sourcePages: [36, 37],
  },
  {
    slug: "vida-e-matematica",
    name: "Vida & Matemática",
    subtitle: "Argumentar e compreender com a matemática.",
    description:
      "Números, álgebra, geometria, grandezas e medidas, probabilidade e estatística em uma proposta complementar. As atividades articulam representação, linguagem simbólica e argumentação.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "matematica",
    audience: "Estudantes e educadores do 6º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/vida-e-matematica.webp",
    accent: "#D7E8EE",
    goals: [
      "Desenvolver práticas sociais de linguagem matemática.",
      "Trabalhar as cinco unidades temáticas da Matemática.",
      "Conectar o planejamento pedagógico às avaliações processuais.",
    ],
    components: [
      "Livros de atividades do 6º ao 9º ano",
      "Sugestões e orientações para o professor",
      "Suplementos SAEB",
      "Avaliações para estudantes e professores",
    ],
    support: [
      "Formação híbrida: 16 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento pedagógico, avaliações e sugestões de intervenções",
    ],
    sourcePages: [38, 39],
  },
  {
    slug: "vida-e-ciencias",
    name: "Vida & Ciências",
    subtitle: "Investigar para compreender o mundo.",
    description:
      "Letramento científico por meio de atividades sobre matéria e energia, vida e evolução, Terra e Universo. A coleção valoriza a experimentação e a leitura do mundo natural, social e tecnológico.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "ciencias",
    audience: "Estudantes e educadores do 6º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/vida-e-ciencias.webp",
    accent: "#DCE7D5",
    goals: [
      "Desenvolver o letramento científico.",
      "Estimular a experimentação e a investigação.",
      "Interpretar relações entre natureza, sociedade e tecnologia.",
    ],
    components: [
      "Livros de atividades do 6º ao 9º ano",
      "Sugestões e orientações para o professor",
      "Suplementos SAEB/Pisa",
      "Avaliações para estudantes e professores",
    ],
    support: [
      "Formação híbrida: 16 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento pedagógico, avaliações e sugestões de intervenções",
    ],
    sourcePages: [40, 41],
  },
  {
    slug: "avancando-juntos",
    name: "Avançando Juntos",
    subtitle: "Mais foco em cada aprendizagem.",
    description:
      "Atividades de Língua Portuguesa e Matemática organizadas por microhabilidades. A proposta permite acompanhar o progresso dos estudantes e trabalhar necessidades específicas no 9º ano.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "aprendizagem",
    audience: "6º ao 9º ano na tabela de 2027; apresentação pedagógica do 9º ano no catálogo de 2025.",
    image: "/images/collections/avancando-juntos.webp",
    accent: "#F0DDCE",
    goals: [
      "Consolidar habilidades essenciais de Língua Portuguesa e Matemática.",
      "Acompanhar o progresso a partir de microhabilidades.",
      "Apoiar o atendimento às necessidades individuais de aprendizagem.",
    ],
    components: [
      "Livro de atividades e livro do professor de Língua Portuguesa",
      "Livro de atividades e livro do professor de Matemática",
    ],
    support: [
      "Formação híbrida: 16 h/a anuais por componente",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [42],
  },
  {
    slug: "sou-da-paz",
    name: "Sou da Paz",
    subtitle: "Diálogo, escuta e respeito na escola.",
    description:
      "Uma proposta de ensino religioso e cultura de paz baseada no diálogo, na empatia e no respeito às diferenças. As atividades convidam à mediação de conflitos e à convivência cooperativa.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "cidadania",
    audience: "Estudantes e educadores do 6º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/sou-da-paz.webp",
    accent: "#DFEADB",
    goals: [
      "Promover a cultura de paz e a não violência.",
      "Desenvolver escuta, empatia e respeito às diferenças.",
      "Trabalhar estratégias de mediação de conflitos.",
    ],
    components: [
      "Livros de atividades do 6º ao 9º ano",
      "Guias de orientações",
      "Itinerários da Vida e cartazes",
    ],
    support: [
      "Formação híbrida: 20 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [44, 45],
  },
  {
    slug: "educacao-financeira",
    name: "Educação Financeira",
    subtitle: "Para uma vida sustentável.",
    description:
      "Planejamento, análise e tomada de decisões em situações financeiras. Atividades que atravessam diferentes áreas do conhecimento incentivam escolhas conscientes, éticas e sustentáveis.",
    stage: "Anos finais · 6º ao 9º ano",
    stageId: "anos-finais",
    stageIds: ["anos-finais"],
    objectiveId: "cidadania",
    audience: "Estudantes e educadores do 6º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/educacao-financeira.webp",
    accent: "#EFE4C4",
    goals: [
      "Desenvolver o letramento financeiro.",
      "Exercitar o planejamento e a tomada de decisões.",
      "Refletir sobre escolhas responsáveis e sustentáveis.",
    ],
    components: ["Quatro livros da coleção, numerados de 1 a 4"],
    support: [
      "Formação remota: 8 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [46],
  },
  {
    slug: "a-cor-da-gente",
    name: "A Cor da Gente",
    subtitle: "Diversidade histórico-cultural na escola.",
    description:
      "Textos literários e atividades valorizam as culturas afro-brasileiras e indígenas. A coleção abre espaço para ampliar repertórios, reconhecer presenças e construir práticas educacionais inclusivas.",
    stage: "Ensino Fundamental · 1º ao 9º ano",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais", "anos-finais"],
    objectiveId: "cidadania",
    audience: "Estudantes e educadores do 1º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/a-cor-da-gente.webp",
    accent: "#EFD5C2",
    featured: true,
    goals: [
      "Promover a educação para as relações étnico-raciais.",
      "Ampliar conhecimentos sobre as culturas afro-brasileiras e indígenas.",
      "Favorecer práticas afirmativas e um ambiente escolar acolhedor.",
    ],
    components: ["Nove livros com textos literários e blocos de atividades"],
    support: [
      "Formação remota: 8 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [50],
  },
  {
    slug: "transito-legal",
    name: "Trânsito Legal",
    subtitle: "Cuidar de si, conviver com todos.",
    description:
      "Histórias em quadrinhos, jogos e atividades práticas aproximam cidadania e segurança no trânsito. A proposta convida a refletir sobre direitos, deveres e responsabilidade compartilhada.",
    stage: "Ensino Fundamental · 1º ao 9º ano",
    stageId: "anos-iniciais",
    stageIds: ["anos-iniciais", "anos-finais"],
    objectiveId: "cidadania",
    audience:
      "Estudantes e educadores dos anos iniciais e finais do Ensino Fundamental.",
    image: "/images/collections/transito-legal.webp",
    accent: "#DFE5EF",
    goals: [
      "Refletir sobre cidadania, ética e consciência coletiva.",
      "Reconhecer direitos e deveres na convivência no trânsito.",
      "Promover segurança e responsabilidade compartilhada.",
    ],
    components: [
      "Livros de atividades para anos iniciais e anos finais",
      "Guias de educação no trânsito",
      "Jogos Trilha Circuito e Decifra Placas",
    ],
    support: [
      "Formação remota: 8 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [52],
  },
  {
    slug: "ler-ouvir-e-contar",
    name: "Ler, Ouvir e Contar",
    subtitle: "Histórias para entrar no mundo da leitura.",
    description:
      "Um acervo de literatura infantil para ampliar o repertório cultural e aproximar crianças dos livros. As interações com as histórias fortalecem a oralidade, a leitura e a escrita.",
    stage: "Educação Infantil e 1º e 2º anos",
    stageId: "infantil",
    stageIds: ["infantil", "anos-iniciais"],
    objectiveId: "leitura",
    audience:
      "Crianças, estudantes e educadores da Educação Infantil e do 1º e 2º anos do Ensino Fundamental.",
    image: "/images/collections/ler-ouvir-e-contar.webp",
    accent: "#E6DDEC",
    goals: [
      "Apoiar a formação de leitores literários.",
      "Ampliar repertório cultural e sensibilidade artística.",
      "Desenvolver experiências de oralidade, leitura e escrita.",
    ],
    components: [
      "Três conjuntos de livros infantis e suas coletâneas",
      "Histórias como Os Três Porquinhos, Chapeuzinho Vermelho e Pinóquio",
    ],
    support: [
      "Formação remota: 16 h/a anuais",
      "Plataforma Aprender Formar",
      "Acompanhamento pedagógico",
    ],
    sourcePages: [54, 55],
  },
  {
    slug: "ideb-nota-10",
    name: "IDEB Nota 10",
    subtitle: "Dados que apoiam decisões pedagógicas.",
    description:
      "Materiais para fortalecer a gestão escolar por meio da leitura pedagógica das avaliações. O trabalho articula liderança, planejamento e análise de aprendizagens em Língua Portuguesa e Matemática.",
    stage: "Gestão e desenvolvimento profissional",
    stageId: "educadores",
    stageIds: ["educadores"],
    objectiveId: "gestao",
    audience: "Gestores e educadores do 1º ao 9º ano do Ensino Fundamental.",
    image: "/images/collections/ideb-nota-10.webp",
    accent: "#DCE5DA",
    goals: [
      "Fortalecer a liderança e a construção coletiva da gestão escolar.",
      "Ler criticamente os dados das avaliações de aprendizagem.",
      "Apoiar práticas de gestão voltadas à aprendizagem dos estudantes.",
    ],
    components: [
      "Livro Gestão Escolar",
      "Materiais Avaliar para gestores, estudantes e professores",
      "Cadernos de aprendizagem",
    ],
    support: [
      "Formação híbrida para gestores: 40 h/a anuais",
      "Aprender Formar e Aprender Avaliar",
      "Acompanhamento pedagógico e aplicação de instrumentos avaliativos",
    ],
    sourcePages: [56],
  },
  {
    slug: "fluir-das-emocoes",
    name: "Fluir das Emoções",
    subtitle: "Um olhar atento a quem educa.",
    description:
      "Programa de desenvolvimento socioemocional para profissionais da educação e áreas afins. Em três níveis, propõe reflexão, autoconhecimento e desenvolvimento de habilidades intra e interpessoais.",
    stage: "Desenvolvimento profissional",
    stageId: "educadores",
    stageIds: ["educadores"],
    objectiveId: "socioemocional",
    audience: "Profissionais que atuam na educação e em áreas afins.",
    image: "/images/collections/fluir-das-emocoes.webp",
    accent: "#E5DDEA",
    featured: true,
    goals: [
      "Favorecer autoconhecimento e regulação emocional.",
      "Desenvolver habilidades intra e interpessoais.",
      "Promover reflexão e aprendizagem socioemocional em caráter psicoeducativo.",
    ],
    components: [
      "Três níveis do programa",
      "Livro, caderno de atividades e agenda em cada nível",
    ],
    support: [
      "Atividades formativas híbridas: 20 h/a por nível",
      "Plataforma Aprender Formar",
      "Acompanhamento do programa por profissionais da psicologia",
    ],
    sourcePages: [58, 59],
  },
  {
    slug: "lendo-e-escrevendo", name: "Lendo e Escrevendo", subtitle: "Volta e meia vamos dar, muitas histórias vamos contar.",
    description: "Uma coleção própria de Educação Infantil, com propostas de participação, interação e diferentes linguagens para crianças de 3, 4 e 5 anos. ",
    stage: "Educação Infantil · 3 a 5 anos", stageId: "infantil", stageIds: ["infantil"], objectiveId: "desenvolvimento", audience: "Crianças de 3, 4 e 5 anos, seus professores e famílias.",
    image: "/images/materials/lendo-e-escrevendo.webp", accent: "#E1ECCC",
    goals: ["Valorizar o protagonismo infantil nas atividades sociais.", "Explorar a comunicação oral, corporal e escrita.", "Aproximar as experiências da criança e a parceria entre família e escola."],
    components: ["Livro da criança 1; livros da criança 2 e 3 em dois volumes", "Livro da família e cards de alfabeto e algarismos", "Guias de orientações didáticas, encartes e CD de músicas e parlendas na apresentação do site"],
    support: ["Guias com referências teóricas e propostas de planejamento docente"], sourcePages: [],
    sourceLabel: "Apresentação de acervo · sem data de edição", sourceUrl: "https://www.aprendereditora.com.br/lendo-e-escrevendo",
    aliases: ["Lendo e Escrevendo Volta e Meia Vamos Dar Muitas Histórias Vamos Contar"],
  },
  {
    slug: "acerta-brasil", name: "ACerta Brasil", subtitle: "#SuperaIDEB · leitura e resolução de problemas.",
    description: "Materiais de Língua Portuguesa e Matemática para o 5º ano, com atividades, suplementos e provas relacionados às avaliações externas. ",
    stage: "Anos iniciais · 5º ano", stageId: "anos-iniciais", stageIds: ["anos-iniciais"], objectiveId: "aprendizagem", audience: "Estudantes e professores do 5º ano do Ensino Fundamental.",
    image: "/images/materials/acerta-brasil.webp", accent: "#CFE6DE",
    goals: ["Desenvolver leitura, compreensão e resolução de problemas.", "Familiarizar os estudantes com a linguagem das avaliações externas.", "Apoiar intervenções pedagógicas a partir dos resultados das provas."],
    components: ["Livro de Língua Portuguesa e livro de Matemática, com 30 atividades cada", "Suplementos de questões bônus e três provas por componente", "Guias do professor"],
    support: ["Orientações de aplicação e leitura dos resultados", "Fichas de compilação e sugestões de atividades interventoras"], sourcePages: [],
    sourceLabel: "Apresentação #SuperaIDEB · sem data de edição", sourceUrl: "https://www.aprendereditora.com.br/colecao-acerta-brasil", aliases: ["Acerta Brasil", "SuperaIDEB"],
  },
  {
    slug: "ingles", name: "Inglês", subtitle: "My Learning Companion e My Teaching Companion.",
    description: "Materiais de Inglês relacionados na tabela de 2027: My Learning Companion para estudantes e My Teaching Companion para professores, em quatro níveis correspondentes ao 6º, 7º, 8º e 9º anos.",
    stage: "Anos finais · 6º ao 9º ano", stageId: "anos-finais", stageIds: ["anos-finais"], objectiveId: "linguagens", audience: "Estudantes e professores do 6º ao 9º ano do Ensino Fundamental.",
    image: "", accent: "#E2E7F0",
    goals: [], components: ["My Learning Companion 1, 2, 3 e 4 — estudante", "My Teaching Companion 1, 2, 3 e 4 — professor"], support: [], sourcePages: [],
    sourceLabel: "Tabela de preços publicada · edição 2027", sourceUrl: "https://www.aprendereditora.com.br/tabela-precos", aliases: ["My Learning Companion", "My Teaching Companion", "English"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
