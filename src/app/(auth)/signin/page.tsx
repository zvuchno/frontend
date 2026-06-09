import { AuthFormClient } from "@/screens/auth";
import { AuthModal } from "@/widgets/AuthModal";
import { Suspense } from "react";

const SigninPage = () => {
  return (
    <AuthModal>
      <Suspense fallback={<div>Loading authentication form...</div>}>
        <AuthFormClient />
      </Suspense>
    </AuthModal>
  );
};

export default SigninPage;
