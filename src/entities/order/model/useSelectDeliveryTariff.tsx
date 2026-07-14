import { useContext } from "react";

import { SelectedDeliveryContext } from "./selectDeliveryContext";

export const useSelectDeliveryTariff = () => {
  const context = useContext(SelectedDeliveryContext);
  if (!context) {
    throw new Error("ошибка использования контекста SelectedDeliveryContext");
  }
  return context;
};
