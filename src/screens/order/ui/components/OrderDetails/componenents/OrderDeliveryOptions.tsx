import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { CdekDelivery } from "@/features/CdekDelivery";

import { type TDeliveryOption } from "@/entities/order";

import { CheckboxUI } from "@/shared/ui";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig } from "../utils";
import { OrderAddressDetails } from "./OrderAddressDetails";
import { OrderArtistPickupList } from "./OrderArtistPickupList";

export const OrderDeliveryOptions = ({
  options,
}: {
  options: TDeliveryOption[];
  optionChecked: string;
  onChooseOption: (option: TDeliveryOption) => void;
}) => {
  const { register, watch, setValue } = useFormContext<FieldValues>();
  const currentDeliveryValueId = watch("delivery");
  const currentDeliveryOption = options.find(
    (option) => String(option.id) === String(currentDeliveryValueId)
  );

  useEffect(() => {
    if (currentDeliveryOption?.delivery_type === "courier") setValue("tariffs", "door");
  }, [currentDeliveryValueId, options, setValue, currentDeliveryOption]);

  const deliveryDays = {
    courier: "Доставка займёт 7–21 дней",
    pickpoint: "Доставка займёт 5–7 дней",
    artist_pickup: "",
  };

  return (
    <section className={styles.orderDetailsDeliveryOptions}>
      <h3 className={styles.title}>Способ доставки</h3>
      <div className={styles.orderDetailsDeliveryOptionsList}>
        {options.map((option) => {
          const isCurrentSelected = String(currentDeliveryValueId) === String(option.id);

          return (
            <div key={option.id} className={styles.optionDescriptionContainer}>
              <CheckboxUI
                type={"radio"}
                isChecked={isCurrentSelected}
                {...register("delivery", fieldsConfig.delivery)}
                value={String(option.id)}
              >
                {option.name}
              </CheckboxUI>
              <span className={styles.optionDescription}>{deliveryDays[option.delivery_type]}</span>
            </div>
          );
        })}
      </div>
      {currentDeliveryOption?.delivery_type === "courier" && <OrderAddressDetails />}
      {currentDeliveryOption?.delivery_type === "pickpoint" && <CdekDelivery isSender={false} />}
      {currentDeliveryOption?.delivery_type === "artist_pickup" && <OrderArtistPickupList />}
    </section>
  );
};
