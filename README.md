# Aprender Editora — proposta independente de redesign

Projeto de Felipe Maia para apresentação à Aprender Editora. Esta revisão recupera o conteúdo institucional e os recursos públicos preservando a identidade visual do redesign. Os comandos abaixo executam e verificam o projeto localmente.

## Executar

Requisitos: Node.js 20.9 ou superior e npm. Ambiente de verificação: Node.js 22.21.1, Next.js 16.4.0, React 19.3.0 e TypeScript 5.9.3. As versões resolvidas constam do `package-lock.json`.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. Para executar a versão de produção:

```bash
npm run build
npm run start
```

Não é necessário configurar banco de dados, contas ou chaves. Fotografias, capas, prévias, fontes e cópias otimizadas dos vídeos são locais. PDFs, plataformas e canais institucionais mantêm seus destinos externos.

## Conteúdo e rotas

- `/`: apresentação pedagógica, etapas, quatro indicadores de 2025, coleções, formação e relatos do acervo.
- `/a-editora`: equipe, duas versões de missão e sete valores.
- `/a-editora/trajetoria`: Sobral, origem da editora, participação no PAIC e indicadores por fonte e período.
- `/a-editora/edgar-linhares`: biografia e referências documentais, incluindo o INEP.
- `/a-editora/paic`: atendimentos, mapas, IDEB, IOEB e documento institucional.
- `/solucoes`: 23 soluções, com busca sem acentos, aliases e filtros combináveis.
- `/solucoes/[slug]`: apresentações por edição, fundamentação, livros e componentes, galerias, amostras, oferta documentada de 2027 e contato contextualizado.
- `/formacao`: cinco eixos, fundamentação e plano de ação com 16 atividades.
- `/acervo`: nove depoimentos, nove fotografias em sete municípios, três vinhetas verificadas e memória editorial.
- `/recursos`: 27 amostras individuais, documento do PAIC e catálogo de 2025.
- `/recursos/tabela-precos`: 152 linhas da tabela publicada de 2027, com filtros e referência original.
- `/plataformas`: Aprender Formar e Aprender Avaliar.
- `/em-acao` e `/em-acao/[slug]`: registros de 2010, 2011 e 2025, classificados e referenciados.
- `/contato`: canais institucionais e preparação de mensagem.

Os caminhos legados têm destinos específicos em `src/data/legacy-routes.ts`; caminhos desconhecidos retornam HTTP 404. Exemplos de filtros compartilháveis:

```text
/solucoes?etapa=anos-finais&q=ingles
/recursos/tabela-precos?colecao=ingles&publico=Professor
```

O formulário valida os campos, prepara uma mensagem para revisão e oferece cópia ou abertura do aplicativo de e-mail. Não envia automaticamente nem grava os dados. Nenhuma mensagem real é necessária para os testes.

## Fontes e edições

O inventário parte do site institucional. O catálogo de 2025 e a tabela identificada como 2027 complementam essa referência. As apresentações históricas sem data não recebem um ano inferido. Kits e metodologias de uma fonte não são transferidos automaticamente para outra.

Os PDFs são acessados por links e não são carregados automaticamente. O catálogo tem 70.269.887 bytes, aproximadamente 70,3 MB. Os três vídeos oficiais são vinhetas de 8,04 segundos sem áudio; as cópias locais têm controles, posters, carregamento sob demanda e descrições visuais. Os depoimentos usam redação própria em HTML e mantêm acesso ao original integral.

Rastreabilidade: [matriz por informação e recurso](docs/matriz-migracao-conteudo.md), [relatório de correções e verificações](docs/relatorio-correcao-aprender.md), [fontes e ativos](SOURCES.md). A auditoria recebida está em [docs/auditoria-aprender.md](docs/auditoria-aprender.md).

## Arquitetura

Next.js App Router, TypeScript e CSS Modules. As páginas de conteúdo são pré-renderizadas; o catálogo e a tabela de preços são renderizados no servidor por requisição, com filtros e resultados no HTML inicial. Os dados são centralizados em `src/data`, com componentes de interação no cliente. O projeto usa `next start`, com otimização de imagens; não depende de exportação estática.

```text
src/app/                   páginas, metadados e estilos
src/components/            navegação, filtros, galerias e formulário
src/data/solutions.ts       índice das soluções e aliases
src/data/collection-*.ts    edições, livros, componentes e galerias
src/data/resources.ts       PDFs e prévias conferidas
src/data/prices.ts          transcrição da tabela de 2027
src/data/institutional.ts   missão, valores, história, PAIC e formação
src/data/archive.ts         depoimentos, fotos, vídeos e canais
src/lib/metadata.ts         origem pública, canonical e imagens sociais
public/                    imagens, fontes e vídeos locais
docs/migration/            inventários, origem e resultados de auditoria
tests/                     comportamento, responsividade e axe-core
scripts/                   extração, conferência e revisão visual
```

## Verificar

```bash
npm run typecheck
npm run build
# Em outro terminal:
npm run start
npm run test:e2e
```

Os testes usam Microsoft Edge instalado em modo headless. `PLAYWRIGHT_CHANNEL=chrome` permite utilizar Chrome instalado, e `PLAYWRIGHT_BASE_URL` troca o endereço padrão `http://127.0.0.1:3000`.

Para usar uma compilação separada de um servidor de desenvolvimento existente, em PowerShell:

```powershell
$env:APRENDER_BUILD_DIR='.next-review'
npm run build
npm run start -- -p 3100
# Em outro terminal:
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3100'
$env:QA_BASE_URL='http://127.0.0.1:3100'
npm run test:e2e
npm run check:migration
npm run measure:performance
node scripts/capture-final.mjs
```

A auditoria compara o inventário das fontes com o HTML servido e os arquivos, incluindo URLs de PDFs, dados por edição, destinos e metadados. A conferência binária utiliza os PDFs de pesquisa preservados em `.tools/samples`; esse cache não é necessário para executar o site. Para refazer os downloads de pesquisa, `scripts/recover-resources.py` utiliza a auditoria fornecida e as bibliotecas Python descritas abaixo. As medições de desempenho simulam rede e CPU no navegador local; não equivalem a dados de usuários reais. Resultados e condições constam do relatório de correção.

## URLs e demonstração

A origem pública da proposta é `https://aprender-site.vercel.app`, configurável por `NEXT_PUBLIC_SITE_URL`. Produção rejeita sobrescritas locais ou inválidas. Desenvolvimento admite origem local explícita. Open Graph, Twitter, canonical e sitemap usam a mesma resolução centralizada.

O rodapé identifica a proposta independente. `noindex,nofollow` e `robots.txt` preservam a política de demonstração sem indexação. Executar o projeto não o publica.

## Ferramentas de preparação

O site inclui seus ativos de execução. Scripts Python opcionais utilizam PyMuPDF e Pillow para a extração dos documentos já fornecidos. O PDF original de 64 páginas é mantido fora do carregamento inicial e não foi alterado.

```bash
python -m pip install --target .tools/pylibs pymupdf pillow
python scripts/extract-catalog.py "caminho/para/Catalogo_Aprender_Editora_2025_20_Anos.pdf"
python scripts/prepare-catalog-assets.py "caminho/para/Catalogo_Aprender_Editora_2025_20_Anos.pdf"
```

Os identificadores de objetos desses scripts correspondem à edição fornecida. Os arquivos temporários de pesquisa e QA estão ignorados pelo Git.
