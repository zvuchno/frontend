export interface BlogCardProps {
  image: string;
  link?: string;
  description?: string;
  hasLink?: boolean;
  onClick?: () => void;
}