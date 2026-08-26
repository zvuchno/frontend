"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthModal } from "@/widgets/AuthModal";

import { resendEmailForVerify, type TVerifyEmailRequest, verifyEmail } from "@/entities/user";

import { ButtonUI, Text, Title, VerifyLoader } from "@/shared/ui";

import s from "./VerifySuccess.module.scss";

export const VerifySuccessPage = () => {
  const { status } = useSession();
  const isAuthorized = status === "authenticated";

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(5);

  const uidFromLink = searchParams.get("uid");
  const tokenFromLink = searchParams.get("token");

  const handleClick = () => {
    const route = isAuthorized ? "/" : "/signin";
    router.replace(route);
  };

  if (!uidFromLink || !tokenFromLink) {
    return (
      <AuthModal>
        <div className={s.container}>
          <Title Tag="h2" className={s.text}>Ошибка</Title>
          <Text Tag="p" className={s.text}>Некорректная ссылка подтверждения.</Text>
          <ButtonUI variant="primary" onClick={handleClick}>
            {isAuthorized ? "На главную" : "Войти"}
          </ButtonUI>
        </div>
      </AuthModal>
    );
  }


  const verifyAccount = async (data: TVerifyEmailRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      await verifyEmail(data);

      setVerified(true);
    } catch (error) {
      setVerified(false);
      setError(error instanceof Error ? error.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const resendEmail = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await resendEmailForVerify();
      router.replace("/verify/verify-email");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Не удалось отправить письмо");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasSentInitialRequest.current) {
      hasSentInitialRequest.current = true;
      void verifyAccount({
        uid: uidFromLink,
        token: tokenFromLink,
      });
    }
  }, [uidFromLink, tokenFromLink]);

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        const route = isAuthorized ? "/" : "/signin";
        router.replace(route);
      }, 5000);

      const interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isVerified, isAuthorized, router]);


  const handleRetry = () => {
    void verifyAccount({
      uid: uidFromLink,
      token: tokenFromLink,
    });
  };

  const handleResend = () => {
    void resendEmail();
  };

  const handleToLogin = () => router.replace("/signin");

  const handleToMain = () => router.replace("/");

  return (
    <AuthModal>
      {isLoading ? (
        <VerifyLoader title="Обработка!" text="Пожалуйста, подождите..."/>
      ) : error ? (
        <div className={s.container}>
          <Title Tag='h2' className={s.text}>Ошибка!</Title>
          <Text Tag='p' className={s.text}>{error}</Text>

          {error.includes("Ссылка не действительна") && isAuthorized && (
            <ButtonUI variant='primary' onClick={handleResend}>
              Отправить новое письмо
            </ButtonUI>
          )}

          {error.includes("Ссылка не действительна") && !isAuthorized && (
            <ButtonUI variant='primary' onClick={handleToLogin}>
              Перейти к авторизации
            </ButtonUI>
          )}

          {!error.includes("Ссылка не действительна") &&
            !error.includes("Пользователь не найден") && (
              <>
                <ButtonUI variant="primary" onClick={handleToMain}>
                  Перейти на главную
                </ButtonUI>
                <ButtonUI variant="primary" onClick={handleRetry}>
                  Попробовать снова
                </ButtonUI>
              </>
            )
          }
        </div>
      ) : isVerified ? (
        <div className={s.container}>
          <Title Tag='h2' className={s.text}>
            Email успешно подтверждён!
          </Title>
          <Text Tag='p' className={s.text}>
            Ваш адрес электронной почты был успешно подтверждён.
          </Text>
          <ButtonUI variant="primary" onClick={handleClick}>
            Перейти {isAuthorized ? "на главную" : "к авторизации"}
          </ButtonUI>
          <Text Tag="p" className={clsx(s.text, s.leftText)}>
            Автоматический переход через {secondsLeft}{" "}
            {secondsLeft % 10 === 1 && secondsLeft % 100 !== 11
              ? "секунду"
              : secondsLeft % 10 >= 2 &&
                  secondsLeft % 10 <= 4 &&
                  (secondsLeft % 100 < 10 || secondsLeft % 100 >= 20)
                ? "секунды"
                : "секунд"}
            ...
          </Text>
        </div>
      ) : null}
    </AuthModal>
  );
};
