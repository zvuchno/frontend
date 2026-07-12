export type TButtonLikeProps = {
  isLiked: boolean;
  isAuth: boolean;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  onToggle?: (isLiked: boolean) => void;
};
