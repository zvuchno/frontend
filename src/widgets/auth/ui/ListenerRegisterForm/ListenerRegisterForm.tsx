import React, { useState } from "react";
import {
  ListenerRegisterFormProps,
  ListenerRegisterFormData,
} from "@/widgets/auth/ui/ListenerRegisterForm/ListenerRegisterForm.types";
import { BaseForm } from "@/widgets/auth/ui/BaseForm/BaseForm";
import Input from "@/shared/ui/Input/Input";
import { Typography } from "@/shared/ui/Typography/Typography";
import s from "./ListenerRegisterForm.module.scss";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export const ListenerRegisterForm: React.FC<ListenerRegisterFormProps> = ({
  onClose,
  onSubmit,
  onLoginClick,
  onSocialLogin,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<ListenerRegisterFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
    }
    
    if (!formData.email) {
      newErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.phone) {
      newErrors.phone = "Введите телефон";
    } else if (formData.phone.replace(/\D/g, '').length < 11) {
      newErrors.phone = "Введите полный номер телефона";
    }
    
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      newErrors.password = "Минимум 8 символов";
    }
    
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange =
    (field: keyof ListenerRegisterFormData) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = async (data: { email?: string; password?: string }) => {
    if (!validate()) return;
    
    const fullData: ListenerRegisterFormData = {
      ...formData,
      ...data,
    };
    
    await onSubmit?.(fullData);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.startsWith("7") || value.startsWith("8")) {
      value = value.slice(1);
    }
    
    let formattedValue = "+7";
    if (value.length > 0) {
      formattedValue += " (" + value.slice(0, 3);
    }
    if (value.length >= 3) {
      formattedValue += ") " + value.slice(3, 6);
    }
    if (value.length >= 6) {
      formattedValue += "-" + value.slice(6, 8);
    }
    if (value.length >= 8) {
      formattedValue += "-" + value.slice(8, 10);
    }
    
    setFormData((prev) => ({ ...prev, phone: formattedValue }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  return (
    <BaseForm
      title="Регистрация"
      onSubmit={handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      className={s.listenerRegisterForm}
      renderFields={() => (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <Input
            id="name"
            label="Имя*"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange("name")}
            placeholder="Текст"
            error={!!errors.name}
            message={errors.name}
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
            id="phone"
            label="Телефон*"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+7 (___) ___-__-__"
            error={!!errors.phone}
            message={errors.phone}
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
            placeholder="Длина пароля не менее 8 символов......."
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
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
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

ListenerRegisterForm.displayName = "ListenerRegisterForm";