"use client";

import React, { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { type TNewListenerRequest } from "@/entities/user";
import { useUserStore } from "@/entities/user/store/useUserStore";

import { FormSocialButtons, LoadingButton } from "@/shared/ui";

import { BaseForm } from "../../BaseForm";
import { validateField } from "../../config/validateField";
import { validateForm } from "../../config/validateForm";
import { ListenerRegisterFormContent } from "../components/ListenerRegisterFormContent/ListenerRegisterFormContent";
import {
  type FormErrors,
  type ListenerRegisterFormData,
  type ListenerRegisterFormProps,
} from "../model/ListenerRegisterForm.types";
import s from "./ListenerRegisterForm.module.scss";

const initialFormState: ListenerRegisterFormData = {
  login: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export const ListenerRegisterForm = ({ onClose, onSubmit }: ListenerRegisterFormProps) => {
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
      onSubmit={() => {
        handleSubmit().catch(console.error);
      }}
      onClose={onClose}
      isLoading={isLoading}
      className={s.listenerRegisterForm}
      renderFields={() => (
        <ListenerRegisterFormContent
          data={formData}
          disabled={isLoading}
          errors={errors}
          registerError={registerError}
          handleFieldChange={handleChange}
        />
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
          {loading ? <LoadingButton /> : "Зарегистрироваться"}
        </button>
      )}
      renderSocialLogin={() => {
        return <FormSocialButtons disabled={isLoading} />;
      }}
    />
  );
};

ListenerRegisterForm.displayName = "ListenerRegisterForm";
