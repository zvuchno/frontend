"use client";

import { ModalUI } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isHistoryAvailable, setIsHistoryAvailable] = useState(false);

  useEffect(() => {
    setIsHistoryAvailable(
      typeof window !== 'undefined' && 'history' in window
    );
  }, []);

  const handleCloseModal = () => {
    if (isHistoryAvailable && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
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
