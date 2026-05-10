'use client';

import { ArtistRegisterForm } from "@/widgets/auth/ui/ArtistRegisterForm/ArtistRegisterForm";
import ModalPage from "../../ModalPage";
import { registerNewArtist } from "@/entities/user/api";

const ArtistSignupPage = () => {
  return (
    <ModalPage>
      <ArtistRegisterForm onSubmit={registerNewArtist} />
    </ModalPage>
  )
};

export default ArtistSignupPage;