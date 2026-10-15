# Acessibilidade, idiomas e interações

Rodada de 15/10/2026 no repositório existente da proposta da Aprender Editora. A identidade editorial, a home, as fontes de conteúdo e os arquivos locais foram preservados. A entrega não declara certificação WCAG nem revisão linguística humana.

O ajuste posterior de acesso reúne leitura, idioma e Libras no botão “Acessibilidade e idioma”, no canto inferior direito, e mantém o header em uma linha. Uma correção seguinte retirou o espaço reservado ao avatar: o VLibras usa a sobreposição original, e o site mantém sua largura ao abrir e fechar a ferramenta. Comportamento, medidas e histórico de validação estão em [compact-tools.md](accessibility/compact-tools.md). Os resultados completos e as medições de desempenho abaixo são históricos da rodada anterior à mudança de posição; não foram repetidos integralmente para o painel compacto nem para a correção da sobreposição.

## Interações e apresentação

Os estilos dos controles foram corrigidos em suas folhas de origem: hover e active não deslocam, ampliam ou giram botões, textos, setas, cards e capas. O destaque cromático usa 160 ms; o foco tem contorno estático próprio. Hover é condicionado ao ponteiro quando apropriado. Transformações estruturais, como o atalho de conteúdo, permanecem funcionais. Não há bloqueio global de transform.

Os sufixos visíveis de nova aba foram removidos. Links que abrem outra aba mantêm aviso em texto visualmente oculto e `noopener noreferrer`; documentos usam âncoras nativas e só carregam por solicitação. PDFs indicam o idioma original junto de formato, páginas e tamanho.

`src/app/globals.css` concentra tokens semânticos de superfícies, texto, ações, bordas, foco, overlays e erros. Claro, escuro e contraste reforçado possuem combinações próprias, preservando cores de fotografias, capas e mapas. A marca recebe base clara no escuro. O modo de cores forçadas permanece ativo. Os cálculos de contraste dos tokens e as decisões estão em [style-system.md](accessibility/style-system.md).

## Preferências de leitura

`ReadingPreferences.tsx` e `src/lib/reading-preferences.ts` implementam um diálogo nativo com grupos de rádio: aparência Sistema/Claro/Escuro, contraste Padrão/Reforçado, texto 100–200%, espaçamento Padrão/Confortável e movimento Sistema/Reduzido. O acesso fica no painel “Acessibilidade e idioma”, fora do header. Abrir as preferências fecha esse painel e apresenta o diálogo em um portal no corpo da página. Escape fecha, Tab permanece contido, o foco retorna ao botão flutuante de acessibilidade e a rolagem do corpo é liberada. O diálogo tem rolagem própria em telas baixas.

Um cookie próprio, validado por enumerações e com duração máxima de um ano, fornece os atributos ao HTML inicial. Sistema é resolvido por CSS e acompanha o dispositivo. O servidor não acessa window; não há página escondida ou supressão global de erros de hidratação. Cookies inválidos caem nos padrões; com armazenamento bloqueado, a interação permanece na memória da visita. Restaurar altera somente leitura e preserva idioma, formulário e filtros.

O tamanho muda a fonte raiz em unidades relativas, sem zoom ou escala da página. A partir de 150%, o header entra no fluxo normal; a navegação usa o menu compacto nos tamanhos ampliados. Tabelas mantêm rolagem confinada. Reduzido remove movimento decorativo independentemente da configuração do sistema.

## Idiomas e integridade editorial

Português preserva seus caminhos. EN/ES usam rotas reais sob `/en` e `/es`, com a mesma implementação das páginas em `src/app/[locale]/[[...segments]]/page.tsx`. O Proxy determina o idioma pela URL, substitui headers públicos de idioma e mantém o idioma dos aliases. Nenhum estado de processo é necessário ao roteamento.

`src/i18n/server.ts`, `client.tsx`, `shared.ts` e `Link.tsx` organizam traduções controladas. Somente o idioma solicitado é carregado; o servidor traduz os dados da página e envia ao cliente as mensagens de controles utilizadas e os campos necessários aos filtros. Não existe tradutor que reescreve o DOM nem dependência nova de i18n.

O seletor no painel compacto oferece Português, English e Español. A troca faz navegação completa para a página equivalente e preserva consulta e fragmento; isso também encerra corretamente o widget de português. A escolha explícita fica salva, mas não força redirecionamento ao abrir uma URL em outro idioma: o seletor oferece retornar à preferência salva.

As 40 páginas de conteúdo têm três versões: 120 destinos. O HTML usa pt-BR, en ou es; metadados, canonical e alternates acompanham a origem pública e o idioma. `noindex,nofollow` foi mantido. O sitemap inclui as três versões.

As traduções cobrem instituição, coleções, livros e componentes, formação, preços, artigos, relatos, galerias, navegação, validação, estados vazios e mensagens. Nomes próprios e títulos publicados permanecem originais, sem criar edições comerciais estrangeiras. Valores continuam em reais; apresentação numérica usa o locale. Datas, escopos e divergências de 2025/2027 foram preservados. Documentos e imagens originais continuam em português. As sínteses traduzidas de depoimentos são identificadas; não são anunciadas como transcrição integral.

O inventário AST, os manifestos de dados e as verificações de placeholders estão em [i18n-coverage.json](accessibility/i18n-coverage.json). O rastreamento HTTP de todas as páginas está em [served-i18n.json](accessibility/served-i18n.json). A comparação de sentenças detecta possíveis falhas, não comprova qualidade linguística. Manifestos [primário](accessibility/translation-primary.json) e [institucional](accessibility/translation-institutional.json) registram as decisões de preservação. A revisão foi feita com IA, sem aprovação institucional ou revisão humana especializada.

## VLibras

A integração segue o [manual oficial](https://vlibras.gov.br/doc/widget/installation/webpageintegration.html), versão documental 7.0.0, revalidado nesta rodada. O bootstrap oficial consultado solicita a aplicação 7.12.2. Há auto-inicialização, sem misturar new Widget com essa instalação.

`VLibras.tsx` carrega o script somente após solicitação. Uma promise compartilhada evita bootstrap duplicado; o módulo não é acionado novamente quando já há download ou estado anterior aberto. O botão oficial `window.VLibrasWidget.initBtn` ocupa o espaço reservado no painel compacto, com foco e hover personalizados pelas propriedades documentadas. A ativação fecha o painel de acessibilidade, preservando a instância; avisos de carregamento permanecem em uma região de status fora do popover. Ao fechar o avatar, o foco retorna ao botão flutuante de acessibilidade. Não se inventam métodos de abrir, atualizar ou destruir.

O avatar usa a sobreposição fixa original em todos os tamanhos de tela, sem área no fluxo ou faixa lateral reservada. O host externo não ocupa largura ou altura e não contém as coordenadas fixas do painel; o player e os controles internos da shadow root permanecem originais. O botão e o painel de acessibilidade não mudam de posição. O fechamento acompanha o `display` do frame do acionador documentado (`none` aberto, `flex` fechado), oculta o contêiner e limpa a indicação de avatar aberto. O atributo `data-active` do host é apenas um comando de abertura e pode permanecer `true` após fechar. Ver avatar direciona o foco ao contêiner do tradutor. Selecionar um controle e usar Interagir executa a ação original da ferramenta. Diálogos do site continuam no topo e operáveis.

Há limites de 15 s para o bootstrap e 30 s para o módulo, erro anunciado e opção de recarregar para tentar novamente, sem loop automático. Avatar e serviço de tradução dependem de rede e recursos externos. EN/ES oferecem a página equivalente em português; o script não é instalado nesses idiomas.

O teste real atualizado traduziu o título da home e o de Lendo e Escrevendo, verificando HTTP 200 do serviço e reprodução do avatar. Também verificou uma instância após navegação, idioma/retorno ao português, estado anterior aberto e galeria com Interagir em 360, 390 e 1440 px. Após a correção da sobreposição, as dimensões de body, main, header e documento ficaram iguais ao abrir, fechar e reabrir, sem reload. A prova reproduzível fica em `tests/vlibras.spec.ts`; o caso externo é opt-in, separado da suíte habitual. Registro atual: [vlibras-live.json](accessibility/vlibras-live.json); validação específica: [vlibras.md](accessibility/vlibras.md). Não houve revisão por pessoa surda ou intérprete fluente em Libras; teste de integração não atesta qualidade linguística.

## Validação e reprodução

Ambiente: Next.js 16.4.0, React 19.3.0, TypeScript 5.9.3 e Node.js 22.21.1. O projeto não possui script de lint; tipos, build, inventários, comportamento e axe-core são verificados pelos comandos abaixo.

```powershell
npm run typecheck
npm run check:i18n
npm run build
npm run start -- --hostname 127.0.0.1 --port 3101
# Em outro terminal:
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3101'
$env:QA_BASE_URL='http://127.0.0.1:3101'
npm run test:e2e
npm run check:migration
npm run check:refinement
# Serviço externo real, opcional na suíte habitual:
$env:TEST_VLIBRAS_LIVE='1'
npx playwright test tests/vlibras.spec.ts
```

As verificações incluem teclado, cookies inválidos/bloqueados, persistência no HTML, quatro combinações de tema/contraste, movimento, cores forçadas, texto 200%, espaçamentos de teste WCAG, alturas reduzidas e larguras de 320 a 1440 px. Busca, filtros, imagens, PDF, vídeos/VTT, contato e plataformas permanecem cobertos. Dados de contato são sintéticos e nenhuma mensagem é enviada. Axe-core cobre páginas representativas, inclusive idiomas e estados de erro; isso não equivale a leitor de tela real.

As imagens são verificadas por objetos de prova separados: os testes não alteram atributos controlados por React durante a hidratação. Runners paralelos usam diretórios distintos para evitar colisões de traces. Os controles de filtros aguardam a hidratação antes de aceitar alterações, para não perder escolhas feitas antes da instalação de seus eventos.

### Resultados da rodada anterior ao painel compacto

| Verificação | Resultado |
| --- | --- |
| TypeScript e build de produção | Passaram |
| Suíte integrada em produção | 67 casos locais passaram; o caso externo foi confirmado separadamente |
| VLibras em produção, execução separada | 3/3 passaram: duas falhas simuladas e tradução real |
| Migração contra arquivos/HTML | 5.126/5.126 verificações passaram |
| Autonomia de links e arquivos | 3.174/3.174 verificações passaram; 40 páginas e nenhum retorno ao servidor anterior |
| Autonomia estática | 2.148/2.148 verificações passaram |
| Traduções | 2.440 entradas por idioma; 2.372 chaves exigidas pelo inventário, zero faltantes/erro de placeholder |
| HTML dos três idiomas | 120/120 destinos; zero problemas de idioma/metadados/dependências e zero sentenças PT sinalizadas |
| 404 em produção | Sete respostas HTTP e dois contextos Edge, com/sem JS; idioma, conteúdo e recuperação corretos |

Os dois casos simulados de falha do VLibras estão nas duas execuções: são **68 casos distintos** validados no conjunto. Na primeira execução integrada, o teste externo tentou acionar Pular enquanto a tela nativa de carregamento ainda cobria esse botão. A espera foi corrigida para a interface oficial terminar de carregar; os três casos externos passaram na produção em 28 s. Não foi necessário alterar o serviço nem forçar o clique. Os resultados de leitura e interações têm detalhes em [interaction-tests.md](accessibility/interaction-tests.md); a prova de 404 está em [404-ssr.json](accessibility/404-ssr.json).

### Desempenho antes/depois da rodada anterior

Estas medições antecedem o painel compacto. O protocolo de 30 navegações não foi refeito nesta alteração de posição dos controles; os números não representam uma nova medição do header reduzido.

A referência anterior está em [performance.json](refinement/performance.json). A rodada nova usa o mesmo Edge headless, contextos novos, cache desabilitado, latência simulada de 150 ms, download de 1,6 Mbps, upload de 0,75 Mbps, CPU 4× e viewports de 390 × 844 e 1440 × 1000. Foi feita uma navegação por página/tamanho, observando LCP até 1,5 s após network idle. São amostras locais; não demonstram significância estatística nem isolam causalidade.

| Página PT | LCP móvel antes → depois | LCP desktop antes → depois |
| --- | ---: | ---: |
| Home | 1.164 → 1.500 ms | 1.072 → 1.204 ms |
| Catálogo | 840 → 1.052 ms | 892 → 948 ms |
| Lendo e Escrevendo | 1.084 → 1.240 ms | 964 → 1.124 ms |
| Preços | 888 → 1.060 ms | 900 → 956 ms |
| Acervo | 928 → 1.136 ms | 940 → 1.036 ms |

O LCP aumentou nessa amostra: de 56 a 336 ms, conforme a página/tamanho. A renderização por requisição entrega as preferências e o idioma no primeiro HTML, em lugar de pré-renderizar as páginas de conteúdo. Essa escolha e os novos controles têm custo; o resultado não é apresentado como ganho de velocidade. O CLS máximo em PT passou de 0,07091 para 0,05899. Bytes transferidos diminuíram em oito das dez comparações; preços e acervo móveis aumentaram cerca de 6,8–6,9 kB.

Foram medidas também dez navegações EN e dez ES: LCP de 908–1.312 ms em inglês e 920–1.360 ms em espanhol. Nas 30 medições, houve **zero carregamento automático de PDF, vídeo, imagem integral da tabela ou VLibras**. Dados completos e comparação: [performance-after.json](accessibility/performance-after.json), [performance-comparison.json](accessibility/performance-comparison.json).

Para repetir sem substituir a referência anterior:

```powershell
$env:QA_BASE_URL='http://127.0.0.1:3101'
$env:PERFORMANCE_OUTPUT='docs/accessibility/performance-after.json'
$env:PERFORMANCE_LOCALES='pt,en,es'
npm run measure:performance
```

## Limites específicos

- Traduções do site e Libras ainda precisam de revisão humana especializada.
- Não foi executada avaliação com leitor de tela real ou pessoas com deficiência; não há declaração de conformidade certificada.
- A ampliação de layout foi verificada por viewport equivalente e pelo controle de texto a 200%, incluindo reflow de 320 CSS px; não se anuncia teste dos atalhos da interface nativa de zoom do navegador.
- A estrutura interna dos PDFs preservados não foi integralmente auditada. A página fornece informações essenciais em HTML e identifica o idioma original.
- O widget oficial mantém seus próprios controles internos, recursos de reprodução e estilos. Atualizações externas podem exigir nova verificação; seus arquivos não são modificados.
- As medições são de laboratório local com rede/CPU simuladas, sem nota Lighthouse nem dados de usuários reais.

A página `/acessibilidade`, traduzida e ligada ao footer, descreve recursos e limites em linguagem de uso. Arquitetura, logs e decisões técnicas permanecem nesta documentação.
