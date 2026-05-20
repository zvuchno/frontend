export interface TrackCardProps {
  image: string;
  title: string;
  description: string;
  duration?: number;
  price?: number;
  onEdit: () => void;
  onDelete: () => void;
}