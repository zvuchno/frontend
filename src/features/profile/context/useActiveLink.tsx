import { useContext } from "react";

import { ActiveLinkContext } from "./ActiveLinkContext";

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);

  if (!context) {
    throw new Error("useActiveLink must be used inside ActiveLinkProvider");
  }

  return context;
};
