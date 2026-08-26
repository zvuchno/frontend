"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { ListenerRegisterForm } from "@/widgets/auth/ListenerRegisterForm";

export const FanSignup = () => {
  return (
    <AuthModal>
      <ListenerRegisterForm />
    </AuthModal>
  );
};

export default FanSignup;
