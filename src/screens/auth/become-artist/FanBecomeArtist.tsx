"use client";

import { Loader } from "@/shared/ui";
import { AuthModal } from "@/widgets/AuthModal";
import { BecomeArtistForm } from "@/widgets/auth/BecomeArtistForm/BecomeArtistForm";
import { Suspense } from "react";

export const FanBecomeArtist = ({ role, currentUserType }: { role: string; currentUserType: "artist" | "listener" }) => {
  if (role === "artist" || role === "label")
    return (
      <Suspense fallback={<Loader />}>
        <AuthModal>
          <BecomeArtistForm profileType={role} currentUserType={currentUserType}/>
        </AuthModal>
      </Suspense>
    );
};

export default FanBecomeArtist;
