import { AuthFormClient } from "@/screens/auth";
import { Loader } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import { Suspense } from "react";

const SigninPage = () => {
  return (
    <AuthModal>
      <Suspense fallback={<Loader />}>
        <AuthFormClient />
      </Suspense>
    </AuthModal>
  );
};

export default SigninPage;
