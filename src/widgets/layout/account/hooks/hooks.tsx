import { usePathname } from "next/navigation";

import { useActiveLink } from "@/features/profile";

export const useIsNestedAccountRoute = (): boolean => {
  const pathname = usePathname();
  const { activeLink } = useActiveLink();

  if (!pathname || typeof activeLink?.href !== "string") return false;

  const activePath = activeLink.href.split("#")[0].replace(/\/$/, "");
  const currentPath = pathname.replace(/\/$/, "");

  return currentPath !== activePath && currentPath.startsWith(`${activePath}/`);
};
