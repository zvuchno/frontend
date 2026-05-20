import React, { useState } from "react";
import {
  ArtistRegisterFormProps,
  ArtistRegisterFormData,
} from "@/widgets/auth/ui/ArtistRegisterForm/ArtistRegisterForm.types";
import { BaseForm } from "@/widgets/auth/ui/BaseForm/BaseForm";
import Input from "@/shared/ui/Input/Input";
import { Typography } from "@/shared/ui/Typography/Typography";
import s from "./ArtistRegisterForm.module.scss";

interface FormErrors {
  title?: string;
  login?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const ArtistRegisterForm: React.FC<ArtistRegisterFormProps> = ({
  onClose,
  onSubmit,
  onLoginClick,
  onSocialLogin,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<ArtistRegisterFormData>({
    title: "",
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название";
    }

    if (!formData.login.trim()) {
      newErrors.login = "Введите логин";
    } else if (formData.login.length < 3) {
      newErrors.login = "Минимум 3 символа";
    }

    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      newErrors.password = "Минимум 6 символов";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof ArtistRegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (data: { email?: string; password?: string }) => {
    if (!validate()) return;

    const fullData: ArtistRegisterFormData = {
      ...formData,
      ...data,
    };

    await onSubmit?.(fullData);
  };

  return (
    <BaseForm
      title="Регистрация"
      onSubmit={handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      className={s.artistRegisterForm}
      renderFields={() => (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <Input
            id="title"
            label="Название*"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange("title")}
            placeholder="Текст"
            error={!!errors.title}
            message={errors.title}
            inputSize="small"
            disabled={isLoading}
          />

          <Input
            id="login"
            label="Логин*"
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange("login")}
            placeholder="Текст"
            error={!!errors.login}
            message={errors.login}
            inputSize="small"
            disabled={isLoading}
          />

          <Input
            id="email"
            label="Почта*"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="Текст"
            error={!!errors.email}
            message={errors.email}
            inputSize="small"
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Пароль*"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange("password")}
            placeholder="Длина пароля не менее 6 символов......."
            error={!!errors.password}
            message={errors.password}
            inputSize="small"
            disabled={isLoading}
          />

          <Input
            id="confirmPassword"
            label="Повторите пароль"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder=""
            error={!!errors.confirmPassword}
            message={errors.confirmPassword}
            inputSize="small"
            disabled={isLoading}
          />

          {error && (
            <Typography variant="normal" className={s.error}>
              {error}
            </Typography>
          )}
        </div>
      )}
      renderPrimaryButton={(loading) => (
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: "44px",
            borderRadius: "36px",
            background: "#b5b5b5",
            border: "1px solid #100f0d",
            fontFamily: "'Better VCR', sans-serif",
            fontSize: "16px",
            color: "#100f0d",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <svg
                className={s.spinner}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "18px",
                  marginRight: "8px",
                  verticalAlign: "middle",
                }}
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Обработка...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      )}
      renderSocialLogin={() => {
        const socialButtonStyle: React.CSSProperties = {
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "136px",
          height: "60px",
          background: "#E4F1FF",
          border: "1px solid #100F0D",
          borderRadius: "36px",
          fontFamily: "'Better VCR', sans-serif",
          fontSize: "20px",
          color: "#100F0D",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.5 : 1,
          transition: "all 0.2s ease",
        };

        return (
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={() => onSocialLogin?.("yandex")}
              disabled={isLoading}
              style={socialButtonStyle}
              aria-label="Яндекс"
            >
              Я
            </button>
            <button
              type="button"
              onClick={() => onSocialLogin?.("vk")}
              disabled={isLoading}
              style={socialButtonStyle}
              aria-label="VK"
            >
              VK
            </button>
            <button
              type="button"
              onClick={() => onSocialLogin?.("google")}
              disabled={isLoading}
              style={socialButtonStyle}
              aria-label="Google"
            >
              G
            </button>
          </div>
        );
      }}
    />
  );
};

ArtistRegisterForm.displayName = "ArtistRegisterForm";
