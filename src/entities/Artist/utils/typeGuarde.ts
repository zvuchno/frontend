import type { TShowcaseAlbum, TShowcaseMerch, TShowcasePromocode } from "../model/types";

export function isAlbum(item: TShowcaseAlbum | TShowcaseMerch | TShowcasePromocode): item is TShowcaseAlbum {
  return 'is_published' in item;
}

export function isMerch(item: TShowcaseAlbum | TShowcaseMerch | TShowcasePromocode): item is TShowcaseMerch {
  return 'stock' in item;
}

export function isPromo(item: TShowcaseAlbum | TShowcaseMerch | TShowcasePromocode): item is TShowcasePromocode {
  return 'code' in item;
}