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
  isAddingContact?: boolean;
  isAddingSocial?: boolean;
  onEditCoverClick?: () => void;
  onAddContactClick?: (item: TArtistDataItem) => Promise<void> | void;
  onAddSocialClick?: (item: TArtistDataItem) => Promise<void> | void;
  onDeleteContactClick?: (item: TArtistDataItem) => void;
  onDeleteSocialClick?: (item: TArtistDataItem) => void;
}
