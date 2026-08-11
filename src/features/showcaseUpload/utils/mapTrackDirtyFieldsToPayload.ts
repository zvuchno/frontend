import type { TShowcaseUpdateTrackInfoPayload } from "@/entities/Artist";
import type { TrackFormValues } from "../model/types";

const normalizePrice = (val: number): string => {
  const rounded = Math.round(val * 100) / 100;
  return rounded.toString();
};

export function mapTrackDirtyFieldsToPayload(
  dirtyFields: Partial<Record<string, unknown>>,
  data: TrackFormValues,
): TShowcaseUpdateTrackInfoPayload {
  const payload: Record<string, unknown> = {};

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof TrackFormValues) {
      case 'track':
        break;

      case 'name':
        payload.name = value;
        break;

      case 'price':
        payload.price = normalizePrice(value);
        break;

      case 'allowHigherPrice':
        payload.allow_overpay = value;
        break;

      case 'description':
        payload.description = value;
        break;
        
      default:
        break;
    }
  });

  return payload as TShowcaseUpdateTrackInfoPayload;
};