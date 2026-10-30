import { TUpdateAlbumPayload } from "@/entities/Artist";
import { UploadReleaseFormValues } from "../model/types";
import { normalizePrice } from "./normalizePrice";

export function mapReleaseDirtyFieldsToPayload(
   dirtyFields: Partial<Record<string, unknown>>,
   data: UploadReleaseFormValues,
): TUpdateAlbumPayload {
  const payload: Record<string, unknown> = {};

  const toId = (val: unknown): number | null => {
    if (val === undefined || val === null || val === '') return null;
    const num = Number(val);
    return Number.isNaN(num) ? null : num;
  };

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof UploadReleaseFormValues) {
      case 'name':
        payload.name = value;
        break;

      case 'releaseDate':
        payload.release_date = value || null;
        break;

      case 'releaseType':
        payload.release_type = value;
        break;

      case 'upc':
        payload.upc = value || null;
        break;

      case 'genre':
        payload.genre = toId(value);
        break;

      case 'price':
        payload.price = normalizePrice(value);
        break;

      case 'description':
        payload.description = value ?? '';
        break;

      case 'mainImage':
        payload.cover_image = value ?? null;
        break;

      case 'allowHigherPrice':
        payload.allow_overpay = Boolean(value);
        break;

      case 'privacy':
        payload.visibility = value as 'public' | 'link_only' | 'hidden';
        break;
        
      default:
        break;
    }
  });

  return payload as TUpdateAlbumPayload;
};