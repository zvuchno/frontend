"use client";

import { ButtonUI, CustomInput, LoadingButton, Text, Title } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal"
import { useState } from "react";
import s from "./ForgotPasswordPage.module.scss";
import clsx from "clsx";
import { resetPassword } from "@/entities/user";
import { validateForm } from "@/widgets/auth/config/validateForm";
import { validateField } from "@/widgets/auth/config/validateField";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setFieldError(undefined);

    const error = validateField<{ email: string }>(
      "email",
      value,
    );
    setFieldError(error);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(undefined);

    const validation = validateForm<{ email: string }>({ email: email });
    
    if (!validation.isValid) {
      setFormError(validation.errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword({
        email,
      });

      setSuccess(true);

    } catch (error) {
      setSuccess(false);
      setFormError(error instanceof Error ? error.message : 'Неизвестная оибка');

    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthModal>
        <div className={s.container}>
          <Title Tag="h2" className={clsx(s.text, s.title)}>Проверьте вашу почту!</Title>
          <Text Tag="p" className={s.text}>
            На ваш email{' '}
            <span className={clsx(s.text, s.accent)}>
              {email}{' '}
            </span>было отправлено письмо с инструкциями по сбросу пароля.
          </Text>
        </div>
      </AuthModal>
    )
  }

  return (
    <AuthModal>
      <div className={s.container}>
        <Title className={clsx(s.text, s.title)} Tag="h2">
          Восстановление пароля
        </Title>
        <form 
          className={s.form} 
          onSubmit={(e) => {
            handleSubmit(e).catch(console.error)
          }} 
          autoComplete="off"
        >
          <CustomInput 
            id="email" 
            type="email"
            value={email}
            onChange={handleChange}
            label="Введите ваш email" 
            required 
            placeholder="Введите вашу почту"
            error={!!fieldError}
            message={fieldError}
          />
          {formError && (
            <Text
              variant="normal"
              style={{ color: "#dc2626", textAlign: "center" }}
            >
              {formError}
            </Text>
          )}
          <ButtonUI 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton /> : "Восстановить"}
          </ButtonUI>
        </form>
      </div>
    </AuthModal>
  )
};