import { Suspense } from "react";

import { AuthFormClient } from "@/screens/auth";

import { AuthModal } from "@/widgets/AuthModal";

import { Loader } from "@/shared/ui";

export default function SigninModalPage() {
  return (
    <AuthModal>
      <Suspense fallback={<Loader />}>
        <AuthFormClient />
      </Suspense>
    </AuthModal>
  );
}
