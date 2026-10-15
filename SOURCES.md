# Fontes e ativos

Refinamento de autonomia em 15/10/2026: os recursos entregues são locais. Veja o [relatório atual](docs/relatorio-refinamento-final.md) e os mapas em `docs/refinement/`. As URLs externas abaixo registram a pesquisa e a procedência.

Conferência ampliada em **14 de outubro de 2026**, no contexto desta proposta independente. A redação de interface e os resumos são originais. As declarações comerciais e históricas são atribuídas à editora, sem apresentá-las como avaliação independente. A referência de inventário é o site oficial; o catálogo de 2025 e a tabela de 2027 são fontes complementares. A matriz detalhada está em `docs/matriz-migracao-conteudo.md`.

## Referência principal

**Catálogo Aprender Editora 2025 — 20 anos**, 64 páginas, fornecido pelo usuário em `C:/Users/VAIOFE16-Felipe/Downloads/Catalogo_Aprender_Editora_2025_20_Anos.pdf`. A numeração nas referências corresponde à página do PDF, iniciada em 1. Extração disponível em `docs/referencias/catalogo-2025.txt`.

Origem de pesquisa do PDF: https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf. A cópia servida está em `/documents/catalogo-2025-20-anos.pdf`, com 70.269.887 bytes idênticos ao original e acesso sob demanda.

| Conteúdo | Páginas |
| --- | --- |
| Apresentação, missão e valores | 1 |
| Origem, Sobral, 2005 e participação no PAIC | 4–7 |
| Indicadores históricos: uso de materiais, educadores/coordenadores nas formações, municípios atendidos e estudantes alfabetizados | 5 |
| Brincando e Aprendendo | 14–15 |
| Miudezas e Descobertas | 16 |
| Cataventos | 18 |
| Uni Duni Tê | 20 |
| Novo Lendo Você Fica Sabendo | 24–25 |
| AMMA | 26–27 |
| Projeto TEMA | 28–29 |
| Escrever, Comunicar e Ser | 30 |
| Superativar | 32–33 |
| Vida & Linguagem | 36–37 |
| Vida & Matemática | 38–39 |
| Vida & Ciências | 40–41 |
| Avançando Juntos | 42–43 |
| Sou da Paz | 44 |
| Educação Financeira | 46–47 |
| A Cor da Gente | 50 |
| Trânsito Legal | 52 |
| Ler, Ouvir e Contar | 54 |
| IDEB Nota 10 | 56 |
| Fluir das Emoções | 58 |
| Formação e registros institucionais | 60–61 |
| Endereço em Papicu, Fortaleza | 64 |

Os dados em `src/data/solutions.ts` distinguem público, etapas, objetivo, componentes e suporte por coleção. Os módulos `collection-details-*` preservam os livros e apresentações por edição. Aos 20 produtos da primeira fase foram acrescentados Lendo e Escrevendo, ACerta Brasil e o agrupamento dos oito materiais de Inglês. Fluir das Emoções se destina a profissionais da educação e áreas afins. Avançando Juntos é apresentado para o 9º ano no catálogo de 2025 e para o 6º ao 9º na tabela de 2027; os escopos não foram combinados.

## Inventário oficial e recursos recuperados

`docs/migration/official-manifest.json` documenta a pesquisa dos 30 caminhos da auditoria mais `/index`, incluindo links em imagens e mapas de imagem. As imagens com informação foram examinadas visualmente e seu conteúdo reconstruído em HTML. O inventário por item, suas edições, destinos e limites está na matriz de migração.

`src/data/resources.ts` vincula as 27 amostras individuais, o documento do PAIC e o catálogo. A conferência inclui assinatura PDF, leitura por parser, páginas, tamanho e identidade do conteúdo. Prévias locais preservam capas e páginas das amostras; o ano escolar e o volume não são apresentados como ano de edição.

`src/data/prices.ts` transcreve as 152 linhas da imagem `https://www.aprendereditora.com.br/v2/midia/kcfinder/images/tabela_precos_2027.jpg`. Nome, ano, destinatário, kit e preço em centavos foram conferidos visualmente. A identificação 2027 é mantida como edição publicada, com confirmação comercial encaminhada à editora.

O acervo preserva nove depoimentos em redação própria com acesso aos originais integrais, nove fotografias em sete municípios e três vinhetas verificadas. As vinhetas não têm áudio e anunciam uma apresentação futura; controles, posters e descrições correspondem ao conteúdo existente. Missão e sete valores de 2025 usam o documento fornecido pelo usuário; a versão anterior do site é contextualizada.

## Fontes públicas complementares

- https://www.aprendereditora.com.br/ — telefone institucional, navegação e link do Instagram.
- https://www.aprendereditora.com.br/quem-somos — apresentação em imagem, consultada visualmente.
- https://www.aprendereditora.com.br/missao-principios-e-valores — valores; conferência também pelo catálogo, p. 1.
- https://www.aprendereditora.com.br/trajetoria — contexto institucional; cronologia consolidada pelo catálogo.
- https://www.aprendereditora.com.br/paic — imagens examinadas: participação no eixo de alfabetização, formação, acompanhamento e avaliação. O PAIC é identificado como programa governamental.
- https://www.aprendereditora.com.br/aprender-em-acao — apresentação em imagem: prática, teoria, planejamento, gestão de sala e avaliação; encontros e acompanhamento por amostragem. As fotos sem data não foram convertidas em notícias com datas inventadas.
- https://www.aprendereditora.com.br/fale-conosco — destino institucional para contato.
- https://www.instagram.com/aprendereditora — perfil vinculado no site institucional. Não houve acesso autenticado, incorporação de feed nem uso da campanha de Outubro Rosa como identidade permanente.
- https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html — publieditorial do Estúdio O POVO, 7/11/2025. Tratado como declaração institucional, não avaliação jornalística independente.
- https://aprenderformar.com.br/ e https://aprenderavaliar.com.br/ — destinos consultados, com resposta HTTP 200. A apresentação das funcionalidades usa o catálogo; sistemas autenticados não foram recriados ou testados internamente.

Algumas páginas institucionais retornam alertas do sistema legado e textos incorporados em imagens. A extração textual isolada não foi tomada como ausência de conteúdo. As imagens de referência consultadas estão em `docs/referencias/`.

## Contatos e limites de atualidade

O telefone **(85) 3194-1300** foi conferido no cabeçalho do site institucional acessível. O endereço **Rua Ary Barroso, 70, 9º andar, Torre 2, Papicu, Fortaleza, CEP 60175-705** está no catálogo de 2025. Foi preferido ao endereço antigo em Parque Manibura encontrado em materiais anteriores.

O e-mail **aprendereditora@aprendereditora.com.br** está documentado em material hospedado no domínio oficial: https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Verde%20-%20Vol%2002.pdf . É uma publicação anterior à edição de 2025; a existência e operação atual da caixa postal não foram verificadas por envio. A interface oferece também telefone e contato no site institucional. Endereço, e-mail e condições comerciais devem ser reconfirmados com a editora antes de uma publicação oficial.

## Registros de “Em ação”

- **Vinte anos**: síntese do catálogo e do publieditorial de 7/11/2025. A foto é de formação, do acervo da p. 61; sua legenda não a apresenta como um evento de aniversário.
- **Palhano, 2010**: foto e legenda da p. 2, acompanhamento do projeto Lendo Você Fica Sabendo com estudantes do 2º ano. O ano é preservado sem inventar dia/mês.
- **Novo Oriente, 2011**: foto e legenda da p. 22, jogo Brincando com as fichas com estudantes do 2º ano. O ano é preservado sem inventar dia/mês.

## Origem dos ativos locais

Os livros e fotografias da primeira fase listados abaixo foram extraídos do PDF fornecido. A recuperação também acrescenta fotografias, capas, kits, mapas e retratos do acervo oficial, prévias das amostras e cópias otimizadas das vinhetas. A origem de cada recurso consta dos manifestos de migração. São materiais institucionais usados nesta demonstração para apresentação. Não se presume licença aberta nem autorização geral para redistribuição ou publicação comercial.

| Arquivo em `public/images/` | Origem |
| --- | --- |
| `logo.png`, `logo.svg` | Contornos originais da marca arredondada, p. 5; extração sem redesenho |
| `hero.webp` | Formação de educadores, p. 60, objeto 152 |
| `formation.webp` | Formação em espaço escolar, p. 61, objeto 164 |
| `history.webp`, `palhano-2010.webp` | Palhano 2010, p. 2, objeto 7165; original em preto e branco |
| `novo-oriente-2011.webp` | Novo Oriente 2011, p. 22, objeto 4219; original em preto e branco |
| `formacao-professores.webp` | Formação, p. 61, objeto 163 |
| `formacao-encontro.webp` | Formação, p. 61, objeto 165 |
| `collections/*.webp` | Capas dos 20 produtos, nas páginas correspondentes da tabela anterior |

`scripts/prepare-catalog-assets.py` registra os objetos e páginas de cada capa. Foram removidas apenas margens transparentes já presentes, mantidas as proporções e produzidas cópias WebP de tamanho adequado. Fotografias não foram geradas, colorizadas ou alteradas para simular pessoas ou eventos. Os ícones de interface são SVGs simples criados no código.

## Fontes tipográficas e implementação

- Manrope: https://github.com/google/fonts/tree/main/ofl/manrope — arquivo variável local e `public/fonts/OFL-Manrope.txt`.
- Lora: https://github.com/google/fonts/tree/main/ofl/lora — arquivo variável local e `public/fonts/OFL-Lora.txt`.
- Ambas sob **SIL Open Font License 1.1**, com suporte aos caracteres usados em português. O uso no site não exige chamadas a Google Fonts.
- Next.js: https://nextjs.org/docs/app/getting-started/installation — requisitos e instalação estável conferidos; versões finais registradas no lockfile.
- Renderização inicial dos filtros: https://nextjs.org/docs/app/api-reference/functions/use-search-params — comportamento em páginas estáticas e renderizadas no servidor, com `connection()` antes da leitura da URL. Consulta em 14/10/2026; a implementação foi compilada e verificada na versão instalada.

O catálogo e o site institucional são fontes primárias da editora, não evidência independente de impacto causal. Os indicadores históricos não representam a base atual de clientes. A proposta não atribui à empresa, isoladamente, os resultados da educação do Ceará e não inclui depoimentos, clientes, prêmios, agenda ou resultados inventados.
