export interface TrackCardProps {
  image: string | null;
  title: string | null;
  description: string;
  duration: number | null;
  price?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}