export interface BonusCardProps {
  name?: string;
  image?: string | null;
  title?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}