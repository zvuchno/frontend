import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CdekDelivery } from "@/features/CdekDelivery";

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
  const { register, watch, setValue } = useFormContext<FieldValues>();
  const currentDeliveryValue = watch("delivery");

  const deliveryDays = {
    courier: "Доставка займёт 7–21 дней",
    pickpoint: "Доставка займёт 5–7 дней",
    digital: "Доставка займёт 1–2 дня",
    artist_pickup: "",
  };

  return (
    <section className={styles.orderDetailsDeliveryOptions}>
      <h3 className={styles.title}>Способ доставки</h3>
      <div className={styles.orderDetailsDeliveryOptionsList}>
        {options.map((option) => {
          const isCurrentSelected = String(currentDeliveryValue) === String(option.id);
          if (String(currentDeliveryValue) === "1") setValue("cdek_delivery_mode", "door");
          if (String(currentDeliveryValue) === "2") setValue("cdek_delivery_mode", "office");
          return (
            <div key={option.id} className={styles.optionDescriptionContainer}>
              <CheckboxUI
                type={"radio"}
                isChecked={isCurrentSelected}
                {...register("delivery", fieldsConfig.delivery)}
                //{...register("cdek_delivery_mode", fieldsConfig.cdek_delivery_mode)}
                value={String(option.id)}
              >
                {option.name}
              </CheckboxUI>
              <span className={styles.optionDescription}>{deliveryDays[option.delivery_type]}</span>
            </div>
          );
        })}
      </div>
      {String(currentDeliveryValue) === "1" && <OrderAddressDetails fieldsDisabled={false} />}
      {String(currentDeliveryValue) === "2" && <CdekDelivery />}
    </section>
  );
};
