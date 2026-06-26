"use client";

import React, { useEffect, useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { useUserStore } from "@/entities/user/store/useUserStore";

import { ButtonUI, CustomInput, Typography } from "@/shared/ui";

import { BaseForm } from "../../BaseForm";
import { type AuthFormData, type AuthFormProps } from "../model/AuthForm.types";
import s from "./AuthForm.module.scss";

const initialFormState: AuthFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

export const AuthForm = ({
  mode = "login",
  registerRoute,
  onClose,
  onLoginClick,
  onSocialLogin,
}: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>(initialFormState);

  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
      const nextRoute = searchParams.get("next");
      router.replace(nextRoute ?? "/");
    }
  }, [isAuthorized, router, searchParams]);

  const handleRegisterClick = () => {
    const nextRoute = searchParams.get("next");

    let route: string;

    if (nextRoute) {
      const params = new URLSearchParams();
      params.append("next", encodeURIComponent(nextRoute));
      route = `${registerRoute}?${params.toString()}`;
    } else {
      route = registerRoute;
    }

    router.replace(route);
  };

  const handleChange = (field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (authError) setAuthError(undefined);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setAuthError(undefined);

    try {
      const res = await signIn("credentials", {
        identifier: formData.email.toLowerCase(),
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        setFormData(initialFormState);
      } else {
        throw new Error(
          res?.error || "Ошибка авторизации. Проверьте корректность введённых данных."
        );
      }
    } catch (error) {
      if (error instanceof Error) setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToForgotPassword = () => {
    router.replace("/forgot-password");
  };

  return (
    <BaseForm
      className={s.authForm}
      title={mode === "login" ? "Вход в личный кабинет" : "Регистрация"}
      onSubmit={() => handleSubmit}
      onClose={onClose}
      isLoading={isLoading}
      renderFields={() => (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <CustomInput
            id='email'
            label='Почта'
            type='text'
            name='email'
            value={formData.email}
            onChange={handleChange("email")}
            placeholder='user@example.com'
            inputSize='small'
            disabled={isLoading}
          />

          <CustomInput
            id='password'
            label='Пароль'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange("password")}
            placeholder='••••••••'
            inputSize='small'
            disabled={isLoading}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#171717",
              }}
            >
              <input
                type='checkbox'
                name='rememberMe'
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
            <button type='button' className={s.forgotButton} onClick={handleToForgotPassword}>
              <span className={s.forgotButton__text}>Забыли пароль?</span>
            </button>
          </div>

          {/* {mode === "register" && (
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
          )} */}

          {/* {mode === "login" && (
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
          )} */}

          {authError && (
            <Typography variant='normal' style={{ color: "#dc2626", textAlign: "center" }}>
              {authError}
            </Typography>
          )}
        </div>
      )}
      renderPrimaryButton={(loading) => (
        <ButtonUI
          variant='primary'
          type='submit'
          size='small'
          disabled={loading || !(formData.email && formData.password)}
          style={{ width: "100%" }}
        >
          {loading ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-2 h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
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
          ) : mode === "login" ? (
            "Войти"
          ) : (
            "Зарегистрироваться"
          )}
        </ButtonUI>
      )}
      renderSecondaryButton={() => (
        <ButtonUI
          variant='secondary'
          type='button'
          size='small'
          onClick={mode === "login" ? handleRegisterClick : onLoginClick}
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
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              type='button'
              onClick={() => onSocialLogin?.("yandex")}
              aria-label='Яндекс'
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(16, 15, 13, 0.15)";
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
              type='button'
              onClick={() => onSocialLogin?.("vk")}
              aria-label='VK'
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(16, 15, 13, 0.15)";
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
              type='button'
              onClick={() => onSocialLogin?.("google")}
              aria-label='Google'
              disabled={isLoading}
              style={socialButtonStyle}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#d4e8ff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(16, 15, 13, 0.15)";
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
