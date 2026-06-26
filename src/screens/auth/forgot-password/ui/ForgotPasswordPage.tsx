"use client";

import { ButtonUI, CustomInput, Text, Title } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal"
import { useState } from "react";
import s from "./ForgotPasswordPage.module.scss";
import clsx from "clsx";
import { resetPassword } from "@/entities/user";
import { validateForm } from "@/widgets/auth/config/validateForm";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    const validation = validateForm<{ email: string }>({ email: email });
    
    if (!validation.isValid) {
      setError(validation.errorMessage);
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
      setError(error instanceof Error ? error.message : 'Неизвестная оибка');

    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthModal>
        <div className={s.container}>
          <Title Tag="h2" className={s.title}>Проверьте вашу почту!</Title>
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
        <Title className={s.title} Tag="h2">
          Восстановление пароля
        </Title>
        <form 
          className={s.form} 
          onSubmit={handleSubmit} 
          autoComplete="off"
        >
          <CustomInput 
            id="email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Введите ваш email" 
            required 
            placeholder="Введите вашу почту"
          />
          {error && (
            <Text
              variant="normal"
              style={{ color: "#dc2626", textAlign: "center" }}
            >
              {error}
            </Text>
          )}
          <ButtonUI 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Восстановить'}
          </ButtonUI>
        </form>
      </div>
    </AuthModal>
  )
};