import { type ArtistApiDataItem, type UpdateCurrentArtistPayload } from "@/entities/profile";

export type TEditableArtistProfile = {
  id?: number;
  name: string;
  description?: string | null;
  cover?: string | null;
  city?: string | null;
  slug?: string | null;
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
};

export type TArtistDataSectionLayoutProps = {
  isLoading: boolean;
  error: Error | null;
  artist?: TEditableArtistProfile | null;
  withButton?: boolean;
  onArtistUpdate: (payload: UpdateCurrentArtistPayload) => Promise<void>;
  onCoverUpdate: (file: File) => Promise<void>;
};
