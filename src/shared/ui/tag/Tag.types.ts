export type TagUIProps = {
  className?: string;
  isActive: boolean;
  isSecondary?: boolean;  // для тегов второго уровня 
  onTagClick?: () => void;
  title: string;
  titleClassName?: string;
  icon?: 'arrow' | 'x-circle';
  hasIcon?: boolean;
  iconClassName?: string;
  onIconClick?: () => void;
}