"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { ArtistRegisterForm } from "@/widgets/auth/ArtistRegisterForm";

import { registerNewArtist } from "@/entities/user";

export const ArtistSignup = () => {
  return (
    <AuthModal>
      <ArtistRegisterForm onSubmit={registerNewArtist} />
    </AuthModal>
  );
};

export default ArtistSignup;
