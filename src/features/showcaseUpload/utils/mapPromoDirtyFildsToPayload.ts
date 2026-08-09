import type { TUpdatePromocodePayload } from "@/entities/Artist/model/types";
import type { PromocodeFormValues } from "../model/types";

export function mapPromoDirtyFieldsToPayload(
   dirtyFields: Partial<Record<string, unknown>>,
   data: PromocodeFormValues,
): TUpdatePromocodePayload {
  const payload: Record<string, unknown> = {};

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof PromocodeFormValues) {
      case 'discountType':
        payload.discount_type = value;
        break;

      case 'discountValue':
        payload.discount_value = value ? Number(value) : '';
        break;

      case 'description':
        payload.description = value;
        break;

      case 'limit':
        payload.usage_limit = value.trim() ? value : null;
        break;

      case 'startAt':
        payload.start_at = value ?? '';
        break;

      case 'endAt':
        payload.end_at = value ?? '';
        break;
        
      default:
        break;
    }
  });

  return payload as TUpdatePromocodePayload;
};