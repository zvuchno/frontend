"use client";

import { usePathname } from "next/navigation";

import { DefaultHeaderActions } from "@/widgets/layout/Header/config/headerActions";
import { AccentContainer } from "@/shared/ui";
import { HeaderUI } from "./HeaderUI";

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
