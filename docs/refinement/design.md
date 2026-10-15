# Abertura, navegação e movimento

## Direção implementada

- A abertura apresenta a área de atuação antes do H1: **Alfabetização e educação básica**. O título **Materiais e formação para aprender** é acompanhado de um parágrafo que explica livros, formação de educadores, acompanhamento pedagógico e etapas atendidas.
- As ações principais levam às soluções e à formação. O contato contextual continua disponível no restante da página e no header.
- A fotografia de formação do catálogo 2025 permanece como protagonista. Um conjunto real de livros de **Lendo e Escrevendo**, para criança, professor e família, aparece como apoio e leva à coleção. As imagens usam dimensões reservadas e preservam proporção; as capas não foram redesenhadas.
- A composição usa moldura de página, linha amarela e papel claro. No celular o texto precede a imagem; a abertura não utiliza `100vh`.
- Os quatro indicadores do catálogo 2025 continuam em uma faixa própria, com definições e acesso à contextualização na trajetória. O link da faixa é interno. Os depoimentos da home apontam para o relato completo no acervo.
- O rodapé concentra a identificação do projeto de apresentação em uma linha discreta e mantém rotas, contato e quatro redes sociais.

## Movimento e acessibilidade

- Tokens globais: controles **180 ms**, painéis **260 ms**, entrada pontual **360 ms**, curva `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- Header com altura estável e mudança de fundo, borda e sombra após 16 px de rolagem; estado ativo acompanha a rota. O scroll listener é passivo, com atualização por `requestAnimationFrame`.
- Menu móvel usa `dialog` modal nativo, contenção de foco, Escape, bloqueio de rolagem do fundo e retorno explícito ao botão. A transição de entrada/saída é curta e progressiva, sem dependência dela para funcionamento.
- Foco visível, hover e pressionado têm estados coerentes. Setas se deslocam 4 px sem deslocar o texto; capas se elevam 4 px, sem rotação.
- Apenas três grupos da home recebem entrada de 6 px, uma vez por montagem. O conteúdo já está visível sem JavaScript; a animação começa em opacidade 0,96. O H1 e a imagem principal não dependem dessas entradas.
- `prefers-reduced-motion` desativa animações, transições e rolagem suave. Âncoras e controles em foco recebem margem compatível com o header.

## Compartilhamento

`public/images/social/aprender-share.jpg` é um cartão de **1200 × 630 px**, composto com marca, mesma fotografia, kit real e redação da home. O script `node scripts/create-share-image.mjs` reproduz o cartão com Sharp já instalado pela stack; não usa geração de pessoas ou capas. A ligação às metatags é centralizada em `src/lib/metadata.ts`.

## Verificação

Inspeção local com Edge headless em 360 × 640, 390 × 844, 768 × 640, 1024 × 768 e 1440 × 900 px: sem rolagem horizontal, header com altura constante antes/depois do scroll e CTAs com área de toque de pelo menos 51 px. Em 360 × 640, as duas ações principais terminam em aproximadamente 555 px, dentro da primeira tela. Nas quatro larguras com menu móvel, abertura, Tab/Shift+Tab contidos, Escape e retorno do foco passaram. A redução de movimento deixa `scroll-behavior:auto`, transição do header em `0s` e os grupos sem animação ou deslocamento. Sem JavaScript, título e grupos continuam visíveis. Capturas locais em `.qa/refinement/home-{largura}.png`; medidas em `docs/refinement/home-review.json`; reprodução com `QA_BASE_URL` e `node scripts/review-home-refinement.mjs`.

As verificações integradas da rodada, o build de produção e eventuais limites são registrados em `docs/relatorio-refinamento-final.md`. Esta inspeção de layout usou servidor de desenvolvimento e não representa uma medição de desempenho de produção.
