# Documentos locais: inventário e hospedagem

Verificação de 14/10/2026. Este registro é interno; não integra a navegação institucional.

## Arquivos preservados

As 27 amostras, o documento institucional do PAIC e o catálogo de 2025 foram incorporados a `public/documents/`, com nomes estáveis derivados dos identificadores dos recursos. As cópias preservam os bytes, sem recompressão, extração de páginas ou perda de qualidade. As URLs de origem, rótulos anteriores, edição, tamanho, quantidade de páginas e SHA-256 estão em [document-migration.json](./document-migration.json).

O inventário soma **371.731.572 bytes** (371,7 MB decimais). O maior arquivo é o catálogo de 2025: **70.269.887 bytes**, 70,3 MB decimais, aproximadamente 67,0 MiB e 64 páginas digitais. O documento do PAIC tem 100 páginas digitais, incluindo páginas duplas, que representam 196 páginas editoriais.

| Coleção | Amostras |
| --- | ---: |
| Brincando e Aprendendo | 4 |
| Lendo e Escrevendo | 3 |
| Novo Lendo Você Fica Sabendo | 2 |
| Escrever, Comunicar e Ser | 5 |
| ACerta Brasil | 2 |
| Projeto TEMA | 3 |
| Vida e Linguagem | 4 |
| Vida e Matemática | 4 |

Também foram preservados nove JPEGs completos dos depoimentos em `public/images/testimonials/original-{id}.jpg`, com a resolução original e sem edição. O mesmo inventário registra origem, destino, dimensões, tamanho e hash.

## Utilidade e comportamento

- Amostras: acesso seletivo às páginas internas de cada material, junto à coleção correspondente.
- PAIC: consulta ao documento institucional completo na área da trajetória/PAIC e nos documentos.
- Catálogo: consulta integral ou offline como opção secundária, com o tamanho real anunciado.
- Imagens completas dos depoimentos: consulta no próprio projeto, sem retornar à página antiga.

Os PDFs são arquivos estáticos da mesma origem. Não há função que faça proxy, leitura ou transmissão dos binários, nem fallback para o servidor anterior. Não são usados em `iframe`, `object`, `embed`, preload ou prefetch de página. A ação publicada é “Abrir em PDF (nova aba)”; o leitor pode salvar pelo seu visualizador. O download de descrições WebVTT usa uma âncora de mesma origem com atributo `download`.

## Limites verificados na documentação primária

- [GitHub: arquivos grandes](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github): arquivos individuais acima de 100 MiB são bloqueados no Git comum; acima de 50 MiB recebem um aviso. O catálogo está abaixo do bloqueio e acima do patamar de aviso. Nenhum destes PDFs exige Git LFS por tamanho individual. O conjunto aumenta o tamanho do clone e deve ser considerado em futuras alterações de binários.
- [Vercel: arquivos estáticos](https://vercel.com/docs/build-output-api/primitives#static-files): arquivos estáticos são servidos pela CDN; seus nomes e conteúdo são preservados. A implementação usa `public/` do Next.js para esse propósito, sem incluí-los em funções.
- [Vercel: limites de upload](https://vercel.com/docs/limits#static-file-uploads): o limite documentado para upload das fontes pela **CLI** é de 100 MB no Hobby e 1 GB no Pro. Os documentos deste projeto, sozinhos, excedem o limite de upload CLI Hobby. Esse limite não deve ser confundido com um limite individual de 100 MB para servir cada PDF estático.
- [Vercel: publicação por Git](https://vercel.com/docs/git): existe um fluxo de build a partir do repositório Git. A documentação consultada não declara para esse fluxo o mesmo limite de upload das fontes pela CLI. Isso não substitui a conferência do plano e do build real antes de publicar.
- [Vercel: limite de resposta de funções](https://vercel.com/docs/errors/function_payload_too_large): respostas de funções têm um limite diferente, de 4,5 MB. Ele não é usado como transporte dos documentos neste projeto.

Não foi realizada publicação nesta rodada nem inspecionado o plano da conta Vercel. Portanto, o documento não afirma que uma implantação já passou na infraestrutura externa. O código e os arquivos estão preparados para entrega estática; antes de usar CLI no Hobby, é necessário um fluxo compatível com o volume (por exemplo, o build pelo Git já previsto no projeto) ou armazenamento próprio configurado. Não há URL de armazenamento inventada nem dependência silenciosa do servidor antigo.

## Reprodução da conferência

Com Python, PyMuPDF e Pillow disponíveis (na instalação local ou no diretório de ferramentas já usado pelo projeto):

```powershell
python scripts/localize-documents.py
```

O script compara SHA-256, tamanho e páginas de todos os 29 arquivos com o inventário; verifica assinatura `%PDF-`, trailer `%%EOF`, necessidade de reparo e senha; lê todas as páginas e rasteriza a primeira e a última. Verifica também formato, dimensões e hash dos nove JPEGs.

A importação original é reproduzível com `--import-files --catalogue CAMINHO_DO_PDF`, usando as amostras previamente conferidas em `.tools/samples/` e os JPEGs de `.tools/institutional/`. A importação não consulta a rede. O modo normal apenas verifica os arquivos incorporados, sem alterá-los.
