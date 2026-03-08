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
};

export type Option = {
  label: string;
  value: string;
};

export type CustomSelectUIProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  selectClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  itemListClassName?: string;
  itemClassName?: string;
  itemTextClassName?: string;
};
