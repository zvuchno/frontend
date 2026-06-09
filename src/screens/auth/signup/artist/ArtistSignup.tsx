"use client";

import { ArtistRegisterForm } from "@/widgets/auth/ArtistRegisterForm";
import { registerNewArtist } from "@/entities/user/api";
import { AuthModal } from "@/widgets/AuthModal";

export const ArtistSignup = () => {
  return (
    <AuthModal>
      <ArtistRegisterForm onSubmit={registerNewArtist} />
    </AuthModal>
  );
};

export default ArtistSignup;
