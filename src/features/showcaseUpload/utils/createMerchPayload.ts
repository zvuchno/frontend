import { TCreateMerchRequest } from "@/entities/Artist";
import { UploadMerchFormValues } from "../model/types";
import { normalizePrice } from "./normalizePrice";

export const createMerchPayload = (
  data: UploadMerchFormValues,
  profileType: "artist" | "label" | undefined,
  currentArtistId: number | null,
  action: "uploadTrack" | "publish" | "draft" | "save" | "cancel",
  hasProperty?: boolean,
): TCreateMerchRequest => {
  
  const priceStr = data.price ? normalizePrice(data.price) : "";
  const artist = profileType === "artist"
    ? currentArtistId!
    : data.artistId ? Number(data.artistId) : currentArtistId!;

  return {
    name: data.name,
    kind: data.kind ? Number(data.kind) : null,
    price: priceStr,
    album: data.album ? Number(data.album) : null,
    artist,
    description: data.description ?? "",
    allow_overpay: data.allowHigherPrice,
    visibility: data.privacy,
    is_published: action === "publish",
    property_name: data.propertyName ?? "",
    variants: hasProperty ? data.variants : [],
    stock: hasProperty ? undefined : data.quantity,
  };
}