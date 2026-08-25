"use client";

import { ButtonUI } from "@/shared/ui";
import s from "./EnterCodeForm.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const EnterCodeForm = ({ 
  onSubmit 
}: {
   onSubmit: (code: string) => Promise<{ detail: string }>
}) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    setIsSubmiting(true);
    setError(null);

    try {
      const response = await onSubmit(code);
      if (response.detail !== 'Email подтвержден.') {
        throw new Error(response.detail);
      }
      router.replace('/');

    } catch (error) {
      console.error('Ошибка верификации почты:', error);
      setCode('');
      setError(error instanceof Error ? error.message : 'Ошибка обработки кода');

    } finally {
      setIsSubmiting(false);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className={s.form}
      autoComplete="off"
    >
      <p className={s.text}>Код из письма</p>
      <input 
        type="password"
        inputMode="numeric"
        pattern="`[0-9]{6}`"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setError('');
        }}
        className={s.codeInput}
        autoComplete="one-time-code"
        required
      />
      {error && (
        <span className={s.errorMessage}>{error}</span>
      )}
      <ButtonUI 
        variant="primary" 
        type="submit"
        disabled={code.length !== 6 || isSubmiting || !!error}
      >
        {isSubmiting ? 'Обработка...' : 'Подтвердить'}
      </ButtonUI>
    </form>
  )
};