# Auditoria do redesign da Aprender Editora

Comparação realizada em 14 de outubro de 2026.

Site oficial: https://www.aprendereditora.com.br/  
Redesign de Felipe Maia: https://aprender-site.vercel.app/

**Resultado da análise**

O redesign apresenta uma identidade visual coerente, leitura organizada e interações úteis. A migração do conteúdo está incompleta. A estrutura adotada resume o acervo e prioriza o catálogo de 2025; ela não preserva todas as informações e recursos publicados no site oficial consultado.

A correção recomendada é manter a direção visual e completar o conteúdo. Existem versões diferentes de materiais e dados; preservar a informação exige registrar a fonte e a edição, sem apresentar automaticamente dados históricos como oferta comercial vigente.

O prompt anterior fornecido nesta conversa priorizou a síntese e o catálogo de 2025. Faltou uma exigência explícita de conferência de cada informação do site oficial. Esta auditoria corrige essa lacuna no escopo.

**Escopo e evidências**

- Foram localizados 30 caminhos públicos distintos no site oficial, incluindo páginas secundárias da trajetória e três páginas de vídeo.
- Foram examinados 30 caminhos no redesign: sete páginas principais, 20 páginas de soluções e três registros editoriais.
- Foram levantadas 150 imagens do conteúdo oficial. Os textos nas imagens centrais foram examinados por extração e inspeção visual de exemplos relevantes. Duas miniaturas laterais do formulário não puderam ser interpretadas como imagens nesta coleta.
- Foram identificados 28 links para PDFs oficiais: 27 amostras de materiais e um documento do PAIC. A conferência final confirmou resposta HTTP 200 e tipo PDF em todos; quatro consultas apresentaram erro 502 temporário antes de serem revalidadas.
- A avaliação visual foi feita em navegador desktop com largura de 1363 px. Foram testados busca, filtros, ausência de resultados, atalho por teclado, validação e preparação local da mensagem, e seleção da coleção no contato.
- A leitura do HTML foi complementada pelo navegador nas páginas com conteúdo carregado no cliente, como catálogo e formulário.
- Os PDFs das amostras foram inventariados e tiveram os links conferidos; os três arquivos de vídeo responderam HTTP 200 com tipo MP4. Esta auditoria não revisou integralmente o conteúdo pedagógico dos livros nem a reprodução completa dos vídeos.
- Não houve acesso ao repositório, alteração do projeto, envio de mensagem à editora, teste em aparelho móvel ou medição de desempenho por Lighthouse.

A quantidade de rotas, isoladamente, não demonstra equivalência de conteúdo. As duas estruturas têm propósitos editoriais e agrupamentos diferentes.

**Correções prioritárias**

| Prioridade | Achado | Correção recomendada |
| --- | --- | --- |
| Antes de apresentar como conteúdo completo | Lendo e Escrevendo e ACerta Brasil estão no oficial e não aparecem nas 20 soluções do redesign. | Preservar páginas, descrição, componentes e amostras. Registrar a edição e confirmar a situação comercial antes de anunciar disponibilidade atual. |
| Antes de apresentar como conteúdo completo | A tabela oficial identificada como 2027 está ausente. Ela também contém materiais de inglês não encontrados no redesign. | Criar acesso à tabela publicada, com seu ano visível. Inventariar também os produtos encontrados nela. |
| Antes de apresentar como conteúdo completo | Avançando Juntos está restrito ao 9º ano no redesign. A tabela de 2027 lista 6º, 7º, 8º e 9º anos. | Registrar a diferença: o catálogo de 2025 realmente descreve o 9º ano. Conferir a oferta de 2027 e acrescentar os demais anos documentados, sem misturar versões. |
| Antes de apresentar como conteúdo completo | Os 27 PDFs individuais de amostras e o PDF do PAIC não têm acesso equivalente no redesign. | Restaurar os links por coleção, volume e ano; o catálogo completo não substitui essas amostras. |
| Antes de apresentar como conteúdo completo | A missão não aparece como declaração institucional; sete valores foram resumidos em seis entradas. | Publicar a missão com sua versão identificada e separar responsabilidade social de responsabilidade profissional. Preservar os textos completos em uma área de detalhes. |
| Antes de apresentar como conteúdo completo | Histórico, PAIC, resultados e plano de ação foram reduzidos. | Criar conteúdo completo de trajetória/resultados e detalhar formação, reuniões com gestores e acompanhamento em sala. |
| Antes de compartilhar a proposta | Metatags de imagens sociais apontam para http://localhost:3000 nas 30 páginas examinadas. | Usar URLs públicas de produção para Open Graph e Twitter em todas as páginas e testar a prévia de compartilhamento. |
| Próxima etapa | Nove depoimentos, três vídeos e a galeria oficial de formações foram omitidos. | Preservar o acervo com identificação histórica e apresentação acessível. |
| Próxima etapa | Só o Instagram foi mantido entre as redes sociais. | Restaurar os canais vinculados pelo oficial, verificando seu estado atual antes de apresentá-los como canais ativos. |
| Refinamento visual | Algumas descrições são genéricas e as páginas de coleção têm pouca demonstração do material. | Tornar as entregas pedagógicas concretas e acrescentar galerias de kits, volumes, páginas e amostras. |

Fonte da tabela: https://www.aprendereditora.com.br/tabela-precos  
Imagem publicada: https://www.aprendereditora.com.br/v2/midia/kcfinder/images/tabela_precos_2027.jpg

A tabela é identificada como 2027 no próprio arquivo. Essa identificação não prova, por si, a vigência comercial de cada preço em outubro de 2026.

**Matriz de todas as páginas oficiais localizadas**

“Parcial” significa que o tema aparece, mas a informação original não foi preservada integralmente. “Preservado” abaixo se refere ao recurso descrito, não à reprodução idêntica de layout ou imagem. “Ausente” significa que não foi encontrado um destino equivalente na estrutura pública examinada.

| Caminho oficial | Destino no redesign | Situação e informação a recuperar |
| --- | --- | --- |
| / | / | Parcial. Indicadores foram atualizados; faltam depoimentos, vídeos e a medida específica de estudantes alfabetizados. |
| /quem-somos | /a-editora | Parcial. Mantém origem e área de atuação, mas resume a apresentação da equipe, sua especialização, atualização pedagógica e princípios. |
| /missao-principios-e-valores | /a-editora | Parcial. Falta a declaração de missão; os sete valores e suas explicações foram reduzidos, com duas responsabilidades reunidas. |
| /trajetoria | /a-editora | Parcial. A linha do tempo tem quatro marcos; faltam detalhes da experiência de Sobral, diagnóstico de leitura e referência à publicação do INEP de 2005. |
| /trajetorias-prof-edgar | /a-editora | Parcial. Edgar Linhares é citado, mas a apresentação própria e o conteúdo de sua contribuição não têm equivalente completo. |
| /trajetorias-lendo-voce-fica-sabendo | /solucoes/novo-lendo-voce-fica-sabendo e /formacao | Parcial. Falta a exposição completa da relação entre projeto, material semiestruturado, formação, eixos e acompanhamento da aprendizagem. |
| /paic | /a-editora | Parcial. A participação é contextualizada, mas faltam mapas, séries de indicadores, rankings, notas históricas e o PDF próprio. |
| /produtos | /solucoes | Reorganizado. A nova busca é útil, mas seu inventário não cobre tudo que existe no menu e na tabela oficial. |
| /brincando-e-aprendendo | /solucoes/brincando-e-aprendendo | Parcial. A descrição antiga, a separação por faixa etária, os componentes e quatro amostras não foram mantidos integralmente. Há diferença entre edições. |
| /brincando-e-aprendendo-novo | /solucoes/brincando-e-aprendendo | Parcial. O oficial possui outra apresentação com páginas e quantidades de itens por kit. O redesign reúne a coleção em uma apresentação geral de 2025. |
| /lendo-e-escrevendo | Sem equivalente localizado | Ausente. Faltam a coleção de Educação Infantil, fundamentação, componentes por faixa etária e três PDFs. |
| /novo-lendo-voce-fica-sabendo | /solucoes/novo-lendo-voce-fica-sabendo | Parcial. Público e componentes principais aparecem. Faltam fundamentação explícita, função detalhada dos itens e duas amostras de livros. |
| /escrever-comunicar-e-ser | /solucoes/escrever-comunicar-e-ser | Parcial. Mantém os livros de alunos, mas não conserva a apresentação dos livros de sugestões/orientações ao professor do oficial nem as cinco amostras. |
| /colecao-acerta-brasil | Sem equivalente localizado | Ausente. Faltam proposta, materiais de Português e Matemática, suplementos, provas, guia e dois PDFs. |
| /colecao-a-cor-da-gente | /solucoes/a-cor-da-gente | Parcial. Informa nove livros de modo agregado. Faltam os títulos individualizados e as sinopses presentes no oficial. |
| /colecao-vida-e-linguagem | /solucoes/vida-e-linguagem | Parcial. Mantém público, campos e categorias de materiais. Faltam explicações completas das práticas e dos recursos para aluno/professor, além de quatro PDFs. |
| /colecao-vida-e-matematica | /solucoes/vida-e-matematica | Parcial. Mantém público e unidades temáticas. Faltam explicações completas dos recursos de aluno/professor e quatro PDFs. |
| /projeto-tema | /solucoes/projeto-tema | Parcial. Preserva a finalidade e parte dos componentes. Faltam detalhamento das tarefas de sala/casa, função dos itens e três PDFs. |
| /projeto-transito-legal | /solucoes/transito-legal | Parcial. Mantém proposta e jogos de modo geral. Faltam nomes, apresentação e recomendações específicas de livros, guia e jogos. |
| /educacao-financeira | /solucoes/educacao-financeira | Parcial. Os quatro livros são apresentados por números. Faltam a organização temática da página oficial e a apresentação do livro do professor. |
| /colecao-fluir-das-emocoes | /solucoes/fluir-das-emocoes | Parcial. Mantém público profissional e três níveis. Faltam nomes e conteúdos de cada nível, habilidades associadas e a fundamentação descrita no oficial. |
| /sou-da-paz | /solucoes/sou-da-paz | Ampliado. Na coleta oficial, a página não apresenta descrição central substancial. O redesign acrescenta conteúdo do catálogo de 2025; conferir também itens e preços da tabela. |
| /aprender-em-acao | /formacao e /em-acao | Parcial. A página de formação menciona os cinco eixos, mas não mantém o plano detalhado; o novo Em ação funciona como seleção de três registros editoriais. |
| /tabela-precos | Sem equivalente localizado | Ausente. Faltam tabela, valores publicados, variantes por kit e materiais encontrados somente nesse inventário. |
| /aprender-formar | /plataformas | Acesso preservado. O endereço externo é o mesmo e recebeu uma explicação mais útil. |
| /aprencer-avaliar | /plataformas | Acesso preservado. O caminho antigo tem esse erro de grafia; o endereço externo de Avaliar foi mantido. |
| /fale-conosco | /contato | Adaptado. O original oferece envio por formulário. O novo prepara um e-mail, com transparência, campos adicionais e referência ao contato institucional. |
| /video-1 | Sem equivalente localizado | Ausente. Página com vídeo institucional em MP4. |
| /video-2 | Sem equivalente localizado | Ausente. Página com vídeo de formações em MP4. |
| /video-3 | Sem equivalente localizado | Ausente. Página com vídeo de depoimentos em MP4. |

Base para abrir os caminhos oficiais: https://www.aprendereditora.com.br/  
Base para abrir os caminhos do redesign: https://aprender-site.vercel.app/

**Detalhes que tornam a migração incompleta**

1. **Portfólio.** Lendo e Escrevendo e Novo Lendo Você Fica Sabendo são apresentações distintas no oficial. Uma não deve ser considerada substituta automática da outra. ACerta Brasil também não deve ser substituída apenas por outra solução de avaliação sem registro dessa decisão. O catálogo de 2025 acrescentou títulos válidos ao redesign, mas isso não resolve as ausências do site.

2. **Materiais de inglês e anos de Avançando Juntos.** A tabela de 2027 possui My Learning Companion para estudantes e My Teaching Companion para professores, do 6º ao 9º ano. Não foram encontrados na apresentação nova. A mesma tabela amplia o inventário de Avançando Juntos em relação à descrição de 2025 usada no redesign. Esse é um conflito de fontes/edições a resolver, não uma prova de que o público do catálogo de 2025 foi inventado.

3. **Componentes dos kits.** Expressões agregadas como “livros ou pastas”, “guias” ou “nove livros” ajudam a introduzir a proposta, mas eliminam diferenças entre aluno, professor e família. Recuperar volumes, faixas etárias, função de cada item, quantidades e páginas quando constarem na edição exibida. Não incorporar componentes de uma edição antiga no kit atual sem identificação.

4. **Fundamentação pedagógica.** Algumas páginas oficiais explicam teorias, práticas de linguagem, articulação com BNCC/SAEB e intenção de cada recurso. O redesign transformou boa parte disso em três objetivos breves. A síntese pode continuar na abertura; o texto completo deve permanecer acessível em um segundo nível.

5. **Missão e valores.** A ausência da missão é especialmente relevante: ela aparece no site oficial e também na primeira página do catálogo de 2025. Os textos de missão dessas fontes não são idênticos. A migração precisa registrar a versão escolhida e preservar o histórico se o objetivo é não perder nada.

6. **Trajetória e resultados.** A síntese conserva origem em Sobral, fundação e PAIC. Ela elimina evidências e explicações que ajudam a entender a história institucional. No PAIC, o oficial apresenta mapas de proficiência de 2007 a 2018, indicadores de IDEB, referências de IOEB e uma nota sobre a mudança de aquisição dos materiais em 2014. Preservar fonte, período e atribuição coletiva desses resultados.

7. **Formação.** O novo texto realmente menciona prática, teoria, planejamento, gestão e avaliação. O que falta é o detalhamento do plano: atividades formativas, reuniões com a equipe gestora, análise de resultados, observação de aulas, devolutivas e intervenções. A galeria oficial registra nove fotografias em sete municípios; essas imagens e legendas não foram migradas como conjunto.

8. **Acervo e canais.** São nove depoimentos na home oficial e três vídeos vinculados. O rodapé oficial também oferece Facebook, YouTube e Twitter, além do Instagram. No redesign, só o Instagram foi localizado. Verificar os canais antes de classificá-los como ativos; preservar os vínculos documentados é diferente de presumir atividade atual.

Fontes centrais:  
https://www.aprendereditora.com.br/missao-principios-e-valores  
https://www.aprendereditora.com.br/trajetoria  
https://www.aprendereditora.com.br/paic  
https://www.aprendereditora.com.br/aprender-em-acao  
https://www.aprendereditora.com.br/tabela-precos

**Indicadores: atualização válida e uma ausência importante**

| Informação | Home oficial consultada | Redesign |
| --- | --- | --- |
| Estudantes que utilizaram materiais | Mais de 1 milhão | Mais de 2 milhões, com referência a 2025 |
| Profissionais em formação | Mais de 45 mil professores | Mais de 100 mil educadores e coordenadores, com referência a 2025 |
| Municípios atendidos | Mais de 200 | Mais de 300, com referência a 2025 |
| Estudantes alfabetizados | Mais de 600 mil | Indicador não exibido |

O catálogo de 2025, página 5, sustenta os três indicadores novos e também apresenta **mais de 1 milhão de estudantes alfabetizados**. Esse quarto indicador ficou de fora mesmo da síntese atualizada. Recuperá-lo, com atribuição à editora e ao ano da publicação, fortaleceria o vínculo entre a home e o propósito central de alfabetização.

As métricas não têm o mesmo significado: estudantes que usaram materiais não são automaticamente estudantes alfabetizados; professores não são uma categoria idêntica ao conjunto de educadores e coordenadores. Não somar nem intercambiar essas medidas.

O publieditorial de novembro de 2025 menciona 85 municípios parceiros. Esse número não deve ser tratado como contraditório aos mais de 300 municípios historicamente atendidos sem considerar a definição e o período de cada medida.

Catálogo utilizado pelo redesign:  
https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf

Publieditorial associado:  
https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html

**O que está bom no visual e deve continuar**

- O verde, os fundos claros e os acentos amarelos criam continuidade com a identidade institucional.
- A combinação de Lora nos títulos e Manrope no corpo transmite uma linguagem editorial adequada.
- Hierarquia, alinhamento, espaçamento e poucas chamadas principais tornam a leitura mais organizada.
- As fotografias são relacionadas ao acervo e ao trabalho pedagógico; os registros históricos têm contexto.
- A navegação é curta e compreensível. Busca e filtros melhoram a consulta ao catálogo.
- As páginas mantêm uma linguagem visual consistente.
- A proposta independente é identificada e o formulário explica seu funcionamento.

A impressão visual é profissional. O conteúdo específico da editora deve ganhar mais presença para que a experiência expresse com força sua especialização em alfabetização, formação contínua e apoio às redes de ensino.

**Melhorias visuais e editoriais recomendadas**

| Elemento | Oportunidade | Implementação sugerida |
| --- | --- | --- |
| Primeira tela | A imagem é autêntica, mas apresenta um registro de formação com pessoas usando máscara e nitidez limitada para telas de alta densidade. | Priorizar uma fotografia atual do acervo, em resolução maior, com contexto educacional evidente. Manter as antigas na memória institucional. |
| Textos e títulos | As expressões de encontro, caminho e conversa repetem-se em muitas páginas. | Alternar títulos afetivos com títulos concretos que expliquem solução, público e entrega pedagógica. |
| Páginas de coleção | Uma capa e uma lista agregada não demonstram a riqueza dos materiais. | Adicionar galeria de kit, seleção de ano/volume, detalhes para aluno/professor/família e botão de amostra. |
| Catálogo | Vinte cartões com áreas de imagem grandes produzem uma página longa. | Oferecer visualização compacta e agrupamento por etapa, mantendo a busca e os filtros atuais. |
| Página institucional | O histórico resumido perde evidências da trajetória. | Conservar uma introdução curta e oferecer percurso completo, documentos e resultados com fontes e datas. |
| Formação | Benefícios ficam abstratos diante do plano concreto do oficial. | Exibir etapas do atendimento, atividades e exemplos reais, acompanhados da galeria de formações. |
| Prova institucional | Faltam vozes de educadores e registros de resultados. | Inserir depoimentos reais com nome, papel, local e contexto histórico. Não criar depoimentos ou métricas. |
| Imagens dos livros | As capas observadas têm arquivos de origem de poucas centenas de pixels. | Solicitar/usar arquivos de maior resolução quando disponíveis, mantendo proporção e texto legível. |
| Ícones de seta | Algumas setas diagonais sugerem saída externa em links internos ou em decoração de imagem. | Reservar o indicador externo para destinos externos e manter a indicação de nova aba quando pertinente. |
| Consulta a fontes | O catálogo inteiro tem cerca de 70 MB e é o principal arquivo oferecido. | Restaurar as amostras individuais e informar formato/tamanho; manter referência de fonte sem fazer o leitor depender do PDF para descobrir o produto. |

Não é necessário adicionar efeitos intensos ou animações chamativas para elevar o resultado. O ganho principal será mostrar melhor os materiais, a metodologia e as evidências reais da editora.

**Conferências funcionais e técnicas**

| Conferência | Resultado |
| --- | --- |
| Busca por “matematica” sem acento | Encontrou Vida & Matemática e atualizou a contagem. A interface informa que a busca é pelo nome da coleção. |
| Busca por Lendo e Escrevendo | Exibiu ausência de resultados, reforçando a lacuna do inventário. |
| Filtro de anos finais | Retornou oito soluções e incluiu as que abrangem 1º ao 9º ano. |
| Limpeza de filtros | Funcionou. |
| Interesse em Novo Lendo | Abriu contato com essa solução selecionada. |
| Campos obrigatórios vazios | Mostrou mensagens de validação pertinentes. |
| Preparação com dados sintéticos | Gerou uma mensagem e avisou que ela ainda não havia sido enviada. Nenhum envio foi realizado. |
| Atalho por teclado | O primeiro Tab mostrou “Pular para o conteúdo”; Enter levou o foco ao conteúdo principal. |
| Imagens observadas na home e em uma coleção | Carregaram após o carregamento inicial. Espaços vazios transitórios não foram classificados como arquivos quebrados. |
| Links externos Formar e Avaliar | Endereços preservados; ambos responderam HTTP 200 na consulta pública. |
| Metatags sociais | Falha confirmada: imagens com domínio localhost nas 30 páginas examinadas. |
| Indexação | noindex, nofollow. Adequado para a proposta independente de demonstração; não é falha a corrigir automaticamente. |
| Sitemap | /sitemap.xml respondeu 404. Preparar quando houver implantação institucional e política de indexação definida. |

Exemplos da falha de compartilhamento:

- Home: og:image e twitter:image usam http://localhost:3000/images/hero.webp.
- Coleção Novo Lendo: as imagens sociais usam http://localhost:3000/images/collections/novo-lendo-voce-fica-sabendo.webp.

Configurar o domínio público de produção na geração das metatags. Depois, conferir o HTML de várias páginas e testar a prévia em um visualizador de metatags. Esta auditoria não inspecionou a implementação no repositório para determinar a linha de código responsável.

O contato por e-mail é uma solução coerente para demonstrar o fluxo sem integrar o atendimento real da empresa. Se a editora adotar o projeto como site institucional, planejar a integração de envio conforme seu processo de atendimento.

O endereço da Rua Ary Barroso mostrado no redesign corresponde ao catálogo de 2025. Há documentos antigos com Rua Marvin; isso não justifica substituir automaticamente o endereço novo. O e-mail usado no redesign aparece em uma amostra de livro vinculada ao próprio site oficial, portanto não foi classificado como inventado.

**Inventário dos PDFs que precisam voltar à navegação**

| Página oficial | Quantidade de amostras |
| --- | --- |
| Brincando e Aprendendo | 4 |
| Lendo e Escrevendo | 3 |
| Novo Lendo Você Fica Sabendo | 2 |
| Escrever, Comunicar e Ser | 5 |
| ACerta Brasil | 2 |
| Projeto TEMA | 3 |
| Vida e Linguagem | 4 |
| Vida e Matemática | 4 |
| PAIC | 1 documento institucional |
| Total | 28 |

Os links completos conferidos estão no anexo a seguir. Restabelecer cada amostra com rótulo claro de ano, volume e edição. Manter o acervo acessível é preferível a anunciar todo material antigo como item comercial vigente.

**/brincando-e-aprendendo**

- [Brincando e Aprendendo - Vol 01.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2001.pdf) — HTTP 200
- [Brincando e Aprendendo - Vol 02.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2002.pdf) — HTTP 200
- [Brincando e Aprendendo - Vol 03.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2003.pdf) — HTTP 200
- [Brincando e Aprendendo - Vol 04.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2004.pdf) — HTTP 200

**/colecao-acerta-brasil**

- [AcBr - Matematica 5 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Acerta%20Brasil/AcBr%20-%20Matematica%205%20ano.pdf) — HTTP 200
- [AcBr - Portugues 5 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Acerta%20Brasil/AcBr%20-%20Portugues%205%20ano.pdf) — HTTP 200

**/colecao-vida-e-linguagem**

- [Vida e Linguagem 6 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%206%20ano.pdf) — HTTP 200
- [Vida e Linguagem 7 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%207%20ano.pdf) — HTTP 200
- [Vida e Linguagem 8 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%208%20ano.pdf) — HTTP 200
- [Vida e Linguagem 9 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%209%20ano.pdf) — HTTP 200

**/colecao-vida-e-matematica**

- [Vida e Matematica 6 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%206%20ano.pdf) — HTTP 200
- [Vida e Matematica 7 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%207%20ano.pdf) — HTTP 200
- [Vida e Matematica 8 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%208%20ano.pdf) — HTTP 200
- [Vida e Matematica 9 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%209%20ano.pdf) — HTTP 200

**/escrever-comunicar-e-ser**

- [ECS - 1 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%201%20ano.pdf) — HTTP 200
- [ECS - 2 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%202%20ano.pdf) — HTTP 200
- [ECS - 3 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%203%20ano.pdf) — HTTP 200
- [ECS - 4 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%204%20ano.pdf) — HTTP 200
- [ECS - 5 ano.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%205%20ano.pdf) — HTTP 200

**/lendo-e-escrevendo**

- [Educacao Infantil - Laranja.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Laranja.pdf) — HTTP 200
- [Educacao Infantil - Verde - Vol 02.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Verde%20-%20Vol%2002.pdf) — HTTP 200
- [Educacao Infantil - Vermelho - Vol 01.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Vermelho%20-%20Vol%2001.pdf) — HTTP 200

**/novo-lendo-voce-fica-sabendo**

- [NLVFS - 1 ANO - Vol 01.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Novo%20Lendo%20Voce%20Fica%20Sabendo/NLVFS%20-%201%20ANO%20-%20Vol%2001.pdf) — HTTP 200
- [NLVFS - 2 ANO - Vol 01.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Novo%20Lendo%20Voce%20Fica%20Sabendo/NLVFS%20-%202%20ANO%20-%20Vol%2001.pdf) — HTTP 200

**/paic**

- [PAIC.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/PAIC.pdf) — HTTP 200

**/projeto-tema**

- [Livro Tema 1.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%201.pdf) — HTTP 200
- [Livro Tema 2.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%202.pdf) — HTTP 200
- [Livro Tema 3.pdf](https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%203.pdf) — HTTP 200

**Vídeos vinculados pelo site oficial**

- /video-2: https://www.aprendereditora.com.br/v2/midia/kcfinder/files/videos/comp-2.mp4
- /video-3: https://www.aprendereditora.com.br/v2/midia/kcfinder/files/videos/comp-3.mp4
- /video-1: https://www.aprendereditora.com.br/v2/midia/kcfinder/files/videos/comp-1.mp4

**Estrutura sugerida para conservar tudo sem cansar o leitor**

Manter a home com mensagem principal, soluções por etapa, proposta de formação, indicadores, provas institucionais e contato. As informações extensas devem ter destinos claros:

- A editora: apresentação, missão, sete valores, trajetória completa, Edgar Linhares e histórico do PAIC.
- Soluções: inventário conferido contra o menu, todas as páginas e a tabela oficial, com registro de versões.
- Cada coleção: introdução curta, fundamentação, público, volumes/anos, materiais de aluno/professor/família, formação, amostras e fontes.
- Formação: eixos, plano de ação, reuniões com gestores, acompanhamento, avaliação e galeria.
- Em ação: registros editoriais, acervo de formações, depoimentos e vídeos, mantendo datas e contexto.
- Recursos: tabela de preços, documentos institucionais e downloads.
- Plataformas e contato: manter os acessos úteis já implementados.

Usar texto HTML real para o conteúdo das antigas imagens. Guias de leitura, índices e expansões acessíveis podem preservar o detalhe e reduzir a densidade da primeira tela. Não reconstruir as antigas páginas como uma única imagem comprida.

**Critério de conclusão para a próxima revisão**

1. Cada página, conjunto de informações e recurso do inventário oficial tem um destino no redesign.
2. Nenhuma coleção ou variante desaparece sem registro explícito.
3. Os componentes dos kits são conferidos por edição, ano e destinatário.
4. Os 28 PDFs e três vídeos têm acessos correspondentes ou uma justificativa documentada para sua substituição.
5. Missão, sete valores, trajetória, PAIC, depoimentos e plano de formação estão preservados.
6. Os indicadores possuem definição, data e fonte; os resultados de políticas públicas mantêm sua atribuição coletiva.
7. As divergências entre documentos antigos, catálogo de 2025 e tabela de 2027 são resolvidas e identificadas.
8. A prévia de compartilhamento usa o domínio publicado.
9. Uma revisão posterior verifica o projeto em celular, teclado e leitores de tela, além do desempenho com imagens e fontes finais.



