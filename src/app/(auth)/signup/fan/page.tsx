import { Suspense } from "react";

import { FanSignup } from "@/screens/auth";

export default function FanSignupPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FanSignup />
    </Suspense>
  );
}
