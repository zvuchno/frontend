"use client";

import { ModalUI } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";

export const AuthModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCloseModal = () => {
    const nextRoute = searchParams.get("next");
    router.replace(nextRoute ? nextRoute : "/");
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
