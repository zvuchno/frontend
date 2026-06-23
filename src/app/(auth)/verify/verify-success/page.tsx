import { VerifySuccessPage } from "@/screens/auth";
import { Suspense } from "react";

function VerifySuccess () {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <VerifySuccessPage />
    </Suspense>
  )
};

export default VerifySuccess;