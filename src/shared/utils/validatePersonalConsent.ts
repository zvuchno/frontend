import type { Validate } from "react-hook-form";

import type { FieldValues } from "@/screens/order/model/types";
import { errorsMessages } from "@/screens/order/ui/components/OrderDetails/utils";

export const validatePersonalConsent: Validate<boolean | undefined, FieldValues> = (value) => {
  if (!value) return errorsMessages.requiredMessage;
  return true;
};
