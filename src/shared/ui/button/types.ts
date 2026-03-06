export type TButtonProps = {
  children: string | React.ReactNode;
  variant: 'primary' | 'secondary' | 'accentDark' | 'accentLight';
  size: 'standart' | 'small' | 'medium' | 'large' | null;
  disabled?: boolean;
  isLoading?: boolean;
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  styled?: boolean;
  ariaLabel?: string;
  className?: string;
  onFileSelect?: boolean;
  onClick?: () => void;
}