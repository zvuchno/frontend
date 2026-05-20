"use client";

import { ModalUI } from "@/shared/ui/modal";
import { useRouter } from "next/navigation";

const ModalPage = ({ children }: {children: React.ReactNode}) => {

  const router = useRouter();
  
  const handleCloseModal = () => {
    router.push("/");
  };

  return (
    <ModalUI 
      isOpen={true} 
      closeButtonStyle="circledX" 
      onClose={handleCloseModal}
    >
      {children}
    </ModalUI>
  )
};

export default ModalPage;