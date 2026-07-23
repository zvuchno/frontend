import { type ChangeEvent } from "react";

import { useRouter } from "next/navigation";

import { type AuthFormData } from "../model/AuthForm.types";
import s from "../ui/AuthForm.module.scss";

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
  const handleToForgotPassword = () => {
    router.replace("/forgot-password");
  };

  return (
    <div className={s.rememberPasswordOptions}>
      <label className={s.rememberMeLabel}>
        <input
          type='checkbox'
          name='rememberMe'
          checked={data.rememberMe}
          onChange={(e) => setData(e)}
          disabled={disabled}
          className={s.rememberMeInput}
        />
        <span>Запомнить меня</span>
      </label>
      <button type='button' className={s.forgotButton} onClick={handleToForgotPassword}>
        <span className={s.forgotButton__text}>Забыли пароль?</span>
      </button>
    </div>
  );
};
