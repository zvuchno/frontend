import React, { useState } from "react";
import {
  AuthFormProps,
  AuthFormData,
} from "@/widgets/auth/ui/AuthForm/AuthForm.types";
import { BaseForm } from "@/widgets/auth/ui/BaseForm/BaseForm";
import Input from "@/shared/ui/Input/Input";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { Typography } from "@/shared/ui/Typography/Typography";
import s from "@/widgets/auth/ui/AuthForm/AuthForm.module.scss";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  mode = "login",
  onClose,
  onSubmit,
  onRegisterClick,
  onLoginClick,
  onSocialLogin,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Введите email или логин";
    if (!formData.password) newErrors.password = "Введите пароль";
    else if (formData.password.length < 6)
      newErrors.password = "Минимум 6 символов";

    if (mode === "register" && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (data: { email?: string; password?: string }) => {
    if (!validate()) return;

    const fullData: AuthFormData = {
      ...formData,
      ...data,
    };

    await onSubmit?.(fullData);
  };

  return (
    <BaseForm
      title={mode === "login" ? "Вход в личный кабинет" : "Регистрация"}
      onSubmit={handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      renderFields={() => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            id="email"
            label="Почта / Логин"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="user@example.com"
            error={!!errors.email}
            message={errors.email}
            inputSize="small"
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Пароль"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange("password")}
            placeholder="••••••••"
            error={!!errors.password}
            message={errors.password}
            inputSize="small"
            disabled={isLoading}
          />

          {mode === "register" && (
            <Input
              id="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              message={errors.confirmPassword}
              inputSize="small"
              disabled={isLoading}
            />
          )}

          {mode === "login" && (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
                disabled={isLoading}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <span>Запомнить меня</span>
            </label>
          )}

          {error && (
            <Typography
              variant="normal"
              style={{ color: "#dc2626", textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
        </div>
      )}
      renderPrimaryButton={(loading) => (
        <ButtonUI
          variant="primary"
          type="submit"
          size="small"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
          ) : mode === "login" ? (
            "Войти"
          ) : (
            "Зарегистрироваться"
          )}
        </ButtonUI>
      )}
      renderSecondaryButton={() => (
        <ButtonUI
          variant="secondary"
          type="button"
          size="small"
          onClick={mode === "login" ? onRegisterClick : onLoginClick}
          disabled={isLoading}
          style={{ width: "100%" }}
        >
          {mode === "login" ? "Зарегистрироваться" : "Уже есть аккаунт? Войти"}
        </ButtonUI>
      )}
      renderSocialLogin={() => {
        const socialButtonStyle: React.CSSProperties = {
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "9px 16px",
          width: "136px",
          height: "60px",
          background: "#E4F1FF",
          border: "1px solid #100F0D",
          borderRadius: "36px",
          fontFamily: "'Better VCR', sans-serif",
          fontWeight: 400,
          fontSize: "20px",
          lineHeight: "28px",
          letterSpacing: "-0.04em",
          color: "#100F0D",
          cursor: isLoading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          flexShrink: 0,
        };

        return (
          <div
            style={{ display: "flex", gap: "12px", justifyContent: "center" }}
          >
            <button
              type="button"
              onClick={() => onSocialLogin?.("yandex")}
              aria-label="Яндекс"
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(16, 15, 13, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E4F1FF";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Я
            </button>
            <button
              type="button"
              onClick={() => onSocialLogin?.("vk")}
              aria-label="VK"
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(16, 15, 13, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E4F1FF";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              VK
            </button>
            <button
              type="button"
              onClick={() => onSocialLogin?.("google")}
              aria-label="Google"
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(16, 15, 13, 0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E4F1FF";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              G
            </button>
          </div>
        );
      }}
    />
  );
};
