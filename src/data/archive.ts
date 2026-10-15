export const archiveCheckedAt = '2026-10-14';
const official = 'https://www.aprendereditora.com.br/';
const banner = `${official}v2/midia/banner/`;
const gallerySource = `${official}v2/midia/kcfinder/images/Paginas3/Site-Aprender_Tela-19-Aprender_ACAO-final.jpg`;

export interface Testimonial {
  id: string; name: string; role: string; location: string; period: string;
  image: string; paragraphs: string[]; sourceUrl: string;
}

export const testimonialContext = 'Memória de depoimentos publicados na home institucional. Os textos a seguir são sínteses em redação própria, sem aspas, com acesso ao registro original completo. Cargos e vínculos correspondem à identificação da fonte e não confirmam funções atuais. As avaliações e os resultados mencionados expressam a perspectiva de cada depoente.';

export const testimonials: Testimonial[] = [
  {
    id: 'alcides-leite', name: 'Alcides Leite', role: 'Professor e secretário municipal de Educação, conforme o registro', location: 'Pereiro · CE', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-1.webp',
    paragraphs: ['Alcides destaca a parceria do município com a Aprender, articulando materiais didáticos semiestruturados e formação contínua. Relaciona esse trabalho à busca por qualidade educacional com equidade.'],
    sourceUrl: `${banner}frase-1.jpg`,
  },
  {
    id: 'cicera-rejane', name: 'Cícera Rejane de Sousa Batista', role: 'Professora e secretária municipal de Educação, conforme o registro', location: 'Maranguape · CE', period: 'Relato sobre investimentos iniciados em 2017; data da publicação não informada', image: '/images/archive/depoimento-3.webp',
    paragraphs: ['Cícera apresenta a aquisição de materiais para Educação Infantil e Ensino Fundamental como parte de um conjunto de investimentos municipais iniciado em 2017. Destaca a abordagem sociointeracionista da leitura e da escrita, a formação docente e a renovação das práticas pedagógicas.', 'O relato também menciona melhorias na estrutura das escolas. A depoente associa o conjunto dessas ações aos resultados que o município vinha alcançando, qualificados por ela como os melhores de sua história educacional. Essa avaliação se refere ao momento do depoimento.'],
    sourceUrl: `${banner}frase-3.jpg`,
  },
  {
    id: 'germana-santos', name: 'Germana Santos', role: 'Professora, conforme o registro', location: 'Pacajus · CE', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-4.webp',
    paragraphs: ['Germana relaciona as formações recebidas no município à ampliação de suas possibilidades de trabalho. Destaca propostas lúdicas para as crianças e sua contribuição à organização e à dinâmica das aulas.'],
    sourceUrl: `${banner}frase-4.jpg`,
  },
  {
    id: 'herbert-lima', name: 'Herbert Lima', role: 'Professor e secretário da Educação, conforme o registro', location: 'Sobral · CE', period: 'Relato com referência ao IDEB 2017; data da publicação não informada', image: '/images/archive/depoimento-5.webp',
    paragraphs: ['Herbert situa a Aprender entre os parceiros de Sobral e relaciona essa colaboração à trajetória de reorganização da política educacional municipal. Cita o IDEB 2017 da rede: 9,1 nos anos iniciais e 7,2 nos anos finais.', 'Ao apresentar o uso de Novo Lendo Você Fica Sabendo, destaca a formação de leitores e escritores críticos e autônomos. Identifica atividades de linguagem oral, leitura, produção escrita e análise linguística. Os índices citados pertencem à rede municipal e não demonstram, isoladamente, o efeito de uma coleção.'],
    sourceUrl: `${banner}frase-5.jpg`,
  },
  {
    id: 'jose-leandro', name: 'José Leandro de Almeida Cavalcante', role: 'Professor da Escola Municipal Leonor de Castro Borges, conforme o registro', location: 'Maranguape · CE', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-6.webp',
    paragraphs: ['José Leandro relata que as formações ampliaram seus conhecimentos pedagógicos. Associadas ao material semiestruturado, ajudaram-no a desenvolver estratégias de ensino que considerava mais significativas.', 'O professor destaca o entusiasmo dos estudantes diante das atividades, o trabalho articulado com as famílias e os desafios propostos em aula. Apresenta essas experiências como possibilidades de desenvolvimento para a vida escolar e pessoal das crianças.'],
    sourceUrl: `${banner}frase-6.jpg`,
  },
  {
    id: 'jose-marcelo', name: 'José Marcelo Farias Lima', role: 'Professor e secretário de Educação, conforme o registro', location: 'Maracanaú · CE', period: 'Relato sobre ações desde 2015; data da publicação não informada', image: '/images/archive/depoimento-7.webp',
    paragraphs: ['José Marcelo apresenta a garantia de uma Educação Básica de qualidade e de oportunidades mais iguais como compromisso municipal. Situa a compra de materiais e a formação de professores e coordenadores entre as ações da Secretaria da Educação realizadas desde 2015.', 'Em sua avaliação, os investimentos contribuíram para avanços na alfabetização, na proficiência, no Índice de Desempenho Escolar e na quantidade de estudantes no nível desejável. O depoimento não oferece uma série numérica dessas medidas; sua atribuição permanece vinculada à perspectiva do autor.'],
    sourceUrl: `${banner}frase-7.jpg`,
  },
  {
    id: 'julio-cesar', name: 'Julio César da Costa Alexandre', role: 'Professor e secretário dos Direitos Humanos, Habitação e Assistência Social, conforme o registro', location: 'Sobral · CE', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-8.webp',
    paragraphs: ['Julio César destaca o apoio ao professor alfabetizador e a complementaridade entre teoria e prática. Relaciona essa articulação aos livros dos estudantes, às orientações didáticas e à formação dos professores em serviço.', 'O relato valoriza rotinas de aula que enriquecem o uso do tempo pedagógico. O autor caracteriza a integração dessas ações como um eixo pedagógico estruturado e a considera estratégica para melhorar a aprendizagem e valorizar o trabalho docente.'],
    sourceUrl: `${banner}frase-8.jpg`,
  },
  {
    id: 'lucinete-alves', name: 'Lucinete Alves Silva', role: 'Professora e secretária municipal de Educação, conforme o registro', location: 'Juazeiro · BA', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-9.webp',
    paragraphs: ['Lucinete aborda o uso do material semiestruturado pelas turmas de 1º e 2º anos da rede de Juazeiro. Associa a experiência ao avanço da alfabetização e à compreensão do que os estudantes leem e escrevem.', 'Também destaca a possibilidade de os professores adotarem diferentes estratégias metodológicas, com situações comunicativas reais, interdisciplinares e significativas.'],
    sourceUrl: `${banner}frase-9.jpg`,
  },
  {
    id: 'vilma-rodrigues', name: 'Vilma Rodrigues Lira de Souza', role: 'Professora e gerente municipal do MAIS PAIC, conforme o registro', location: 'Forquilha · CE', period: 'Depoimento sem data informada', image: '/images/archive/depoimento-10.webp',
    paragraphs: ['Vilma enfatiza a renovação das práticas pedagógicas e a criação de situações desafiadoras em que o estudante participa ativamente da construção do conhecimento. Relaciona essa proposta à formação do professor como mediador do ensino e da aprendizagem.'],
    sourceUrl: `${banner}frase-10.jpg`,
  },
];

export interface FormationPhoto {
  id: string; image: string; alt: string; caption: string; location: string;
  date: string; sourceUrl: string; width: number; height: number;
}

export const formationGallery: FormationPhoto[] = [
  { id: 'pacajus-roda', image: '/images/archive/formacao-1.webp', alt: 'Educadores sentados em roda no chão, trabalhando com uma folha no centro do grupo.', caption: 'Encontro de formação para professores e coordenadores', location: 'Pacajus · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 298 },
  { id: 'fortim-atividade', image: '/images/archive/formacao-2.webp', alt: 'Participantes de formação organizam cartões ilustrados sobre o chão.', caption: 'Encontro de formação para professores', location: 'Fortim · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 298 },
  { id: 'pacajus-grupo', image: '/images/archive/formacao-3.webp', alt: 'Participantes de formação observam um jogo de tabuleiro amarelo sobre um tecido, com cartões de letras.', caption: 'Encontro de formação para professores e coordenadores', location: 'Pacajus · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 298 },
  { id: 'sobral-estudos', image: '/images/archive/formacao-4.webp', alt: 'Educadoras reunidas em uma mesa de estudo, com materiais de leitura.', caption: 'Grupo de estudos', location: 'Sobral · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 298 },
  { id: 'cuiaba-encontro', image: '/images/archive/formacao-5.webp', alt: 'Grupo de educadores reunido em pé durante uma atividade coletiva em espaço coberto.', caption: 'Encontro de formação para professores e coordenadores', location: 'Cuiabá · MT', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 315, height: 298 },
  { id: 'juazeiro-professores', image: '/images/archive/formacao-6.webp', alt: 'Professoras observam materiais e registros sobre uma mesa de trabalho.', caption: 'Encontro de formação para professores', location: 'Juazeiro · BA', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 296 },
  { id: 'alto-santo-professores', image: '/images/archive/formacao-7.webp', alt: 'Educadoras trabalhando juntas com materiais distribuídos em uma mesa.', caption: 'Encontro de formação para professores', location: 'Alto Santo · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 296 },
  { id: 'russas-roda', image: '/images/archive/formacao-8.webp', alt: 'Participantes sentados ao redor de um tecido colorido durante uma atividade formativa.', caption: 'Encontro de formação para professores e coordenadores', location: 'Russas · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 296 },
  { id: 'russas-leitura', image: '/images/archive/formacao-9.webp', alt: 'Participantes de uma atividade formativa reunidos em espaço com estantes de livros.', caption: 'Encontro de formação para professores e coordenadores', location: 'Russas · CE', date: 'Data não informada na fonte', sourceUrl: gallerySource, width: 316, height: 296 },
];

export const galleryContext = 'Nove fotografias do acervo oficial, em sete municípios. As legendas preservam as atividades e localidades identificadas pela editora. A página original não informa as datas dos registros. Os recortes mantêm a resolução disponível; as imagens não representam uma agenda atual de formações.';

export interface ArchiveVideo {
  id: string; title: string; description: string; src: string; originalSrc: string;
  poster: string; duration: string; durationSeconds: number; width: number; height: number;
  transcript: string; descriptionTrack: string; sourceUrl: string;
  availability: string; notes: string; sizeBytes: number; originalSizeBytes: number;
}

export const videos: ArchiveVideo[] = [
  {
    id: 'video-1', title: 'Conheça a Editora Aprender · vinheta de acervo',
    description: 'Imagem de uma criança com um livro, acompanhada do anúncio de uma futura apresentação institucional. O arquivo disponível é uma vinheta curta, sem áudio.',
    src: '/media/comp-1.mp4', originalSrc: `${official}v2/midia/kcfinder/files/videos/comp-1.mp4`, poster: '/images/archive/video-1.jpg', duration: '8 segundos', durationSeconds: 8.04, width: 960, height: 540,
    transcript: 'Vídeo sem áudio. Uma menina aparece com um livro aberto diante do rosto. A composição tem um leve movimento de aproximação. No alto, surge um pequeno ícone de reprodução e o texto: “Em breve vídeo apresentação / institucional”. A mesma imagem permanece até o fim.',
    descriptionTrack: '/media/comp-1-description.vtt', sourceUrl: `${official}video-1`, availability: 'Disponível · vinheta histórica sem áudio', notes: 'A página anuncia uma apresentação; o arquivo servido não contém uma apresentação institucional completa. Descrição visual conferida nos quadros do vídeo.', sizeBytes: 479645, originalSizeBytes: 3197808,
  },
  {
    id: 'video-2', title: 'Nossas Formações · vinheta de acervo',
    description: 'Animação do logotipo serifado da Aprender sobre fundo verde texturizado. O arquivo anuncia uma apresentação futura e não contém registros de formação.',
    src: '/media/comp-2.mp4', originalSrc: `${official}v2/midia/kcfinder/files/videos/comp-2.mp4`, poster: '/images/archive/video-2.jpg', duration: '8 segundos', durationSeconds: 8.04, width: 960, height: 540,
    transcript: 'Vídeo sem áudio. O logotipo serifado Aprender Editora aparece em uma placa branca inclinada, com elementos verdes, sobre um fundo verde texturizado. A marca se aproxima levemente. No alto surge um ícone de reprodução acompanhado do texto: “Em breve vídeo apresentação / institucional”.',
    descriptionTrack: '/media/comp-2-description.vtt', sourceUrl: `${official}video-2`, availability: 'Disponível · vinheta histórica sem áudio', notes: 'O título é o da página oficial. O vídeo disponível é um anúncio provisório; não apresenta encontros, falas de formadores nem uma formação completa.', sizeBytes: 973013, originalSizeBytes: 23658302,
  },
  {
    id: 'video-3', title: 'Depoimentos · vinheta de acervo',
    description: 'Animação do logotipo serifado da Aprender sobre fundo verde liso. A mídia disponível é um anúncio curto; os depoimentos efetivos estão preservados na seção de relatos.',
    src: '/media/comp-3.mp4', originalSrc: `${official}v2/midia/kcfinder/files/videos/comp-3.mp4`, poster: '/images/archive/video-3.jpg', duration: '8 segundos', durationSeconds: 8.04, width: 960, height: 540,
    transcript: 'Vídeo sem áudio. Sobre um fundo verde liso, o logotipo serifado Aprender Editora aparece numa placa branca inclinada com elementos verdes, em leve aproximação. No alto, um ícone de reprodução acompanha o texto: “Em breve vídeo apresentação / institucional”. Não há pessoas falando.',
    descriptionTrack: '/media/comp-3-description.vtt', sourceUrl: `${official}video-3`, availability: 'Disponível · vinheta histórica sem áudio', notes: 'O título preserva a identificação da página oficial; o arquivo não contém entrevistas. Não foram inventadas falas ou legendas de áudio inexistente.', sizeBytes: 345335, originalSizeBytes: 7661839,
  },
];

export const videoContext = 'Os três arquivos publicados pelo site foram abertos e inspecionados. São vinhetas de aproximadamente oito segundos, sem faixa de áudio, que anunciam uma apresentação futura. O acervo preserva esses recursos como eles existem, com controles de reprodução, descrições visuais e acesso aos originais. As cópias locais foram otimizadas sem alterar a sequência ou o conteúdo.';

export const socialLinks = [
  { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com/aprendereditora', status: 'Destino respondeu HTTP 200', note: 'Vínculo publicado pelo site oficial; a resposta não confirma atividade recente.', checkedAt: archiveCheckedAt },
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com/AprenderEditora', status: 'Destino respondeu HTTP 200', note: 'Vínculo publicado pelo site oficial; o acesso ao conteúdo pode exigir autenticação.', checkedAt: archiveCheckedAt },
  { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com/aprendereditora', status: 'Canal Aprender Editora respondeu HTTP 200', note: 'Canal vinculado no site oficial; não foi inferida atividade recente.', checkedAt: archiveCheckedAt },
  { id: 'twitter', name: 'X / Twitter', url: 'https://twitter.com/aprendereditora', status: 'Redireciona para x.com/aprendereditora e responde HTTP 200', note: 'Endereço histórico preservado; o conteúdo pode exigir autenticação e não confirma atividade atual.', checkedAt: archiveCheckedAt },
];
