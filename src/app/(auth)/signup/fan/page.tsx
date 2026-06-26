import { FanSignup } from "@/screens/auth";
import { Suspense } from "react";

export default function FanSignupPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FanSignup />
    </Suspense>
  )
}
