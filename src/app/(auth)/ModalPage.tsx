"use client";

import { ModalUI } from "@/shared/ui/modal";
import { useRouter } from "next/navigation";

const ModalPage = ({ children }: {children: React.ReactNode}) => {

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
  )
};

export default ModalPage;