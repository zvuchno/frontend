import type { TShowcaseAlbumDetail, TShowcaseMerchDetail } from "@/entities/Artist";
import type { UploadFormValues } from "../model/types";

type TShowcaseItemDetail = TShowcaseAlbumDetail | TShowcaseMerchDetail;

export function mapApiToForm(item: TShowcaseItemDetail): UploadFormValues {
  // Альбом
  if ('is_single' in item) {
    const album = item as TShowcaseAlbumDetail;
    return {
      name: album.name,
      releaseDate: album.release_date ?? '',
      genre: String(album.genre_id),
      price: Number(album.price) || 0,
      allowHigherPrice: album.allow_overpay ?? false,
      description: album.description ?? '',
      privacy: album.visibility,
      mainImage: undefined,
      additionalImages: [],
      kind: undefined,
      album: undefined,
      quantity: undefined,
      //artistId: String(album.artist_id)
      
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
    releaseDate: '',
    genre: '',
    variants: merch.variants && merch.variants.length > 0 ? merch.variants : [{
      value: '',
      //sku: '',
      stock: 0,
    }],
    propertyName: merch.property_name,
    hasProperty: merch.property_name ? true : false,
    //artistId: String(merch.artist_id)
  };
}