"use client";

import { usePathname } from "next/navigation";

import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";

export const AppHeader = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/artist/profile")) {
    return null;
  }

  return (
    <AccentContainer>
      <HeaderUI actions={DefaultHeaderActions} />
    </AccentContainer>
  );
};

export default AppHeader;
