"use client";

import { ButtonUI, Text, Title } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import { useRouter, useSearchParams } from "next/navigation";
import s from "./VeryfyEmail.module.scss";
import clsx from "clsx";

export const VerifyEmailPage = () => {

  const email = sessionStorage.getItem('email');
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleLogin = () => {
    let route: string;
    const loginRoute = "/signin";

    const nextRoute = searchParams.get("next");

    if (nextRoute) {
      const params = new URLSearchParams();
      params.append('next', encodeURIComponent(nextRoute));
      route = `${loginRoute}?${params.toString()}`;

    } else {
      route = loginRoute;
    }

    router.replace(route);
  };
  
  return (
    <AuthModal>
      <div className={s.container}>
        <Title Tag="h2" className={s.text}>Вам отправлено письмо!</Title>
        <Text Tag="p" className={s.text}>
          Мы отпрвили email с подтверждением на <span className={clsx(s.text, s.accent)}>{email}</span>. Пожалуйста, проверьте и следуйте инструкциям.
        </Text>
        <ButtonUI variant="primary" onClick={handleLogin}>Перейти к авторизации</ButtonUI>
      </div>
    </AuthModal>
  )
};