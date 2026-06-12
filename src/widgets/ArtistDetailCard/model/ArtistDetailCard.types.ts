export type TContact = {
  id: number;
  label: string;
  value: string;
}

export type TDetalArtist = {
  slug: string;
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  contacts: TContact[];
  socials: TContact[];
};

export interface IArtistDetailCardProps {
  artist: TDetalArtist;
};