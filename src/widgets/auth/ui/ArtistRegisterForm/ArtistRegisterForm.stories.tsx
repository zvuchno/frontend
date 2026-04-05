import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "@storybook/test";
import { ArtistRegisterForm } from "./ArtistRegisterForm";
import { useState } from "react";

const meta: Meta<typeof ArtistRegisterForm> = {
  title: "Features/Auth/ArtistRegisterForm",
  component: ArtistRegisterForm,
  tags: ["autodocs"],
  argTypes: {
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
    onLoginClick: fn(),
    onSocialLogin: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ArtistRegisterForm>;

export const Default: Story = {
  args: {
    isLoading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    error: null,
  },
};

export const WithError: Story = {
  args: {
    isLoading: false,
    error: "Пользователь с таким логином уже существует",
  },
};

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: {
      title: string;
      login: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      setLoading(true);
      setError(null);
      // Имитация запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      console.log("Form submitted:", data);
    };

    const handleSocialLogin = (provider: "yandex" | "vk" | "google") => {
      console.log("Social login:", provider);
    };

    return (
      <ArtistRegisterForm
        isLoading={loading}
        error={error}
        onClose={() => console.log("Close clicked")}
        onSubmit={handleSubmit}
        onLoginClick={() => console.log("Login click")}
        onSocialLogin={handleSocialLogin}
      />
    );
  },
};
