"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { ArtistRegisterForm } from "@/widgets/auth/ArtistRegisterForm";

import type { TProfileType } from "@/entities/user";

export const ArtistSignup = ({profileType}: {profileType: TProfileType}) => {
  return (
    <AuthModal>
      <ArtistRegisterForm profileType={profileType}/>
    </AuthModal>
  );
};

export default ArtistSignup;
