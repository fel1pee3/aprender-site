import type { CollectionBook, CollectionDetail, MaterialImage } from "./collection-types";

const official = "https://www.aprendereditora.com.br";
const catalogue = "https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf";
const catalogueSupport = (hours: number, model = "híbrido", assessment = false): string[] => [
  `Atividades formativas para educadores em modelo ${model}, com carga horária anual de ${hours} h/a.`,
  "Uso da Plataforma Aprender Formar.",
  "Acompanhamento pedagógico.",
  ...(assessment ? ["Observação em sala de aula.", "Aplicação de Provinhas.", "Uso da Plataforma Aprender Avaliar.", "Sugestões de ações e atividades interventoras para a aprendizagem e o desenvolvimento dos estudantes."] : []),
];

const colorBooks: CollectionBook[] = [
  { id: "ere", title: "Eré, negra menina", audience: "Estudantes", schoolYear: "1º ano", description: "Apresenta de maneira lúdica a influência de palavras indígenas e africanas no vocabulário brasileiro.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "uana", title: "Uaná — A menina vaga-lume", audience: "Estudantes", schoolYear: "2º ano", description: "Aborda o cuidado com as pessoas e com o meio ambiente entre os povos indígenas, em uma narrativa suave e envolvente.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "bairro-do-mistura", title: "Bairro do Mistura", audience: "Estudantes", schoolYear: "3º ano", description: "Relata a ancestralidade indígena, afro-brasileira e portuguesa nas manifestações culturais de uma comunidade. Mostra o reencontro desses povos em práticas tradicionais e contemporâneas.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "samauma", title: "A História da Samaúma", audience: "Estudantes", schoolYear: "4º ano", description: "Aproxima elementos das culturas africanas e indígenas em uma história de cuidado, valorização e proteção das pessoas e do meio ambiente.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "ayvuere", title: "Ayvuerê — Alma que nunca morre", audience: "Estudantes", schoolYear: "5º ano", description: "Trata da importância da língua falada pelo povo Jenipapo Kanindé para a continuidade de sua história e de sua cultura.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "princesa-algodao", title: "A Princesa do Algodão e o Rei Nagô", audience: "Estudantes", schoolYear: "6º ano", description: "Uma princesa vive sozinha em um reino branco e distante, o Reino do Algodão. Para deixar a solidão, decide procurar outro reino onde existam cores e pessoas com quem possa se relacionar.", components: ["Livro literário"] },
  { id: "povo-invisivel", title: "O Povo Invisível", audience: "Estudantes", schoolYear: "7º ano", description: "Na busca de uma cura para a tia, uma adolescente descobre sua origem indígena e sua missão no mundo.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "baoba", title: "O Baobá", audience: "Estudantes", schoolYear: "8º ano", description: "Junto a um baobá, uma adolescente encontra outras dimensões da vida e recebe uma missão de seus ancestrais. O encontro amplia sua compreensão do mundo e incorpora novos valores ao cotidiano.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "cararu", title: "Cararu — Lugar Onde Pulsa o Coração da Terra", audience: "Estudantes", schoolYear: "9º ano", description: "Diante do caos da modernidade, uma adolescente percebe quanto está errado ao seu redor. Guiada pelas lembranças da infância e da relação com um dos avós, procura transformar essa realidade e descobre a chave de um enigma.", components: ["Livro literário", "Bloco de atividades"] },
  { id: "cor-professor", title: "Livro do Professor", audience: "Professor", description: "Reúne subsídios teóricos e metodológicos para a prática pedagógica, orientações sobre as leis e propostas que envolvem jogos e vídeos.", components: ["Orientações para os nove livros da coleção"] },
];

const writingDescription = "Situações de comunicação trabalham oralidade, leitura e escrita para a formação de leitores e escritores críticos. As atividades exploram diferentes capacidades de linguagem e gêneros orais e escritos presentes na circulação social.";
const writingGuideDescription = "Sugere interações para cada atividade do aluno, considerando a linguagem como prática social, histórica, cultural, interativa e dinâmica, e apoiando a formação dos conceitos necessários à aprendizagem.";
const readingFamily = "Orienta a família sobre o apoio à aprendizagem e à realização das tarefas, a participação em reuniões e a parceria entre família e escola.";
const readingGuide = "Referencial teórico e prático para o professor estudar, pesquisar e planejar sua prática educativa. Inclui CD com músicas e parlendas, encartes para mediar as tarefas em sala e os livros do aluno.";

const readingChildBooks: CollectionBook[] = [
  { id: "lendo-crianca-1", title: "Livro da Criança 1", audience: "Criança", ageRange: "3 anos — faixa sugerida na apresentação de acervo", description: "Tarefas organizadas em temáticas sociais contextualizadas possibilitam a interação e a comunicação por linguagens oral, corporal e escrita. As propostas relacionam-se a experiências da vida real.", components: ["Livro da Criança 1", "Dia de Supermercado, mostrado no kit", "Cards de alfabeto e algarismos"] },
  { id: "lendo-familia-1", title: "Livro da Família — kit 1", audience: "Família", ageRange: "3 anos — faixa sugerida na apresentação de acervo", description: readingFamily, components: ["Livro da Família"] },
  { id: "lendo-professor-1", title: "Guia de Orientações Didáticas do Professor 1", audience: "Professor", ageRange: "3 anos — faixa sugerida na apresentação de acervo", description: readingGuide, components: ["Guia de Orientações Didáticas do Professor 1", "CD com músicas e parlendas", "Livros do aluno", "Encartes com alfabeto, algarismos, semáforo, supermercado, transportes, imagens e obras de arte"] },
  { id: "lendo-crianca-2", title: "Livro da Criança 2 — volumes 1 e 2", audience: "Criança", ageRange: "4 anos — faixa sugerida na apresentação de acervo", description: "Propõe experiências para a criança conhecer a si e ao mundo, explorar diferentes linguagens, gêneros e formas de expressão, conviver com suportes orais e escritos e construir relações quantitativas e espaço-temporais. Inclui curiosidade, exploração, cuidado com o ambiente e manifestações culturais, em conformidade com o artigo 9º das DCNEI.", components: ["Livro da Criança 2 — volume 1", "Livro da Criança 2 — volume 2", "Cards de alfabeto e algarismos"] },
  { id: "lendo-familia-2", title: "Livro da Família — kit 2", audience: "Família", ageRange: "4 anos — faixa sugerida na apresentação de acervo", description: readingFamily, components: ["Livro da Família"] },
  { id: "lendo-professor-2", title: "Guia de Orientações Didáticas do Professor 2", audience: "Professor", ageRange: "4 anos — faixa sugerida na apresentação de acervo", description: readingGuide, components: ["Guia de Orientações Didáticas do Professor 2", "CD com músicas e parlendas", "Livros do aluno", "Encartes com alfabeto, algarismos, corpo humano, plantas, obras de arte e o Brincando com as fichas"] },
  { id: "lendo-crianca-3", title: "Livro da Criança 3 — volumes 1 e 2", audience: "Criança", ageRange: "5 anos — faixa sugerida na apresentação de acervo", description: "Dá continuidade às experiências de conhecimento de si e do mundo, exploração das linguagens e dos gêneros, expressão oral e escrita, relações quantitativas e espaço-temporais, curiosidade, cuidado ambiental e manifestações culturais propostas nas DCNEI.", components: ["Livro da Criança 3 — volume 1", "Livro da Criança 3 — volume 2", "Cards de alfabeto e algarismos"] },
  { id: "lendo-familia-3", title: "Livro da Família — kit 3", audience: "Família", ageRange: "5 anos — faixa sugerida na apresentação de acervo", description: readingFamily, components: ["Livro da Família"] },
  { id: "lendo-professor-3", title: "Guia de Orientações Didáticas do Professor 3", audience: "Professor", ageRange: "5 anos — faixa sugerida na apresentação de acervo", description: readingGuide, components: ["Guia de Orientações Didáticas do Professor 3", "CD com músicas e parlendas", "Livros do aluno", "Encartes com alfabeto, algarismos, obras de arte, economia de água, cuidado com o planeta e situações do cotidiano"] },
];

const acertaGuideDescription = "Apoia a prática docente, as estratégias de ensino e o uso do material. Explica o SAEB e a relação entre ensino e aprendizagem, orienta o planejamento das atividades e a aplicação das provas, identifica os descritores de cada questão e oferece fichas de compilação dos resultados. Orienta decisões pedagógicas a partir dos avanços e dificuldades dos alunos e sugere intervenções específicas.";
const acertaSupplement = "Reúne itens de documentos oficiais usados em avaliações externas nacionais e estaduais. Amplia as possibilidades de atividades voltadas às habilidades exigidas nessas avaliações.";
const acertaTests = "Provas de configuração semelhante à do SAEB oferecem experiência com esse tipo de avaliação. Ajudam a acompanhar a aprendizagem e a orientar intervenções ao longo do ensino, tendo como referência as habilidades descritas na matriz de referência.";

const brincarFoundation = [
  "A coleção se destina à creche e à pré-escola, buscando uma aprendizagem significativa na qual a criança constrói conhecimentos e amplia sua compreensão do mundo.",
  "Fundamenta-se em pressupostos construtivistas e nos documentos oficiais da Educação Infantil. Suas atividades promovem o desenvolvimento integral ao brincar, refletir, falar, argumentar, ajudar e receber ajuda dos colegas e do professor.",
];

const brincarHistoricalBooks: CollectionBook[] = [1, 2, 3, 4].flatMap((volume) => [
  { id: `brincar-historico-crianca-${volume}`, title: `Livro da Criança ${volume}`, audience: "Criança", ageRange: `${volume + 1} anos — faixa sugerida no site oficial`, description: "Apresenta 90 atividades organizadas em unidades e temas geradores ligados aos interesses das crianças e à etapa de desenvolvimento. Inclui cards para atividades lúdicas.", components: [`Livro da Criança ${volume} — 90 atividades`, "Cards para atividades lúdicas", ...(volume === 1 ? ["Eu Sou Assim, mostrado no kit"] : volume === 2 ? ["Tudo Tem Um Nome, mostrado no kit"] : [])] },
  { id: `brincar-historico-professor-${volume}`, title: `Guia do Professor ${volume}`, audience: "Professor", ageRange: `${volume + 1} anos — faixa sugerida no site oficial`, description: "Referencial teórico e prático da coleção com orientações e sugestões para o cotidiano da sala de aula. Os encartes enriquecem a prática pedagógica e o kit inclui os livros do aluno.", components: [`Guia do Professor ${volume}`, "CD de músicas", "Livros do aluno", `Encartes ${volume} — alfabeto, algarismos e textos para atividades em sala`] },
]);

const brincarNewBooks: CollectionBook[] = [
  { volume: 1, childPages: 120, familyPages: 48, guidePages: 148, posters: 5 },
  { volume: 2, childPages: 108, familyPages: 48, guidePages: 168, posters: 5 },
  { volume: 3, childPages: 260, familyPages: 52, guidePages: 220, posters: 10 },
  { volume: 4, childPages: 228, familyPages: 52, guidePages: 168, posters: 10 },
].flatMap(({ volume, childPages, familyPages, guidePages, posters }) => [
  { id: `brincar-novo-crianca-${volume}`, title: `Brincando e Aprendendo ${volume} — ${volume <= 2 ? "Livro Pasta de Atividades" : "Livro de Atividades"}`, audience: "Criança", ageRange: `A partir de ${volume + 1} anos — apresentação do site oficial`, pages: childPages, description: "Material de atividades para a creche ou a pré-escola, apresentado nesta versão do site oficial.", components: [`${volume <= 2 ? "Livro Pasta de Atividades" : "Livro de Atividades"} — ${childPages} páginas`] },
  { id: `brincar-novo-familia-${volume}`, title: `Livro da Família — Brincando e Aprendendo ${volume}`, audience: "Família", ageRange: `A partir de ${volume + 1} anos`, pages: familyPages, description: "Livro da Família incluído na composição desta versão do kit.", components: [`Livro da Família — ${familyPages} páginas`] },
  { id: `brincar-novo-cards-${volume}`, title: `Cards Alfabeto e Algarismos — kit ${volume}`, audience: "Criança e professor", quantity: 40, description: "Conjunto de cards de letras e algarismos mostrado na apresentação desta versão.", components: ["40 cards de alfabeto e algarismos"] },
  { id: `brincar-novo-guia-${volume}`, title: `Guia do Professor — Brincando e Aprendendo ${volume}`, audience: "Professor", pages: guidePages, description: "Guia de Orientações Didáticas do Professor, com a extensão informada nesta versão do site oficial.", components: [`Guia do Professor — ${guidePages} páginas`] },
  { id: `brincar-novo-cartazes-${volume}`, title: `Cartazes — Brincando e Aprendendo ${volume}`, audience: "Professor", quantity: posters, description: "Cartazes com textos para exploração em sala de aula.", components: [`${posters} cartazes`] },
  { id: `brincar-novo-cards-a3-${volume}`, title: `Cards A3 — Brincando e Aprendendo ${volume}`, audience: "Professor", quantity: 2, description: "Dois cards no formato A3 com alfabeto e algarismos.", components: ["2 cards A3"] },
]);

const brincarCatalogueBooks: CollectionBook[] = [1, 2, 3, 4, 5].flatMap((volume) => [
  { id: `brincar-2025-crianca-${volume}`, title: `Brincando e Aprendendo ${volume} — ${volume <= 3 ? "Livro Pasta de Atividades" : "Livro de Atividades"}`, audience: "Criança", description: volume === 1 ? "Variante apresentada no catálogo de 2025 com selo de lançamento para 2026. Inclui recursos de registro e fascículos Cuidados, Estímulos e Interação, ilustrados na composição do kit." : "Atividades de Educação Infantil apresentadas no catálogo de 2025, articuladas a interações e brincadeiras.", components: [`${volume <= 3 ? "Livro Pasta de Atividades" : "Livro de Atividades"}`, ...(volume === 1 ? ["Caderno de Registros", "Fascículo Cuidados, Estímulos e Interação — partes 1 e 2 mostradas na arte"] : [])] },
  { id: `brincar-2025-familia-${volume}`, title: `Livro da Família — kit ${volume} do catálogo de 2025`, audience: "Família", description: "Livro da Família mostrado na composição do kit desta edição.", components: ["Livro da Família"] },
  { id: `brincar-2025-professor-${volume}`, title: `Guia de Orientações do Professor ${volume}`, audience: "Professor", description: "Guia de orientações e cartazes apresentados no catálogo de 2025 para o planejamento e a mediação das atividades.", components: [`Guia de Orientações do Professor ${volume}`, "Cartazes com textos, alfabeto e algarismos mostrados na arte"] },
]);

const novoStudentDescription = "Tarefas de sala de aula, adequadas ao ano, organizadas em temas relacionados a questões sociais. Estimulam posições críticas e reflexivas sobre a atuação coletiva e individual dos sujeitos em interação. Apoiam a organização, a discussão e a realização de atividades orientadas pelo professor.";
const novoGuideDescription = "Referencial teórico e prático para compreender e refletir criticamente sobre o uso da coleção. Inclui CD de músicas, os livros do aluno e encartes como recursos de leitura, escrita e aproximação com o universo artístico.";
const novoOfficialBooks: CollectionBook[] = [1, 2].flatMap((year) => [
  { id: `novo-aluno-${year}`, title: `Livro do Aluno — ${year}º ano — volumes 1 e 2`, audience: "Estudante", schoolYear: `${year}º ano`, description: novoStudentDescription, components: ["Livro do Aluno — volume 1", "Livro do Aluno — volume 2"] },
  { id: `novo-casa-${year}`, title: `Tarefas de Casa — ${year}º ano`, audience: "Estudante", schoolYear: `${year}º ano`, description: "Tarefas para realizar em casa retomam os temas do Livro do Aluno, ampliando a interação com os conteúdos trabalhados em sala de aula.", components: ["Tarefas de Casa — volume único, conforme a capa do site oficial"] },
  { id: `novo-familia-${year}`, title: `Livro da Família — ${year}º ano`, audience: "Família", schoolYear: `${year}º ano`, description: "Dicas e sugestões para a aprendizagem dentro e fora da escola, fortalecendo a relação entre família e escola.", components: ["Livro da Família"] },
  { id: `novo-guia-${year}`, title: `Guia de Orientações Didáticas do Professor — ${year}º ano`, audience: "Professor", schoolYear: `${year}º ano`, description: novoGuideDescription, components: ["Guia de Orientações Didáticas do Professor", "CD com músicas", "Livros do aluno", "Encartes com gêneros escritos, alfabeto, algarismos e obras de arte"] },
  { id: `novo-jogos-${year}`, title: year === 1 ? "Brincando com o Alfabeto" : "Brincando com as Palavras", audience: "Professor e estudantes", schoolYear: `${year}º ano`, description: "Sugestões de jogos pedagógicos a partir das letras. O caráter lúdico apoia a construção e a apropriação dos conhecimentos iniciais necessários para se tornar leitor e escritor de textos.", components: [year === 1 ? "Brincando com o Alfabeto" : "Brincando com as Palavras"] },
]);

const temaOfficialBooks: CollectionBook[] = [1, 2, 3].flatMap((level) => [
  { id: `tema-sala-${level}`, title: `Livro do Aluno Sala ${level} — volumes 1 e 2`, audience: "Estudante", schoolYear: "3º, 4º e 5º anos — conforme necessidades de alfabetização", description: "Apresenta 60 tarefas para realizar em sala de aula, elaboradas para desenvolver habilidades de alfabetização em contextos de letramento. Acompanha cards de letras e sílabas móveis.", components: [`Livro do Aluno Sala ${level} — volume 1`, `Livro do Aluno Sala ${level} — volume 2`, "60 tarefas de sala de aula", "Cards de letras e sílabas móveis"] },
  { id: `tema-casa-${level}`, title: `Livro do Aluno Casa ${level} — volumes 1 e 2`, audience: "Estudante", schoolYear: "3º, 4º e 5º anos — conforme necessidades de alfabetização", description: "Apresenta 30 tarefas para realizar em casa, ampliando a interação com conteúdos trabalhados na sala de aula.", components: [`Livro do Aluno Casa ${level} — volume 1`, `Livro do Aluno Casa ${level} — volume 2`, "30 tarefas de casa"] },
  { id: `tema-guia-${level}`, title: `Guia de Orientações Didáticas do Professor ${level}`, audience: "Professor", description: "Reúne fundamentos teóricos e metodológicos, sugestões de planejamento e instrumentos de avaliação e acompanhamento para orientar a prática do professor. O kit também inclui os livros do aluno.", components: [`Guia de Orientações Didáticas do Professor ${level}`, "Instrumentos de avaliação e acompanhamento", "Livros do aluno", `Encartes ${level} — cartazes com os principais gêneros trabalhados na coleção`] },
]);

export const primaryCollectionDetails: Record<string, CollectionDetail> = {
  "brincando-e-aprendendo": {
    slug: "brincando-e-aprendendo",
    intro: ["Brincando e Aprendendo organiza atividades de creche e pré-escola. Conheça a composição de 2025 e duas apresentações de acervo, sem data de edição, com seus respectivos kits e públicos."],
    editions: [
      { id: "oficial-historico", label: "Apresentação com quatro kits · 90 atividades · sem data de edição", sourceUrl: `${official}/brincando-e-aprendendo`, audience: "Crianças de creche e pré-escola e professores. Faixas sugeridas: 2, 3, 4 e 5 anos.", context: "Apresentação sem data de edição, mantida como acervo. Os quatro livros da criança têm 90 atividades. Essa quantidade não é aplicada às outras versões da coleção.", foundation: brincarFoundation, books: brincarHistoricalBooks, support: [] },
      { id: "oficial-novo", label: "Apresentação com quatro kits · páginas e recursos · sem data de edição", sourceUrl: `${official}/brincando-e-aprendendo-novo`, audience: "Crianças a partir de 2, 3, 4 e 5 anos, famílias e professores.", context: "A página publica números de páginas e quantidades específicas para quatro kits. Esses dados descrevem somente esta apresentação sem data de edição; o catálogo de 2025 mostra cinco variantes e um lançamento anunciado para 2026.", foundation: brincarFoundation, books: brincarNewBooks, support: ["Plataforma Aprender Formar.", "Formação de professores e coordenadores.", "Atividades complementares.", "Acompanhamento pedagógico em salas de aula."] },
      { id: "catalogo-2025", label: "Catálogo institucional de 2025 — cinco variantes e lançamento anunciado para 2026", sourceUrl: catalogue, sourcePages: [14, 15], audience: "Bebês, crianças bem pequenas, crianças pequenas e educadores.", context: "Brincando e Aprendendo 1 aparece com o selo Lançamento 2026 no catálogo de 2025. A inclusão dessa variante reorganiza a numeração em relação às apresentações com quatro kits do site oficial. As faixas etárias e as extensões publicadas para os kits históricos não são transferidas automaticamente a esta edição.", foundation: ["Material didático semiestruturado de orientação construtivista, alinhado aos documentos oficiais da Educação Infantil.", "Interações e brincadeiras articulam-se aos campos de experiências e aos direitos de aprendizagem. As atividades procuram criar aprendizagens prazerosas e intencionais e intervenções diversificadas, criativas e desafiadoras para o desenvolvimento de habilidades e conhecimentos."], books: brincarCatalogueBooks, support: [...catalogueSupport(40), "Observação em sala de aula."] },
    ],
    gallery: [],
  },
  "novo-lendo-voce-fica-sabendo": {
    slug: "novo-lendo-voce-fica-sabendo",
    intro: ["Novo Lendo Você Fica Sabendo — Letramento e Alfabetização reúne propostas de oralidade, leitura e escrita para o 1º e o 2º ano, com materiais de sala, casa, família e professor."],
    editions: [
      { id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/novo-lendo-voce-fica-sabendo`, audience: "Estudantes, famílias e professores de 1º e 2º anos do Ensino Fundamental.", context: "Apresentação de acervo para 1º e 2º anos, sem data de edição.", foundation: ["Fundamenta-se na Teoria da Atividade Sócio-Histórico-Cultural. A linguagem é entendida como processo social e discursivo em situações de oralidade, leitura e escrita dentro e fora da escola.", "O material contribui para o protagonismo dos alunos nas ações e para a aprendizagem no cotidiano escolar."], books: novoOfficialBooks, support: [] },
      { id: "catalogo-2025", label: "Catálogo institucional de 2025", sourceUrl: catalogue, sourcePages: [24, 25], audience: "Estudantes e educadores de 1º e 2º anos do Ensino Fundamental.", foundation: ["Material didático semiestruturado embasado na teoria da atividade sócio-histórico-cultural para o desenvolvimento da leitura e da escrita, articulando alfabetização e letramento.", "Reflexões e práticas sistemáticas relacionam a perspectiva discursiva aos gêneros orais e escritos. Estratégias intencionais apoiam a compreensão do Sistema de Escrita Alfabético (SEA) e o conhecimento da língua."], books: [1, 2].map((year) => ({ id: `novo-2025-${year}`, title: `Novo Lendo Você Fica Sabendo ${year}`, audience: "Estudante, família e professor", schoolYear: `${year}º ano`, description: "Composição do kit mostrada no catálogo institucional de 2025.", components: ["Livro de Atividades — volume 1", "Livro de Atividades — volume 2", "Tarefas de Casa", "Livro da Família", "Guia de Orientações", year === 1 ? "Brincando com o Alfabeto" : "Brincando com as Palavras", "Cartazes"] })), support: catalogueSupport(40, "híbrido", true) },
    ],
    gallery: [],
  },
  "projeto-tema": {
    slug: "projeto-tema",
    intro: ["Projeto TEMA — Tempo de Mais Aprender: Letramento e Alfabetização Linguística se destina a estudantes do 3º, 4º e 5º ano que ainda precisam consolidar o processo de alfabetização."],
    editions: [
      { id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/projeto-tema`, audience: "Estudantes de 3º, 4º e 5º anos ainda não alfabetizados e professores.", foundation: ["A proposta busca concluir a alfabetização dos estudantes que não aprenderam a ler e escrever no 1º e no 2º ano.", "Alfabetização e letramento são entendidos como processos interdependentes e indissociáveis. O letramento contextualiza o ensino sistemático das habilidades iniciais necessárias à compreensão do Sistema de Escrita Alfabética (SEA)."], books: temaOfficialBooks, support: [] },
      { id: "catalogo-2025", label: "Catálogo institucional de 2025", sourceUrl: catalogue, sourcePages: [28, 29], audience: "Estudantes, educadores e coordenadores de 3º, 4º e 5º anos do Ensino Fundamental.", foundation: ["Material didático semiestruturado para estudantes que não consolidaram a alfabetização no ciclo previsto pela BNCC.", "Articula alfabetização, conhecimento linguístico e letramento em atividades contextualizadas. Situações comunicativas reais e os interesses dos estudantes dão contexto ao ensino sistemático das habilidades iniciais para compreender o SEA e ampliam o engajamento."], books: [1, 2, 3].map((level) => ({ id: `tema-2025-${level}`, title: `TEMA ${level}`, audience: "Estudante e professor", schoolYear: "3º, 4º e 5º anos — conforme necessidades de alfabetização", description: "Conjunto de atividades de sala e de casa e recursos de orientação mostrado no catálogo de 2025.", components: ["Livro de Atividades Sala — volume 1", "Livro de Atividades Sala — volume 2", "Livro de Atividades Casa — volume 1", "Livro de Atividades Casa — volume 2", "Guia de Orientações", "Cartazes"] })), support: catalogueSupport(40, "híbrido", true) },
    ],
    gallery: [],
  },
  "lendo-e-escrevendo": {
    slug: "lendo-e-escrevendo",
    intro: ["Lendo e Escrevendo, Volta e Meia Vamos Dar, Muitas Histórias Vamos Contar é uma proposta de Educação Infantil em três kits, com materiais para a criança, a família e o professor."],
    editions: [{ id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/lendo-e-escrevendo`, audience: "Crianças de 3, 4 e 5 anos, famílias e professores da Educação Infantil.", context: "Três kits para crianças de 3, 4 e 5 anos. Apresentação de acervo sem data de edição.", foundation: ["Fundamenta-se na Teoria da Atividade Sócio-Histórico-Cultural (TASHC): Vygotsky (1934/1993), Leontiev (1959/1988) e Engeström (2000/2005). A referência Liberali (2010, p. 19) ressalta as relações do sujeito com os outros e com o mundo, mediadas pela sociedade.", "A aprendizagem é entendida como atividade social. O engajamento em atividades diversas cria oportunidades de desenvolvimento de si, dos outros e da sociedade.", "A criança exerce um papel de protagonista ao pensar, agir, conversar, opinar e interagir com crianças, adultos e objetos. Essas interações contribuem para a construção da identidade e da personalidade."], books: readingChildBooks, support: [] }],
    gallery: [],
  },
  "escrever-comunicar-e-ser": {
    slug: "escrever-comunicar-e-ser",
    intro: ["A coleção desenvolve a produção de gêneros orais e escritos do 1º ao 5º ano, em situações comunicativas que envolvem oralidade, leitura e escrita."],
    editions: [
      { id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/escrever-comunicar-e-ser`, audience: "Estudantes e professores do 1º ao 5º ano do Ensino Fundamental.", foundation: ["A proposta se apoia na perspectiva sócio-histórico-cultural de leitura crítica. Considera o caráter dinâmico, interativo, processual, histórico, cultural e cognitivo dos gêneros.", "Cada gênero oral ou escrito tem uma identidade que orienta as escolhas de produção; essas escolhas se relacionam com a situação comunicativa."], books: [1, 2, 3, 4, 5].flatMap((year) => [{ id: `escrever-aluno-${year}`, title: `Escrever, Comunicar e Ser ${year} — Livro do Aluno`, audience: "Estudante", schoolYear: `${year}º ano`, description: writingDescription, components: [`Livro do Aluno ${year}`] }, { id: `escrever-professor-${year}`, title: `Sugestões e Orientações para o Professor ${year}`, audience: "Professor", schoolYear: `${year}º ano`, description: writingGuideDescription, components: [`Livro Sugestões e Orientações para o Professor ${year}`] }]), support: [] },
      { id: "catalogo-2025", label: "Catálogo institucional de 2025", sourceUrl: catalogue, sourcePages: [30], audience: "Estudantes e educadores do 1º ao 5º ano do Ensino Fundamental.", context: "O catálogo de 2025 mostra os cinco livros de atividades. A apresentação de acervo inclui também cinco livros Sugestões e Orientações para o Professor.", foundation: ["Material paradidático semiestruturado de uso complementar, voltado à produção textual, à oralidade e à leitura, sob a perspectiva sócio-histórico-cultural.", "Textos com temáticas de interesse dos estudantes apoiam a apropriação dos gêneros em diferentes práticas comunicativas. A produção segue etapas de planejamento, produção, revisão e edição."], books: [1, 2, 3, 4, 5].map((year) => ({ id: `escrever-2025-${year}`, title: `Livro de Atividades ${year}`, audience: "Estudante", schoolYear: `${year}º ano`, description: "Atividades de produção de gêneros orais e escritos, com planejamento, produção, revisão e edição.", components: [`Livro de Atividades ${year}`] })), support: catalogueSupport(16, "remoto") },
    ],
    gallery: [],
  },
  "acerta-brasil": {
    slug: "acerta-brasil",
    intro: ["ACerta Brasil #SuperaIDEB apresenta recursos de Língua Portuguesa e Matemática para ampliar a familiaridade com avaliações externas e apoiar o desenvolvimento das habilidades avaliadas pelo SAEB."],
    editions: [{ id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/colecao-acerta-brasil`, audience: "Estudantes e professores do 5º ano, conforme os materiais desta apresentação.", context: "A apresentação institucional destaca o desempenho no SAEB, que compõe o IDEB. O foco em avaliações externas não estabelece promessa de resultado.", foundation: ["A coleção procura orientar a prática do professor e apoiar os alunos nas dificuldades enfrentadas nas avaliações externas.", "Traz a linguagem característica dessas avaliações para as práticas de sala de aula. Trabalha o aperfeiçoamento das habilidades e a autonomia frente a desafios, por meio de estratégias de leitura e resolução de problemas."], books: [
      { id: "acerta-portugues-aluno", title: "ACerta Brasil — Língua Portuguesa 5", audience: "Estudante", schoolYear: "5º ano", description: "Reúne 30 atividades de leitura e compreensão textual, com questões objetivas e subjetivas na linguagem das avaliações externas. Os textos apresentam práticas sociocomunicativas contextualizadas e incentivam leitura, compreensão e questionamento para além das respostas.", components: ["Livro de Língua Portuguesa — 30 atividades", "Suplemento Questões Bônus", "Prova 1 — Língua Portuguesa", "Prova 2 — Língua Portuguesa", "Prova 3 — Língua Portuguesa"] },
      { id: "acerta-portugues-suplemento", title: "Suplemento Questões Bônus — Língua Portuguesa", audience: "Estudante", schoolYear: "5º ano", description: acertaSupplement, components: ["Suplemento de questões de avaliações externas nacionais e estaduais"] },
      { id: "acerta-portugues-provas", title: "Provas 1, 2 e 3 — Língua Portuguesa", audience: "Estudante", schoolYear: "5º ano", description: acertaTests, components: ["Prova 1", "Prova 2", "Prova 3"] },
      { id: "acerta-portugues-professor", title: "Guia do Professor — Língua Portuguesa 5", audience: "Professor", schoolYear: "5º ano", description: acertaGuideDescription, components: ["Guia do Professor", "Orientações de aplicação das provas", "Descritores por questão", "Fichas de compilação de resultados", "Sugestões de atividades interventoras"] },
      { id: "acerta-matematica-aluno", title: "ACerta Brasil — Matemática 5", audience: "Estudante", schoolYear: "5º ano", description: "Reúne 30 atividades que abrangem as habilidades da matriz de referência do SAEB. Problematizações, contextualizações e desafios mobilizam o pensamento lógico-matemático e a resolução de problemas. As questões diversificadas ampliam as investigações necessárias à resolução.", components: ["Livro de Matemática — 30 atividades", "Suplemento Questões Bônus", "Prova 1 — Matemática", "Prova 2 — Matemática", "Prova 3 — Matemática"] },
      { id: "acerta-matematica-suplemento", title: "Suplemento Questões Bônus — Matemática", audience: "Estudante", schoolYear: "5º ano", description: acertaSupplement, components: ["Suplemento de questões de avaliações externas nacionais e estaduais"] },
      { id: "acerta-matematica-provas", title: "Provas 1, 2 e 3 — Matemática", audience: "Estudante", schoolYear: "5º ano", description: acertaTests, components: ["Prova 1", "Prova 2", "Prova 3"] },
      { id: "acerta-matematica-professor", title: "Guia do Professor — Matemática 5", audience: "Professor", schoolYear: "5º ano", description: acertaGuideDescription, components: ["Guia do Professor", "Orientações de aplicação das provas", "Descritores por questão", "Fichas de compilação de resultados", "Sugestões de atividades interventoras"] },
    ], support: [] }],
    gallery: [],
  },
  "a-cor-da-gente": {
    slug: "a-cor-da-gente",
    intro: ["A Cor da Gente — Diversidade Histórico-Cultural na Escola reúne nove narrativas relacionadas às culturas afro-brasileiras e indígenas, destinadas aos nove anos do Ensino Fundamental."],
    editions: [
      { id: "oficial", label: "Apresentação de acervo · sem data de edição", sourceUrl: `${official}/colecao-a-cor-da-gente`, audience: "Estudantes do 1º ao 9º ano e professores do Ensino Fundamental.", foundation: ["A escola acolhe diferenças étnico-raciais e culturais que precisam ser trabalhadas em seu contexto, sem serem transformadas em desigualdades.", "O resgate dos costumes e tradições afro-brasileiros e indígenas favorece a compreensão de sua contribuição à cultura brasileira. A reflexão começa nos primeiros anos de vida escolar.", "Os livros valorizam a história e a cultura negra e indígena no currículo, com linguagem que estimula os estudantes a reconhecerem suas ancestralidades e as dos colegas de forma respeitosa."], books: colorBooks, support: [] },
      { id: "catalogo-2025", label: "Catálogo institucional de 2025", sourceUrl: catalogue, sourcePages: [50], audience: "Estudantes e educadores do 1º ao 9º ano do Ensino Fundamental.", context: "O catálogo mostra os livros numerados de 1 a 9. A apresentação de acervo reúne títulos individuais, sinopses e o Livro do Professor.", foundation: ["Material paradidático semiestruturado de uso complementar para a Educação das Relações Étnico-Raciais. Textos literários e blocos de atividades valorizam e ampliam conhecimentos sobre as culturas afro-brasileira e indígena.", "Objetos, situações e personagens dão presença à história negra e indígena no Brasil, reavivam tradições no universo escolar e promovem práticas afirmativas em um espaço diverso, inclusivo e acolhedor."], books: colorBooks.filter((book) => book.audience === "Estudantes").map((book, index) => ({ ...book, id: `cor-2025-${index + 1}`, title: `Livro ${index + 1} — ${book.title}`, description: "Texto literário da coleção, com foco na Educação para as Relações Étnico-Raciais. Consulte a sinopse individual na apresentação de acervo.", components: ["Texto literário", "Bloco de atividades, conforme a apresentação geral do catálogo de 2025"] })), support: catalogueSupport(8, "remoto") },
    ],
    gallery: [],
  },
};

const materialImage = (name: string, alt: string, caption: string, editionId: string): MaterialImage => ({
  src: `/images/materials/primary-${name}.webp`, alt, caption, editionId,
});

primaryCollectionDetails["brincando-e-aprendendo"].gallery = [
  materialImage("brincando-historico-1", "Livro da Criança 1 e Eu Sou Assim, da apresentação histórica de Brincando e Aprendendo", "Kit da criança 1 — apresentação de quatro kits com 90 atividades no site oficial.", "oficial-historico"),
  materialImage("brincando-historico-professor", "Guia do Professor 1 de Brincando e Aprendendo, com capa ilustrada", "Guia do Professor 1 — apresentação histórica do site oficial.", "oficial-historico"),
  ...[1, 2, 3, 4].map((volume) => materialImage(`brincando-novo-${volume}`, `Material da criança, Livro da Família e cards de Brincando e Aprendendo ${volume}`, `Brincando e Aprendendo ${volume} — composição com quatro kits e quantidades de recursos · sem data de edição.`, "oficial-novo")),
  materialImage("brincando-novo-recursos-1", "Guia do Professor 1, cartazes e cards A3 da segunda apresentação oficial", "Recursos do professor — apresentação com quatro kits e quantidades de recursos · sem data de edição.", "oficial-novo"),
  ...[1, 2, 3, 4, 5].map((volume) => materialImage(`brincando-2025-kit-${volume}`, `Livros e recursos de Brincando e Aprendendo ${volume} no catálogo de 2025`, `Brincando e Aprendendo ${volume} — catálogo de 2025, páginas 14–15.${volume === 1 ? " Variante anunciada como lançamento para 2026." : ""}`, "catalogo-2025")),
];

primaryCollectionDetails["lendo-e-escrevendo"].gallery = [
  ...[1, 2, 3].map((volume) => materialImage(`lendo-kit-${volume}`, `Livros da criança e da família de Lendo e Escrevendo ${volume}`, `Lendo e Escrevendo ${volume} — faixa sugerida de ${volume + 2} anos, apresentação do site oficial sem data de edição.`, "oficial")),
  materialImage("lendo-professor-1", "Guia de Orientações Didáticas do Professor 1 de Lendo e Escrevendo", "Material do professor — apresentação do site oficial.", "oficial"),
];

primaryCollectionDetails["novo-lendo-voce-fica-sabendo"].gallery = [
  ...[1, 2].flatMap((year) => [
    materialImage(`novo-lendo-aluno-${year}`, `Volumes 1 e 2, Tarefas de Casa e Livro da Família de Novo Lendo Você Fica Sabendo, ${year}º ano`, `Materiais de aluno e família do ${year}º ano — apresentação do site oficial, sem data de edição.`, "oficial"),
    materialImage(`novo-lendo-professor-${year}`, `Guia do Professor e ${year === 1 ? "Brincando com o Alfabeto" : "Brincando com as Palavras"} do ${year}º ano`, `Recursos do professor do ${year}º ano — apresentação do site oficial.`, "oficial"),
  ]),
];

primaryCollectionDetails["escrever-comunicar-e-ser"].gallery = [
  materialImage("escrever-alunos", "Cinco livros do aluno de Escrever, Comunicar e Ser, numerados de 1 a 5", "Livros do aluno de 1º a 5º ano — apresentação do site oficial.", "oficial"),
  materialImage("escrever-professores", "Cinco livros Sugestões e Orientações para o Professor, numerados de 1 a 5", "Sugestões e Orientações para o Professor de 1º a 5º ano — apresentação do site oficial.", "oficial"),
];

primaryCollectionDetails["acerta-brasil"].gallery = [
  ...(["portugues", "matematica"] as const).flatMap((subject) => {
    const label = subject === "portugues" ? "Língua Portuguesa" : "Matemática";
    return [
      materialImage(`acerta-${subject}`, `Livro do aluno e Suplemento Questões Bônus de ACerta Brasil, ${label} 5`, `${label} 5 — livro e suplemento do aluno no site oficial.`, "oficial"),
      materialImage(`acerta-${subject}-provas`, `Provas 1, 2 e 3 de ACerta Brasil, ${label} 5`, `${label} 5 — três provas do aluno no site oficial.`, "oficial"),
      materialImage(`acerta-${subject}-professor`, `Guia do Professor e livro de ACerta Brasil, ${label} 5`, `${label} 5 — recursos do professor no site oficial.`, "oficial"),
    ];
  }),
];

primaryCollectionDetails["a-cor-da-gente"].gallery = colorBooks.slice(0, 9).map((book, index) => materialImage(
  `cor-${index + 1}`, `Capa de ${book.title}, livro ${index + 1} de A Cor da Gente`,
  `${book.title} — capa publicada no catálogo de 2025, página 50. Consulte a sinopse na composição e proposta pedagógica desta coleção.`, "catalogo-2025",
));

primaryCollectionDetails["projeto-tema"].gallery = [1, 2, 3].flatMap((level) => [
  materialImage(`tema-kit-${level}`, `Livros de sala e casa do Projeto TEMA ${level}, volumes 1 e 2`, `TEMA ${level} — materiais do aluno para sala e casa, apresentação do site oficial.`, "oficial"),
  materialImage(`tema-professor-${level}`, `Guia de Orientações Didáticas do Professor ${level} do Projeto TEMA`, `TEMA ${level} — guia do professor, apresentação do site oficial.`, "oficial"),
]);
