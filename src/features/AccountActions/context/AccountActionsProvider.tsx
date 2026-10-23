import { type ReactNode, useCallback, useMemo, useState } from "react";

import { AccountActionsContext, type TAccountPageActions } from "./AccountActionsContext";

export const AccountActionsProvider = ({ children }: { children: ReactNode }) => {
  const [pageActions, setPageActions] = useState<TAccountPageActions | null>(null);

  const setAccountPageActions = useCallback((actions: TAccountPageActions | null) => {
    setPageActions(actions);
  }, []);

  const value = useMemo(
    () => ({ accountActions: pageActions, setAccountActions: setAccountPageActions }),
    [pageActions, setAccountPageActions]
  );

  return <AccountActionsContext.Provider value={value}>{children}</AccountActionsContext.Provider>;
};
