import { type ReactNode, useState } from "react";

import { SelectedDeliveryContext } from "./selectDeliveryContext";
import type { TDeliveryPickpointSelection } from "./types";

export const DeliverySelectionProvider = ({ children }: { children: ReactNode }) => {
  const [deliverySelected, setDeliverySelected] = useState<TDeliveryPickpointSelection | null>(
    null
  );

  return (
    <SelectedDeliveryContext.Provider value={{ deliverySelected, setDeliverySelected }}>
      {children}
    </SelectedDeliveryContext.Provider>
  );
};
