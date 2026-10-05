import { Loader } from "@/shared/ui";
import { OAuthConsentsForm } from "@/widgets/auth/OAuthConsentsForm"
import { AuthModal } from "@/widgets/AuthModal";
import { Suspense } from "react";

export const OAuthConsentsPage = ({ state }: {state: string}) => {
  return (
    <Suspense fallback={<Loader />}>
      <AuthModal>
        <OAuthConsentsForm state={state}/>
      </AuthModal>
    </Suspense>
  )
};