export interface AuthFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthFormProps {
  mode?: "login" | "register";
  registerRoute: string;
  onClose?: () => void;
  onSubmit?: (data: AuthFormData) => void | Promise<void>;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
  isLoading?: boolean;
  error?: string | null;
}