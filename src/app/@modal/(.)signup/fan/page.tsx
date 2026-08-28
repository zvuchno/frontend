import { Suspense } from "react";

import { FanSignup } from "@/screens/auth";

import { Loader } from "@/shared/ui";

export default function FanSignupModalPage() {
  return (
    <Suspense fallback={<Loader />}>
      <FanSignup />
    </Suspense>
  );
}
