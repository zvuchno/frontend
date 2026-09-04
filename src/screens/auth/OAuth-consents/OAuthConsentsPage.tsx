import { OAuthConsentsForm } from "@/widgets/auth/OAuthConsentsForm"
import { AuthModal } from "@/widgets/AuthModal";

export const OAuthConsentsPage = ({ state }: {state: string}) => {
  return (
    <AuthModal>
      <OAuthConsentsForm state={state}/>
    </AuthModal>
  )
};