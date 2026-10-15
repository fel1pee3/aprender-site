# Verificação da revisão — 14/10/2026

A revisão de conteúdo e interface foi conferida contra a compilação local de produção. O [relatório completo](docs/relatorio-correcao-aprender.md) contém o escopo, os métodos, as medições e as limitações de origem. A [matriz de migração](docs/matriz-migracao-conteudo.md) relaciona cada informação e recurso ao destino implementado.

| Verificação | Resultado final |
| --- | --- |
| TypeScript | `npm run typecheck` passou |
| Compilação | `npm run build` passou, com 44 entradas processadas |
| Playwright | **29 testes passaram em 51,4 s**; três verificações responsivas posteriores também passaram |
| Páginas | **39 páginas** com HTTP 200, um H1, pt-BR, metadados públicos e noindex |
| Auditoria da migração | **5.037 verificações passaram**, com 1.505 destinos conferidos |
| Auditoria estática | **397 verificações passaram** |
| Recursos documentais | 27 amostras, PAIC, catálogo e 152 linhas de preços conferidos |
| Acervo | Nove relatos, nove fotos em sete municípios e três vinhetas verificadas |
| Responsividade | 360, 390, 768, 1024 e 1440 px nas rotas recuperadas; regressões adicionais a 320, 375 e 1280 px |
| Acessibilidade automatizada | Nenhuma violação nas regras A/AA habilitadas do axe-core em 17 rotas representativas |
| Fluxos | Busca, aliases, filtros, URL/histórico, menu, foco, teclado, galerias, expansões e formulário passaram |
| Arquivos e console | Sem imagens quebradas ou erros atribuíveis à aplicação nos percursos avaliados |
| Desempenho local | Dez navegações medidas: LCP de 0,800 a 1,296 s; CLS máximo de 0,0329 |
| Carregamento de arquivos | Nenhum PDF, MP4 ou imagem original de preços solicitado automaticamente nas medições finais |

Microsoft Edge instalado, controlado por Playwright em modo headless. As medições de desempenho usaram servidor aquecido, cache do navegador desabilitado, contextos novos, rede simulada de 1,6 Mbps e CPU desacelerada 4 vezes. São amostras de laboratório, sem equivalência a percentis de usuários reais.

O HTML inicial contém os filtros do catálogo e as 152 linhas de preços diretamente em `main`. A auditoria comparou URLs e dados da pesquisa com o resultado servido, além de conferir por assinatura, leitura e hash os arquivos de pesquisa. A leitura visual das fontes complementa esses checks e está registrada nos inventários.

Capturas finais: `.qa/final/`. Relatório Playwright: `playwright-report/index.html`. Evidências versionáveis: `docs/migration/check-production.json`, `check-static.json`, `fragment-navigation.json` e `performance.json`.

Não foram executados Safari/Firefox, leitor de tela, dispositivos físicos ou Lighthouse. Axe-core e teclado não certificam conformidade WCAG integral. Dois banners antigos do contato retornam HTML em vez de JPEG no oficial; sua recuperação depende de cópias válidas da editora, conforme o relatório. Nenhum conteúdo gráfico foi inventado para preencher essa ausência.

Esta revisão foi validada localmente e não foi publicada. Nenhuma mensagem real foi enviada à editora durante os testes.
