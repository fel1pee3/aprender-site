# Verificação da entrega

Realizada em **13 de outubro de 2026**, contra o build de produção servido localmente. Nenhuma publicação ou envio de mensagem foi realizado.

## Resultados

| Verificação | Resultado |
| --- | --- |
| `npm run typecheck` | Passou, sem erros de TypeScript |
| `npm run build` | Passou; Next.js gerou 34 páginas/entradas estáticas |
| `npm run test:e2e` | **8 testes passaram**, execução final em 22,6 s |
| Rotas de conteúdo | 30 URLs retornaram HTTP 200 e um H1, com pt-BR e noindex |
| Caminhos desconhecidos | 3 variantes retornaram HTTP 404 |
| Capas das coleções | Todos os 20 arquivos retornaram HTTP 200 e conteúdo WebP |
| Busca e filtros | Acentos, combinação, resultados vazios, limpeza, recarga, URL e voltar no histórico verificados |
| Contato | Contexto da coleção, validação, conservação de campos, preparação, link mailto e cópia verificados |
| Cópia indisponível | Texto selecionado e orientação manual, sem mensagem falsa de sucesso |
| Menu móvel | Abertura, contenção e retorno do foco, Escape, navegação e página atual verificados |
| Responsividade | Sem overflow horizontal em início, catálogo, solução e contato a 320, 375, 768, 1280 e 1440 px |
| Imagens e console | Nenhuma imagem quebrada, exceção ou erro de console nos percursos de navegador avaliados |
| Axe-core | Nenhuma violação detectada com as regras WCAG 2/2.1/2.2 A/AA habilitadas, em oito rotas representativas |
| Reflow e movimento | Viewport de 640 × 450 como equivalente de layout de 1280 × 900 a 200%; conteúdo e controles utilizáveis, link de pular e movimento reduzido verificados |

Navegador: Microsoft Edge instalado no ambiente, controlado por Playwright em modo headless. Relatório detalhado gerado em `playwright-report/index.html`; a suíte reprodutível está em `tests/site.spec.ts`.

## Revisão visual

As capturas completas e da primeira viewport foram produzidas por `scripts/review.mjs` e examinadas. Foram revisadas a hierarquia da abertura, a integridade da marca, os recortes, as capas, a sequência das seções e a reorganização em celular.

- `.qa/home-1440.png` e `.qa/home-375.png`
- `.qa/solution-1440.png` e `.qa/solution-375.png`
- Variantes `*-viewport.png`, além de capturas a 320 px.

Correções realizadas a partir da revisão: overflow na faixa de indicadores a 320 px, contraste dos números auxiliares, contenção de foco do menu ao navegar com Tab, tamanho dos textos de apoio, distribuição das capas em celular e variedade das fotografias nos registros. As verificações pertinentes foram repetidas após as correções.

## Limites

Não foram executados Lighthouse, testes em Safari/Firefox, leitor de tela ou dispositivos físicos. A análise automatizada não substitui uma auditoria manual completa nem comprova conformidade integral com WCAG 2.2 AA. A verificação de reflow usa viewport equivalente, não medição de zoom na interface gráfica do navegador.

Não há dados de campo de LCP, INP ou CLS, nem alegação de cumprimento dos percentis de produção. As imagens são locais e otimizadas, têm dimensões reservadas, o recurso principal recebe prioridade e as demais imagens usam carregamento sob demanda; o PDF completo fica fora da renderização inicial.

Os destinos das plataformas foram consultados publicamente; login e funções privadas não foram testados. O formulário não tem backend por definição da proposta. A caixa de e-mail não foi testada com mensagem real. O catálogo é de 2025, por isso atualidade de componentes, cargas horárias, endereço e condições comerciais precisa ser confirmada pela editora antes de uma implantação oficial. A rastreabilidade está em `SOURCES.md`.
