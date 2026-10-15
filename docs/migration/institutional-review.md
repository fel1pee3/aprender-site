# Conferência institucional e do acervo

Consulta: 14/10/2026. Dados de apresentação: `src/data/institutional.ts` e `src/data/archive.ts`. Inventários por informação: `institutional.json` e `archive.json`. Regeneração e conferência dos arquivos locais: `node scripts/build-institutional-audit.cjs`.

## Fontes e método

- Páginas oficiais e imagens foram recuperadas em `.tools/official` pelo inventário central. Uma cópia de trabalho da pesquisa institucional encontra-se em `.tools/institutional` (diretório ignorado pelo Git).
- Os textos embutidos em imagens foram lidos visualmente: missão, apresentação da equipe, trajetória, Edgar Linhares, projeto Lendo, formação, mapas PAIC, rankings e nove depoimentos. Os 19 valores municipais do IOEB e os 11 anos de atendimento foram conferidos nas imagens em resolução ampliada.
- O catálogo local fornecido tem 64 páginas e 70.269.887 bytes. Missão e sete valores de 2025 foram preservados integralmente a partir desse documento. Os demais textos são sínteses originais; os depoimentos mantêm acesso direto à imagem que contém o original completo.
- A formação preserva os cinco eixos e as 16 ações documentadas: oito de formação contínua, três de reuniões gestoras e cinco de acompanhamento em sala.
- As nove fotografias são recortes das imagens reais do conjunto oficial; não foram substituídas por ilustrações ou ampliadas artificialmente. As legendas identificam Pacajus (duas), Fortim, Sobral, Cuiabá, Juazeiro/BA, Alto Santo e Russas (duas). A fonte não informa datas.

## Diferenças preservadas

- **Missão:** versão de 2025 integral; versão do site em síntese fiel, com fonte e edição não datada. Os sete valores têm redação completa do catálogo e notas com as diferenças da versão do site.
- **PAIC 2012:** o site registra **5.326 educadores**; o catálogo de 2025, página 7, registra **5.325**. As duas séries foram mantidas. Não foi inferida uma correção.
- **A partir de 2014:** a fonte informa compra dos materiais com recursos dos municípios em lugar do fornecimento via SEDUC. A série 2014–2018 não foi apagada ao apresentar o recorte 2008–2013 do catálogo.
- **Alfabetização:** o banner do site apresenta 35% em 2007 e 89% em 2018, sob a definição de crianças alfabetizadas na idade certa no Ceará. O catálogo traz 39,9% em 2007 e 97,11% em 2023, sob a definição de alfabetização ao término da etapa. A metodologia do banner não é detalhada. Os valores foram preservados com os recortes originais, sem construir uma série única.
- **Indicadores institucionais:** mantidas as quatro medidas antigas do site, as quatro de 2025 e a referência a 85 municípios parceiros do publieditorial de 07/11/2025. Distinguem-se pessoas que utilizaram materiais, estudantes alfabetizados, professores, educadores/coordenadores, municípios historicamente atendidos e parceiros mencionados em uma data.
- **Resultados educacionais:** mapas e IDEB são dados das redes e do Estado; não foram convertidos em indicadores causais da editora. Rankings 2017 e IOEB 2019 estão classificados como memória histórica.

## Vídeos: verificação do conteúdo real

Os três MP4 foram baixados apenas para inspeção, analisados por FFmpeg 7.1 e conferidos visualmente em quadros a cada segundo. Cada original tem **8,04 segundos, 960 × 540, H.264**, sem faixa de áudio; há apenas uma trilha de vídeo e metadados de timecode. São anúncios provisórios com a inscrição de futura apresentação institucional. **Não são entrevistas ou formações completas.**

| Arquivo | Conteúdo visível | Tamanho original | Cópia local otimizada |
| --- | --- | ---: | ---: |
| comp-1.mp4 | Menina com um livro; anúncio de apresentação | 3.197.808 bytes | 479.645 bytes |
| comp-2.mp4 | Logotipo serifado sobre fundo verde texturizado | 23.658.302 bytes | 973.013 bytes |
| comp-3.mp4 | Logotipo serifado sobre fundo verde liso | 7.661.839 bytes | 345.335 bytes |

As cópias em `public/media` mantêm duração e sequência, H.264/yuv420p, MP4 com faststart e resolução original. Posters foram extraídos do segundo 3. Descrições textuais e arquivos WebVTT descritivos identificam a informação visual e a ausência de áudio. Não foi inventada uma transcrição de fala. Os títulos das páginas originais são preservados com o qualificativo de vinheta de acervo.

## Canais externos e referências

Os quatro links foram encontrados no HTML do site oficial. Em 14/10/2026, consultas HTTP com redirecionamento retornaram 200 para Instagram, Facebook e YouTube; o Twitter redirecionou para `x.com/aprendereditora`, também 200. O YouTube identifica o canal como Aprender Editora. Resposta HTTP e vínculo oficial não confirmam atividade recente nem dispensam eventual autenticação.

A biografia foi complementada por duas fontes primárias: Conselho Estadual de Educação (publicação de 2018; endereço atualmente usa um slug divergente, mas seu conteúdo identifica Edgar Linhares) e Governo do Ceará (homenagem de 2019). O PDF do INEP de 2005 foi localizado no domínio oficial, mantendo-se acesso direto à publicação.

## Limites específicos

- Não há data editorial para os nove depoimentos ou fotografias no oficial. Menções a 2015 e 2017 descrevem o contexto de alguns relatos e não foram usadas como datas de publicação.
- Nomes e cargos dos depoimentos correspondem ao acervo. Não foi presumido que as pessoas continuam exercendo essas funções.
- Os mapas preservam a escala visual disponível. Não foi criada uma tabela de proficiência por município a partir de cores e nomes pequenos.
- Os depoimentos são apresentados em sínteses abrangentes, sem aspas, acompanhadas do original completo. Isso evita atribuir aos autores uma redação produzida para o redesign.
- A manutenção futura de recursos externos depende de seus provedores; fotografias, retratos, figuras e vinhetas utilizados pela apresentação têm cópias locais.
