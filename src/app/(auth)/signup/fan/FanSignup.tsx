"use client";

import { ListenerRegisterForm } from "@/widgets/auth/ui/ListenerRegisterForm/ListenerRegisterForm";
import ModalPage from "../../ModalPage";
import { registerNewListener } from "@/entities/user/api";

const FanSignup = () => {

  return (
    <ModalPage>
      <ListenerRegisterForm onSubmit={registerNewListener} />
    </ModalPage>
  )
};

export default FanSignup;