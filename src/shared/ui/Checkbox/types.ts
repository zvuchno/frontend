export type TCheckboxUIProps = {
  type: "checkbox" | "radio";
  children?: React.ReactNode;
  isChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  className?: string;
};
