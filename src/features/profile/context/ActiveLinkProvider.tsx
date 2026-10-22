import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { LinkItem } from "@/shared/ui";
import { ActiveLinkContext } from "./ActiveLinkContext";

export const ActiveLinkProvider = ({ children }: { children: ReactNode }) => {
  const [activeLink, setActiveLinkState] = useState<LinkItem | null>(null);
  const setActiveLink = useCallback((link: LinkItem) => {
    setActiveLinkState((current) =>
      current?.id === link.id && current.href === link.href ? current : link
    );
  }, []);
  const value = useMemo(() => ({ activeLink, setActiveLink }), [activeLink, setActiveLink]);

  return <ActiveLinkContext.Provider value={value}>{children}</ActiveLinkContext.Provider>;
};
