import type { FieldValues } from "@/features/profile";

import type { UserDataProps } from "@/entities/user";
import type { 
  CurrentArtistResponse, 
  UpdateCurrentArtistPayload 
} from "@/entities/profile";

type ArtistProfileFormValueSource = {
  name?: string | null;
  description?: string | null;
  city?: string | null;
  url?: string | null;
};

export const EMPTY_PROFILE_FORM_VALUES: FieldValues = {
  name: "",
  description: "",
  city: "",
  url: "",
};

export function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
}

export function getArtistProfileFormValues({
  name,
  description,
  city,
  url,
}: ArtistProfileFormValueSource): FieldValues {
  return {
    name: name ?? "",
    description: description ?? "",
    password: "",
    city: city ?? "",
    url: url ?? "",
  };
}

export function hasArtistProfileChanges(
  artist: CurrentArtistResponse,
  formData: FieldValues
): boolean {
  return (
    (formData.name ?? "") !== (artist.name ?? "") ||
    (formData.description ?? "") !== (artist.description ?? "") ||
    (formData.city ?? "") !== (artist.city ?? "") ||
    (formData.url ?? "") !== (artist.slug ?? "")
  );
}

export function hasPhoneChange(user: UserDataProps, formData: FieldValues): boolean {
  return normalizePhone(formData.phone) !== normalizePhone(user.phone);
}

export function buildArtistProfileUpdatePayload(
  artist: CurrentArtistResponse,
  formData: FieldValues
): UpdateCurrentArtistPayload {
  return {
    name: formData.name ?? "",
    description: artist.description ?? "",
    city: formData.city ?? "",
    slug: formData.url ?? "",
    contacts: artist.contacts,
    socials: artist.socials,
  };
}
