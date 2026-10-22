"use client";

import { createContext } from "react";

import type { LinkItem } from "@/shared/ui";

type ActiveLinkContextValue = {
  activeLink: LinkItem | null;
  setActiveLink: (link: LinkItem) => void;
};

export const ActiveLinkContext = createContext<ActiveLinkContextValue | null>(null);
