"use client";

import { useSearchParams } from "next/navigation";

import FanBecomeArtist from "@/screens/auth/become-artist/FanBecomeArtist";

export const ChangeAccountClient = () => {
  const searchParams = useSearchParams();

  const role = searchParams.get("role");

  return <>{role && <FanBecomeArtist role={role} />}</>;
};
