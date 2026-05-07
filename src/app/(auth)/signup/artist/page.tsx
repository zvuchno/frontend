'use client';

import { ArtistRegisterForm } from "@/widgets/auth/ui/ArtistRegisterForm/ArtistRegisterForm";
import ModalPage from "../../ModalPage";

const ArtistSignupPage = () => {
  return (
    <ModalPage>
      <ArtistRegisterForm />
    </ModalPage>
  )
};

export default ArtistSignupPage;