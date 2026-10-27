import type { TUpdateBonusPayload } from "../model/types";

export const payloadToFormData = (payload: TUpdateBonusPayload): FormData => {
  const { bonus_file, name, description, album } = payload;
  const formData = new FormData();

  if (bonus_file && bonus_file instanceof File) {
    formData.append("bonus_file", bonus_file, bonus_file.name);
  }

  if (name && name.trim().length > 0) formData.append("name", name.trim());

  if (description && description.trim().length > 0) {
    formData.append("description", description.trim());
  }

  formData.append("album", String(album));

  return formData;
};