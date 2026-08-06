"use client";

import { AuthModal } from "@/widgets/AuthModal";
import { BecomeArtistForm } from "@/widgets/auth/BecomeArtistForm/BecomeArtistForm";

export const FanBecomeArtist = ({ role }: { role: string }) => {
  if (role === "artist" || role === "label")
    return (
      <AuthModal>
        <BecomeArtistForm profileType={role} />
      </AuthModal>
    );
};

export default FanBecomeArtist;
