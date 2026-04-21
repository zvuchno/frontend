export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  rememberMe?: boolean;
}

export interface AuthFormProps {
  mode?: "login" | "register";
  onClose?: () => void;
  onSubmit?: (data: AuthFormData) => void | Promise<void>;
  onRegisterClick?: () => void;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
  isLoading?: boolean;
  error?: string | null;
}