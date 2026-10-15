import { primaryCollectionDetails } from './collection-details-primary';
import { secondaryCollectionDetails } from './collection-details-secondary';
import type { CollectionDetail } from './collection-types';

export type { CollectionBook, CollectionEdition, CollectionDetail, MaterialImage } from './collection-types';
export const collectionDetails: Record<string, CollectionDetail> = {
  ...primaryCollectionDetails,
  ...secondaryCollectionDetails,
};
export const getCollectionDetail = (slug: string) => collectionDetails[slug];
