# Política de cache

Revisão de 15/10/2026. Next.js 16.4.0, App Router, sem Cache Components, CMS, API de conteúdo, ISR ou service worker. Dados e traduções são arquivos locais incorporados à compilação. O layout lê cookies de preferências e headers de idioma; por isso as páginas são renderizadas por requisição.

## Camadas aplicáveis

| Camada | Responsável e comportamento |
| --- | --- |
| HTTP do navegador | Reutiliza arquivos imutáveis e imagens otimizadas frescas; valida arquivos públicos com URL fixa quando necessário. HTML personalizado não é armazenado. |
| CDN da Vercel | Administração nativa da plataforma; nenhuma regra global de cabeçalhos foi adicionada. HTML privado não recebe `s-maxage`. Os cabeçalhos finais devem ser conferidos após publicação autorizada. |
| Páginas e dados do Next.js | SSR mantém cookies e idiomas corretos, sem Full Route Cache compartilhado. `React.cache` apenas deduplica trabalho dentro da requisição; não mantém preços entre publicações. |
| Navegação no cliente | `Link` e prefetch continuam sob controle nativo do App Router. `Vary` e os parâmetros RSC do framework são preservados. |
| Service worker | Não existe. Não foram adicionados PWA, cache offline ou cópias de páginas/documentos em cookies ou localStorage. |

Não há `Vary: Cookie` genérico, regra para toda a pasta `/_next/`, Redis ou endpoint de invalidação. Cookies/localStorage continuam destinados às preferências existentes. O formulário prepara e-mail localmente; não há resposta de envio nem mensagem pessoal em cache compartilhado.

## Política por recurso

| Recurso e caminhos | Política efetiva | Atualização |
| --- | --- | --- |
| HTML/RSC de `/`, `/solucoes/*`, `/recursos/*`, `/en/*`, `/es/*` | Next: `private, no-cache, no-store, max-age=0, must-revalidate`; distinção HTML/RSC mantida. | Nova publicação atualiza os dados locais; cada requisição continua aplicando suas preferências. |
| JS, CSS e fontes em `/_next/static/` | Next: `public, max-age=31536000, immutable`. Fontes locais passam por `next/font/local`. | Conteúdo alterado gera outra URL no build. |
| Originais em `/images/*`, `/documents/*`, mídias públicas e fontes em URL fixa | Revalidação nativa: `max-age=0`, com ETag/Last-Modified quando fornecidos. Não recebem `immutable`, inclusive com `?v=`. | Substituir o arquivo e publicar; o validador permite `304` ou a transferência do conteúdo novo. |
| Imagens em `/_next/image` | TTL mínimo nativo preservado: `14400` segundos (4 h); a validade também considera a origem. | `src` recebe versão derivada do conteúdo para mudar a chave do otimizador. |
| VLibras e demais recursos externos | Política da origem externa. Carregamento do VLibras permanece único e sob demanda. | Sem espelho, congelamento de versão ou purge externo. |

`max-age=0` permite armazenamento com validação; não exige baixar o arquivo inteiro novamente. Um `MISS` isolado não prova problema. Não foram definidos `CDN-Cache-Control` ou `Vercel-CDN-Cache-Control`: não há necessidade de substituir a política nativa nem de repetir o mesmo prazo em três cabeçalhos. Na Vercel, a política exclusiva da plataforma tem precedência sobre a de CDN genérica, que tem precedência sobre `Cache-Control` para a camada compartilhada.

## Atualizar o conteúdo

1. **Textos, traduções e preços:** editar os arquivos correspondentes em `src/data`/`src/i18n`, executar `npm run build` e publicar. Esse comando inclui o `prebuild`; um comando personalizado na hospedagem deve mantê-lo, em vez de chamar somente `next build`. Não existe atualização periódica contra fonte externa; preços entram na publicação seguinte. Datas e edições editoriais permanecem explícitas.
2. **Imagens:** substituir ou adicionar em `public/images`. `predev` e `prebuild` executam `scripts/generate-asset-versions.mjs`: SHA-256 truncado a 16 caracteres, determinístico, no manifesto de 333 imagens. O mesmo conteúdo produz a mesma versão; não há relógio nem número aleatório.
3. **Novas imagens renderizadas:** usar `AssetImage`, que aplica `assetUrl` ao `src`. Metadados Open Graph/Twitter também usam `assetUrl`. A URL recebe `?v=<hash>` sem renomear os arquivos. O manifesto gerado deve acompanhar a alteração no Git.
4. **PDFs, vídeos e links diretos:** manter os links existentes e publicar o novo arquivo; URLs fixas revalidam. PDFs preservam nome, MIME e requisições parciais. Não se antecipa o download do catálogo, das amostras ou dos vídeos.
5. **Fontes:** manter as referências locais em `next/font/local` e recompilar após substituir os arquivos. O Next gera os nomes com hash e o cache imutável; não é necessário cabeçalho personalizado.

`images.localPatterns` permite o otimizador somente em `/images/**` (queries intencionais para as versões) e `/_next/static/media/**` sem query. A versão instalada limita a lista a 25 padrões; 333 entradas exatas não cabem. Essa permissão de query não torna a origem imutável. O TTL do otimizador não foi aumentado.

A imagem social usa a mesma versão por conteúdo. Redes sociais podem manter caches próprios; publicar outra URL ajuda a distinguir a imagem, mas nossos cabeçalhos não limpam os caches dessas plataformas. Uma publicação normal basta para atualizar o site; não é necessário apagar preferências nem fazer purge global.

## Conferir cabeçalhos e reaproveitamento

Use uma compilação de produção e o servidor correspondente:

```powershell
npm run build
npm run start -- --port 3101
# Em outro terminal:
$env:QA_BASE_URL='http://127.0.0.1:3101'
$env:CACHE_REPORT_OUTPUT='docs/cache/local-production.json'
npm run check:cache
```

O script registra somente cabeçalhos presentes em GET/HEAD, condicionais com ETag ou Last-Modified e um único PDF com `Range: bytes=0-63`. Cancela os corpos dos arquivos após os headers. Nas condicionais usa `cache: "no-cache"` e `Cache-Control: max-age=0` explícito: o fetch padrão do Node acrescenta cabeçalhos de reload que podem provocar `200` mesmo com ETag igual. Nenhum status `304` ou `HIT` é presumido.

No navegador, visitar home → coleção → home no mesmo perfil com “Disable cache” desmarcado. Conferir transferências, cache e conteúdo visível; não limpar cookies. Para testar uma atualização, usar uma imagem controlada, recompilar, conferir hash/URL e conteúdo novos nesse mesmo perfil e remover a alteração de teste. Não modificar preços ou documentos oficiais apenas para isso.

## Evidências e limites

- [Produção local — HTTP](cache/local-production.json): 27 requisições, nenhum erro HTTP/rede, sete condicionais `304` e PDF parcial `206`. HTML privado e recursos gerados imutáveis confirmados, incluindo fonte descoberta no preload HTTP.
- Testes em produção: 35/35 passaram: 15 de cache, cinco do painel compacto, sete de idiomas, três de VLibras (incluindo o serviço real) e cinco de preferências, busca, menu e reflow. Build, TypeScript e inventário de traduções passaram; não existe script de lint neste projeto.
- [Atualização controlada A/B](cache/update-check.json): duas compilações, mesma porta, mesmo Edge/cache/cookies. Uma PNG sintética e um marcador oculto passaram de A para B: o HTML novo apontou para outro hash, a imagem otimizada trouxe bytes novos e a URL fixa retornou `200` com o validador antigo e `304` com o atual. Tema escuro, texto 200% e idioma inglês permaneceram salvos. A repetição da imagem A foi atendida pelo cache do navegador. Os arquivos foram restaurados byte a byte e a imagem sintética foi removida; nenhum conteúdo oficial foi alterado para o teste.
- [Reutilização no navegador](cache/browser-reuse.json): Edge, mesmo perfil e cache habilitado; primeira home transferiu 499.326 bytes e retorno 17.202 bytes, com 20 reutilizações. Sem erros de página ou downloads automáticos inesperados. É uma observação local, não um benchmark nem estimativa de ganho para usuários reais.
- [Publicação anterior](cache/published-before.json): home com ETag, `Vary` RSC e `x-vercel-cache: HIT`; arquivos com validação `304` e PDF com `206`. `/en` e `/es` retornaram `404`: esse deploy difere do checkout atual e não comprova as alterações locais.
- Não houve publicação ou purge. A confirmação dos cabeçalhos finais da CDN, das rotas de idiomas e dos novos URLs no domínio publicado depende de uma publicação autorizada e nova execução contra essa origem.

Referências: Next.js [headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers), [Image](https://nextjs.org/docs/app/api-reference/components/image), [Font](https://nextjs.org/docs/app/api-reference/components/font), [cache sem Cache Components](https://nextjs.org/docs/app/guides/caching-without-cache-components); Vercel [Cache-Control](https://vercel.com/docs/caching/cache-control-headers) e [CDN Cache](https://vercel.com/docs/caching/cdn-cache). As decisões também foram conferidas na documentação instalada de Next.js 16.4.0.
