export interface SearchInputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
}