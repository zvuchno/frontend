"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { TConsent, useUserStore } from "@/entities/user";

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
import { signIn } from "next-auth/react";

const initialFormState: ListenerRegisterFormData = {
  login: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  listener_offer: false,
  listener_personal_data: false,
  listener_distribution: false,
  listener_newsletter: false,
};

export const ListenerRegisterForm = () => {
  const [formData, setFormData] = useState<ListenerRegisterFormData>(initialFormState);

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const [errors, setErrors] = useState<FormErrors>({});
  const [registerError, setRegisterError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) {
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
      router.replace(route);
    }
  }, [isAuthorized, router, searchParams]);

  const handleChange =
    (field: keyof ListenerRegisterFormData) =>
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      let value: string | boolean;
      if (typeof e === "string") {
        value = e;
      } else {
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        } else {
          value = e.target.value;
        }
      }

      setFormData((prev) => ({ ...prev, [field]: value }));

      if (typeof value === "string") {
        const error = validateField<ListenerRegisterFormData>(field, value, formData.password);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }

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
      // Преобразуем true-поля согласий  в массив строк
      const agreedTerms: TConsent[] = [];
      if (formData.listener_offer) agreedTerms.push("listener_offer");
      if (formData.listener_personal_data) agreedTerms.push("listener_personal_data");
      if (formData.listener_distribution) agreedTerms.push("listener_distribution");
      if (formData.listener_newsletter) agreedTerms.push("listener_newsletter");

      const res = await signIn("reg-auth", {
        username: formData.login.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        password: formData.password,
        consents: agreedTerms,
        regType: "listener",
        redirect: false,
      })

      if (!res?.ok) {
        throw new Error(res?.error ? res.error: "Проверьте корректность введённых данных")
      }

      setFormData(initialFormState);
      
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : "Проверьте корректность введённых данных");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.listenerRegisterForm}>
      <BaseForm
        title='Регистрация'
        onSubmit={() => {
          handleSubmit().catch(console.error);
        }}
        isLoading={isLoading}
        
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
          <button className={s.submitButton} type='submit' disabled={loading}>
            {loading ? <LoadingButton /> : "Зарегистрироваться"}
          </button>
        )}
        renderSocialLogin={() => {
          return <FormSocialButtons disabled={isLoading} />;
        }}
      />
    </div>
  );
};

ListenerRegisterForm.displayName = "ListenerRegisterForm";
