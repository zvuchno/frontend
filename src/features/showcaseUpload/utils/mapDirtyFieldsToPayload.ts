import type { TUpdateAlbumPayload, TUpdateMerchPayload } from "@/entities/Artist";
import type { UploadFormValues } from "../model/types";

const normalizePrice = (val: number): string => {
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};

export function mapDirtyFieldsToPayload(
   dirtyFields: Partial<Record<string, unknown>>,
   data: UploadFormValues,
   hasProperty?: boolean,
): TUpdateAlbumPayload | TUpdateMerchPayload {
  const payload: Record<string, unknown> = {};

  const toId = (val: unknown): number | null => {
    if (val === undefined || val === null || val === '') return null;
    const num = Number(val);
    return Number.isNaN(num) ? null : num;
  };

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof UploadFormValues) {
      case 'name':
        payload.name = value;
        break;

      case 'releaseDate':
        payload.release_date = value || null;
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

      case 'additionalImages':
        break;

      case 'allowHigherPrice':
        payload.allow_overpay = Boolean(value);
        break;

      case 'privacy':
        payload.visibility = value as 'public' | 'link_only' | 'hidden';
        break;

      // Поля только для мерча
      case 'kind':
        payload.kind = toId(value);
        break;

      case 'album':
        payload.album = toId(value);
        break;

      case 'propertyName':
        payload.property_name = value ?? '';
        break;

      case 'quantity':
        payload.stock = hasProperty ? undefined : Number(value);
        break;

      case 'variants':
        payload.variants = hasProperty ? value : [];
        break;
        
      default:
        break;
    }
  });

  return payload as TUpdateAlbumPayload | TUpdateMerchPayload;
};