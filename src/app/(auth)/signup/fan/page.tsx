"use client";

import { ListenerRegisterForm } from "@/widgets/auth/ui/ListenerRegisterForm/ListenerRegisterForm";
import ModalPage from "../../ModalPage";
import { registerNewListener } from "@/entities/user/api";

const FanSignupPage = () => {

  return (
    <ModalPage>
      <ListenerRegisterForm onSubmit={registerNewListener} />
    </ModalPage>
  )
};

export default FanSignupPage;