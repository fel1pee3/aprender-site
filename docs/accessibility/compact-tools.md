# Acesso compacto a leitura, idioma e Libras

Ajuste de 15/10/2026: os três recursos saíram da segunda linha do header e passaram para um painel aberto pelo botão “Acessibilidade e idioma” no canto inferior direito. O header mantém marca, navegação e ações em uma linha.

## Comportamento

- O botão usa ícone e texto em desktop. Em telas de até 600 px e texto a partir de 150%, apresenta somente o ícone, com nome acessível e alvo de 48 × 48 CSS px.
- O painel usa `popover="auto"` nativo, abre por clique/teclado e fecha pelo botão próprio, por Escape, clique fora ou mudança de página. O foco inicial vai para Preferências de leitura. A navegação por Tab não fica presa nesse painel não modal.
- Abrir Preferências de leitura fecha o popover e apresenta o diálogo nativo em um portal no corpo da página. O diálogo mantém a contenção de foco e sua própria rolagem; ao fechar, o foco retorna ao botão flutuante.
- O seletor mantém Português, English e Español e a navegação para a página equivalente, preservando consulta, fragmento e preferências.
- Ativar Libras fecha o painel compacto. O conteúdo do popover permanece montado para conservar o botão e a instância oficial; o avatar usa a sobreposição fixa original sem reservar espaço no documento. Ao fechar o avatar, o foco retorna ao botão flutuante.
- O status de carregamento/abertura do VLibras permanece em uma região visualmente oculta fora do popover, montada por portal. Uma falha reabre o painel e direciona o foco à tentativa adicional, aguardando o fechamento de um diálogo caso necessário.
- O painel tem largura limitada à tela, altura máxima e rolagem própria. Botão e painel mantêm sua posição quando o avatar é aberto ou fechado; não há faixa lateral nem deslocamento do conteúdo. O fim do footer reserva espaço para o botão e o foco tem margem inferior de rolagem.

## Correção posterior da sobreposição do VLibras

Em 15/10/2026, a área reservada ao avatar foi retirada de todos os tamanhos de tela. O widget conserva sua sobreposição original, enquanto seu host externo e contêiner não ocupam largura ou altura no documento. A mudança não altera o espaço do header nem a posição do botão e do painel compacto.

O fechamento acompanha o `display` do frame do acionador oficial: `none` significa avatar aberto e `flex`, fechado. Esse estado oculta o contêiner e limpa a indicação de avatar aberto ao fechar, sem depender de atualização da página. O atributo `data-active` do host continua sendo um comando do fornecedor, não a fonte do estado visível. Detalhes em [vlibras.md](vlibras.md).

As medidas, capturas e execuções descritas nas próximas seções são históricas da implantação do acesso compacto, anteriores a essa correção. Não representam nova validação da sobreposição.

A correção da sobreposição foi confirmada depois em build de produção: oito casos relacionados passaram, incluindo o serviço real. Em 360, 390 e 1440 px, abrir, fechar e reabrir preservou as dimensões de body/main/header e documento; o contêiner fechou e a indicação de aberto foi limpa sem reload. Evidência atual em [vlibras.md](vlibras.md) e [vlibras-live.json](vlibras-live.json).

## Inspeção visual

Capturas locais inspecionadas em `.qa/compact-tools`, diretório ignorado no Git. Medidas em CSS px, com texto a 100%:

| Viewport | Altura do header | Botão | Largura do painel |
| --- | ---: | --- | ---: |
| 1440 × 1000 | 85 | aproximadamente 153 × 48, ícone e texto | 352 |
| 390 × 844 | 77 | 48 × 48, somente ícone | 352 |

O painel ficou contido na largura dos dois viewports, sem overflow horizontal. As capturas correspondem a `home-1440.png`, `home-390.png`, `panel-1440.png`, `panel-390.png` e às medidas em `visual.json`.

## Arquivos

- `src/components/AccessibilityTools.tsx` e `.module.css`: botão, popover, organização e foco.
- `Header.tsx` e `.module.css`: retirada da segunda linha e redução da altura.
- `ReadingPreferences.tsx` e `.module.css`: diálogo em portal, acionador e retorno de foco.
- `VLibras.tsx` e `.module.css`: passagem de foco, tratamento de falha e status fora do painel.
- `LanguageSwitcher.module.css`, `Icon.tsx`, `Footer.module.css`, `src/app/layout.tsx` e `globals.css`: apresentação dos controles, ícone, posição e espaço de foco.
- `src/app/acessibilidade/page.tsx`, dicionários EN/ES e inventário de mensagens do cliente: instruções de uso e rótulos traduzidos.
- `tests/helpers/compact-tools.ts`, `tests/compact-tools.spec.ts` e adaptações dos testes de leitura, idiomas e VLibras: acesso pelo novo botão.

## Validação histórica do acesso compacto

Os **24 casos em desenvolvimento passaram** no servidor local `http://127.0.0.1:3100`, com Microsoft Edge headless e um worker: 19 casos de leitura/acessibilidade e cinco do acesso compacto. O resultado está em `.qa/compact-tools/dev-tests/.last-run.json`.

Os cinco casos específicos verificam desktop, celular, teclado/Escape/clique fora, passagem para o diálogo e retorno de foco, painel com texto 200% em uma tela baixa e ausência de sobreposição dos controles do footer.

O build de produção passou com TypeScript. No servidor `http://127.0.0.1:3101`, **19 casos distintos passaram**: cinco do acesso compacto, sete de idiomas (incluindo 120 URLs e a troca pelo novo painel), três do VLibras, dois de leitura e dois de busca/menu móvel. O teste real confirmou tradução com HTTP 200, reprodução, uma única instância, retorno de foco e galeria em 360, 390 e 1440 px. Os avisos de carregamento foram verificados com o popover recolhido; as falhas simuladas reabriram o painel com foco na tentativa adicional.

A primeira execução confirmou 14 dos 15 casos principais. O caso de teclado consultava a rolagem imediatamente após o fechamento do diálogo, antes da limpeza do efeito React. Sua asserção passou a aguardar a liberação da rolagem com a espera automática do Playwright. A execução focada passou nos cinco casos, incluindo esse caso corrigido e as quatro regressões adicionais. Evidência local: `.qa/compact-tools/production-tests` e `.qa/compact-tools/production-focused`; a segunda execução possui `.last-run.json` com estado `passed`.

```powershell
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3101'
$env:TEST_VLIBRAS_LIVE='1'
npx playwright test tests/compact-tools.spec.ts tests/i18n.spec.ts tests/vlibras.spec.ts --workers=1 --output=.qa/compact-tools/production-tests --reporter=line
npx playwright test tests/compact-tools.spec.ts tests/accessibility.spec.ts tests/site.spec.ts --grep 'launcher e painel|preferências persistem|texto 200%, escuro reforçado|menu de celular|busca sem acentos' --workers=1 --output=.qa/compact-tools/production-focused --reporter=line
```

O inventário de tradução desta versão confirmou 2.444 entradas por idioma, 2.374 chaves exigidas e zero falhas. O registro [vlibras-live.json](vlibras-live.json) e o rastreamento [served-i18n.json](served-i18n.json) foram atualizados pela execução em produção.

O protocolo anterior de 30 medições de desempenho não foi repetido para o painel compacto. Os números em [acessibilidade-idiomas-interacoes.md](../acessibilidade-idiomas-interacoes.md) e nos arquivos `performance-after.json`/`performance-comparison.json` permanecem históricos da rodada anterior.
