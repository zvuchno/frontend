import { TCreateAlbumRequest } from "@/entities/Artist";
import { UploadReleaseFormValues } from "../model/types";
import { normalizePrice } from "./normalizePrice";

export const createReleaseProductPayload = (
  data: UploadReleaseFormValues,
  profileType: "artist" | "label" | undefined,
  currentArtistId: number | null,
  action: "uploadTrack" | "publish" | "draft" | "save" | "cancel" | "uploadBonus",
): TCreateAlbumRequest => {
  
  const priceStr = data.price ? normalizePrice(data.price) : "";
  const artist = profileType === "artist"
    ? currentArtistId!
    : data.artistId ? Number(data.artistId) : currentArtistId!;

    return {
      name: data.name,
      artist,
      release_type: data.releaseType,
      upc: data.upc ? (data.upc).toString() : null,
      release_date: data.releaseDate,
      genre: data.genre ? Number(data.genre) : null,
      price: priceStr,
      description: data.description ?? "",
      cover_image: data.mainImage ?? null,
      allow_overpay: data.allowHigherPrice,
      is_published: action === 'publish',
      visibility: data.privacy,
    };
}