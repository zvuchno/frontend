"use client";

import { ListenerRegisterForm } from "@/widgets/auth/ListenerRegisterForm";
import { registerNewListener } from "@/entities/user/api";
import { AuthModal } from "@/widgets/AuthModal";

export const FanSignup = () => {
  return (
    <AuthModal>
      <ListenerRegisterForm onSubmit={registerNewListener} />
    </AuthModal>
  );
};

export default FanSignup;
