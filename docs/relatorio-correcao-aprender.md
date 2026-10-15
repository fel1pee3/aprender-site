# Correção e recuperação de conteúdo — Aprender Editora

Revisão em **14 de outubro de 2026**, no repositório existente da proposta de Felipe Maia. Implementação preparada e verificada localmente. Esta revisão não foi publicada.

## Resultado e escopo

O projeto passou de 20 para **23 soluções** e oferece **39 páginas de conteúdo**. Lendo e Escrevendo e ACerta Brasil têm apresentações próprias; Inglês agrupa My Learning Companion e My Teaching Companion do 6º ao 9º ano. As apresentações de livros, kits, públicos e apoios são identificadas por fonte e edição.

A recuperação inclui **27 amostras individuais**, documento institucional do PAIC, catálogo de 2025 e **152 linhas da tabela de preços de 2027**. Os arquivos têm rótulos, formato, tamanho e contexto; o catálogo de 70.269.887 bytes permanece sob abertura voluntária. O catálogo de soluções e a tabela chegam com filtros e resultados completos no HTML inicial, dentro de `main`.

Foram integrados missão de 2025 e contexto da versão do site, **sete valores separados**, equipe, trajetória de Sobral, Edgar Linhares e referências do INEP. A área PAIC preserva mapas, atendimentos de 2008–2018, a série do catálogo de 2008–2013, IDEB, ranking de 2017, IOEB de 2019, créditos das fontes e mudança na aquisição dos materiais a partir de 2014. Indicadores das redes e do Estado conservam atribuição coletiva.

A formação apresenta **cinco eixos e 16 ações**, com reuniões gestoras, observação de aulas, avaliações, análise e devolutivas. O acervo reúne **nove depoimentos**, **nove fotografias em sete municípios**, três registros editoriais de memória e **três vinhetas verificadas**, com controles, posters, carregamento sob demanda e alternativas textuais. Os depoimentos usam redação própria em HTML e oferecem acesso ao original integral de cada autor.

A home recupera os **quatro indicadores de 2025**, incluindo mais de 1 milhão de estudantes alfabetizados, e usa uma fotografia real do catálogo com contexto editorial. Os números antigos e a referência a 85 municípios parceiros permanecem acessíveis com suas definições e períodos. Instagram, Facebook, YouTube e Twitter/X estão no rodapé e no contato.

## Edições e divergências preservadas

- **Avançando Juntos:** fundamentação e materiais do 9º ano no catálogo de 2025; variantes do 6º ao 9º na tabela de 2027, sem extrapolar a metodologia.
- **Brincando e Aprendendo:** apresentações oficiais sem data, com seus públicos, páginas e quantidades, separadas dos kits de 2025. O anúncio de lançamento para 2026 impresso no catálogo foi conservado como anúncio daquela publicação.
- **Lendo e Escrevendo:** livros 1, 2 e 3 e faixas sugeridas de 3, 4 e 5 anos. Uma inconsistência do cabeçalho original do terceiro kit é explicada; capas e guia identificam o livro 3.
- **A Cor da Gente:** nove títulos individualizados, sinopses, atividades e material do professor. **Ler, Ouvir e Contar:** 14 contos e três coletâneas identificados.
- **Fluir das Emoções:** três níveis, com a diferença de título do terceiro nível entre o site e 2025/2027. **Educação Financeira:** organização temática histórica e subtítulos de 2025 preservados em suas apresentações.
- **PAIC 2012:** 5.326 educadores no site e 5.325 no catálogo de 2025; ambas as séries permanecem disponíveis.
- **Alfabetização no Ceará:** o banner histórico apresenta 35% em 2007 e 89% em 2018; o catálogo apresenta 39,9% em 2007 e 97,11% em 2023 com outra definição e recorte. Os valores não foram combinados em uma série única.
- **Vídeos:** os três arquivos oficiais são vinhetas de **8,04 segundos sem áudio**; não contêm as entrevistas ou formações sugeridas pelos títulos das páginas. As cópias locais mantêm o conteúdo e somam aproximadamente 1,8 MB.
- **Endereço:** Rua Ary Barroso, conforme o catálogo de 2025. Referências antigas à Rua Marvin são mantidas como acervo.

## Implementação e navegação

Foram mantidos verde, fundos claros, amarelo, Lora e Manrope. O catálogo usa cards compactos, busca sem acentos, aliases e filtros que reconhecem coleções de mais de uma etapa. Galerias usam imagens reais, seleção de material/volume, miniaturas e controles por teclado. O detalhe permanece no HTML, organizado em seções e expansões nativas.

Os caminhos institucionais antigos têm destinos específicos em `src/data/legacy-routes.ts`; produtos não são enviados genericamente à home. Os acessos a Aprender Formar e Aprender Avaliar mantêm os domínios oficiais, inclusive o caminho legado `/aprencer-avaliar`.

O formulário mantém seleção da coleção, validação, conservação dos campos, revisão e cópia. Ele prepara e-mail; não informa que houve envio automático. Os testes não transmitiram mensagens reais.

Metadados são centralizados em `src/lib/metadata.ts`. Open Graph, Twitter, canonical e sitemap usam `https://aprender-site.vercel.app`. A compilação de verificação recebeu deliberadamente `NEXT_PUBLIC_SITE_URL=http://localhost:3000`: a resolução de produção rejeitou essa origem local e entregou URLs públicas corretas. As dimensões sociais foram obtidas dos arquivos reais. Permanecem `noindex,nofollow`, `robots.txt` e a identificação de proposta independente.

Os arquivos dos metadados foram servidos e conferidos pelos caminhos da revisão no servidor local. A disponibilidade dos novos arquivos no domínio publicado acompanhará a futura implantação desta revisão.

## Conferência das fontes

A [matriz de migração](matriz-migracao-conteudo.md) contém **1.505 informações e recursos**, com identificador, origem, conteúdo, fonte/edição, consulta, destino, situação e observações. O inventário independente reúne **31 caminhos** — os 30 da auditoria mais `/index` — e **184 URLs de recursos** do oficial: 153 imagens, 28 PDFs e três vídeos.

A leitura visual das fontes, inclusive texto dentro de imagens, precedeu a comparação com a implementação. O ledger de origem não foi inferido da lista de soluções do novo site. A auditoria compara o conjunto de URLs de PDFs, nove imagens de depoimentos, três vídeos e canais publicados, além dos dados e respectivos elementos renderizados. A assinatura, tamanho, SHA-256 e leitura por parser dos 28 PDFs de pesquisa foram conferidos. O catálogo completo foi validado no arquivo fornecido; sua referência pública foi conferida por resposta parcial, assinatura e tamanho.

Evidências principais:

- [Inventário oficial](migration/official-manifest.json) e [ledger de recursos](migration/source-resource-ledger.json).
- [Auditoria de produção](migration/check-production.json) e [auditoria estática](migration/check-static.json).
- [Navegação por fragmentos para livros](migration/fragment-navigation.json).
- [Conferência institucional e audiovisual](migration/institutional-review.md) e [conferência de PDFs e preços](migration/recursos-e-precos.md).
- Inventários granulares `migration/collections-primary.json`, `collections-secondary.json`, `institutional.json`, `archive.json`, `resources.json`, `prices.json` e `editorial.json`.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou sem erros |
| `npm run build` | Passou; 44 entradas processadas, com catálogo e preços renderizados por requisição |
| `npm run test:e2e` | **29 testes passaram** na suíte completa, em 51,4 s; três verificações responsivas adicionais passaram após o ajuste final de proporções |
| Auditoria de HTML e recursos | **5.037 verificações passaram**, 39 páginas e 1.505 destinos |
| Auditoria estática | **397 verificações passaram** |
| Metadados de produção | Origem pública correta nas 39 páginas; imagens locais servidas; nenhuma referência local nas metatags públicas |
| Recursos | 27 amostras, PAIC, catálogo, 152 preços, três vinhetas e respectivas descrições conferidos |
| Responsividade nova | 360, 390, 768, 1024 e 1440 px nas nove rotas recuperadas representativas |
| Regressão responsiva | 320, 375, 768, 1280 e 1440 px em início, catálogo, solução e contato |
| Imagens e console | Sem arquivo quebrado, exceção ou erro de console nos percursos avaliados |
| Axe-core | Nenhuma violação nas regras WCAG A/AA habilitadas, em 17 rotas representativas |
| Teclado e navegação | Menu, foco, Escape, expansões, galeria, filtros, histórico, links de pular e fragmentos para livros conferidos |
| Formulário | Interesse selecionado, obrigatórios, e-mail inválido, preparação, cópia e alternativa de seleção manual passaram |
| Reflow e movimento | Viewport equivalente a 200% e preferência por movimento reduzido passaram |

Não há script ou configuração de lint no projeto; não foi apresentado um resultado de lint inexistente. A compilação e os testes de navegador precisaram de subprocessos fora do sandbox após `spawn EPERM`; a revisão automática autorizou a execução local. Não houve rejeição de aprovação ou dependência de confirmação do usuário.

## Desempenho e revisão visual

Resultados medidos e condições estão em [performance.json](migration/performance.json). As capturas finais de desktop e celular ficam em `.qa/final`, e o relatório de testes em `playwright-report/index.html`; ambos são artefatos locais ignorados pelo Git.

Medição de laboratório no Microsoft Edge headless, servidor local de produção já aquecido pelos testes, contexto novo e cache do navegador desabilitado por navegação. Configuração do protocolo do navegador: latência de 150 ms, download de 1,6 Mbps, upload de 0,75 Mbps e CPU desacelerada 4 vezes. Uma navegação por rota e largura; LCP observado até 1,5 segundo após o estado de rede ociosa. Viewports de 390 × 844 e 1440 × 1000.

| Página | LCP 390 px | CLS 390 px | LCP 1440 px | CLS 1440 px |
| --- | ---: | ---: | ---: | ---: |
| Início | 1,040 s | 0,0008 | 1,296 s | 0,0005 |
| Soluções | 0,800 s | 0,0001 | 0,820 s | 0,0004 |
| Lendo e Escrevendo | 0,864 s | 0,0002 | 0,920 s | 0,0002 |
| Tabela de preços | 0,832 s | 0,0149 | 0,856 s | 0,0035 |
| Acervo | 0,908 s | 0,0164 | 0,896 s | 0,0329 |

As medições identificaram e orientaram a correção de dois problemas: deslocamento provocado pela apresentação temporária dos filtros e download antecipado da imagem original de preços pelo prefetch de navegação. Os filtros passaram a chegar diretamente no conteúdo principal do HTML, e links de arquivos usam âncoras que só abrem o recurso quando acionadas. PDFs e MP4 permanecem fora do carregamento automático.

Na revisão visual final, mapas receberam os atributos de largura e altura dos arquivos reais, o retrato de Edgar foi limitado à resolução disponível de 275 × 370, e galerias passaram a impedir ampliação além da resolução da imagem servida. Tipagem, compilação e os percursos responsivos de 390, 768 e 1440 px passaram após esse ajuste.

Em 390 px, o CLS observado no catálogo caiu de 0,2692 para 0,0001; na tabela, de 0,1273 para 0,0149. A transferência total observada na tabela caiu de 1.936.123 para 385.104 bytes, aproximadamente 80%. Nas dez navegações finais não houve solicitação automática de PDF, MP4 ou da imagem original de preços. A medição anterior foi preservada em [performance-before-rendering-fix.json](migration/performance-before-rendering-fix.json).

## Limitações e pendências de origem

**Dois banners laterais antigos do contato não puderam ser recuperados.** Os URLs `Banner Lateral Formulario/bnnr-lat_03.jpg` e `bnnr-lat_05.jpg` retornam **HTTP 200 com `Content-Type: text/html`**, sem assinatura JPEG, nos domínios com e sem `www`. Portanto, o status 200 não representa uma imagem disponível. Houve tentativa limitada de recuperação nas duas variantes oficiais; os resultados estão em [unavailable-banners.json](migration/unavailable-banners.json). O conteúdo gráfico ausente não foi inventado. Para recuperar esses dois arquivos originais, será necessário que a editora restaure as imagens ou forneça cópias válidas. Os três recursos de vídeo vinculados ao contato estão disponíveis no acervo.

As fontes não informam datas editoriais para os nove depoimentos, as nove fotos e várias apresentações antigas. Os cargos foram preservados como identificação histórica. A tabela 2027 não comprova vigência comercial atual, e a presença de um canal público não comprova atividade recente. Esses limites de fonte estão contextualizados; não receberam datas ou condições inferidas.

Não foram realizados testes em Safari/Firefox, dispositivos físicos, leitor de tela, Lighthouse ou usuários reais. As análises automatizadas e a navegação por teclado não equivalem a certificação WCAG. As medições locais de LCP e CLS não representam percentis de produção nem incluem INP de usuários reais.

## Revisão local

As instruções de execução e reprodução estão no [README](../README.md). Não há publicação automática, novas credenciais obrigatórias ou serviço de envio implantado. A revisão pode ser examinada localmente antes de qualquer atualização da implantação pública.
