"use client"

import { verifyEmail } from "@/entities/user/api";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { Link, Text, Title } from "@/shared/ui"
import { AuthModal } from "@/widgets/AuthModal"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const VerifySuccessPage = () => {
  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;

  const searchParams = useSearchParams();
  
  const data = {
    uid: searchParams.get('uid') || '',
    token: searchParams.get('token') || '',
  };

  console.log('data:', data);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setVerified] = useState<boolean>(false);
  const hasSentInitialRequest = useRef<boolean>(false);

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
  }, [data]);

  useEffect(() => {
    // добавить в условие проверку наличия айди и токена
    if (!hasSentInitialRequest.current) {
      hasSentInitialRequest.current = true;
      verifyAccount();
    }
  }, [verifyAccount]);

  return (
    <AuthModal>
      {isLoading ? (
        <div>
          <Title>Обработка...</Title>
          <Text>Пожалуйста, подождите</Text>
        </div>
      ) : error ? (
        <div>Компонент ошибки</div>
      ) : isVerified ? (
        <div>
          <Title>Email успешно подтвержден!</Title>
          <Text>
            `Ваш адрес электронной почты был успешно подтвержден. 
              Теперь вы можете ${isAuthorized ? 'продолжить покупки.' : 'войти в свой аккаунт.'}`
          </Text>
          <Link href={isAuthorized ? '/' : '/signin'}>
            `Перейти ${isAuthorized ? 'на главную' : 'к авторизации'}`
          </Link>
        </div>
      ) : null}
      
    </AuthModal>
  )
}