"use client";

import { ButtonUI, LoadingButton, Text, Title, VerifyLoader } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import s from "./ResetPasswordPage.module.scss";
import { PasswordInput } from "@/shared/ui/CustomInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { validateField } from "@/widgets/auth/config/validateField";
import { validateForm } from "@/widgets/auth/config/validateForm";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordConfirm, resetPasswordVerify } from "@/entities/user";
import clsx from "clsx";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
};

interface IResetPasswordFormData {
  password: string;
  confirmPassword: string;
};

const initialFormState: IResetPasswordFormData = {
  password: "",
  confirmPassword: "",
};

export const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<IResetPasswordFormData>(initialFormState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmError, setConfirmError] = useState<string | undefined>(undefined);

  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(true);
  const [verifyError, setVeryfyError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const uidFromLink = searchParams.get('uid');
  const tokenFromLink = searchParams.get('token');

  if (!uidFromLink || !tokenFromLink) {
    return (
      <AuthModal>
        <div className={s.container}>
          <Title className={clsx(s.text, s.title)} Tag="h2">
            Неверная ссылка!
          </Title>
        </div>
      </AuthModal>
    )
  }

  const verifyLink = useCallback(async () => {
    try {
      setIsLoadingVerify(true);
      setVeryfyError(null);

      await resetPasswordVerify({
        uid: uidFromLink,
        token: tokenFromLink,
      });

      setIsVerified(true);

    } catch (error) {
      setIsVerified(false);
      setVeryfyError(error instanceof Error ? error.message : 'Неизвестная ошибка')

    } finally {
      setIsLoadingVerify(false);
    }
  }, [uidFromLink, tokenFromLink]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && uidFromLink && tokenFromLink) {
      hasSentInitialRequest.current = true;
      void verifyLink();
    }
  }, [verifyLink, uidFromLink, tokenFromLink]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({})

    const error = validateField<IResetPasswordFormData>(
      name as keyof IResetPasswordFormData,
      value,
      formData.password,
    );
    setErrors((prev) => ({ ...prev, [name]: error || undefined }));

    if (confirmError) setConfirmError(undefined);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setConfirmError(undefined);
    setErrors({});

    const validation = validateForm<IResetPasswordFormData>(formData);

    if (!validation.isValid) {
      setConfirmError(validation.errorMessage);
      setIsLoading(false);
      return;
    }

    try {
      await resetPasswordConfirm({
        uid: uidFromLink,
        token: tokenFromLink,
        new_password: formData.password,
        retype_new_password: formData.confirmPassword,
      });

      router.replace("/signin");

    } catch (error) {
      setConfirmError(error instanceof Error ? error.message : "Неизвестная оибка");

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal>
      <div className={s.container}>
        {isLoadingVerify ? (
          <VerifyLoader title="Обработка!" text="Пожалуйста, подождите..."/>
        ) : verifyError ? (
          <>
            <Title className={clsx(s.text, s.title)} Tag="h2">
              Ошибка проверки ссылки!
            </Title>
            <Text className={s.text}>
              {verifyError}
            </Text>
          </>
        ) : isVerified ? (
          <>
            <Title className={clsx(s.text, s.title)} Tag="h2">
              Установите новый пароль
            </Title>
            <form 
              className={s.form} 
              onSubmit={(e) => {
                handleSubmit(e).catch(console.error)
              }} 
              autoComplete="off"
            >
              <PasswordInput 
                label="Новый пароль" 
                id="password" 
                name="password"
                value={formData.password}
                error={!!errors.password}
                message={errors.password}
                onChange={handleChange}
                required
              />

              <PasswordInput 
                label="Подтвердите пароль" 
                id="confirmPassword" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                message={errors.confirmPassword}
                required
              />

              {confirmError && (
                <Text
                  variant="normal"
                  style={{ color: "#dc2626", textAlign: "center" }}
                >
                  {confirmError}
                </Text>
              )}
              <ButtonUI 
                type="submit" 
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? <LoadingButton /> : "Сохранить новый пароль"}
              </ButtonUI>
            </form>
          </>
        ) : null}
      </div>
    </AuthModal>
  )
};