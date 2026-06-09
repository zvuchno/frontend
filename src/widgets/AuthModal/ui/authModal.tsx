"use client";

import { ModalUI } from "@/shared/ui";
import { useRouter } from "next/navigation";

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.replace("/");
  };

  return (
    <ModalUI
      isOpen={true}
      closeButtonStyle="circledX"
      onClose={handleCloseModal}
      hasClickOnOverlay={false}
    >
      {children}
    </ModalUI>
  );
};
