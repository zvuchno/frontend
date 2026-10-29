import { useContext } from "react";

import { AccountActionsContext } from "./AccountActionsContext";

export const useAccountActions = () => {
  const context = useContext(AccountActionsContext);

  if (!context) {
    throw new Error("useAccountActions must be used inside AccountActionsProvider");
  }

  return context;
};
