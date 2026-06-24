import { ResetPasswordPage } from "@/screens/auth";
import { Suspense } from "react";

function ResetPasswordConfirm () {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
};

export default ResetPasswordConfirm;