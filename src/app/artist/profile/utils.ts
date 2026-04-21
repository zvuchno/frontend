import type { CurrentArtistResponse } from "@/api/artist";
import type { ArtistDataSectionProps } from "@/widgets/profile/ui/ArtistDataSection";

export function mapArtistToArtistDataSectionProps(
  artist: CurrentArtistResponse,
): Pick<
  ArtistDataSectionProps,
  "coverSrc" | "description" | "contacts" | "socials"
> {
  return {
    coverSrc: artist.cover ?? "",
    description: artist.description ?? "",
    contacts: artist.contacts ?? [],
    socials: artist.socials ?? [],
  };
}

export function isArtistPersonalDataComplete(
  artist: CurrentArtistResponse | null,
): boolean {
  if (!artist) {
    return false;
  }

  return (
    Boolean(artist.cover) &&
    Boolean(artist.description?.trim()) &&
    artist.contacts.length > 0 &&
    artist.socials.length > 0
  );
}
