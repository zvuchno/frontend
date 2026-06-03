"use client";

import { usePathname } from "next/navigation";

import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";

const accountRoutePrefixes = ["/artist", "/fans"];

const isAccountRoute = (pathname: string) =>
  accountRoutePrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

export const AppHeader = () => {
  const pathname = usePathname();

  if (isAccountRoute(pathname)) {
    return null;
  }

  return (
    <AccentContainer>
      <HeaderUI actions={DefaultHeaderActions} />
    </AccentContainer>
  );
};

export default AppHeader;
