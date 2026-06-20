import { TNewListenerRequest, TNewUserResponse } from "@/entities/user/types";

export interface ListenerRegisterFormData {
  login: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ListenerRegisterFormProps {
  onClose?: () => void;
  onSubmit?: (data: TNewListenerRequest) => void | Promise<TNewUserResponse>;
  onLoginClick?: () => void;
  onSocialLogin?: (provider: "yandex" | "vk" | "google") => void;
  // isLoading?: boolean;
  // error?: string | null;
}
