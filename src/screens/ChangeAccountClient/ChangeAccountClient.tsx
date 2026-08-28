"use client";

import { useSearchParams } from "next/navigation";

import FanBecomeArtist from "@/screens/auth/become-artist/FanBecomeArtist";
import { useUserStore } from "@/entities/user";

export const ChangeAccountClient = () => {
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const currentUserType = user?.isArtist ? "artist" : "listener";

  const role = searchParams.get("role");

  return <>{role && <FanBecomeArtist role={role} currentUserType={currentUserType}/>}</>;
};
