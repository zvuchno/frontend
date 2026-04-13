export type TArtistDataItem = {
  id?: number;
  label: string;
  value: string;
};

export interface ArtistDataSectionProps {
  coverSrc: string;
  description: string;
  contacts: TArtistDataItem[];
  socials: TArtistDataItem[];
  onEditCoverClick?: () => void;
  onAddContactClick?: (item: TArtistDataItem) => void;
  onAddSocialClick?: (item: TArtistDataItem) => void;
  onDeleteContactClick?: (item: TArtistDataItem) => void;
  onDeleteSocialClick?: (item: TArtistDataItem) => void;
}
