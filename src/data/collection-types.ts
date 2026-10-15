export interface CollectionBook {
  id: string;
  title: string;
  audience: string;
  schoolYear?: string;
  ageRange?: string;
  description: string;
  components: string[];
  pages?: number;
  quantity?: number;
  image?: string;
}

export interface CollectionEdition {
  id: string;
  label: string;
  sourceUrl: string;
  sourcePages?: number[];
  context?: string;
  audience: string;
  foundation: string[];
  books: CollectionBook[];
  support: string[];
}

export interface MaterialImage {
  src: string;
  alt: string;
  caption: string;
  editionId: string;
  group?: string;
}

export interface CollectionDetail {
  slug: string;
  intro: string[];
  editions: CollectionEdition[];
  gallery: MaterialImage[];
}
