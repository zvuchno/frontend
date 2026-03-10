export type TButtonUIProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary' | 'accentDark';
  size: 'standart' | 'small' | 'medium' | 'large';
  ariaLabel?: string;
  contentClassName?: string;
}