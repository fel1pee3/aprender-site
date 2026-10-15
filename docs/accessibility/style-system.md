# Sistema de estilos, leitura e interações

## Contrato das preferências

Os atributos ficam no elemento `html`, com valores validados pelo servidor e pelos controles de leitura:

- `data-theme`: `system`, `light`, `dark`.
- `data-contrast`: `normal`, `more`.
- `data-text-size`: `100`, `125`, `150`, `175`, `200`.
- `data-spacing`: `standard`, `comfortable`.
- `data-motion`: `system`, `reduce`.

O CSS padrão é claro. `prefers-color-scheme: dark` atende somente à escolha Sistema ou à ausência de escolha; as opções explícitas prevalecem. Contraste reforçado tem paletas próprias para claro e escuro.

## Tokens e preservação dos materiais

`src/app/globals.css` concentra superfícies, texto, bordas, ações, foco, overlays, erros, tabelas e áreas de imagem. Componentes existentes reutilizam `--paper`, `--surface`, `--surface-soft`, `--surface-muted`, `--ink`, `--muted`, `--line`, `--control-border`, `--action`, `--action-hover`, `--action-active`, `--action-text`, `--link`, `--focus`, `--overlay`, `--error` e `--error-surface`. Os aliases `--green`, `--deep` e `--soft` preservam compatibilidade com a arquitetura existente.

As áreas de chamada usam tokens próprios de superfície e texto inversos. Capas, mapas, fotografias e documentos preservam suas cores: não há filtro de inversão ou alteração global de saturação. A marca original recebe uma pequena base clara no tema escuro. O modo de cores forçadas continua ativo; a preservação da base da marca é restrita ao próprio logotipo.

## Estados de interação

As folhas de estilo foram revistas na origem. Botões, textos, setas, capas e cards não se deslocam, escalam ou giram em hover e pressionamento. Controles simples usam mudanças de cor, fundo ou borda de **160 ms** (`--motion-control`). Coleções, histórias e galerias têm destaque localizado de contorno e título/ação em **220 ms** (`--motion-emphasis`), sem pintar a área inteira do card ou alterar as cores das imagens. Nas coleções, o círculo da seta também recebe a cor da ação. Hover fica restrito a ponteiros compatíveis e respeita controles desabilitados; foco de teclado mantém contorno próprio e os cards recebem os mesmos destaques de título/ação. Painéis usam **220 ms**, sem bounce.

Transformações estruturais, como a posição inicial do atalho para o conteúdo, continuam funcionando. A preferência Reduzido e a preferência equivalente do sistema eliminam as animações e transições; não existe bloqueio global de `transform`.

O refinamento de hover de 15/10/2026 foi conferido em produção: build e **22 testes** passaram (leitura, oito amostras axe, geometria de hover/pressionamento, galeria, busca e menu). Cinco comparações visuais normal/hover cobriram coleções, histórias, catálogo, listagem editorial e escuro com contraste reforçado. Fundo dos cards, dimensões e filtros das imagens permaneceram estáveis, com tolerância de 0,5 CSS px para arredondamento. O teste móvel em 360 px com espanhol e texto 200% não teve overflow horizontal; a preferência Reduzido zerou as transições. Capturas e medidas estão em `.qa/hover`, ignorado no Git. Ajustes de texto ampliado do catálogo e formulário foram retirados de um bloco de hover para também se aplicarem ao toque.

## Ampliação e espaçamento

Todos os tamanhos de fonte e fontes abreviadas dessas folhas usam `rem`. Os títulos fluidos também multiplicam sua parcela em `vw` pelo fator de leitura, para que a faixa responsiva acompanhe o tamanho escolhido. A escala ocorre em `html`, de 100% a 200%, sem `zoom` nem escala da página.

Grades, campos, cabeçalhos e cartões se reorganizam com texto maior. A navegação usa o menu móvel em tamanhos ampliados, inclusive em desktop. A partir de 150%, o header passa ao fluxo normal para não ocupar permanentemente a tela. Leitura, idioma e Libras ficam em um painel compacto fora do header, aberto por um botão no canto inferior direito. Em telas de até 600 px e texto a partir de 150%, o botão usa somente o ícone com alvo de 48 × 48 CSS px. O painel tem largura limitada à tela, altura máxima e rolagem própria. O avatar do VLibras usa sua sobreposição fixa original em todos os tamanhos, sem reservar faixa lateral ou área no fluxo e sem deslocar o botão ou o painel compacto. Legendas e rótulos passam a crescer no fluxo, sem altura rígida que corte texto. Tabelas mantêm rolagem confinada ao seu contêiner. Comportamento atual e histórico das medidas e verificações estão em [compact-tools.md](compact-tools.md).

Confortável aumenta entrelinha, espaço de parágrafo e moderadamente o espaçamento entre letras e palavras. Esse ajuste é uma preferência de leitura e não é apresentado como tratamento médico.

## Verificação desta etapa

Foi feita análise sintática das dez folhas com PostCSS já instalado. A busca por regras de hover/active não encontrou transformações, escala, deslocamento, rotação, mudança de sombra ou propriedades de geometria. Não restaram tamanhos de fonte em px nessas folhas.

As medições no navegador e as verificações integradas de todos os estados pertencem ao relatório da rodada. Os cálculos de paleta são verificações de pares de tokens, não uma certificação da página inteira.

| Par de tokens | Claro | Escuro | Claro reforçado | Escuro reforçado |
| --- | ---: | ---: | ---: | ---: |
| Texto principal / página | 12,45:1 | 15,50:1 | 16,89:1 | 19,86:1 |
| Texto secundário / superfície suave | 5,52:1 | 7,55:1 | 11,74:1 | 13,38:1 |
| Texto / botão preenchido | 5,41:1 | 10,06:1 | 9,01:1 | 14,92:1 |
| Borda de controle / superfície | 4,82:1 | 5,74:1 | 9,01:1 | 13,31:1 |
| Foco / superfície | 6,18:1 | 9,95:1 | 8,62:1 | 13,12:1 |
