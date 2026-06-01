"use client";

import { ButtonUI } from "@/shared/ui/button";
import { ModalUI } from "@/shared/ui/modal";
import s from "./LogoutButton.module.scss";
import { useState } from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmModalOpen = () => {
    setError(null);
    setIsConfirmModalOpen(true);
  };

  const handleLogOut = async () => {
    setIsLoading(true);

    try {
      await signOut({
        redirect: true,
        callbackUrl: '/'
      });

    } catch (error) {
      console.error('Ошибка выхода:', error);
      setError('Не удалось выйти из аккаунта. Попробуйте снова')

    } finally {
      setIsLoading(false)
    }
  };
  return (
    <>
      <ButtonUI 
        variant='secondary' 
        onClick={handleConfirmModalOpen}
        size='small'
      >
        Выйти
      </ButtonUI>
       <ModalUI 
          isOpen={isConfirmModalOpen} 
          onClose={() => setIsConfirmModalOpen(false)} 
          closeButtonStyle='circledX'
        >
          <div className={s.confirmModal}>
            <p className={s.confirmModal__text}>{error ? 'error' : 'Вы уверены, что хотите выйти?'}</p>
            <ButtonUI 
              variant='primary' 
              size='small' 
              onClick={handleLogOut}
              disabled={isLoading}
            >
              {isLoading ? 'Выход...' : 'Выйти'}
            </ButtonUI>
          </div>
        </ModalUI>
    </>
  )
};

export default LogoutButton;