export type Option = {
  label: string;
  value: string;
};

export type SelectUIProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  containerClassName?: string;
  selectClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
}
