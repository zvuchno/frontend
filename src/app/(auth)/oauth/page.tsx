import { OAuthLoginPage } from "@/screens/auth";
import { Loader } from "@/shared/ui";
import { Suspense } from "react";

function OAuthPage () {
  return (
    <Suspense fallback={<Loader />}>
      <OAuthLoginPage />
    </Suspense>
  )
};

export default OAuthPage;