export type ArtistApiDataItem = {
  id?: number;
  label: string;
  value: string;
};

export type CurrentArtistResponse = {
  name: string;
  description: string | null;
  cover: string | null;
  city: string | null;
  url: string | null;
  slug: string;
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
};

export type UpdateCurrentArtistPayload = {
  name?: string;
  description?: string;
  city?: string;
  url?: string;
  contacts?: ArtistApiDataItem[];
  socials?: ArtistApiDataItem[];
};

export type UpdateCurrentArtistResponse = {
  name: string;
  description: string | null;
  cover: string | null;
  city: string | null;
  url: string | null;
  slug: string;
  contacts: ArtistApiDataItem[];
  socials: ArtistApiDataItem[];
};

export type UpdateCurrentArtistCoverPayload = {
  cover: File | Blob;
};

export type UpdateCurrentArtistCoverResponse = {
  cover: string | null;
};
