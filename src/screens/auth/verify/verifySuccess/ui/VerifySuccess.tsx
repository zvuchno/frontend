"use client"

import { resendEmailForVerify, verifyEmail } from "@/entities/user/api";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { ButtonUI, Text, Title } from "@/shared/ui"
import { AuthModal } from "@/widgets/AuthModal"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./VerifySuccess.module.scss";
import clsx from "clsx";

export const VerifySuccessPage = () => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;
  const token = user?.accessToken;

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(5);

  const uidFromLink = searchParams.get('uid');
  const tokenFromLink = searchParams.get('token');

  const data = {
    uid: uidFromLink || '',
    token: tokenFromLink || '',
  };

  const verifyAccount = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await verifyEmail(data);

      setVerified(true);

    } catch (error) {
      setVerified(false);
      setError(error instanceof Error ? error.message : 'Неизвестная ошибка')

    } finally {
      setIsLoading(false);
    }
  }, [data.uid, data.token]);

  const resendEmail = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await resendEmailForVerify(token);
      router.replace('/verify/verify-email');
    } catch (error) { 
      setError(error instanceof Error ? error.message : 'Неизвестная ошибка')

    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!hasSentInitialRequest.current && data.uid && data.token) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [verifyAccount, data.uid, data.token]);

  useEffect(() => {
    if (isVerified) {

      const timer = setTimeout(() => {
        const route = isAuthorized ? '/' : '/signin';
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

  const handleClick = () => {
    const route = isAuthorized ? '/' : '/signin';
    router.replace(route);
  }

  const handleRetry = () => {
    verifyAccount();
  };

  const handleResend = () => {
    if (!token) return;
    resendEmail(token);
  };

  const handleToLogin = () => {
    router.replace('/signin');
  };

  const handleToMain = () => {
    router.replace('/');
  };

  return (
    <AuthModal>
      {isLoading ? (
        <div className={s.container}>
          <Title Tag="h2" className={s.text}>Обработка!</Title>
          <Text Tag="p" className={s.text}>Пожалуйста, подождите...</Text>
          <div className={s.loader} />
        </div>
      ) : error ? (
        <div className={s.container}>
          <Title Tag="h2" className={s.text}>Ошибка!</Title>
          <Text Tag="p" className={s.text}>
            {error.includes('Ссылка не действительна') 
              ? isAuthorized 
                ? `${error}: запросите отправку нового письма.` 
                : `${error}: пройдите авторизацию и снова перейдите по ссылке из письма.`
              : error.includes('Пользователь не найден') 
                ? error 
                : `${error}: попробуйте снова.`} 
          </Text>
          {error.includes('Ссылка не действительна') && isAuthorized && (
            <ButtonUI variant="primary" onClick={handleResend}>
              Отправить новое письмо
            </ButtonUI>
          )}
          {error.includes('Ссылка не действительна') && !isAuthorized && (
            <ButtonUI variant="primary" onClick={handleToLogin}>
              Перейти к авторизации
            </ButtonUI>
          )}
          {!error.includes('Ссылка не действительна') && !error.includes('Пользователь не найден') && (
            <>
              <ButtonUI variant="primary" onClick={handleToMain}>
                Перейти на главную
              </ButtonUI>
              <ButtonUI variant="primary" onClick={handleRetry}>
                Попробовать снова
              </ButtonUI>
            </>
          )}
        </div>
      ) : isVerified ? (
        <div className={s.container}>
          <Title Tag="h2" className={s.text}>Email успешно подтверждён!</Title>
          <Text Tag="p" className={s.text}>
            Ваш адрес электронной почты был успешно подтверждён. Теперь вы можете продолжить покупки.
          </Text>
          <ButtonUI variant="primary" onClick={handleClick}>
            Перейти {isAuthorized ? 'на главную' : 'к авторизации'}
          </ButtonUI>
          <Text Tag="p" className={clsx(s.text, s.leftText)}>
            Автоматический переход через {secondsLeft}{" "}
            {secondsLeft % 10 === 1 && secondsLeft % 100 !== 11
              ? 'секунду'
              : secondsLeft % 10 >= 2 &&
                  secondsLeft % 10 <= 4 &&
                  (secondsLeft % 100 < 10 || secondsLeft % 100 >= 20)
                ? 'секунды'
                : 'секунд'}
              ...
          </Text>
        </div>
      ) : null}
      
    </AuthModal>
  )
};