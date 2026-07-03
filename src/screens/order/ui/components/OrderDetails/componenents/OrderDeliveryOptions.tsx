import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import type { TDeliveryOption } from "@/entities/order";

import { CheckboxUI } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig } from "../utils";
import { OrderAddressDetails } from "./OrderAddressDetails";

export const OrderDeliveryOptions = ({
  options,
}: {
  options: TDeliveryOption[];
  optionChecked: string;
  onChooseOption: (option: TDeliveryOption) => void;
}) => {
  const { register, watch } = useFormContext<FieldValues>();
  const currentDeliveryValue = watch("delivery");

  return (
    <section className={styles.orderDetailsDeliveryOptions}>
      <h3 className={styles.title}>Способ доставки</h3>
      <div className={styles.orderDetailsDeliveryOptionsList}>
        {options.map((option) => {
          const isCurrentSelected = String(currentDeliveryValue) === String(option.id);
          return (
            <CheckboxUI
              type={"radio"}
              key={option.id}
              isChecked={isCurrentSelected}
              {...register("delivery", fieldsConfig.delivery)}
              value={String(option.id)}
            >
              {option.name}
            </CheckboxUI>
          );
        })}
      </div>
      {String(currentDeliveryValue) === "1" && <OrderAddressDetails fieldsDisabled={false} />}
    </section>
  );
};
