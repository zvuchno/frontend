import { type TNewListenerRequest, type TNewUserResponse } from "@/entities/user";

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

export interface FormErrors {
  login?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}
