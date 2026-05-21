import ModalPage from "../ModalPage";
import { Suspense } from "react";
import { AuthFormClient } from "./AuthFormClient";

const SigninPage = () => {

  return (
    <ModalPage>
      <Suspense fallback={<div>Loading authentication form...</div>}>
        <AuthFormClient />
      </Suspense>
    </ModalPage>
  )
};

export default SigninPage;