type TCardVariant = "profile" | "catalog";

export interface ArtistDescriptionProps {
  variant: TCardVariant;
  description: string;
  title?: string;
  emptyText?: string;
  isEdit?: boolean;
  className?: string;
  hasChanges?: (value: string) => void;
  onEditMode?: () => void;
}
