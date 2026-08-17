import { TCreateAlbumRequest, TCreateMerchRequest } from "@/entities/Artist";
import { UploadFormValues } from "../model/types";

const normalizePrice = (val: number): string => {
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};

export const createProductPayload = (
  data: UploadFormValues,
  productType: 'album' | 'merch' | 'single',
  profileType: 'artist' | 'label' | undefined,
  currentArtistId: number | null,
  action: 'uploadTrack' | 'publish' | 'draft' | 'save' | 'cancel',
  hasProperty?: boolean,
): TCreateAlbumRequest | TCreateMerchRequest => {
  
  const priceStr = data.price ? normalizePrice(data.price) : '';
  const artist = profileType === 'artist'
    ? currentArtistId!
    : data.artistId ? Number(data.artistId) : currentArtistId!;

  if (productType === 'album') {

    return {
      name: data.name,
      artist,
      is_single: false,
      release_date: data.releaseDate,
      genre: data.genre ? Number(data.genre) : null,
      price: priceStr,
      description: data.description ?? '',
      cover_image: data.mainImage ?? null,
      allow_overpay: data.allowHigherPrice,
      is_published: action === 'publish',
      visibility: data.privacy,
    };
  }

  // merch
  return {
    name: data.name,
    kind: data.kind ? Number(data.kind) : null,
    price: priceStr,
    album: data.album ? Number(data.album) : null,
    artist,
    description: data.description ?? '',
    allow_overpay: data.allowHigherPrice,
    visibility: data.privacy,
    is_published: action === 'publish',
    property_name: data.propertyName ?? '',
    variants: hasProperty ? data.variants : [],
    stock: hasProperty ? undefined : data.quantity,
  };
}