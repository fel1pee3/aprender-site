# Aprender Editora — proposta independente de redesign

Site institucional implementado por Felipe Maia como proposta para apresentação à Aprender Editora. O projeto é uma demonstração local, não foi publicado e não representa uma aprovação da empresa.

## Executar

Requisitos: Node.js 20.9 ou superior e npm. Desenvolvimento e validação realizados com Node.js 22.21.1, Next.js 16.4.0, React 19.3.0 e TypeScript 5.9.3. As versões resolvidas estão no `package-lock.json`.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. Para apresentar a versão de produção:

```bash
npm run build
npm run start
```

Não é necessário configurar banco de dados, contas, chaves ou serviços externos. As imagens e fontes são locais; os links para e-mail, redes sociais, plataformas e o PDF dependem dos aplicativos ou destinos externos.

## Conteúdo e rotas

- `/`: visão geral, oferta pedagógica, etapas, quatro coleções, formação e três registros documentados.
- `/a-editora`: apresentação, valores, trajetória e participação histórica no PAIC.
- `/solucoes`: 20 coleções confirmadas, busca por nome e filtros combináveis.
- `/solucoes/[slug]`: público, objetivos, componentes, apoios, fonte e contato contextualizado.
- `/formacao`: formação contínua e acompanhamento pedagógico.
- `/plataformas`: apresentação e acesso externo a Aprender Formar e Aprender Avaliar.
- `/em-acao` e `/em-acao/[slug]`: três sínteses com datas, legendas e fontes.
- `/contato`: canais institucionais e preparação de mensagem.
- Caminhos desconhecidos retornam HTTP 404 com navegação útil.

Exemplo de endereço compartilhável: `/solucoes?etapa=anos-iniciais&objetivo=matematica&q=amma`. A busca ignora acentos. Os filtros reconhecem coleções destinadas a mais de uma etapa.

O formulário valida os campos, conserva os dados quando há erros e prepara o texto para revisão. O visitante pode copiá-lo ou abrir o aplicativo de e-mail. Não existe envio automático, gravação de dados, analytics ou confirmação fictícia de transmissão. Nenhuma mensagem foi enviada durante os testes.

## Arquitetura

Next.js App Router, TypeScript e CSS Modules. As páginas institucionais e de conteúdo são pré-renderizadas; as rotas de conteúdo usam `generateStaticParams`. Este projeto utiliza `next start`, não exportação estática. O otimizador de imagens do Next funciona nesse servidor.

```text
src/app/                páginas, layout, metadados e estilos
src/components/         navegação, catálogo, formulário e elementos compartilhados
src/data/solutions.ts   coleções tipadas e suas páginas de referência
src/data/editorial.ts   contatos, plataformas, marcos e artigos
public/images/          logotipo, fotografias e capas extraídos do catálogo
public/fonts/           Lora e Manrope, com licenças OFL
docs/referencias/       extração e referências utilizadas na conferência
tests/                  testes de comportamento e acessibilidade automatizada
scripts/                ferramentas opcionais de extração e revisão visual
```

## Verificar

```bash
npm run typecheck
npm run build
```

Com a versão de produção rodando em outro terminal:

```bash
npm run start
# Em outro terminal:
npm run test:e2e
```

Os testes usam Microsoft Edge instalado, em modo headless. É possível usar Chrome definindo `PLAYWRIGHT_CHANNEL=chrome`. `PLAYWRIGHT_BASE_URL` permite trocar o endereço do servidor (padrão `http://127.0.0.1:3000`). Em PowerShell, use `$env:PLAYWRIGHT_CHANNEL='chrome'` antes do comando.

Os testes verificam todas as rotas, status 404, busca, combinações de filtros, URL, histórico, contexto da coleção, validação, preparação/cópia, foco do menu, Escape, links de pular conteúdo, imagens e console. Conferem 320, 375, 768, 1280 e 1440 px, além de análise axe-core em oito rotas. Capturas de início e solução ficam em `.qa/`; relatório HTML em `playwright-report/index.html`.

`node scripts/review.mjs` produz capturas adicionais, com o servidor aberto. Testes e revisão visual usam o navegador instalado; não precisam baixar outro navegador.

## Apresentação e futura implantação

O rodapé identifica a proposta independente. Há `noindex,nofollow` nos metadados e bloqueio em `robots.txt`. A base de URLs é `http://localhost:3000`, configurável por `NEXT_PUBLIC_SITE_URL` (veja `.env.example`). O domínio da editora não é assumido como domínio da proposta.

Uma eventual versão oficial precisará definir seu domínio, revisar contatos e oferta comercial com a editora, confirmar a autorização de uso dos ativos, configurar o fluxo real de contato caso desejado e alterar conscientemente `robots` em `src/app/layout.tsx` e `src/app/robots.ts`. Não há publicação automática neste projeto.

Consulte [SOURCES.md](SOURCES.md) para a rastreabilidade e limitações das fontes, [DESIGN.md](DESIGN.md) para a direção visual e [VERIFICATION.md](VERIFICATION.md) para os resultados da revisão. Não foram medidos Lighthouse nem métricas de usuários reais; testes automatizados não equivalem a uma certificação WCAG.

## Reproduzir a extração dos ativos (opcional)

O site já inclui todos os ativos necessários. O PDF original de aproximadamente 70 MB foi preservado no caminho fornecido pelo usuário e não participa do carregamento da página. Os scripts Python são auxiliares de preparação; não são dependências de execução.

```bash
python -m pip install --target .tools/pylibs pymupdf pillow
python scripts/extract-catalog.py "caminho/para/Catalogo_Aprender_Editora_2025_20_Anos.pdf"
python scripts/prepare-catalog-assets.py "caminho/para/Catalogo_Aprender_Editora_2025_20_Anos.pdf"
python scripts/extract-logo.py "caminho/para/Catalogo_Aprender_Editora_2025_20_Anos.pdf"
```

Esses scripts se destinam à edição de 64 páginas fornecida para este projeto, pois os identificadores dos objetos do PDF são específicos dessa edição.
