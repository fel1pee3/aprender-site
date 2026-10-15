# Refinamento final da Aprender Editora

Entrega local conferida em **15/10/2026**, a partir do commit `2a4a4b3`. A implantação e a troca de domínio permanecem pendentes de configuração da hospedagem. O estado inicial e o plano estão em [initial-state.json](refinement/initial-state.json); a segunda auditoria não estava disponível como arquivo, e suas exigências foram aplicadas pelo briefing recebido.

## Experiência entregue

- Home com mensagem explícita de alfabetização, livros, formação e acompanhamento; fotografia institucional, materiais reais, duas ações principais e quatro indicadores de 2025 contextualizados.
- Galerias antes do aprofundamento pedagógico. Em Brincando e Aprendendo, começam entre **832 e 1.291 px** do topo nas cinco larguras verificadas. A composição da apresentação principal fica aberta; as demais apresentações têm atalhos por nomes humanos. O catálogo 2025 é a apresentação inicial quando existe, sem inferir vigência pela tabela 2027.
- Ampliação local de imagens e nove registros integrais de depoimentos, sob demanda, com zoom, teclado, Escape e retorno de foco. As sínteses em HTML continuam identificadas como sínteses.
- Header estável ao rolar, movimento com tokens de 180/260/360 ms e respeito à preferência de movimento reduzido. Conteúdo essencial visível sem JavaScript.
- Notas sobre migração, erros de cabeçalho e procedimentos de conferência foram movidas para a documentação. Permanecem datas, edições, autoria e ressalvas necessárias aos indicadores e preços.
- Cartão de compartilhamento padrão de **1200 × 630 px**, com marca, fotografia e livros da home; metadados absolutos, canonical, sitemap e política de noindex coerentes com esta proposta.

## Preservação e destinos

| Conteúdo ou ação anterior | Consulta na nova experiência |
| --- | --- |
| Páginas e botões de fonte das coleções | 23 rotas de soluções, com 36 apresentações, 300 registros de livros e 408 componentes; atalhos específicos por apresentação |
| Links para páginas de catálogo que repetiam a interface | Conteúdo em HTML; botões redundantes retirados e referências editoriais arquivadas |
| 27 amostras e documento do PAIC | PDFs locais, junto às coleções e aos documentos pertinentes |
| Catálogo completo de 2025 | PDF local como opção secundária em `/recursos` |
| Nove depoimentos integrais | `/acervo#depoimentos`, com originais locais e ampliação |
| Nove fotografias e três vinhetas | `/acervo`, com imagens, posters, MP4s e descrições locais; vídeos com controles e `preload="none"` |
| Tabela de preços | `/recursos/tabela-precos`: 152 linhas em HTML, filtros e ampliação opcional da imagem local |
| Instituição, formação, trajetória e resultados | Rotas e âncoras internas; missões, sete valores, cinco eixos, 16 atividades e séries históricas preservados |
| Plataformas e quatro redes sociais | Destinos externos verificados, identificados; abertura em nova aba informada |

Os mapas detalhados registram origem, destino e ação: [59 decisões institucionais](refinement/content-link-migration.json), [soluções e apresentações](refinement/collection-link-migration.json), [documentos e imagens integrais](refinement/document-migration.json). O [baseline independente](refinement/preservation-baseline.json) veio dos dados do commit anterior. [Alterações editoriais](refinement/collection-editorial-changes.json) preservam as notas retiradas da interface.

Lendo e Escrevendo e ACerta Brasil mantêm identidade, componentes e destinatários próprios. Inglês conserva oito variantes do 6º ao 9º ano. Avançando Juntos distingue a proposta pedagógica de 2025 para o 9º ano das 16 variantes de 2027. Os valores de Responsabilidade Social e Responsabilidade Profissional permanecem separados. Os quatro indicadores de 2025 mantêm suas definições; parceiros de um período e municípios historicamente atendidos não são somados.

## Arquivos e referências

São **29 PDFs**, totalizando **371.731.572 bytes**: Brincando 4; Lendo e Escrevendo 3; Novo Lendo 2; Escrever 5; ACerta 2; TEMA 3; Vida e Linguagem 4; Vida e Matemática 4; PAIC 1; catálogo 1. O catálogo possui **70.269.887 bytes**, 70,3 MB e 64 páginas digitais.

As cópias são binariamente idênticas, com SHA-256, assinatura, trailer e leitura de todas as páginas pelo PyMuPDF, além da rasterização da primeira e última. Os 29 arquivos servidos responderam com MIME PDF e tamanho correto; a leitura parcial por HTTP Range também passou. Não há visualizador pesado nem pré-carga de PDFs. A ação é **Abrir amostra/documento em PDF (nova aba)**; o leitor pode salvar pelo visualizador. O download WebVTT foi testado por evento real e conteúdo do arquivo.

O INEP agora aponta para o registro institucional do livro de 2005. As referências do CEE e da Vice-Governadoria responderam com seus títulos e conteúdos corretos, sem redirecionar para a home na revalidação. O slug incomum do CEE foi preservado. Detalhes no mapa institucional.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| TypeScript e build de produção | Passaram; 44 entradas processadas no build |
| Playwright | **39/39 testes passaram**, sem pulados ou instáveis, em 62.4 s; teste de metadados revalidado após parametrização da origem |
| Preservação e HTML servido | **5.072 verificações passaram** nas 39 páginas |
| Autonomia em navegador e HTTP | **3.160 verificações passaram**, com 1.863 requisições inspecionadas |
| Autonomia estática e preservação independente | **2.144 verificações passaram** |
| Acessibilidade automatizada | Nenhuma violação nas regras A/AA habilitadas do axe-core em 17 rotas representativas |
| Responsividade e operação | 360, 390, 768, 1024 e 1440 px; alturas de 640 px; regressões a 320, 375 e 1280 px; teclado, foco, Escape, âncoras e movimento reduzido |
| Recursos e navegação | Sem retorno ao servidor antigo em links, recursos, CSS, metadados, JSON-LD, redirecionamentos ou URLs do otimizador; e-mail legítimo mantido |
| Contato | Seleção contextual, erros, preparação, cópia e mailto passaram; sem envio real à editora |
| Lint | Não existe script de lint configurado; nenhuma execução de lint foi alegada |

Foram verificados busca sem acentos, aliases, filtros combinados, URL, voltar/avançar, preços de Inglês + Professor, seleção de materiais, modais, estados vazios, caminhos legados e 404. A API de imagens só admite recursos locais; os destinos do otimizador foram decodificados na inspeção. Os PDFs ficam em `public/documents/` e não aparecem nos manifestos de arquivos das funções (`*.nft.json`).

Em dez navegações, o **LCP ficou entre 0.840 e 1.164 s**, com **CLS máximo 0.0709**. Condições: Edge headless, servidor local de produção com cache do servidor aquecido, contexto novo e cache do navegador desativado, latência simulada de 150 ms, download de 1,6 Mbps, upload de 0,75 Mbps e CPU 4× mais lenta. Uma navegação por rota/largura, cinco rotas em 390 × 844 e 1440 × 1000. Nenhum PDF, vídeo ou JPG integral de preços foi solicitado automaticamente. São medições de laboratório, sem nota Lighthouse ou dados de usuários reais.

Evidências: [testes](refinement/test-results.json), [HTML e preservação](migration/check-production.json), [autonomia](refinement/autonomy-check.json), [estática](refinement/autonomy-check-static.json), [desempenho](refinement/performance.json), [home em produção](refinement/home-review-production.json) e [galeria em produção](refinement/brincando-gallery-production.json). Capturas de inspeção estão em `.qa/refinement/` e `.qa/refinement/final/`.

Uma execução intermediária encontrou `ERR_NO_BUFFER_SPACE` do Edge ao buscar CSS; o teste isolado e a execução consolidada posterior passaram. Também foram corrigidos a âncora do catálogo e o HTML que causava hidratação incorreta no PAIC.

## Pendências e configuração

- **Hospedagem:** os PDFs excedem o upload de fontes de 100 MB da CLI Vercel Hobby. O plano da conta e uma implantação real ainda não foram conferidos. O maior arquivo está abaixo do bloqueio individual de 100 MiB do GitHub. O fluxo por Git e os limites estão documentados em [document-hosting.md](refinement/document-hosting.md); uma alternativa de armazenamento próprio exige configuração real.
- **Origem pública:** definir `NEXT_PUBLIC_SITE_URL` com o domínio HTTPS publicado e refazer o build. Os links internos e arquivos são relativos. As auditorias aceitam a mesma variável ou `QA_PUBLIC_ORIGIN` e distinguem o domínio institucional futuro do servidor anterior. DNS e indexação devem seguir a decisão de publicação; esta proposta mantém noindex.
- **Fontes antigas:** duas miniaturas laterais (`bnnr-lat_03.jpg` e `bnnr-lat_05.jpg`) continuam sem binário JPEG recuperável no levantamento anterior. Respostas e assinaturas estão em [unavailable-banners.json](migration/unavailable-banners.json). Elas não integram os recursos essenciais nem os destinos entregues.
- **Alcance da verificação:** viewports em Edge desktop; sem validação em aparelhos físicos, Safari ou Firefox. A verificação automatizada não equivale a certificação de acessibilidade.
