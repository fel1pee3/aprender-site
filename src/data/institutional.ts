import { catalogueUrl } from './editorial';

export const institutionalCheckedAt = '2026-10-14';
const official = 'https://www.aprendereditora.com.br/';
const missionSource = `${official}missao-principios-e-valores`;
const paicSource = `${official}paic`;
const formationSource = `${official}aprender-em-acao`;
export const inepSobralUrl = 'https://download.inep.gov.br/publicacoes/diversas/boas_praticas_em_educacao/vencendo_o_desafio_da_aprendizagem_nas_series_iniciais_a_experiencia_de_sobral_ce.pdf';

export const missionVersions = [
  {
    id: 'missao-catalogo-2025', title: 'Missão · catálogo de 2025', edition: 'Catálogo institucional de 2025, página 1', sourceUrl: catalogueUrl,
    text: 'Promover as aprendizagens através do acesso a materiais didáticos semiestruturados que impulsionam a educação de crianças e estudantes, aperfeiçoam as práticas pedagógicas, promovem a cultura e valorizam a formação contínua de educadores como estratégias capazes de garantir direitos, reduzir desigualdades e construir uma sociedade mais justa, democrática e inclusiva.',
    note: 'Redação institucional da edição de 2025.',
  },
  {
    id: 'missao-site', title: 'Missão · apresentação do site institucional', edition: 'Página sem data de edição', sourceUrl: missionSource,
    text: 'Desenvolver e aperfeiçoar iniciativas educacionais em sintonia com as transformações sociais. Atuar de maneira proativa na formação de educadores orientados por valores humanistas, pela ética e pela democracia.',
    note: 'Síntese fiel da versão publicada no site. Sua redação difere da apresentada no catálogo de 2025; a fonte original permanece acessível.',
  },
];

// Redação integral dos sete valores: catálogo de 2025 fornecido pelo usuário, p. 1.
export const institutionalValues = [
  { id: 'etica', title: 'Ética', description: 'Trabalhar com integridade, tolerância, profissionalismo, bom-senso e transparência, apoiando nossas ações na honestidade e no respeito a políticas e procedimentos definidos pela empresa, regulamentados pela lei e pela sociedade.', historicalDescription: 'No site, a ética também é vinculada à justiça social e ao respeito aos valores morais.' },
  { id: 'inovacao', title: 'Inovação', description: 'Conquistar e manter em nossas equipes profissionais talentosos e criativos, estimulando a capacidade relacional e intelectual, liderando o uso de tecnologias de ponta e antecipando-se ao lançamento de pesquisas, produtos e serviços.', historicalDescription: 'A versão do site enfatiza pesquisas educacionais, novas tecnologias e o estímulo às capacidades criativa, intelectual e relacional.' },
  { id: 'qualidade', title: 'Qualidade', description: 'Oferecer, continuamente, alto padrão de qualidade em produtos e serviços que superem as necessidades presentes e futuras dos nossos clientes, buscando persistentemente a excelência.', historicalDescription: 'O site destaca assertividade, atendimento às necessidades dos clientes e superação das expectativas do mercado.' },
  { id: 'integracao', title: 'Integração', description: 'Desenvolver visão sistêmica nas equipes, mantendo, com os parceiros e demais servidores da empresa, o espírito de colaboração indispensável à eficiência do processo social e educativo; e compartilhar ações e responsabilidades para o alcance de metas e objetivos comuns.', historicalDescription: 'A apresentação do site mantém colaboração, visão sistêmica e divisão de responsabilidades para objetivos compartilhados.' },
  { id: 'humanizacao', title: 'Humanização', description: 'Estimular o desenvolvimento inter-relacional dos nossos colaboradores internos e externos, praticando a justiça, construindo e mantendo relações dignas, leais e respeitosas no mercado de trabalho.', historicalDescription: 'No site, aparecem ainda solidariedade, cidadania e igualdade nas relações sociais e profissionais.' },
  { id: 'responsabilidade-social', title: 'Responsabilidade Social', description: 'Compromisso integral com a educação, contribuindo para o pleno exercício da cidadania e a melhoria da qualidade de vida da sociedade.', historicalDescription: 'A versão do site relaciona a educação ao exercício da cidadania e à qualidade de vida.' },
  { id: 'responsabilidade-profissional', title: 'Responsabilidade Profissional', description: 'Exercer, continuamente, excelência no desempenho das funções atribuídas, prezando as relações pessoais e as diretrizes traçadas pela empresa.', historicalDescription: 'O site acrescenta cuidado com o funcionamento da empresa e valorização das boas atitudes.' },
].map((value) => ({ ...value, sourceUrl: catalogueUrl, edition: 'Catálogo 2025, página 1', historicalSourceUrl: missionSource }));

export const team = {
  intro: 'Desde 2005, a Aprender Editora produz, edita e publica materiais didáticos associados à formação contínua de educadores. Sua equipe reúne profissionais especializados na Educação Infantil e no Ensino Fundamental.',
  specializations: ['Educação Infantil', 'Ensino Fundamental', 'Alfabetização e letramento', 'Formação de educadores'],
  approach: [
    'A produção editorial se articula à formação, à avaliação e ao acompanhamento em sala. O material semiestruturado explicita objetivos de aprendizagem e oferece referências para organizar a rotina pedagógica.',
    'O trabalho integra planejar, ensinar, observar, intervir e avaliar. Os encontros formativos relacionam teoria e prática, enquanto o acompanhamento ajuda a interpretar as necessidades dos estudantes e a ajustar as intervenções.',
    'A apresentação institucional relaciona a atualização de produtos e metodologias às transformações educacionais e ao desenvolvimento profissional de educadores orientados por princípios humanistas, éticos e democráticos.',
  ],
  sourceUrl: `${official}quem-somos`, references: [catalogueUrl, `${official}trajetorias-lendo-voce-fica-sabendo`],
};

export const timeline = [
  {
    id: 'sobral-2000', period: '2000 · antes da fundação da editora', title: 'O diagnóstico da leitura em Sobral',
    paragraphs: ['A trajetória publicada pela Aprender começa com uma avaliação de leitura em Sobral, no Ceará. O site informa que participaram 75% dos estudantes da então 2ª série; 48% das crianças avaliadas não dominavam as habilidades de leitura.', 'Naquele ano, uma avaliação da Fundação Carlos Chagas, ligada ao Programa Acelera Brasil, do Instituto Ayrton Senna, reuniu estudantes de 1ª e 4ª séries de 52 municípios. Segundo a narrativa institucional, Sobral ficou na penúltima posição. Esses dados motivaram uma política municipal centrada na aprendizagem e na alfabetização inicial.'],
    sourceUrl: `${official}trajetoria`,
  },
  {
    id: 'equipe-edgar', period: 'Início dos anos 2000 · experiência municipal', title: 'Uma política pública e uma equipe de educadoras',
    paragraphs: ['A Secretaria da Educação de Sobral organizou um conjunto de ações sistêmicas. Uma equipe externa de educadoras, coordenada pelo professor Edgar Linhares, participou da mudança das práticas de alfabetização de crianças de seis e sete anos.', 'O trabalho envolveu formação contínua dos professores alfabetizadores, novas rotinas de aula, elaboração de matrizes com tarefas de leitura e escrita e produção dos insumos necessários às atividades. A equipe desenvolveu instrumentos de avaliação, acompanhou indicadores das escolas e realizou visitas para observar a prática pedagógica.', 'Essa experiência antecede a fundação da editora. Os resultados pertencem ao trabalho coletivo da rede municipal, de seus gestores, professores, estudantes e parceiros.'],
    sourceUrl: catalogueUrl,
  },
  {
    id: 'fundacao-2005', period: '2005', title: 'Nasce a Aprender Editora',
    paragraphs: ['O interesse de outros municípios pela experiência de alfabetização deu origem à Aprender Editora e ao Projeto Lendo Você Fica Sabendo — Letramento e Alfabetização. A empresa nasceu em Fortaleza e passou a associar produção de materiais à formação e ao acompanhamento pedagógico.', 'O INEP publicou, no mesmo ano, Vencendo o desafio da aprendizagem nas séries iniciais: a experiência de Sobral/CE, primeiro volume da série Projeto Boas Práticas na Educação. O livro documenta a política municipal; não é uma certificação comercial da editora.'],
    sourceUrl: catalogueUrl,
  },
  {
    id: 'fecop-2006', period: '2006', title: 'Alfabetização em municípios de menor IDH',
    paragraphs: ['O catálogo de 2025 registra um projeto de alfabetização desenvolvido por meio do FECOP em 12 municípios cearenses com os menores índices de desenvolvimento humano do Estado.'],
    sourceUrl: catalogueUrl,
  },
  {
    id: 'paic-2007', period: '2007', title: 'O PAIC torna-se política pública estadual',
    paragraphs: ['O Governo do Ceará, por meio da Secretaria da Educação, assumiu a execução do Programa Alfabetização na Idade Certa, em parceria com UNDIME/CE, UFC e UNICEF. O programa é uma política pública, com participação de diferentes instituições e das redes municipais.'],
    sourceUrl: catalogueUrl,
  },
  {
    id: 'paic-2008-2013', period: '2008–2013', title: 'Participação da Aprender no eixo de alfabetização',
    paragraphs: ['Com o Projeto Lendo Você Fica Sabendo, a Aprender participou do eixo de alfabetização do PAIC. O catálogo descreve materiais para estudantes, formação de professores, coordenadores e equipes técnicas, acompanhamento em salas de aula e avaliações.', 'A publicação de 2025 declara que a participação alcançou mais de 60% dos estudantes e professores de 2º ano dos municípios cearenses naquele contexto. A série de atendimentos da editora pode ser consultada separadamente dos indicadores gerais do Estado.'],
    sourceUrl: catalogueUrl,
  },
  {
    id: 'aquisicao-2014', period: 'A partir de 2014', title: 'Mudança na aquisição dos materiais',
    paragraphs: ['A página histórica do PAIC informa que os municípios passaram a comprar os materiais com recursos próprios, em vez de recebê-los por intermédio da SEDUC. O site preserva os atendimentos registrados até 2018; essa mudança deve ser considerada na leitura da série.'],
    sourceUrl: paicSource,
  },
  {
    id: 'vinte-anos-2025', period: '2025', title: 'Vinte anos de atuação editorial',
    paragraphs: ['O catálogo comemorativo reúne a trajetória, as coleções e os indicadores acumulados declarados pela editora. Ele amplia o registro de soluções e de resultados históricos, sem substituir os materiais e as apresentações anteriores preservados no acervo.'],
    sourceUrl: catalogueUrl,
  },
];

export const edgar = {
  title: 'Professor Edgar Linhares Lima', image: '/images/archive/edgar-linhares.webp',
  paragraphs: [
    'A apresentação da Aprender homenageia Edgar Linhares como educador e formulador de políticas públicas ligado à reorganização da alfabetização em Sobral e às origens do PAIC. A equipe de educadoras coordenada por ele integra a história que antecede a fundação da editora.',
    'Natural de Santa Quitéria, no Ceará, formou-se em Letras pela UECE e em Direito pela UFC. O Conselho Estadual de Educação registra especialização em Planejamento Educacional e mestrado em Psicologia da Educação, além de mais de seis décadas de magistério.',
    'Dirigiu escolas no Piauí, São Paulo, Brasília e Ceará. Atuou na assessoria da Secretaria Geral do MEC entre 1979 e 1986 e no planejamento da Secretaria de Apoio do Ministério entre 1984 e 1986. Também chefiou a assessoria técnica da educação cearense em 1963–1964.',
    'Membro do Conselho Estadual de Educação desde 1987, exerceu a presidência das câmaras de 2º Grau e de Educação Infantil e Ensino Fundamental. A biografia do CEE registra mandatos na presidência do Conselho entre 2007–2011 e 2011–2015.',
    'Em uma homenagem publicada pelo Governo do Ceará em 2019, é reconhecido como especialista em leitura que participou da definição da avaliação externa aplicada em Sobral no ano 2000 e da implantação de uma metodologia voltada à leitura e à escrita. A mesma fonte registra a inauguração da escola municipal que leva seu nome.',
  ],
  references: [
    { title: 'Apresentação de Edgar Linhares no site da Aprender', url: `${official}trajetorias-prof-edgar` },
    { title: 'Biografia no Conselho Estadual de Educação · 2018', url: 'https://www.ce.gov.br/cee/secretario/ana-maria-nogueira-moreira/' },
    { title: 'Homenagem do Governo do Ceará · 2019', url: 'https://www.ce.gov.br/vicegov/2019/01/22/tempo-integral-vice-governadora-inaugura-escola-professor-edgar-linhares-em-sobral/' },
    { title: 'INEP · A experiência de Sobral/CE · 2005 · PDF', url: inepSobralUrl },
  ],
};

export const formationAxes = [
  { id: 'pratica', title: 'Prática', description: 'Vivenciar propostas dos materiais e examinar sua realização nas situações de ensino.' },
  { id: 'teoria', title: 'Teoria', description: 'Estudar os conceitos e fundamentos científicos que sustentam as escolhas pedagógicas.' },
  { id: 'planejamento', title: 'Planejamento', description: 'Organizar a rotina, os objetivos e as atividades de acordo com as aprendizagens esperadas.' },
  { id: 'gestao-sala', title: 'Gestão da sala de aula', description: 'Refletir sobre a organização do trabalho docente e sobre as necessidades observadas nas turmas.' },
  { id: 'avaliacao', title: 'Avaliação e acompanhamento da aprendizagem', description: 'Analisar instrumentos e resultados para planejar intervenções e acompanhar a leitura e a escrita.' },
].map((item) => ({ ...item, sourceUrl: `${official}trajetorias-lendo-voce-fica-sabendo` }));

export const formationFoundation = {
  sourceUrl: `${official}trajetorias-lendo-voce-fica-sabendo`,
  edition: 'Apresentação institucional sem data de edição',
  paragraphs: [
    'O Projeto Lendo Você Fica Sabendo associa a formação contínua de educadores à coleção Novo Lendo Você Fica Sabendo — Letramento e Alfabetização, destinada ao 1º e ao 2º ano. Integra Língua Portuguesa à alfabetização, com leitura, escrita, produção de textos, oralidade e análise linguística.',
    'A apresentação explica o material semiestruturado como um conjunto diversificado de recursos para professores e estudantes. As atividades articulam o tempo pedagógico à rotina de sala e às tarefas de casa, com objetivos e conceitos explícitos para quem ensina e quem aprende.',
    'A formação ocorre ao longo do ano de execução do projeto. Os educadores vivenciam atividades dos livros, estudam teorias e conceitos e discutem situações de ensino na sala, na escola e na comunidade. Leitura, escrita, oralidade, alfabetização, literatura infantil, avaliação, gestão e planejamento integram o estudo.',
    'Os cinco eixos relacionam pesquisas científicas, relatos de sala, expectativas de aprendizagem e análise crítica de metas. O estudo combina conhecimento teórico e prática docente para aproximar a formação das necessidades observadas nas turmas.',
    'Instrumentos de acompanhamento e avaliação apoiam a interpretação dos resultados e o planejamento de intervenções. A proposta busca desenvolver estudantes capazes de ler e escrever com autonomia e fortalecer a reflexão crítica dos educadores sobre seu trabalho.',
  ],
};

export const formationPlan = [
  { id: 'formacao-continua', title: 'Formação contínua', description: 'Encontros, estudo e planejamento para professores e coordenadores.', items: [
    'Encontros presenciais com professores e coordenadores.',
    'Práticas relacionadas aos materiais da coleção utilizada pela turma.',
    'Vivência e planejamento de atividades de sala.',
    'Orientações para monitorar aprendizagem e desenvolvimento.',
    'Estudo dos instrumentos externos de avaliação elaborados pela editora para o Ensino Fundamental.',
    'Coleta e interpretação dos resultados das avaliações.',
    'Sugestões de intervenção a partir dos resultados.',
    'Compartilhamento de práticas educativas bem-sucedidas.',
  ] },
  { id: 'equipe-gestora', title: 'Reuniões com a equipe gestora', description: 'Acompanhamento do trabalho e decisões em rede.', items: [
    'Construção e discussão de pautas de acompanhamento e monitoramento.',
    'Análise das avaliações e definição de ações para melhorar a aprendizagem.',
    'Fortalecimento da colaboração na gestão em rede.',
  ] },
  { id: 'acompanhamento-sala', title: 'Acompanhamento pedagógico em sala de aula', description: 'Observação por amostragem e devolutivas pedagógicas.', items: [
    'Visitas do formador educacional a uma amostra de salas.',
    'Observação da prática docente com livros e outros recursos.',
    'Atividades avaliativas de leitura e escrita realizadas com os estudantes.',
    'Análise dos resultados de leitura e escrita.',
    'Devolutivas e propostas de atividades ajustadas às necessidades observadas, discutidas nos encontros formativos.',
  ] },
].map((item) => ({ ...item, sourceUrl: formationSource }));

export const paic = {
  paragraphs: [
    'O PAIC é uma política pública do Governo do Ceará. A participação da Aprender reuniu materiais, formação e acompanhamento no eixo de alfabetização. Os resultados das redes dependem da atuação conjunta de gestores, educadores, estudantes e instituições.',
    'Os mapas registram a proficiência estadual no SPAECE-Alfa. Os números de atendimento ao lado deles referem-se à editora: são medidas distintas. A série não identifica quais resultados podem ser atribuídos isoladamente a um material.',
  ],
  figures: [
    { id: 'mapas-spaece-2007-2018', image: '/images/archive/mapas-paic-2007-2018.webp', alt: 'Doze mapas do Ceará, de 2007 a 2018, classificados por cinco níveis de proficiência em alfabetização. A presença do nível desejável aumenta ao longo do período.', caption: 'SPAECE-Alfa · 2007–2018. Mapas do Governo do Ceará reproduzidos no acervo institucional da Aprender. Legenda: desejável, suficiente, intermediário, alfabetização incompleta e não alfabetizado.', sourceUrl: paicSource },
    { id: 'ioeb-original-2019', image: '/images/archive/ioeb-2019.webp', alt: 'Referência histórica do IOEB 2019 e tabela com dezenove municípios cearenses; os valores estão transcritos na tabela acessível desta página.', caption: 'IOEB 2019 · quadro histórico reproduzido pela editora.', sourceUrl: paicSource },
    { id: 'banner-alfabetizacao-2007-2018', image: '/images/archive/alfabetizacao-ceara-2007-2018.webp', alt: 'Gráfico histórico do site: 35% de crianças alfabetizadas na idade certa em 2007 e 89% em 2018 no Ceará. A metodologia não é detalhada no banner.', caption: 'Home histórica · percentuais estaduais publicados no banner, preservados com sua definição original. Não equivalem aos números de atendimento da editora.', sourceUrl: `${official}v2/midia/banner/banner-top2.jpg` },
    { id: 'mapas-catalogo-2007-2013', image: '/images/archive/mapas-catalogo-2007-2013.webp', alt: 'Mapas SPAECE-Alfa de 2007 a 2013 reproduzidos no catálogo de 2025. O ponto inicial registra 39,9% de crianças alfabetizadas ao término da alfabetização em 2007.', caption: 'Catálogo 2025, página 6 · primeira parte da série de mapas, atribuída ao Governo do Ceará.', sourceUrl: catalogueUrl },
    { id: 'mapas-catalogo-2014-2023', image: '/images/archive/mapas-catalogo-2014-2023.webp', alt: 'Mapas SPAECE-Alfa de 2014, 2015, 2016, 2017, 2018, 2019, 2022 e 2023. A cor desejável torna-se predominante; a publicação registra 97,11% de crianças alfabetizadas ao término da alfabetização em 2023.', caption: 'Catálogo 2025, página 7 · continuação da série. A fonte não apresenta mapas de 2020 e 2021.', sourceUrl: catalogueUrl },
  ],
  statistics: [
    { year: 2008, municipalities: 101, students: 103000, teachers: 6500 },
    { year: 2009, municipalities: 98, students: 85680, teachers: 5700 },
    { year: 2010, municipalities: 110, students: 90039, teachers: 6200 },
    { year: 2011, municipalities: 102, students: 82037, teachers: 5472 },
    { year: 2012, municipalities: 98, students: 80200, teachers: 5326 },
    { year: 2013, municipalities: 87, students: 46342, teachers: 3097 },
    { year: 2014, municipalities: 24, students: 16306, teachers: 600 },
    { year: 2015, municipalities: 29, students: 31836, teachers: 1416 },
    { year: 2016, municipalities: 26, students: 33817, teachers: 1847 },
    { year: 2017, municipalities: 21, students: 33647, teachers: 1645 },
    { year: 2018, municipalities: 25, students: 52946, teachers: 2378 },
  ],
  catalogueStatistics: [
    { year: 2008, municipalities: 101, students: 103000, teachers: 6500 },
    { year: 2009, municipalities: 98, students: 85680, teachers: 5700 },
    { year: 2010, municipalities: 110, students: 90039, teachers: 6200 },
    { year: 2011, municipalities: 102, students: 82037, teachers: 5472 },
    { year: 2012, municipalities: 98, students: 80200, teachers: 5325 },
    { year: 2013, municipalities: 87, students: 46342, teachers: 3097 },
  ],
  ideb: [
    { year: 2005, earlyYears: 2.8, finalYears: 2.8 },
    { year: 2007, earlyYears: 3.5, finalYears: 3.3 },
    { year: 2009, earlyYears: 4.1, finalYears: 3.6 },
    { year: 2011, earlyYears: 4.7, finalYears: 3.9 },
    { year: 2013, earlyYears: 5.0, finalYears: 4.1 },
    { year: 2015, earlyYears: 5.7, finalYears: 4.5 },
    { year: 2017, earlyYears: 6.1, finalYears: 4.9 },
    { year: 2019, earlyYears: 6.3, finalYears: 5.2 },
    { year: 2021, earlyYears: 6.1, finalYears: 5.3 },
    { year: 2023, earlyYears: 6.5, finalYears: 5.4 },
  ],
  ranking2017: [
    { position: 1, municipality: 'Sobral · CE', value: 9.1 },
    { position: 2, municipality: 'Serranópolis do Iguaçu · PR', value: 8.7 },
    { position: 3, municipality: 'Deputado Irapuan Pinheiro · CE', value: 8.6 },
    { position: 4, municipality: 'Milhã · CE', value: 8.4 },
    { position: 5, municipality: 'Ararendá · CE', value: 8.3 },
  ],
  ioeb2019: [
    { municipality: 'Sobral', value: 6.6 }, { municipality: 'Jijoca de Jericoacoara', value: 6.2 },
    { municipality: 'Milhã', value: 6.1 }, { municipality: 'Coreaú', value: 6.0 },
    { municipality: 'Nova Olinda', value: 6.0 }, { municipality: 'Forquilha', value: 5.9 },
    { municipality: 'Penaforte', value: 5.8 }, { municipality: 'Catunda', value: 5.8 },
    { municipality: 'Ararendá', value: 5.8 }, { municipality: 'Brejo Santo', value: 5.8 },
    { municipality: 'Deputado Irapuan Pinheiro', value: 5.8 }, { municipality: 'Eusébio', value: 5.8 },
    { municipality: 'Itatira', value: 5.8 }, { municipality: 'Frecheirinha', value: 5.7 },
    { municipality: 'São Gonçalo do Amarante', value: 5.7 }, { municipality: 'Granja', value: 5.7 },
    { municipality: 'Cruz', value: 5.7 }, { municipality: 'Meruoca', value: 5.7 },
    { municipality: 'Quixeramobim', value: 5.7 },
  ],
  ioebContext: 'A referência histórica atribui a iniciativa do Índice de Oportunidades da Educação Brasileira ao Centro de Liderança Pública, com apoio do Instituto Península, da Fundação Lemann e da Fundação Roberto Marinho. O índice considera oportunidades educacionais e o contexto de cada município.',
  historicalHighlights: [
    'No recorte de 2017, a página institucional registra IDEB 6,1 nos anos iniciais do Ceará, acima da meta 5,1 prevista para 2021, e situa o Estado entre os cinco primeiros do país.',
    'O acervo informa que 183 dos 184 municípios cearenses superaram a meta de 2017, quatro municípios do Estado integravam as cinco primeiras posições e 82 das cem escolas públicas de melhor resultado estavam no Ceará.',
    'O quadro de IOEB 2019 reúne 19 municípios cearenses entre os 46 destacados e registra cinco nas primeiras posições. O IOEB observa oportunidades educacionais da Educação Infantil ao Ensino Médio, considerando o contexto local.',
    'O banner da home informa 35% de crianças alfabetizadas na idade certa no Ceará em 2007 e 89% em 2018. Ele não detalha metodologia. O catálogo de 2025 usa a definição de alfabetização ao término da etapa e apresenta outro recorte; as séries não foram combinadas.',
  ],
  notes: [
    'Atendimentos são declarações institucionais da editora, não totais do PAIC ou da rede estadual. Educadores podem reaparecer em anos diferentes; os valores anuais não devem ser somados como pessoas únicas.',
    'Em 2012, a imagem do site informa 5.326 educadores; o catálogo de 2025, página 7, informa 5.325. Ambas as versões são preservadas, sem inferir qual corresponde a uma revisão.',
    'A partir de 2014, a fonte registra aquisição dos materiais pelos municípios com recursos próprios, substituindo o fornecimento via SEDUC.',
    'A série de IDEB de 2005–2023 é a transcrição do catálogo de 2025, página 9. O site histórico apresenta apenas anos iniciais até 2017. Os rankings e destaques de 2017 e 2019 são registros históricos, não classificações atuais.',
    'O catálogo também apresenta mapas SPAECE-Alfa até 2023: indica 39,9% em 2007 e 97,11% em 2023 para crianças alfabetizadas ao término da alfabetização, com atribuição ao Governo do Ceará. Esses percentuais não medem exclusivamente estudantes atendidos pela Aprender.',
  ],
  references: [
    { title: 'Página histórica da Aprender e o PAIC', url: paicSource },
    { title: 'Documento institucional do PAIC · PDF', url: 'https://aprendereditora.com.br/v2/midia/kcfinder/files/PAIC.pdf' },
    { title: 'Catálogo 2025 · páginas 4–9', url: catalogueUrl },
    { title: 'INEP · experiência educacional de Sobral · 2005', url: inepSobralUrl },
  ],
};

export const institutionalIndicators = [
  { id: 'materiais-2025', value: 'Mais de 2 milhões', label: 'de estudantes utilizaram os materiais', edition: 'Catálogo 2025, página 5', sourceUrl: catalogueUrl },
  { id: 'formacao-2025', value: 'Mais de 100 mil', label: 'educadores e coordenadores passaram pelas formações', edition: 'Catálogo 2025, página 5', sourceUrl: catalogueUrl },
  { id: 'municipios-2025', value: 'Mais de 300', label: 'municípios historicamente atendidos no Brasil', edition: 'Catálogo 2025, página 5', sourceUrl: catalogueUrl },
  { id: 'alfabetizacao-2025', value: 'Mais de 1 milhão', label: 'de estudantes alfabetizados, segundo a editora', edition: 'Catálogo 2025, página 5', sourceUrl: catalogueUrl },
  { id: 'materiais-site', value: 'Mais de 1 milhão', label: 'de estudantes utilizaram os materiais', edition: 'Home institucional, sem data de edição', sourceUrl: official },
  { id: 'formacao-site', value: 'Mais de 45 mil', label: 'professores participaram das formações', edition: 'Home institucional, sem data de edição', sourceUrl: official },
  { id: 'municipios-site', value: 'Mais de 200', label: 'municípios atendidos', edition: 'Home institucional, sem data de edição', sourceUrl: official },
  { id: 'alfabetizacao-site', value: 'Mais de 600 mil', label: 'estudantes alfabetizados com os materiais, segundo a editora', edition: 'Home institucional, sem data de edição', sourceUrl: official },
  { id: 'parceiros-publieditorial-2025', value: '85', label: 'municípios parceiros mencionados no publieditorial', edition: 'Publieditorial O POVO, 7 de novembro de 2025', sourceUrl: 'https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html' },
];

export const indicatorContext = 'São declarações institucionais com definições e períodos diferentes. Uso de materiais, alfabetização e participação em formações são medidas distintas. Os 85 municípios parceiros mencionados em novembro de 2025 não equivalem ao acumulado histórico de mais de 300 municípios atendidos. Nenhum desses valores deve ser somado ou apresentado como auditoria independente.';
