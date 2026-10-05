import { AuthFormClient } from "@/screens/auth";
import { Loader } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import { Suspense } from "react";

const SigninPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthModal>
        <AuthFormClient />
      </AuthModal>
    </Suspense>
  );
};

export default SigninPage;
