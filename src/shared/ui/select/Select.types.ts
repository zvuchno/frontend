export type BaseSelectUIProps = {
  children?: React.ReactNode;
  value?: string; 
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ReactNode;
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  selectClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
}