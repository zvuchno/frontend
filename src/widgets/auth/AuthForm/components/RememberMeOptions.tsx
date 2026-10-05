"use client";

import { type ChangeEvent } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { type AuthFormData } from "../model/AuthForm.types";
import s from "../ui/AuthForm.module.scss";
import { CheckboxUI } from "@/shared/ui";

export const RememberMeOptions = ({
  disabled,
  data,
  setData,
}: {
  disabled: boolean;
  data: AuthFormData;
  setData: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  const handleToForgotPassword = () => {
    router.replace(`/forgot-password?next=${encodeURIComponent(currentUrl)}`);
  };

  return (
    <div className={s.rememberPasswordOptions}>
      <CheckboxUI 
        type="checkbox"
        name="rememberMe"
        isChecked={data.rememberMe}
        disabled={disabled}
        onChange={(e) => setData(e)}
      >
        Запомнить меня
      </CheckboxUI>
      <button type='button' className={s.forgotButton} onClick={handleToForgotPassword}>
        <span className={s.forgotButton__text}>Забыли пароль?</span>
      </button>
    </div>
  );
};
