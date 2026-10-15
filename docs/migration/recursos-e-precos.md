# Conferência de documentos e preços

Consulta: **14 de outubro de 2026**. Referências: páginas públicas do domínio `aprendereditora.com.br`, recursos vinculados por essas páginas e catálogo de 2025 fornecido pelo usuário.

## Documentos

Foram recuperados **28 de 28 PDFs** do inventário oficial: 27 amostras e um documento do PAIC. Todos responderam HTTP 200, começaram com assinatura `%PDF-`, foram abertos e percorridos por PyMuPDF e tiveram capa/abertura e miolo inspecionados. A validação não se limita ao status HTTP. URLs, tamanho exato, total de páginas digitais, SHA-256 e destino estão em `resources.json`.

| Coleção ou documento | Arquivos | Observações da verificação |
| --- | ---: | --- |
| Brincando e Aprendendo | 4 | Livros 1 a 4 confirmados nas capas; 11 páginas digitais por amostra. O ano da edição não é informado. |
| Lendo e Escrevendo | 3 | Laranja: 10 páginas, inicia com **Dia de Supermercado**, sem capa de coleção ou número de volume. Verde: **Livro da Criança 2, Vol. II**, 13 páginas, ISBN 978-85-8314-256-0. Vermelho: **Livro da Criança 3, Vol. I**, 11 páginas. |
| Novo Lendo Você Fica Sabendo | 2 | 1º e 2º anos, Livro do Aluno, volume 1; 11 páginas por amostra. |
| Escrever, Comunicar e Ser | 5 | 1º ao 5º ano, 11 páginas por amostra. |
| ACerta Brasil | 2 | Apresentação **#SuperaIDEB**, Matemática e Língua Portuguesa do 5º ano; 11 páginas por amostra. |
| Projeto TEMA | 3 | TEMA 1, 2 e 3; **Livro do Aluno — Sala — Vol. I** nas capas, 11 páginas por amostra. O número do livro foi preservado como livro, sem transformá-lo em ano escolar. |
| Vida & Linguagem | 4 | 6º ao 9º ano; 11 páginas por amostra. |
| Vida & Matemática | 4 | 6º ao 9º ano; 11 páginas por amostra. |
| PAIC | 1 | **Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará**, SEDUC/UNICEF, Fortaleza, 2012. ISBN 978-85-8171-019-8. 196 páginas editoriais, em 100 páginas digitais com spreads e capas. |

As amostras não incluem expediente suficiente para estabelecer o ano de publicação da edição. Anos encontrados em textos citados, exemplos de atividades, datas de acesso e metadados técnicos não foram convertidos em anos editoriais. São apresentados como **acervo do site oficial**, distintos do catálogo de 2025 e da tabela de 2027.

O catálogo complementar tem **70.269.887 bytes**, 64 páginas digitais. A URL no domínio O Povo foi conferida com `Range: bytes=0-63`: resposta HTTP 206, `Content-Type: application/pdf`, assinatura `%PDF-1.6`, `Content-Range: bytes 0-63/70269887`. O arquivo completo fornecido pelo usuário foi aberto localmente. Ele permanece externo, sem carregamento automático.

Os PDFs baixados para análise estão somente em `.tools/samples`, ignorado no Git. O site hospeda prévias WebP de capa/abertura e duas páginas internas pertinentes por documento. Páginas de guarda sem conteúdo foram excluídas da seleção final. As capas de Lendo e Escrevendo e ACerta Brasil foram extraídas das próprias amostras, sem capas inventadas.

## Tabela de preços de 2027

Imagem original preservada em `public/images/resources/tabela-precos-2027.jpg`, com **1100 × 5693 pixels**. Fonte: https://www.aprendereditora.com.br/v2/midia/kcfinder/images/tabela_precos_2027.jpg. Página: https://www.aprendereditora.com.br/tabela-precos.

As **152 linhas** foram transcritas e conferidas visualmente contra a imagem, preservando segmento, material, destinatário, ano/volume, natureza do kit e preço de capa. Os valores são armazenados em centavos inteiros. `material` conserva a redação da linha; colunas estruturadas facilitam a consulta. Onde a fonte não informa destinatário, ano ou tipo de conjunto, o campo fica marcado **Não especificado**. Não se inferiram kits, preços nem disponibilidade a partir de outra edição.

Pontos que exigem contexto:

- **Inglês:** My Learning Companion 1–4 para alunos do 6º ao 9º ano, R$ 200,00 cada; My Teaching Companion 1–4 para professores dos mesmos anos, R$ 303,00 cada. O quadro não contém capas nem fundamentação pedagógica.
- **Avançando Juntos:** 16 variantes: 6º, 7º, 8º e 9º anos × Matemática/Língua Portuguesa × aluno/professor. Preços de R$ 200,00 e R$ 303,00, respectivamente. Isso não altera retroativamente o público do 9º ano documentado no catálogo de 2025.
- **Combo Novo Lendo e AMMA:** quatro linhas, 1º/2º ano × aluno/professor, relacionadas às duas coleções. Preços de R$ 929,00 e R$ 1.568,00.
- **Avaliar:** a tabela não publica todas as combinações aluno/professor em todos os anos. Foram preservadas somente as 13 linhas efetivamente existentes, sem completar lacunas por analogia. O livro de fortalecimento da gestão escolar é uma linha própria de R$ 334,00.
- **A Cor da Gente:** o quadro traz grafias como “BAIRRO DO MISTURA”, “AYVUERE”, “O BAOBA” e “A HISTORIA DA SAMAUMA”. Elas foram mantidas no campo da transcrição, sem substituir silenciosamente pelos títulos conferidos nas capas ou em outras fontes.
- **Fluir das Emoções:** três linhas docentes: O Cérebro e as Emoções, Sua Melhor Versão, O Eu em Relação; R$ 902,00 por linha.
- **Lendo e Escrevendo e ACerta Brasil:** as amostras continuam acessíveis como acervo; não foram criadas linhas de preço inexistentes no quadro de 2027.

O ano **2027** identifica a tabela publicada. Não confirma vigência comercial em 2026. A interface deve informar que são preços publicados de referência e orientar a confirmação das condições com a editora.

## Contratos e reprodução

- `src/data/resources.ts`: `documentResources`, `getCollectionResources(slug)`, `formatFileSize(bytes)`; tipos `DocumentResource` e `DocumentPreview`.
- `src/data/prices.ts`: `priceRows`, `priceSource`, `getCollectionPrices(slug)`; tipo `PriceRow`.
- `docs/migration/resources.json`: 29 entradas de migração, incluindo o catálogo complementar, e 29 recursos para a interface.
- `docs/migration/prices.json`: 152 linhas de dados e 152 entradas de migração com número da linha-fonte.
- Scripts: `recover-resources.py` baixa e inspeciona; `finalize-resources.py` prepara metadados e prévias; `transcribe-prices.py` mantém a transcrição revisada.

**Falhas de recurso:** nenhuma nas 28 URLs de PDF. **Limitações documentais:** ano editorial ausente nas 27 amostras; capa/volume ausentes na amostra laranja de Lendo e Escrevendo; condições comerciais não determinadas pela imagem de preços. Todas estão explicitadas no dado e nesta conferência.
