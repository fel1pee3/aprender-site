# Verificação de leitura e interações

Os resultados completos abaixo documentam a rodada anterior à mudança de posição dos controles. O acesso atual parte do botão “Acessibilidade e idioma” no canto inferior direito: o painel compacto abre as preferências e fecha antes do diálogo; ao fechar o diálogo, o foco retorna ao botão flutuante. A validação específica do novo acesso está em [compact-tools.md](compact-tools.md).

`tests/accessibility.spec.ts` acrescenta nove casos de comportamento, executados com Microsoft Edge headless no servidor local da rodada (`http://127.0.0.1:3100`, desenvolvimento), com um worker:

1. Preferências salvas no cookie, presentes no HTML servido e mantidas após navegação/reload; nenhum erro de hidratação observado.
2. Tema Sistema acompanha o dispositivo, Claro explícito prevalece e a preferência de movimento funciona tanto pelo painel quanto pelo sistema.
3. Restaurar leitura preserva idioma espanhol, filtros, solução selecionada e dados preenchidos no contato.
4. Cookies inválidos e bloqueio simulado de cookies/localStorage/sessionStorage mantêm a navegação e as preferências durante a visita.
5. Em 360 × 640, texto 200%, espaçamento Confortável e escuro reforçado: diálogo de leitura cabe na tela, tem rolagem própria, Tab permanece contido, Escape fecha e foco retorna; menu móvel também opera. Na versão atual do teste, o acesso usa o painel compacto e o retorno de foco aponta para o botão flutuante de acessibilidade.
6. Reflow sem rolagem horizontal da página em 320, 360, 390, 768, 1024 e 1440 px, com conteúdo espanhol real, texto 200% e espaçamento Confortável. Home, catálogo, coleção extensa, acervo, preços e contato foram percorridos; tabelas preservam seu contêiner de rolagem.
7. Comparação de posição, dimensão e transformação de elementos e descendentes em hover/active: botão preenchido, secundário, navegação, card/capa, arquivo, galeria e envio do formulário permanecem estáveis.
8. Links mantêm avisos programáticos de nova aba e `noopener`, sem sufixos visíveis, em páginas de português, inglês e espanhol.
9. Contato em inglês e espanhol associa erros aos campos, valida endereço, preserva solução e prepara o e-mail com feedback honesto. Nenhuma mensagem foi enviada; nenhum aplicativo externo foi aberto.

Após a correção de propagação do idioma no Proxy, os oito casos principais passaram. O caso adicional de contato passou em execução separada, em 7,6 s, depois de corrigir seu seletor e aceitar as redações equivalentes aprovadas nos dicionários de formulários. Uma execução anterior teve falha operacional de artefato compartilhado (`ENOENT` de trace), resolvida com diretórios separados de saída; essa falha não era uma asserção da interface.

Os arquivos de resultado ficam em `.qa/accessibility/preferences-results` e `.qa/accessibility/contact-results`. Para reproduzir sem interferir em outros runners:

```powershell
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3100'
npx playwright test tests/accessibility.spec.ts --workers=1 --output=.qa/accessibility/preferences-results --reporter=line
```

Capturas dos quatro temas e da combinação móvel com texto ampliado foram inspecionadas em `.qa/accessibility`. O painel ampliado mediu 334 × 614 px dentro da tela de 360 × 640, sem overflow horizontal e com conteúdo rolável.

Essa verificação não equivale a teste com leitor de tela, certificação WCAG, revisão humana das traduções ou revisão linguística de Libras. Build e regressões de produção são registrados no relatório integrado da rodada.

## Confirmação em produção da rodada anterior

A execução final em `http://127.0.0.1:3101` confirmou os 19 casos deste arquivo, incluindo os nove originais, um caso de espaçamento do usuário, oito amostras axe e um caso de cores forçadas. O espaçamento de teste aplica entrelinha 1,5, parágrafos 2em, letras 0,12em e palavras 0,16em a home, coleção, preços e contato, em 320 e 1440 px.

As amostras axe cobrem os quatro temas na home, acessibilidade EN/ES, coleção extensa EN e contato ES com erros. Não foram encontradas violações pelos critérios configurados na ferramenta. Cores forçadas preservam os ajustes do sistema, foco e operação do painel. A suíte ampliada, 120 destinos e VLibras real são descritos em [acessibilidade-idiomas-interacoes.md](../acessibilidade-idiomas-interacoes.md).
