"use client";

import { createContext } from "react";

import { type TDataStatus } from "@/widgets/layout/account/components/DataStatusBar/DataStatusBar";

export type TAccountPageActions = {
  dataStatus?: TDataStatus;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  onClickPrimaryBtn?: () => void;
  onClickSecondaryBtn?: () => void;
  dataStatusComment?: string;
};

type TAccountActionsContextValue = {
  accountActions: TAccountPageActions | null;
  setAccountActions: (actions: TAccountPageActions | null) => void;
};

export const AccountActionsContext = createContext<TAccountActionsContextValue | null>(null);
