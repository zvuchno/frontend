import { createContext } from "react";

import type { SelectDeliveryContextType } from "./types";

export const SelectedDeliveryContext = createContext<SelectDeliveryContextType | null>(null);
