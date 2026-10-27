import type { TBonusFormValues, TUpdateBonusPayload } from "../model/types";

export function mapBonusDirtyFieldsToPayload(
   dirtyFields: Partial<Record<string, unknown>>,
   data: TBonusFormValues,
): TUpdateBonusPayload {
  const payload: Record<string, unknown> = {};

  Object.keys(dirtyFields).forEach((key) => {
    if (key.startsWith('variants.')) return;
    const value = (data as any)[key];

    switch (key as keyof TBonusFormValues) {
      case "bonus_file":
        payload.bonus_file = value ?? null;
        break;

      case "name":
        payload.name = value;
        break;

      case "description":
        payload.description = value;
        break;

      default:
        break;
    }
  });

  return payload as TUpdateBonusPayload;
};