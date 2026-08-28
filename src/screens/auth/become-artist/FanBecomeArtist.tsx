"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { BecomeArtistForm } from "@/widgets/auth/BecomeArtistForm/BecomeArtistForm";

export const FanBecomeArtist = ({ role, currentUserType }: { role: string; currentUserType: "artist" | "listener" }) => {
  if (role === "artist" || role === "label")
    return (
      <AuthModal>
        <BecomeArtistForm profileType={role} currentUserType={currentUserType}/>
      </AuthModal>
    );
};

export default FanBecomeArtist;
