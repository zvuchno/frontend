import { TNewArtistRequest, TNewUserResponse } from "@/entities/user/types";

export interface ArtistRegisterFormData {
  title: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ArtistRegisterFormProps {
  onClose?: () => void;
  onSubmit?: (data: TNewArtistRequest) => void | Promise<TNewUserResponse>;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
}
