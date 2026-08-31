export type Option = {
  label: string;
  value: string;
};

export type OptionGroup = {
  label: string;
  options: Option[];
};

export type SelectOptionItem = Option | OptionGroup;

export type SelectUIProps = {
  options: SelectOptionItem[];
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
