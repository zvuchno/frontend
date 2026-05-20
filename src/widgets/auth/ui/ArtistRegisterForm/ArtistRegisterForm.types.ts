export interface ArtistRegisterFormData {
  title: string;
  login: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ArtistRegisterFormProps {
  onClose?: () => void;
  onSubmit?: (data: ArtistRegisterFormData) => void | Promise<void>;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
  isLoading?: boolean;
  error?: string | null;
}
