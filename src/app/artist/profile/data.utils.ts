import type {
  CurrentArtistResponse,
  UpdateCurrentArtistPayload,
} from "@/api/artist";
import type { TArtistDataItem } from "@/widgets/profile/ui/ArtistDataSection";

export function getArtistDataItemKey(item: TArtistDataItem): string {
  return item.id !== undefined
    ? String(item.id)
    : `${item.label}::${item.value}`;
}

export function buildArtistDataUpdatePayload(
  artist: CurrentArtistResponse,
  overrides: {
    contacts?: CurrentArtistResponse["contacts"];
    socials?: CurrentArtistResponse["socials"];
  } = {},
): UpdateCurrentArtistPayload {
  return {
    name: artist.name,
    description: artist.description ?? "",
    city: artist.city ?? "",
    url: artist.url ?? "",
    contacts: overrides.contacts ?? artist.contacts,
    socials: overrides.socials ?? artist.socials,
  };
}

export function buildArtistCoverState(
  artist: CurrentArtistResponse | null,
  cover: string | null,
): CurrentArtistResponse | null {
  if (!artist) {
    return artist;
  }

  return {
    ...artist,
    cover,
  };
}
