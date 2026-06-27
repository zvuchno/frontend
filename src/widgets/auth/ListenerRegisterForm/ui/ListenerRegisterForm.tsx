"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { type TNewListenerRequest } from "@/entities/user";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { CustomInput, PhoneInput, Typography } from "@/shared/ui";

import { BaseForm } from "../../BaseForm";
import { validateField } from "../../config/validateField";
import { validateForm } from "../../config/validateForm";
import {
  type ListenerRegisterFormData,
  type ListenerRegisterFormProps,
} from "../model/ListenerRegisterForm.types";
import s from "./ListenerRegisterForm.module.scss";

interface FormErrors {
  login?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const initialFormState: ListenerRegisterFormData = {
  login: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const ListenerRegisterForm = ({
  onClose,
  onSubmit,
  onSocialLogin,
}: ListenerRegisterFormProps) => {
  const [formData, setFormData] = useState<ListenerRegisterFormData>(initialFormState);

  const [errors, setErrors] = useState<FormErrors>({});
  const [registerError, setRegisterError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const setTempEmail = useUserStore((store) => store.setTempEmail);

  const handleChange =
    (field: keyof ListenerRegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const value = typeof e === "string" ? e : e.target.value;

      setFormData((prev) => ({ ...prev, [field]: value }));

      const error = validateField<ListenerRegisterFormData>(field, value, formData.password);
      setErrors((prev) => ({ ...prev, [field]: error || undefined }));

      if (registerError) setRegisterError(undefined);
    };

  const handleSubmit = async () => {
    setIsLoading(true);
    setRegisterError(undefined);
    setErrors({});

    const validation = validateForm<ListenerRegisterFormData>(formData);

    if (!validation.isValid) {
      setRegisterError(validation.errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      const userData: TNewListenerRequest = {
        username: formData.login,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        password: formData.password,
      };

      const data = await onSubmit?.(userData);

      if (data) {
        setTempEmail(data.email);

        const nextRoute = searchParams.get("next");
        let route: string;
        const verifyRoute = "/verify/verify-email";
        if (nextRoute) {
          const params = new URLSearchParams();
          params.append("next", encodeURIComponent(nextRoute));
          route = `${verifyRoute}?${params.toString()}`;
        } else {
          route = verifyRoute;
        }

        setFormData(initialFormState);
        router.replace(route);
      }
    } catch (error) {
      if (error instanceof Error) setRegisterError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseForm
      title='Регистрация'
      onSubmit={() => handleSubmit()}
      onClose={onClose}
      isLoading={isLoading}
      className={s.listenerRegisterForm}
      renderFields={() => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            marginBottom: "20px",
          }}
        >
          <CustomInput
            id='login'
            label='Имя пользователя*'
            type='text'
            name='login'
            value={formData.login}
            onChange={handleChange("login")}
            placeholder='Текст'
            error={!!errors.login}
            message={errors.login}
            inputSize='small'
            disabled={isLoading}
            maxLength={150}
          />

          <CustomInput
            id='email'
            label='Почта*'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange("email")}
            placeholder='user@example.com'
            error={!!errors.email}
            message={errors.email}
            inputSize='small'
            disabled={isLoading}
          />

          <PhoneInput
            id='phone'
            label='Телефон*'
            value={formData.phone}
            onChange={handleChange("phone")}
            hasError={!!errors.phone}
            errorMessage={errors.phone}
            inputSize='small'
            disabled={isLoading}
          />

          <CustomInput
            id='password'
            label='Пароль*'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange("password")}
            placeholder='Длина пароля не менее 8 символов.......'
            error={!!errors.password}
            message={errors.password}
            inputSize='small'
            disabled={isLoading}
          />

          <CustomInput
            id='confirmPassword'
            label='Повторите пароль*'
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            placeholder=''
            error={!!errors.confirmPassword}
            message={errors.confirmPassword}
            inputSize='small'
            disabled={isLoading}
          />

          {registerError && (
            <Typography variant='normal' className={s.error}>
              {registerError}
            </Typography>
          )}
        </div>
      )}
      renderPrimaryButton={(loading) => (
        <button
          className={s.submitButton}
          type='submit'
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <svg
                className={s.spinner}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "18px",
                  marginRight: "8px",
                  verticalAlign: "middle",
                }}
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
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
        return (
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type='button'
              onClick={() => onSocialLogin?.("yandex")}
              disabled={isLoading}
              className={s.socialButton}
              aria-label='Яндекс'
            >
              Я
            </button>
            <button
              type='button'
              onClick={() => onSocialLogin?.("vk")}
              disabled={isLoading}
              className={s.socialButton}
              aria-label='VK'
            >
              VK
            </button>
            <button
              type='button'
              onClick={() => onSocialLogin?.("google")}
              disabled={isLoading}
              className={s.socialButton}
              aria-label='Google'
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
