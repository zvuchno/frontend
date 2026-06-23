import { VerifyEmailPage } from "@/screens/auth";
import { Suspense } from "react";

function Verify () {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <VerifyEmailPage />
    </Suspense>
  )
};

export default Verify;