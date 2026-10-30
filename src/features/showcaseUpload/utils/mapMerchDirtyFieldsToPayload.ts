import { TUpdateMerchPayload } from "@/entities/Artist";
import { UploadMerchFormValues } from "../model/types";
import { normalizePrice } from "./normalizePrice";

export function mapMerchDirtyFieldsToPayload(
   dirtyFields: Partial<Record<string, unknown>>,
   data: UploadMerchFormValues,
   hasProperty?: boolean,
): TUpdateMerchPayload {
  const payload: Record<string, unknown> = {};

  const toId = (val: unknown): number | null => {
    if (val === undefined || val === null || val === '') return null;
    const num = Number(val);
    return Number.isNaN(num) ? null : num;
  };

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof UploadMerchFormValues) {
      case 'name':
        payload.name = value;
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

  return payload as TUpdateMerchPayload;
};