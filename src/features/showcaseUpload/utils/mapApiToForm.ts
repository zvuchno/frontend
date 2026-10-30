import type { TShowcaseAlbumDetail, TShowcaseMerchDetail } from "@/entities/Artist";
import type { UploadMerchFormValues, UploadReleaseFormValues } from "../model/types";

type TShowcaseItemDetail = TShowcaseAlbumDetail | TShowcaseMerchDetail;

export function mapApiToForm(item: TShowcaseItemDetail): UploadMerchFormValues | UploadReleaseFormValues {
  // Альбом
  if ("release_type" in item) {
    const album = item as TShowcaseAlbumDetail;
    return {
      name: album.name,
      releaseDate: album.release_date ?? '',
      releaseType: album.release_type,
      upc: album.upc ? Number(album.upc) : null,
      genre: String(album.genre_id),
      price: Number(album.price) || 0,
      allowHigherPrice: album.allow_overpay ?? false,
      description: album.description ?? '',
      privacy: album.visibility,
      mainImage: undefined,
      additionalImages: [],
      artistId: String(album.artist_id),
      
    };
  }

  // Мерч
  const merch = item as TShowcaseMerchDetail;
  return {
    name: merch.name,
    kind: String(merch.kind_id),
    album: String(merch.album_id),
    price: Number(merch.price) || 0,
    allowHigherPrice: merch.allow_overpay ?? false,
    description: merch.description ?? '',
    privacy: merch.visibility,
    mainImage: undefined,
    additionalImages: [],
    quantity: merch.stock ?? undefined,
    variants: merch.variants && merch.variants.length > 0 ? merch.variants : [{
      value: '',
      //sku: '',
      stock: 0,
    }],
    propertyName: merch.property_name,
    hasProperty: merch.property_name ? true : false,
    artistId: String(merch.artist_id)
  };
}