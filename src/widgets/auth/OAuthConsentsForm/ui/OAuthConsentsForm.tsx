"use client";

import { ButtonUI, CheckboxUI, LoadingButton, Title } from "@/shared/ui";
import s from "./OAuthConsentsForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TConsent } from "@/entities/user";

const mandatoryFields = [
  "listener_offer",
  "listener_personal_data",
  "listener_distribution",
] as const;

export const OAuthConsentsForm = ({ state }: {state: string}) => {
  const router = useRouter();
  const [data, setData] = useState({
    listener_offer: false,
    listener_personal_data: false,
    listener_distribution: false,
    listener_newsletter: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!state) {
    return (
      <div className={s.form}>
        <Title className={s.title}>Неверный запрос. Пожалуйста, войдите заново.</Title>
      </div>
    )
  }

  const handleFieldChange = (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const submitRegistration = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (isLoading) return;

    const allMandatoryChecked = mandatoryFields.every((f) => data[f]);
    if (!allMandatoryChecked) {
      setError("Необходимо принять все обязательные согласия (помечены *)");
      return;
    }

    setIsLoading(true);

    const agreedTerms: TConsent[] = [];
    if (data.listener_offer) agreedTerms.push("listener_offer");
    if (data.listener_personal_data) agreedTerms.push("listener_personal_data");
    if (data.listener_distribution) agreedTerms.push("listener_distribution");
    if (data.listener_newsletter) agreedTerms.push("listener_newsletter");

    try {
      const res = await fetch("/api/auth/register-via-social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, consents: agreedTerms }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Не удалось завершить регистрацию");
      }

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Произошла ошибка при регистрации. Попробуйте войти заново."
      );

    } finally {
      setIsLoading(false);
    }
    
  }

  return (
    <form onSubmit={submitRegistration} className={s.form}>
      <Title Tag="h1" className={s.title}>Для продолжения необходимо разрешить создание аккаунта</Title>
      <div className={s.consentsContainer}>
        <CheckboxUI 
          type="checkbox"
          name="listener_offer"
          isChecked={data.listener_offer}
          disabled={isLoading}
          onChange={handleFieldChange("listener_offer")}
        >
          Я согласен с условиями{" "}
          <a 
            href="/legal/listener_offer" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.link}
          >
            оферты *
          </a>
        </CheckboxUI>

        <CheckboxUI 
          type="checkbox"
          name="listener_personal_data"
          isChecked={data.listener_personal_data}
          disabled={isLoading}
          onChange={handleFieldChange("listener_personal_data")}
        >
          Я даю{" "}
          <a 
            href="/legal/listener_personal_data" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.link}
          >
            согласие на обработку персональных данных
          </a>
          {" "}в соответствии с{" "}
          <a 
            href="/legal/privacy_policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.link}
          >
            политикой обработки персональных данных *
          </a>
        </CheckboxUI>

        <CheckboxUI 
          type="checkbox"
          name="listener_distribution"
          isChecked={data.listener_distribution}
          disabled={isLoading}
          onChange={handleFieldChange("listener_distribution")}
        >
          Я даю согласие{" "}
          <a 
            href="/legal/listener_distribution" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.link}
          >
            на распространение персональных данных *
          </a>
        </CheckboxUI>

        <CheckboxUI 
          type="checkbox"
          name="listener_newsletter"
          isChecked={data.listener_newsletter}
          disabled={isLoading}
          onChange={handleFieldChange("listener_newsletter")}
        >
          Я даю {" "}
          <a 
            href="/legal/listener_newsletter" 
            target="_blank" 
            rel="noopener noreferrer"
            className={s.link}
          >
            согласие на рекламную и информационную рассылку
          </a>
        </CheckboxUI>
      </div>

      {error && <div className={s.error}>{error}</div>}

      <ButtonUI variant="primary" type="submit" disabled={isLoading || !!error}>
        {isLoading ? <LoadingButton /> : "Разрешить"}
      </ButtonUI>
    </form>
  )
}