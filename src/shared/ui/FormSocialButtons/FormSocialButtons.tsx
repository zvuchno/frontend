"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import s from "./FormSocialButtons.module.scss";

export const FormSocialButtons = ({ disabled }: { disabled: boolean }) => {
  const searchParams = useSearchParams();

  const handleSocialAuth = async (e: React.MouseEvent<HTMLButtonElement>, provider: string) => {
    e.preventDefault();

    // if (provider === 'yandex') {
    //   window.location.href = '/api/auth/yandex/start';
    // }

    try {
      const nextRoute = searchParams.get("next");
      await signIn(provider, {
        callbackUrl: nextRoute ? nextRoute : "/",
      });
    } catch(e) {
      console.error(e instanceof Error ? e.message : 'Ошибка signIn')
    }



    // try {

    //   VKID.Config.init({
    //     app: 54522267,
    //     redirectUrl: 'https://dev.zvuchno.space/api/auth/callback/customVk',
    //   });

    //   const result = await VKID.Auth.login();
    //   console.log('result:', result);

    //   const { code, device_id } = result as { code: string; device_id: string };

    //   // Отправляем code и device_id на стандартный signin-эндпоинт NextAuth v4
    //   const res = await fetch('/api/auth/signin/customVk', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ code, device_id }),
    //   });

    //   if (!res.ok) {
    //     throw new Error(`Sign-in failed: ${res.statusText}`);
    //   }
    // } catch(error) {
    //   console.error('Ошибка входа через VK:',error);
    //   toast.error('Ошибка входа через VK')
    // }
  };

  return (
    <div className={s.socialButtons}>
      <button
        type='button'
        onClick={(e) => {
          handleSocialAuth(e, "yandex").catch(console.error);
        }}
        aria-label='Яндекс'
        disabled={disabled}
        className={s.socialButton}
        //href="/api/auth/yandex/start"
      >
        Я
      </button>
      <button
        type='button'
        onClick={(e) => {
          handleSocialAuth(e, "vk").catch(console.error);
        }}
        aria-label='VK'
        disabled={disabled}
        className={s.socialButton}
      >
        VK
      </button>
    </div>
  );
};
