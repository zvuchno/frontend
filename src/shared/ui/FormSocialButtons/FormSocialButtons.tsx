"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import s from "./FormSocialButtons.module.scss";

export const FormSocialButtons = ({ disabled }: { disabled: boolean }) => {
  const searchParams = useSearchParams();

  const handleSocialAuth = async (e: React.MouseEvent<HTMLButtonElement>, provider: string) => {
    e.preventDefault();

    const nextRoute = searchParams.get("next");
    await signIn(provider, {
      callbackUrl: nextRoute ? nextRoute : "/",
    });
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
      >
        Я
      </button>
      <a
        type='button'
        aria-label='VK'
        className={s.socialButton}
        href="/api/auth/vk/start"
      >
        VK
      </a>
    </div>
  );
};
