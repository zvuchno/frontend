import { TShowcaseAlbumDetail, TShowcaseMerchDetail } from "@/entities/Artist/model/types";
import { UploadFormValues } from "../model/types";

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
      privacy: 'public', // можно брать из бэкенда, если есть поле
      mainImage: undefined, // картинки на форме не храним как File, только URL
      additionalImages: [],
      kind: undefined,
      album: undefined,
      quantity: undefined,
      
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
    privacy: 'public',
    mainImage: undefined,
    additionalImages: [],
    quantity: merch.stock ?? undefined,
    releaseDate: '',
    genre: '',
    variants: merch.variants,
    propertyName: merch.property_name,
    hasProperty: merch.property_name ? true : false
  };
}