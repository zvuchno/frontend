"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { ListenerRegisterForm } from "@/widgets/auth/ListenerRegisterForm";

import { registerNewListener } from "@/entities/user";

export const FanSignup = () => {
  return (
    <AuthModal>
      <ListenerRegisterForm onSubmit={registerNewListener} />
    </AuthModal>
  );
};

export default FanSignup;
