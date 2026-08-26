"use client";

import { ButtonUI, Text, Title } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import { useRouter } from "next/navigation";
import s from "./VeryfyEmail.module.scss";
import clsx from "clsx";
import { useUserStore } from "@/entities/user";

export const VerifyEmailPage = () => {
  const user = useUserStore((state) => state.user);
  const email = user?.email;
  //const searchParams = useSearchParams();
  const router = useRouter();

  // const handleLogin = () => {
  //   let route: string;
  //   const loginRoute = "/signin";

  //   const nextRoute = searchParams.get("next");

  //   if (nextRoute) {
  //     const params = new URLSearchParams();
  //     params.append('next', encodeURIComponent(nextRoute));
  //     route = `${loginRoute}?${params.toString()}`;

  //   } else {
  //     route = loginRoute;
  //   }

  //   router.replace(route);
  // };

  const handleToMainPage = () => {
    router.replace("/");
  };
  
  return (
    <AuthModal>
      <div className={s.container}>
        <Title Tag="h2" className={s.text}>Вам отправлено письмо!</Title>
        <Text Tag="p" className={s.text}>
          Мы отпрвили email с подтверждением на{' '}
          <span className={clsx(s.text, s.accent)}>
            {email || 'указанный адрес'}
          </span>. Пожалуйста, проверьте и следуйте инструкциям.
        </Text>
        <ButtonUI variant="primary" onClick={handleToMainPage}>На главную</ButtonUI>
      </div>
    </AuthModal>
  )
};