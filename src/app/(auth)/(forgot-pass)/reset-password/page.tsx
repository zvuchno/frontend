import { ResetPasswordPage } from "@/screens/auth";
import { Suspense } from "react";

function ResetPassword () {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
};

export default ResetPassword;