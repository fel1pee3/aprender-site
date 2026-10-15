export type DocumentPreview = { src: string; page: number; alt: string };
export type DocumentResource = {
  id: string; collectionSlug?: string; title: string; url: string; sourceUrl: string; format: "PDF";
  sizeBytes: number; pageCount: number; edition: string; year?: number;
  volume?: string; audience?: string; schoolYear?: string; preview?: string;
  previews?: DocumentPreview[]; sourcePage: string; verifiedAt: string;
  kind: "sample" | "institutional" | "catalog"; notes?: string;
};

export const documentResources: DocumentResource[] = [
  {
    "id": "acbr-matematica-5-ano",
    "collectionSlug": "acerta-brasil",
    "title": "ACerta Brasil #SuperaIDEB — Matemática, 5º ano",
    "url": "/documents/acbr-matematica-5-ano.pdf",
    "format": "PDF",
    "sizeBytes": 5784887,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/acbr-matematica-5-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/acbr-matematica-5-ano-p1.webp",
        "page": 1,
        "alt": "ACerta Brasil #SuperaIDEB — Matemática, 5º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/acbr-matematica-5-ano-p3.webp",
        "page": 3,
        "alt": "ACerta Brasil #SuperaIDEB — Matemática, 5º ano — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/acbr-matematica-5-ano-p8.webp",
        "page": 8,
        "alt": "ACerta Brasil #SuperaIDEB — Matemática, 5º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-acerta-brasil",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "5º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Acerta%20Brasil/AcBr%20-%20Matematica%205%20ano.pdf"
  },
  {
    "id": "acbr-portugues-5-ano",
    "collectionSlug": "acerta-brasil",
    "title": "ACerta Brasil #SuperaIDEB — Língua Portuguesa, 5º ano",
    "url": "/documents/acbr-portugues-5-ano.pdf",
    "format": "PDF",
    "sizeBytes": 6954215,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/acbr-portugues-5-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/acbr-portugues-5-ano-p1.webp",
        "page": 1,
        "alt": "ACerta Brasil #SuperaIDEB — Língua Portuguesa, 5º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/acbr-portugues-5-ano-p3.webp",
        "page": 3,
        "alt": "ACerta Brasil #SuperaIDEB — Língua Portuguesa, 5º ano — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/acbr-portugues-5-ano-p8.webp",
        "page": 8,
        "alt": "ACerta Brasil #SuperaIDEB — Língua Portuguesa, 5º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-acerta-brasil",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "5º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Acerta%20Brasil/AcBr%20-%20Portugues%205%20ano.pdf"
  },
  {
    "id": "brincando-e-aprendendo-vol-01",
    "collectionSlug": "brincando-e-aprendendo",
    "title": "Brincando e Aprendendo — Educação Infantil, livro 1",
    "url": "/documents/brincando-e-aprendendo-vol-01.pdf",
    "format": "PDF",
    "sizeBytes": 7972302,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/brincando-e-aprendendo-vol-01-p1.webp",
    "previews": [
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-01-p1.webp",
        "page": 1,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-01-p3.webp",
        "page": 3,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 1 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-01-p8.webp",
        "page": 8,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/brincando-e-aprendendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "1",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2001.pdf"
  },
  {
    "id": "brincando-e-aprendendo-vol-02",
    "collectionSlug": "brincando-e-aprendendo",
    "title": "Brincando e Aprendendo — Educação Infantil, livro 2",
    "url": "/documents/brincando-e-aprendendo-vol-02.pdf",
    "format": "PDF",
    "sizeBytes": 15959644,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/brincando-e-aprendendo-vol-02-p1.webp",
    "previews": [
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-02-p1.webp",
        "page": 1,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 2 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-02-p3.webp",
        "page": 3,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 2 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-02-p8.webp",
        "page": 8,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 2 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/brincando-e-aprendendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "2",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2002.pdf"
  },
  {
    "id": "brincando-e-aprendendo-vol-03",
    "collectionSlug": "brincando-e-aprendendo",
    "title": "Brincando e Aprendendo — Educação Infantil, livro 3",
    "url": "/documents/brincando-e-aprendendo-vol-03.pdf",
    "format": "PDF",
    "sizeBytes": 3695374,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/brincando-e-aprendendo-vol-03-p1.webp",
    "previews": [
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-03-p1.webp",
        "page": 1,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 3 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-03-p3.webp",
        "page": 3,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 3 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-03-p8.webp",
        "page": 8,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 3 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/brincando-e-aprendendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "3",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2003.pdf"
  },
  {
    "id": "brincando-e-aprendendo-vol-04",
    "collectionSlug": "brincando-e-aprendendo",
    "title": "Brincando e Aprendendo — Educação Infantil, livro 4",
    "url": "/documents/brincando-e-aprendendo-vol-04.pdf",
    "format": "PDF",
    "sizeBytes": 6659269,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/brincando-e-aprendendo-vol-04-p1.webp",
    "previews": [
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-04-p1.webp",
        "page": 1,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 4 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-04-p3.webp",
        "page": 3,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 4 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/brincando-e-aprendendo-vol-04-p8.webp",
        "page": 8,
        "alt": "Brincando e Aprendendo — Educação Infantil, livro 4 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/brincando-e-aprendendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "4",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Brincando%20e%20Aprendendo/Brincando%20e%20Aprendendo%20-%20Vol%2004.pdf"
  },
  {
    "id": "ecs-1-ano",
    "collectionSlug": "escrever-comunicar-e-ser",
    "title": "Escrever, Comunicar e Ser — 1º ano",
    "url": "/documents/ecs-1-ano.pdf",
    "format": "PDF",
    "sizeBytes": 5077814,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/ecs-1-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/ecs-1-ano-p1.webp",
        "page": 1,
        "alt": "Escrever, Comunicar e Ser — 1º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/ecs-1-ano-p4.webp",
        "page": 4,
        "alt": "Escrever, Comunicar e Ser — 1º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/ecs-1-ano-p8.webp",
        "page": 8,
        "alt": "Escrever, Comunicar e Ser — 1º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/escrever-comunicar-e-ser",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "1º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%201%20ano.pdf"
  },
  {
    "id": "ecs-2-ano",
    "collectionSlug": "escrever-comunicar-e-ser",
    "title": "Escrever, Comunicar e Ser — 2º ano",
    "url": "/documents/ecs-2-ano.pdf",
    "format": "PDF",
    "sizeBytes": 17274147,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/ecs-2-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/ecs-2-ano-p1.webp",
        "page": 1,
        "alt": "Escrever, Comunicar e Ser — 2º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/ecs-2-ano-p4.webp",
        "page": 4,
        "alt": "Escrever, Comunicar e Ser — 2º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/ecs-2-ano-p8.webp",
        "page": 8,
        "alt": "Escrever, Comunicar e Ser — 2º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/escrever-comunicar-e-ser",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "2º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%202%20ano.pdf"
  },
  {
    "id": "ecs-3-ano",
    "collectionSlug": "escrever-comunicar-e-ser",
    "title": "Escrever, Comunicar e Ser — 3º ano",
    "url": "/documents/ecs-3-ano.pdf",
    "format": "PDF",
    "sizeBytes": 12648318,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/ecs-3-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/ecs-3-ano-p1.webp",
        "page": 1,
        "alt": "Escrever, Comunicar e Ser — 3º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/ecs-3-ano-p4.webp",
        "page": 4,
        "alt": "Escrever, Comunicar e Ser — 3º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/ecs-3-ano-p8.webp",
        "page": 8,
        "alt": "Escrever, Comunicar e Ser — 3º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/escrever-comunicar-e-ser",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "3º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%203%20ano.pdf"
  },
  {
    "id": "ecs-4-ano",
    "collectionSlug": "escrever-comunicar-e-ser",
    "title": "Escrever, Comunicar e Ser — 4º ano",
    "url": "/documents/ecs-4-ano.pdf",
    "format": "PDF",
    "sizeBytes": 15799087,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/ecs-4-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/ecs-4-ano-p1.webp",
        "page": 1,
        "alt": "Escrever, Comunicar e Ser — 4º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/ecs-4-ano-p4.webp",
        "page": 4,
        "alt": "Escrever, Comunicar e Ser — 4º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/ecs-4-ano-p8.webp",
        "page": 8,
        "alt": "Escrever, Comunicar e Ser — 4º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/escrever-comunicar-e-ser",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "4º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%204%20ano.pdf"
  },
  {
    "id": "ecs-5-ano",
    "collectionSlug": "escrever-comunicar-e-ser",
    "title": "Escrever, Comunicar e Ser — 5º ano",
    "url": "/documents/ecs-5-ano.pdf",
    "format": "PDF",
    "sizeBytes": 7396338,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/ecs-5-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/ecs-5-ano-p1.webp",
        "page": 1,
        "alt": "Escrever, Comunicar e Ser — 5º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/ecs-5-ano-p4.webp",
        "page": 4,
        "alt": "Escrever, Comunicar e Ser — 5º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/ecs-5-ano-p8.webp",
        "page": 8,
        "alt": "Escrever, Comunicar e Ser — 5º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/escrever-comunicar-e-ser",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "5º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Escrever%20comunicar%20e%20ser/ECS%20-%205%20ano.pdf"
  },
  {
    "id": "educacao-infantil-laranja",
    "collectionSlug": "lendo-e-escrevendo",
    "title": "Lendo e Escrevendo — Dia de Supermercado (amostra laranja)",
    "url": "/documents/educacao-infantil-laranja.pdf",
    "format": "PDF",
    "sizeBytes": 9784794,
    "pageCount": 10,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/educacao-infantil-laranja-p1.webp",
    "previews": [
      {
        "src": "/images/samples/educacao-infantil-laranja-p1.webp",
        "page": 1,
        "alt": "Lendo e Escrevendo — Dia de Supermercado (amostra laranja) — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-laranja-p3.webp",
        "page": 3,
        "alt": "Lendo e Escrevendo — Dia de Supermercado (amostra laranja) — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-laranja-p8.webp",
        "page": 8,
        "alt": "Lendo e Escrevendo — Dia de Supermercado (amostra laranja) — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/lendo-e-escrevendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Laranja.pdf",
    "notes": "Trecho “Dia de Supermercado”. Livro e volume não identificados no documento."
  },
  {
    "id": "educacao-infantil-verde-vol-02",
    "collectionSlug": "lendo-e-escrevendo",
    "title": "Lendo e Escrevendo — Livro da Criança 2, volume II (verde)",
    "url": "/documents/educacao-infantil-verde-vol-02.pdf",
    "format": "PDF",
    "sizeBytes": 15147944,
    "pageCount": 13,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/educacao-infantil-verde-vol-02-p1.webp",
    "previews": [
      {
        "src": "/images/samples/educacao-infantil-verde-vol-02-p1.webp",
        "page": 1,
        "alt": "Lendo e Escrevendo — Livro da Criança 2, volume II (verde) — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-verde-vol-02-p3.webp",
        "page": 3,
        "alt": "Lendo e Escrevendo — Livro da Criança 2, volume II (verde) — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-verde-vol-02-p8.webp",
        "page": 8,
        "alt": "Lendo e Escrevendo — Livro da Criança 2, volume II (verde) — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/lendo-e-escrevendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "II",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Verde%20-%20Vol%2002.pdf",
    "notes": "Livro da Criança 2 · volume II · ISBN 978-85-8314-256-0."
  },
  {
    "id": "educacao-infantil-vermelho-vol-01",
    "collectionSlug": "lendo-e-escrevendo",
    "title": "Lendo e Escrevendo — Livro da Criança 3, volume I (vermelho)",
    "url": "/documents/educacao-infantil-vermelho-vol-01.pdf",
    "format": "PDF",
    "sizeBytes": 7888213,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/educacao-infantil-vermelho-vol-01-p1.webp",
    "previews": [
      {
        "src": "/images/samples/educacao-infantil-vermelho-vol-01-p1.webp",
        "page": 1,
        "alt": "Lendo e Escrevendo — Livro da Criança 3, volume I (vermelho) — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-vermelho-vol-01-p3.webp",
        "page": 3,
        "alt": "Lendo e Escrevendo — Livro da Criança 3, volume I (vermelho) — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/educacao-infantil-vermelho-vol-01-p8.webp",
        "page": 8,
        "alt": "Lendo e Escrevendo — Livro da Criança 3, volume I (vermelho) — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/lendo-e-escrevendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Criança",
    "volume": "I",
    "schoolYear": "Educação Infantil",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Lendo%20e%20escrevendo/Educacao%20Infantil%20-%20Vermelho%20-%20Vol%2001.pdf"
  },
  {
    "id": "livro-tema-1",
    "collectionSlug": "projeto-tema",
    "title": "Projeto TEMA 1 — Livro do Aluno, Sala, volume 1",
    "url": "/documents/livro-tema-1.pdf",
    "format": "PDF",
    "sizeBytes": 3088061,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/livro-tema-1-p1.webp",
    "previews": [
      {
        "src": "/images/samples/livro-tema-1-p1.webp",
        "page": 1,
        "alt": "Projeto TEMA 1 — Livro do Aluno, Sala, volume 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-1-p3.webp",
        "page": 3,
        "alt": "Projeto TEMA 1 — Livro do Aluno, Sala, volume 1 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-1-p8.webp",
        "page": 8,
        "alt": "Projeto TEMA 1 — Livro do Aluno, Sala, volume 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/projeto-tema",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "volume": "1",
    "schoolYear": "Livro 1",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%201.pdf"
  },
  {
    "id": "livro-tema-2",
    "collectionSlug": "projeto-tema",
    "title": "Projeto TEMA 2 — Livro do Aluno, Sala, volume 1",
    "url": "/documents/livro-tema-2.pdf",
    "format": "PDF",
    "sizeBytes": 5594872,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/livro-tema-2-p1.webp",
    "previews": [
      {
        "src": "/images/samples/livro-tema-2-p1.webp",
        "page": 1,
        "alt": "Projeto TEMA 2 — Livro do Aluno, Sala, volume 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-2-p3.webp",
        "page": 3,
        "alt": "Projeto TEMA 2 — Livro do Aluno, Sala, volume 1 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-2-p8.webp",
        "page": 8,
        "alt": "Projeto TEMA 2 — Livro do Aluno, Sala, volume 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/projeto-tema",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "volume": "1",
    "schoolYear": "Livro 2",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%202.pdf"
  },
  {
    "id": "livro-tema-3",
    "collectionSlug": "projeto-tema",
    "title": "Projeto TEMA 3 — Livro do Aluno, Sala, volume 1",
    "url": "/documents/livro-tema-3.pdf",
    "format": "PDF",
    "sizeBytes": 15009933,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/livro-tema-3-p1.webp",
    "previews": [
      {
        "src": "/images/samples/livro-tema-3-p1.webp",
        "page": 1,
        "alt": "Projeto TEMA 3 — Livro do Aluno, Sala, volume 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-3-p4.webp",
        "page": 4,
        "alt": "Projeto TEMA 3 — Livro do Aluno, Sala, volume 1 — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/livro-tema-3-p8.webp",
        "page": 8,
        "alt": "Projeto TEMA 3 — Livro do Aluno, Sala, volume 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/projeto-tema",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "volume": "1",
    "schoolYear": "Livro 3",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/TEMA/Livro%20Tema%203.pdf"
  },
  {
    "id": "nlvfs-1-ano-vol-01",
    "collectionSlug": "novo-lendo-voce-fica-sabendo",
    "title": "Novo Lendo Você Fica Sabendo — 1º ano, volume 1",
    "url": "/documents/nlvfs-1-ano-vol-01.pdf",
    "format": "PDF",
    "sizeBytes": 6258588,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/nlvfs-1-ano-vol-01-p1.webp",
    "previews": [
      {
        "src": "/images/samples/nlvfs-1-ano-vol-01-p1.webp",
        "page": 1,
        "alt": "Novo Lendo Você Fica Sabendo — 1º ano, volume 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/nlvfs-1-ano-vol-01-p3.webp",
        "page": 3,
        "alt": "Novo Lendo Você Fica Sabendo — 1º ano, volume 1 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/nlvfs-1-ano-vol-01-p8.webp",
        "page": 8,
        "alt": "Novo Lendo Você Fica Sabendo — 1º ano, volume 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/novo-lendo-voce-fica-sabendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "1º ano",
    "volume": "1",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Novo%20Lendo%20Voce%20Fica%20Sabendo/NLVFS%20-%201%20ANO%20-%20Vol%2001.pdf"
  },
  {
    "id": "nlvfs-2-ano-vol-01",
    "collectionSlug": "novo-lendo-voce-fica-sabendo",
    "title": "Novo Lendo Você Fica Sabendo — 2º ano, volume 1",
    "url": "/documents/nlvfs-2-ano-vol-01.pdf",
    "format": "PDF",
    "sizeBytes": 4377125,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/nlvfs-2-ano-vol-01-p1.webp",
    "previews": [
      {
        "src": "/images/samples/nlvfs-2-ano-vol-01-p1.webp",
        "page": 1,
        "alt": "Novo Lendo Você Fica Sabendo — 2º ano, volume 1 — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/nlvfs-2-ano-vol-01-p3.webp",
        "page": 3,
        "alt": "Novo Lendo Você Fica Sabendo — 2º ano, volume 1 — página digital 3 da amostra"
      },
      {
        "src": "/images/samples/nlvfs-2-ano-vol-01-p8.webp",
        "page": 8,
        "alt": "Novo Lendo Você Fica Sabendo — 2º ano, volume 1 — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/novo-lendo-voce-fica-sabendo",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "2º ano",
    "volume": "1",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Novo%20Lendo%20Voce%20Fica%20Sabendo/NLVFS%20-%202%20ANO%20-%20Vol%2001.pdf"
  },
  {
    "id": "paic",
    "title": "Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará",
    "url": "/documents/paic.pdf",
    "format": "PDF",
    "sizeBytes": 7621921,
    "pageCount": 100,
    "edition": "SEDUC / UNICEF, Fortaleza, 2012",
    "preview": "/images/samples/paic-p1.webp",
    "previews": [
      {
        "src": "/images/samples/paic-p1.webp",
        "page": 1,
        "alt": "Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/paic-p6.webp",
        "page": 6,
        "alt": "Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará — página digital 6 da amostra"
      },
      {
        "src": "/images/samples/paic-p8.webp",
        "page": 8,
        "alt": "Regime de colaboração para a garantia do direito à aprendizagem: o PAIC no Ceará — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/paic",
    "verifiedAt": "2026-10-14",
    "kind": "institutional",
    "audience": "Educadores, gestores e pesquisadores",
    "notes": "SEDUC / UNICEF · ISBN 978-85-8171-019-8. A publicação tem 196 páginas editoriais, organizadas em 100 páginas digitais.",
    "year": 2012,
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/PAIC.pdf"
  },
  {
    "id": "vida-e-linguagem-6-ano",
    "collectionSlug": "vida-e-linguagem",
    "title": "Vida & Linguagem — 6º ano",
    "url": "/documents/vida-e-linguagem-6-ano.pdf",
    "format": "PDF",
    "sizeBytes": 19376186,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-linguagem-6-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-linguagem-6-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Linguagem — 6º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-6-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Linguagem — 6º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-6-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Linguagem — 6º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-linguagem",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "6º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%206%20ano.pdf"
  },
  {
    "id": "vida-e-linguagem-7-ano",
    "collectionSlug": "vida-e-linguagem",
    "title": "Vida & Linguagem — 7º ano",
    "url": "/documents/vida-e-linguagem-7-ano.pdf",
    "format": "PDF",
    "sizeBytes": 21920203,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-linguagem-7-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-linguagem-7-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Linguagem — 7º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-7-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Linguagem — 7º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-7-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Linguagem — 7º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-linguagem",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "7º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%207%20ano.pdf"
  },
  {
    "id": "vida-e-linguagem-8-ano",
    "collectionSlug": "vida-e-linguagem",
    "title": "Vida & Linguagem — 8º ano",
    "url": "/documents/vida-e-linguagem-8-ano.pdf",
    "format": "PDF",
    "sizeBytes": 21347820,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-linguagem-8-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-linguagem-8-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Linguagem — 8º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-8-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Linguagem — 8º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-8-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Linguagem — 8º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-linguagem",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "8º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%208%20ano.pdf"
  },
  {
    "id": "vida-e-linguagem-9-ano",
    "collectionSlug": "vida-e-linguagem",
    "title": "Vida & Linguagem — 9º ano",
    "url": "/documents/vida-e-linguagem-9-ano.pdf",
    "format": "PDF",
    "sizeBytes": 19039025,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-linguagem-9-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-linguagem-9-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Linguagem — 9º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-9-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Linguagem — 9º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-linguagem-9-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Linguagem — 9º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-linguagem",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "9º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Linguagem/Vida%20e%20Linguagem%209%20ano.pdf"
  },
  {
    "id": "vida-e-matematica-6-ano",
    "collectionSlug": "vida-e-matematica",
    "title": "Vida & Matemática — 6º ano",
    "url": "/documents/vida-e-matematica-6-ano.pdf",
    "format": "PDF",
    "sizeBytes": 12728417,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-matematica-6-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-matematica-6-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Matemática — 6º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-6-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Matemática — 6º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-6-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Matemática — 6º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-matematica",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "6º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%206%20ano.pdf"
  },
  {
    "id": "vida-e-matematica-7-ano",
    "collectionSlug": "vida-e-matematica",
    "title": "Vida & Matemática — 7º ano",
    "url": "/documents/vida-e-matematica-7-ano.pdf",
    "format": "PDF",
    "sizeBytes": 9557593,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-matematica-7-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-matematica-7-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Matemática — 7º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-7-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Matemática — 7º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-7-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Matemática — 7º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-matematica",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "7º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%207%20ano.pdf"
  },
  {
    "id": "vida-e-matematica-8-ano",
    "collectionSlug": "vida-e-matematica",
    "title": "Vida & Matemática — 8º ano",
    "url": "/documents/vida-e-matematica-8-ano.pdf",
    "format": "PDF",
    "sizeBytes": 8857044,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-matematica-8-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-matematica-8-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Matemática — 8º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-8-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Matemática — 8º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-8-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Matemática — 8º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-matematica",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "8º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%208%20ano.pdf"
  },
  {
    "id": "vida-e-matematica-9-ano",
    "collectionSlug": "vida-e-matematica",
    "title": "Vida & Matemática — 9º ano",
    "url": "/documents/vida-e-matematica-9-ano.pdf",
    "format": "PDF",
    "sizeBytes": 8642551,
    "pageCount": 11,
    "edition": "Amostra de acervo · ano de edição não informado",
    "preview": "/images/samples/vida-e-matematica-9-ano-p1.webp",
    "previews": [
      {
        "src": "/images/samples/vida-e-matematica-9-ano-p1.webp",
        "page": 1,
        "alt": "Vida & Matemática — 9º ano — página digital 1 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-9-ano-p4.webp",
        "page": 4,
        "alt": "Vida & Matemática — 9º ano — página digital 4 da amostra"
      },
      {
        "src": "/images/samples/vida-e-matematica-9-ano-p8.webp",
        "page": 8,
        "alt": "Vida & Matemática — 9º ano — página digital 8 da amostra"
      }
    ],
    "sourcePage": "https://www.aprendereditora.com.br/colecao-vida-e-matematica",
    "verifiedAt": "2026-10-14",
    "kind": "sample",
    "audience": "Aluno",
    "schoolYear": "9º ano",
    "sourceUrl": "https://aprendereditora.com.br/v2/midia/kcfinder/files/Livros%20Final/Vida%20E%20Matematica/Vida%20e%20Matematica%209%20ano.pdf"
  },
  {
    "id": "catalogo-2025-20-anos",
    "title": "Catálogo Aprender Editora — 20 anos",
    "url": "/documents/catalogo-2025-20-anos.pdf",
    "format": "PDF",
    "sizeBytes": 70269887,
    "pageCount": 64,
    "edition": "Catálogo institucional de 2025",
    "year": 2025,
    "kind": "catalog",
    "sourcePage": "https://www.opovo.com.br/noticias/especialpublicitario/aprendereditora/2025/11/07/aprender-editora-duas-decadas-formando-leitores-professores-e-futuros.html",
    "verifiedAt": "2026-10-14",
    "sourceUrl": "https://www.opovo.com.br/_midias/pdf/2025/11/07/revista_aprender_editora_2025___20_anos-37805690.pdf"
  }
];

export function getCollectionResources(slug: string): DocumentResource[] {
  return documentResources.filter((resource) => resource.collectionSlug === slug);
}

export function formatFileSize(bytes: number): string {
  return `${(bytes / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} MB`;
}
