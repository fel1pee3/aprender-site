export const catalogueUrl =
  "https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf";

export const contact = {
  email: "aprendereditora@aprendereditora.com.br",
  phone: "(85) 3194-1300",
  phoneHref: "tel:+558531941300",
  address: "Rua Ary Barroso, 70 · 9º andar · Torre 2 · Papicu",
  city: "Fortaleza · Ceará",
  postalCode: "60175-705",
  instagram: "https://www.instagram.com/aprendereditora",
  website: "https://www.aprendereditora.com.br/",
  contactUrl: "https://www.aprendereditora.com.br/fale-conosco",
  checkedAt: "2026-10-13",
};

export interface Platform {
  name: string;
  description: string;
  url: string;
  features: string[];
}

export const platforms: Platform[] = [
  {
    name: "Aprender Formar",
    description:
      "Um ambiente virtual para educadores participantes dos projetos da Aprender. Apoia as formações e aproxima as pessoas dos materiais e conhecimentos trabalhados nos encontros.",
    url: "https://aprenderformar.com.br/",
    features: [
      "Apoio às formações presenciais e on-line, com atividades síncronas e assíncronas",
      "Acesso aos materiais pedagógicos das formações",
      "Interação entre os participantes",
    ],
  },
  {
    name: "Aprender Avaliar",
    description:
      "Uma plataforma para reunir e analisar os dados das avaliações dos projetos. Os relatórios apoiam o acompanhamento dos estudantes e a leitura pedagógica dos resultados.",
    url: "https://aprenderavaliar.com.br/",
    features: [
      "Correção e compilação de dados das avaliações",
      "Leitura óptica de cartões-resposta",
      "Relatórios de acompanhamento e análise de resultados",
    ],
  },
];

export const milestones: {
  year: string;
  title: string;
  description: string;
}[] = [
  {
    year: "2000",
    title: "Uma história que encontra Sobral",
    description:
      "A trajetória pedagógica remete às ações de alfabetização da rede municipal de Sobral e ao trabalho da equipe de educadoras coordenada pelo professor Edgar Linhares.",
  },
  {
    year: "2005",
    title: "Nasce a Aprender Editora",
    description:
      "Em Fortaleza, a editora dá continuidade a essa experiência com materiais para alfabetização e formação de educadores, incluindo o projeto Lendo Você Fica Sabendo.",
  },
  {
    year: "2008–2013",
    title: "Participação no eixo de alfabetização do PAIC",
    description:
      "A Aprender participa do programa do Governo do Ceará com materiais, formação contínua, acompanhamento em sala e avaliações. Uma contribuição dentro de uma política pública coletiva.",
  },
  {
    year: "2025",
    title: "Vinte anos de compromisso",
    description:
      "O catálogo comemorativo reúne a trajetória da editora e apresenta soluções para a Educação Infantil, o Ensino Fundamental e o desenvolvimento dos profissionais da educação.",
  },
];

export const principles = [
  {
    name: "Ética",
    description: "Respeito, transparência e integridade nas relações.",
  },
  {
    name: "Inovação",
    description:
      "Pesquisa, criatividade e abertura a novas possibilidades de ensinar.",
  },
  {
    name: "Qualidade",
    description: "Cuidado contínuo com os materiais e o trabalho pedagógico.",
  },
  {
    name: "Integração",
    description: "Colaboração entre equipes, educadores e redes de ensino.",
  },
  {
    name: "Humanização",
    description: "Relações dignas, escuta e valorização das pessoas.",
  },
  {
    name: "Responsabilidade",
    description:
      "Compromisso social com a educação e cuidado profissional em cada atuação.",
  },
];

export interface Article {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  type: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  paragraphs: string[];
  sourceUrl: string;
  sourceLabel: string;
  sourcePages?: number[];
}

export const articles: Article[] = [
  {
    slug: "vinte-anos-compromisso-aprendizagem",
    title: "Vinte anos de histórias que continuam a ensinar",
    date: "2025-11-07",
    dateLabel: "7 de novembro de 2025",
    type: "Institucional",
    excerpt:
      "O catálogo comemorativo de 2025 aproxima a memória da alfabetização das propostas pedagógicas da Aprender.",
    image: "/images/formacao-professores.webp",
    imageAlt: "Educadores reunidos em uma formação da Aprender Editora.",
    imageCaption:
      "Encontro de formação do acervo institucional, reproduzido no catálogo de 2025, p. 61. A data do encontro não é informada na publicação.",
    paragraphs: [
      "Em 2025, a Aprender Editora completou duas décadas de atuação. A publicação comemorativa reúne registros de sala de aula, marcos da trajetória e uma apresentação dos materiais destinados às crianças, aos estudantes e aos profissionais da educação.",
      "Nascida em Fortaleza em 2005, a editora relaciona sua origem à experiência de alfabetização de Sobral e ao trabalho da equipe do professor Edgar Linhares. O catálogo mostra como materiais didáticos, formação contínua, acompanhamento pedagógico e avaliação integram sua proposta de trabalho.",
      "O portfólio apresentado percorre a Educação Infantil, os anos iniciais e finais do Ensino Fundamental, além de projetos de leitura, cidadania e desenvolvimento profissional. Cada proposta tem público, componentes e apoios próprios, que podem ser consultados nas páginas das soluções.",
      "Este registro é uma síntese editorial do catálogo e do publieditorial publicado pelo Estúdio O POVO em 7 de novembro de 2025. As informações institucionais são declarações da editora nessa publicação.",
    ],
    sourceUrl:
      "https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html",
    sourceLabel:
      "Estúdio O POVO · publieditorial de 7/11/2025 e catálogo comemorativo",
    sourcePages: [1, 2, 4, 5, 10, 11],
  },
  {
    slug: "acompanhamento-palhano-2010",
    title: "Acompanhamento pedagógico perto de quem aprende",
    date: "2010",
    dateLabel: "2010 · registro histórico",
    type: "Memória pedagógica",
    excerpt:
      "Um registro de Palhano, no Ceará, integra a memória do projeto Lendo Você Fica Sabendo.",
    image: "/images/palhano-2010.webp",
    imageAlt:
      "Professora e estudantes durante acompanhamento pedagógico do projeto em Palhano, em 2010.",
    imageCaption:
      "Professora Daniela Macambira durante acompanhamento do projeto com estudantes do 2º ano, Palhano (CE), 2010. Catálogo de 2025, p. 2.",
    paragraphs: [
      "A imagem preservada no catálogo de 2025 registra a professora Daniela Macambira durante um acompanhamento do projeto Lendo Você Fica Sabendo com estudantes do 2º ano. A atividade aconteceu no município de Palhano, no Ceará, em 2010.",
      "O registro pertence ao período de 2008 a 2013, quando a Aprender atuou no eixo de alfabetização do Programa Alfabetização na Idade Certa (PAIC), do Governo do Ceará. Segundo o catálogo, essa participação reuniu ações com estudantes, formação de professores e coordenadores, acompanhamento em sala e avaliações.",
      "A fotografia integra o arquivo institucional republicado na edição comemorativa. A fonte informa o ano do registro, sem especificar dia ou mês.",
    ],
    sourceUrl: `${catalogueUrl}#page=2`,
    sourceLabel: "Catálogo Aprender Editora 2025 · páginas 2 e 6",
    sourcePages: [2, 6],
  },
  {
    slug: "brincando-com-as-fichas-novo-oriente-2011",
    title: "Leitura e brincadeira em uma memória de sala de aula",
    date: "2011",
    dateLabel: "2011 · registro histórico",
    type: "Memória pedagógica",
    excerpt:
      "Em Novo Oriente, estudantes do 2º ano participam de uma atividade do projeto Lendo Você Fica Sabendo.",
    image: "/images/novo-oriente-2011.webp",
    imageAlt:
      "Estudantes do 2º ano jogando Brincando com as fichas em Novo Oriente, em 2011.",
    imageCaption:
      "Estudantes do 2º ano no jogo Brincando com as fichas, Novo Oriente (CE), 2011. Catálogo de 2025, p. 22.",
    paragraphs: [
      "Em uma das fotografias do catálogo comemorativo, estudantes do 2º ano participam do jogo Brincando com as fichas, integrante da coleção Lendo Você Fica Sabendo. O registro foi realizado em Novo Oriente, no Ceará, em 2011.",
      "A imagem faz parte do conjunto de memórias de sala de aula reunidas pela editora em 2025. Ela documenta o uso de um material do projeto naquele período; a apresentação atual da coleção Novo Lendo Você Fica Sabendo está nas páginas 24 e 25 do mesmo catálogo.",
      "O registro é histórico. Sua legenda original identifica a atividade, o município e o ano, sem informar dia ou mês.",
    ],
    sourceUrl: `${catalogueUrl}#page=22`,
    sourceLabel: "Catálogo Aprender Editora 2025 · páginas 22, 24 e 25",
    sourcePages: [22, 24, 25],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
