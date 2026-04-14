import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { AuthForm } from "./AuthForm";
import { useState } from "react";

const meta: Meta<typeof AuthForm> = {
  title: "Features/Auth/AuthForm",
  component: AuthForm,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "radio",
      options: ["login", "register"],
      description: "Режим формы: вход или регистрация",
    },
    isLoading: {
      control: "boolean",
      description: "Состояние загрузки",
    },
    error: {
      control: "text",
      description: "Текст глобальной ошибки",
    },
  },
  args: {
    onClose: fn(),
    onSubmit: fn(),
    onRegisterClick: fn(),
    onLoginClick: fn(),
    onSocialLogin: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const Login: Story = {
  args: {
    mode: "login",
    isLoading: false,
    error: null,
  },
};

export const Register: Story = {
  args: {
    mode: "register",
    isLoading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    mode: "login",
    isLoading: true,
    error: null,
  },
};

export const WithValidationError: Story = {
  args: {
    mode: "login",
    isLoading: false,
    error: "Неверный email или пароль",
  },
};

export const Interactive: Story = {
  render: () => {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: { email: string; password: string }) => {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      console.log("Form submitted:", data);
    };

    const handleSocialLogin = (provider: "yandex" | "vk" | "google") => {
      console.log("Social login:", provider);
    };

    return (
      <AuthForm
        mode={mode}
        isLoading={loading}
        error={error}
        onClose={() => console.log("Close clicked")}
        onSubmit={handleSubmit}
        onRegisterClick={() => setMode("register")}
        onLoginClick={() => setMode("login")}
        onSocialLogin={handleSocialLogin}
      />
    );
  },
};