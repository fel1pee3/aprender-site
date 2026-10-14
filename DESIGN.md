# Direção visual

A proposta aproxima uma publicação editorial do cotidiano de quem ensina. Uma base clara, verde profundo, títulos com personalidade e fotografias documentais dá espaço às cores reais das coleções. A interface conversa com gestores e educadores, sem reproduzir uma linguagem visual infantil.

## Composição

A abertura combina uma mensagem curta e uma fotografia de formação do acervo da editora. O selo “desde 2005” informa a origem sem transformar a edição comemorativa de 2025 em um aniversário atual. O traço amarelo, o canto curvo da imagem e os pequenos números editoriais dão continuidade à composição.

A página inicial progride da proposta para as evidências históricas, os quatro elementos do trabalho pedagógico, as etapas, as capas e os registros. Cartões ficam concentrados em conteúdos selecionáveis. Formação, história e detalhes de soluções usam composições próprias. Em celular, o texto precede a imagem e filtros e formulários se organizam em uma coluna.

O logotipo arredondado foi extraído dos contornos originais do catálogo, sem redesenhar ou inventar um símbolo. O favicon é apenas uma inicial tipográfica para a demonstração.

## Tokens

| Função | Valor |
| --- | --- |
| Fundo principal | `#F7F8F2` |
| Superfície | `#FFFFFF` |
| Texto principal | `#17352A` |
| Texto secundário | `#526359` |
| Verde de ação | `#157A3B` |
| Verde profundo | `#0C4B2B` |
| Verde suave | `#E7F1E7` |
| Divisores | `#D7DFD3` |
| Acento quente | `#EAAF38` |
| Foco visível | `#B25B19`, contorno de 3 px |

São escolhas do redesign, não códigos oficiais da marca. O amarelo recebe texto escuro e não é usado para texto pequeno sobre fundo branco. A análise automatizada verificou as combinações renderizadas nas rotas avaliadas; contrastes insuficientes nos números decorativos foram corrigidos.

Lora é usada em títulos editoriais; Manrope, em texto e interface. As duas famílias variáveis são locais, sob SIL Open Font License 1.1, com caracteres portugueses e fallback Georgia/Arial. `font-display: swap` preserva o acesso ao conteúdo. Títulos usam escalas fluidas, com H1 até 68 px e ajuste em celular. O corpo das páginas de leitura usa 17–18 px; rótulos e metadados são menores.

Conteúdo central de até 1280 px, margens entre 22 e 48 px, espaçamentos baseados em 4/8 px, raio padrão de 8 px e divisores discretos. Sombras são reservadas às capas e ao menu. Transições entre 150–300 ms apenas em ações, imagens e foco; `prefers-reduced-motion` remove movimento dispensável.

## Acessibilidade e conteúdo

Um H1 por página, idioma pt-BR, breadcrumbs, link para pular navegação, estados atuais, rótulos explícitos e mensagens associadas aos campos. O menu usa `dialog`, fecha com Escape, contém o foco e o devolve ao botão. Mensagens preparadas ficam disponíveis para revisão e cópia; nenhum sucesso de envio é simulado.

Capas mantêm sua proporção com `object-fit: contain`. Fotografias recebem enquadramento responsivo, legenda contextual e identificação de acervo. Não foram geradas pessoas, depoimentos ou registros de eventos. O PDF completo é acessado somente pela ação do visitante.
