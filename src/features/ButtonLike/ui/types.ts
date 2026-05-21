export type TButtonLikeProps = {
  isLiked: boolean;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  onToggle?: (isLiked: boolean) => void;
};
