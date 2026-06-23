"use client"

import { verifyEmail } from "@/entities/user/api";
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

  const searchParams = useSearchParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);
  const [secondsLeft, setSecondsLef] = useState<number>(5);

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

  useEffect(() => {
    if (!hasSentInitialRequest.current && data.uid && data.token) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [verifyAccount, data.uid, data.token]);

  useEffect(() => {
    if (isVerified) {
      const route = isAuthorized ? '/' : '/signin';

      const timer = setTimeout(() => {
        router.replace(route);
      }, 5000);

      const interval = setInterval(() => {
        setSecondsLef((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isVerified, isAuthorized, router])

  const handleClick = () => {
    const route = isAuthorized ? '/' : '/signin';
    router.replace(route);
  };

  const handleResend = () => {
    verifyAccount();
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
          <Text Tag="p" className={s.text}>{error}</Text>
          <ButtonUI variant="primary" onClick={handleClick}>
            Перейти {isAuthorized ? 'на главную' : 'к авторизации'}
          </ButtonUI>
          <ButtonUI variant="primary" onClick={handleResend}>
            Попробовать снова
          </ButtonUI>
        </div>
      ) : isVerified ? (
        <div className={s.container}>
          <Title Tag="h2" className={s.text}>Email успешно подтвержден!</Title>
          <Text Tag="p" className={s.text}>
            Ваш адрес электронной почты был успешно подтвержден. Теперь вы можете продолжить покупки.
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