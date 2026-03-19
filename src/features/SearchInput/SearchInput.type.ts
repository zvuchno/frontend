export interface SearchInputProps {
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
}