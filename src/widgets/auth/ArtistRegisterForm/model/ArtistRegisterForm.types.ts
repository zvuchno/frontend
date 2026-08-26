import type { TProfileType, TRegisterRequest, TNewUserResponse } from "@/entities/user";

export interface ArtistRegisterFormData {
  title: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ArtistRegisterFormProps {
  profileType: TProfileType;
  onClose?: () => void;
  onSubmit?: (data: TRegisterRequest) => Promise<TNewUserResponse>;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
}

export interface FormErrors {
  title?: string;
  login?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}
