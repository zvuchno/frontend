"use client";

import { useState } from "react";

import { logoutFromBackend } from "@/api/lib/handlers/logoutFromBackend";
import { signOut } from "next-auth/react";

import { useRecentlyViewed } from "@/entities/recentlyViewed";
import { useSignOut } from "@/entities/user";

import { ButtonUI, ModalUI } from "@/shared/ui";

import s from "./LogoutButton.module.scss";

const LogoutButton = () => {
  const { clearProducts } = useRecentlyViewed();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate: logout } = useSignOut();

  const handleConfirmModalOpen = () => {
    setError(null);
    setIsConfirmModalOpen(true);
  };

  const handleLogOut = () => {
    setIsLoading(true);

    logout(undefined, {
      onSuccess: () => {
        clearProducts();

        void (async () => {
          await logoutFromBackend();

          await signOut({
            redirect: true,
            callbackUrl: "/",
          });
        })();
      },
      onError: (error) => {
        console.error("Ошибка выхода:", error);
        setError("Не удалось выйти из аккаунта. Попробуйте снова");
        setIsLoading(false);
      },
    });
  };
  return (
    <>
      <ButtonUI variant='secondary' onClick={handleConfirmModalOpen} size='small'>
        Выйти
      </ButtonUI>
      <ModalUI
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        closeButtonStyle='circledX'
      >
        <div className={s.confirmModal}>
          <p className={s.confirmModal__text}>
            {error ? "error" : "Вы уверены, что хотите выйти?"}
          </p>
          <ButtonUI variant='primary' size='small' onClick={handleLogOut} disabled={isLoading}>
            {isLoading ? "Выход..." : "Выйти"}
          </ButtonUI>
        </div>
      </ModalUI>
    </>
  );
};

export default LogoutButton;
