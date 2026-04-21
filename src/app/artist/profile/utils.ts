import type { CurrentArtistResponse } from "@/api/artist";
import type { ArtistDataSectionProps } from "@/widgets/profile/ui/ArtistDataSection";
import type { TArtistDataItem } from "@/widgets/profile/ui/ArtistDataSection";

export function mapArtistToArtistDataSectionProps(
  artist: CurrentArtistResponse,
): Pick<
  ArtistDataSectionProps,
  "coverSrc" | "description" | "contacts" | "socials"
> {
  return {
    coverSrc: artist.cover ?? "",
    description: artist.description ?? "",
    contacts: [...(artist.contacts ?? [])].reverse(),
    socials: [...(artist.socials ?? [])].reverse(),
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

export function removeArtistDataItem(
  items: TArtistDataItem[],
  targetItem: TArtistDataItem,
): TArtistDataItem[] {
  const targetIndex = items.findIndex((item) => {
    if (item.id !== undefined || targetItem.id !== undefined) {
      return item.id === targetItem.id;
    }

    return item.label === targetItem.label && item.value === targetItem.value;
  });

  if (targetIndex === -1) {
    return items;
  }

  return items.filter((_, index) => index !== targetIndex);
}
