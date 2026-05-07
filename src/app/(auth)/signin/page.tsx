'use client';

import { AuthForm } from "@/widgets/auth/ui/AuthForm/AuthForm";
import { useRouter } from "next/navigation";
import ModalPage from "../ModalPage";

const SigninPage = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/role");
  };

  return (
    <ModalPage>
      <AuthForm onRegisterClick={handleRegisterClick} />
    </ModalPage>
  )
};

export default SigninPage;