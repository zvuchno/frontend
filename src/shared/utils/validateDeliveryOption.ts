import type { Validate } from "react-hook-form";

import type { FieldValues } from "@/screens/order/model/types";
import { errorsMessages } from "@/screens/order/ui/components/OrderDetails/utils";

export const validateDeliveryOption: Validate<string | undefined, FieldValues> = (value) => {
  const deliveries = ["1", "2", "3", "4"];
  if (!value || !deliveries.includes(value)) return errorsMessages.requiredMessage;
  return true;
};
