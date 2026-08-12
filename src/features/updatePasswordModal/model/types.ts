export interface UpdatePasswordModalProps {
  isOpen: boolean;
  has_usable_password?: boolean;
  onClose: () => void;
};

export type TFormValues = {
  password?: string;
  newPassword: string;
  confirmPassword: string;
};