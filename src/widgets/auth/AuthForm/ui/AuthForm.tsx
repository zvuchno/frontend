"use client";

import React, { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { cartQueryKeys } from "@/entities/cart";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { BaseForm } from "../../BaseForm";
import { AuthFormFields } from "../components/AuthFormFields";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { SocialButtons } from "../components/SocialButtons";
import { type AuthFormData, type AuthFormProps } from "../model/AuthForm.types";
import s from "./AuthForm.module.scss";

// import * as VKID from '@vkid/sdk';
// import toast from "react-hot-toast";

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
}: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>(initialFormState);

  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAuthorized) {
      const nextRoute = searchParams.get("next");
      router.replace(nextRoute ?? "/");
    }
  }, [isAuthorized, router, searchParams]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setAuthError(undefined);

    try {
      const res = await signIn("credentials", {
        identifier: formData.email.toLowerCase(),
        password: formData.password,
        rememberme: formData.rememberMe,
        redirect: false,
      });

      if (res?.ok) {
        await queryClient.invalidateQueries({ queryKey: cartQueryKeys.current() });

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

  const handleChange = (field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (authError) setAuthError(undefined);
  };

  return (
    <BaseForm
      className={s.authForm}
      title={mode === "login" ? "Вход в личный кабинет" : "Регистрация"}
      onSubmit={() => {
        handleSubmit().catch(console.error);
      }}
      onClose={onClose}
      isLoading={isLoading}
      renderFields={() => (
        <AuthFormFields
          data={formData}
          disabled={isLoading}
          error={authError}
          onFieldChange={handleChange}
          setData={(e) =>
            setFormData((prev) => ({
              ...prev,
              rememberMe: e.target.checked,
            }))
          }
        />
      )}
      renderPrimaryButton={(loading) => (
        <PrimaryButton isLoading={loading} mode={mode} formData={formData} />
      )}
      renderSecondaryButton={(loading) => (
        <SecondaryButton
          isLoading={loading ? loading : false}
          mode={mode}
          registerRoute={registerRoute}
          onLoginClick={onLoginClick}
        />
      )}
      renderSocialLogin={() => {
        return <SocialButtons disabled={isLoading} />;
      }}
    />
  );
};
