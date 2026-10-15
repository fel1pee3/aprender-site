# VLibras: integração e evidência

O [manual oficial de integração](https://vlibras.gov.br/doc/widget/installation/webpageintegration.html), versão documental 7.0.0, e o [bootstrap oficial](https://vlibras.gov.br/app/vlibras-plugin.js) foram revalidados em 15/10/2026. O bootstrap observado tem 2.368 bytes e referencia a aplicação 7.12.2.

## Ciclo

O primeiro acionamento de Libras no painel “Acessibilidade e idioma”, aberto pelo botão no canto inferior direito, carrega um script único. Sua auto-inicialização é mantida: não há chamada adicional de new Widget. O elemento documentado `window.VLibrasWidget.initBtn` substitui o acionador inicial no mesmo espaço e recebe o clique solicitado pelo visitante. Fechar o popover não desmonta esse elemento nem a instância oficial.

A promise compartilhada e o bloqueio de cliques durante o carregamento impedem bootstrap e módulo duplicados. Também é observado o módulo que o bootstrap eventualmente solicitar por ter um estado anterior aberto salvo. Não se dispara uma segunda solicitação nesse intervalo. O teste com armazenamento anterior e atraso artificial de 400 ms confirma uma única aplicação.

O bootstrap só é carregado por gesto, evitando abertura espontânea do avatar em novas visitas. Há limites de 15 s para esse recurso e 30 s para o módulo, erro anunciado e opção de recarregar para uma tentativa explícita, sem repetição automática. A ativação fecha o painel compacto e devolve o foco ao botão flutuante. O status de carregamento/abertura fica em uma região visualmente oculta persistente, montada em um portal fora do popover, para continuar disponível aos recursos assistivos. Em caso de falha, o painel reabre e a tentativa adicional recebe foco; se houver um diálogo aberto, essa apresentação aguarda seu fechamento.

A troca de idioma faz navegação completa. Em EN/ES, o link leva à página equivalente em português e preserva consulta/fragmento. Não se instala VLibras sobre texto inglês ou espanhol. A navegação interna em português conserva a instância. Não são usados métodos privados de abrir, atualizar ou destruir.

## Apresentação e interação

O botão oficial tem alvo de 44 × 44 CSS px, usa as variáveis documentadas de foco e hover e permanece no painel compacto, fora do header. Seu balão de divulgação fica oculto. O acesso flutuante do site reúne leitura, idioma e Libras em um único painel, sem acrescentar um segundo acionador flutuante próprio do VLibras. Fechar o avatar devolve o foco ao botão “Acessibilidade e idioma”.

O avatar usa a sobreposição fixa original em todos os tamanhos de tela. O host externo e seu contêiner não reservam largura nem altura no documento e usam `contain: none`, preservando as coordenadas de viewport do painel e do comando contextual Interagir. Não há faixa lateral, fundo adicional, redução da largura do site ou deslocamento do acesso compacto. Os controles e o player dentro da shadow root não são reescritos.

O estado aberto acompanha o frame do acionador documentado, `window.VLibrasWidget.initBtn.parentElement`: a aplicação oficial define `style.display` como `none` ao abrir e `flex` ao fechar. Esse frame já é observado para o retorno de foco. A mesma mudança sincroniza a indicação de avatar aberto, oculta o contêiner ao fechar e limpa `data-libras-open` sem recarregar a página. O atributo `data-active` do host é um comando de abertura e pode continuar `true` após fechar; não representa o estado visível.

Essa correção posterior, de 15/10/2026, substitui a implementação que reservava 460 px no fluxo em celular/tablet e uma faixa lateral de 336 px em desktop. Os experimentos e resultados anteriores continuam registrados abaixo como histórico, sem representar a geometria atual.

O modo de seleção oficial intercepta a seleção de links/botões e oferece Interagir para executar a ação original. O site explica essa ação. Ver avatar permite direcionar o foco ao contêiner do tradutor. Os testes selecionam a galeria, acionam Interagir, abrem o diálogo e fecham com Escape, verificando retorno de foco.

## Verificação da sobreposição em produção

O teste opt-in em `tests/vlibras.spec.ts` foi executado em produção local em 15/10/2026 e confirmou:

- Ausência de rede VLibras antes do acionamento.
- Tradução dos títulos da home e de Lendo e Escrevendo com HTTP 200 do serviço e avatar em reprodução.
- Um bootstrap e uma aplicação após navegação entre páginas.
- Fechamento com retorno de foco ao botão flutuante “Acessibilidade e idioma”.
- Painel sobreposto dentro da viewport e galeria utilizável em 360 × 560, 390 × 844 e 1440 × 1000.
- Dimensões de body, main, header e documento idênticas antes, durante, depois de fechar e ao reabrir. O contêiner permanece com largura/altura zero.
- Fechamento pelo botão nativo oculta o contêiner e remove `data-libras-open`, sem recarregar a página.
- EN sem script/instância, caminho equivalente PT e novo acionamento após retorno.
- Estado anterior aberto sem inicialização duplicada.
- Falhas simuladas de bootstrap e módulo com mensagem, foco na tentativa adicional e conteúdo principal disponível.

Registro com respostas, dimensões e ambiente: [vlibras-live.json](vlibras-live.json). As imagens de inspeção ficam em `.qa/accessibility/vlibras-final-*.png`, ignoradas no Git.

O build e o TypeScript passaram. Os oito casos relacionados foram confirmados: cinco do painel compacto e duas falhas simuladas na execução inicial, mais o caso real em execução separada. O teste real passou em 59,8 s, incluindo tradução, três ciclos de layout, galeria com Interagir e mudança de idioma. A medição espera a animação nativa de abertura terminar; a seleção da galeria usa uma parte realmente exposta da página, sem forçar cliques através do avatar. Resultados locais em `.qa/libras-overlay/production-tests` e `.qa/libras-overlay/live-final`; este último tem estado `passed`. As capturas da home em 1440 e 360 px também foram inspecionadas em `.qa/libras-overlay/inspect-*.png`.

## Limites

O teste comprova integração e reprodução, não fidelidade linguística. Não houve revisão por pessoa surda ou intérprete fluente em Libras. O serviço não substitui interpretação humana em conteúdo educativo.

Avatar, dicionários e tradução dependem de recursos externos do serviço oficial. Os controles e estilos internos do widget são os do fornecedor; a personalização de tema/foco do projeto alcança o acionador documentado. Atualizações externas exigem nova validação. PDFs e texto dentro de imagens não são anunciados como automaticamente traduzidos.
