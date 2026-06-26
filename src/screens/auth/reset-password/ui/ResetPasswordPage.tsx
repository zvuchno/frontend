"use client";

import { ButtonUI, Text, Title, VerifyLoader } from "@/shared/ui";
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
  password: '',
  confirmPassword: '',
};

export const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<IResetPasswordFormData>(initialFormState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmError, setConfirmError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const router = useRouter();

  const uidFromLink = searchParams.get('uid');
  const tokenFromLink = searchParams.get('token');

  const dataFromLink = {
    uid: uidFromLink || '',
    token: tokenFromLink || '',
  };

  const [isLoadingVerify, setIsLoadingVerify] = useState<boolean>(true);
  const [verifyError, setVeryfyError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);

  const verifyLink = useCallback(async () => {
    try {
      setIsLoadingVerify(true);
      setVeryfyError(null);

      await resetPasswordVerify({
        uid: dataFromLink.uid,
        token: dataFromLink.token,
      });

      setIsVerified(true);

    } catch (error) {
      setIsVerified(false);
      setVeryfyError(error instanceof Error ? error.message : 'Неизвестная ошибка')

    } finally {
      setIsLoadingVerify(false);
    }
  }, [dataFromLink.uid, dataFromLink.token]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && dataFromLink.uid && dataFromLink.token) {
      hasSentInitialRequest.current = true;
      verifyLink();
    }
  }, [verifyLink, dataFromLink.uid, dataFromLink.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

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
        uid: dataFromLink.uid,
        token: dataFromLink.token,
        new_password: formData.password,
        retype_new_password: formData.confirmPassword,
      });

      router.replace('/signin');

    } catch (error) {
      setConfirmError(error instanceof Error ? error.message : 'Неизвестная оибка');

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthModal>
      {isLoadingVerify ? (
        <VerifyLoader title="Обработка!" text="Пожалуйста, подождите..."/>
      ) : verifyError ? (
        <div className={s.container}>
          <Title className={clsx(s.text, s.title)} Tag="h2">
            Ошибка проверки ссылки!
          </Title>
          <Text className={s.text}>
            {verifyError}
          </Text>
        </div>
      ) : isVerified ? (
        <div className={s.container}>
          <Title className={s.title} Tag="h2">
            Установите новый пароль
          </Title>
          <form 
            className={s.form} 
            onSubmit={handleSubmit} 
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
              {isLoading ? 'Сохранение...' : 'Сохранить новый пароль'}
            </ButtonUI>
          </form>
        </div>
      ) : null}
    </AuthModal>
  )
};