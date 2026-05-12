import { AuthForm } from "@/widgets/auth/ui/AuthForm/AuthForm";
import ModalPage from "../ModalPage";

const SigninPage = () => {

  return (
    <ModalPage>
      <AuthForm registerRoute="/role" />
    </ModalPage>
  )
};

export default SigninPage;