export type TCheckboxUIProps = {
  type: 'checkbox' | 'radio';
  children?: React.ReactNode;
  isChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string 
}