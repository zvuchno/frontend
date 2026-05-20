import type {
  CurrentArtistResponse,
  UpdateCurrentArtistPayload,
} from "@/api/artist";
import type { UserDataProps } from "@/entities/user/store/useUserStore";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";

type ArtistProfileFormValueSource = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  url?: string | null;
};

export const EMPTY_PROFILE_FORM_VALUES: FieldValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  city: "",
  url: "",
};

export function normalizePhone(value?: string | null): string {
  return value?.replace(/\D/g, "") ?? "";
}

export function getArtistProfileFormValues({
  name,
  email,
  phone,
  city,
  url,
}: ArtistProfileFormValueSource): FieldValues {
  return {
    name: name ?? "",
    email: email ?? "",
    phone: normalizePhone(phone),
    password: "",
    city: city ?? "",
    url: url ?? "",
  };
}

export function hasArtistProfileChanges(
  artist: CurrentArtistResponse,
  formData: FieldValues,
): boolean {
  return (
    (formData.name ?? "") !== (artist.name ?? "") ||
    (formData.city ?? "") !== (artist.city ?? "") ||
    (formData.url ?? "") !== (artist.url ?? "")
  );
}

export function hasPhoneChange(
  user: UserDataProps,
  formData: FieldValues,
): boolean {
  return normalizePhone(formData.phone) !== normalizePhone(user.phone);
}

export function buildArtistProfileUpdatePayload(
  artist: CurrentArtistResponse,
  formData: FieldValues,
): UpdateCurrentArtistPayload {
  return {
    name: formData.name ?? "",
    description: artist.description ?? "",
    city: formData.city ?? "",
    url: formData.url ?? "",
    contacts: artist.contacts,
    socials: artist.socials,
  };
}
