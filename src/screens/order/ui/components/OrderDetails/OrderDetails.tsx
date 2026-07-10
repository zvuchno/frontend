import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { type TDeliveryOption, useGetCheckoutData } from "@/entities/order";

import styles from "./OrderDetails.module.scss";
import { OrderDeliveryOptions } from "./componenents/OrderDeliveryOptions";
import { OrderDetailsPersonal } from "./componenents/OrderDetailsPersonal";

export const OrderDetails = () => {
  const { data } = useGetCheckoutData();
  const deliveryOptionsAvaliable = data?.deliveries;

  const [selected, setIsSelected] = useState("");

  const { setValue } = useFormContext<FieldValues>();

  const handleOptionChoose = (option: TDeliveryOption) => {
    setIsSelected(option.delivery_type);
    setValue("delivery", option.id);
  };

  return (
    <div className={styles.orderDetails}>
      <OrderDetailsPersonal fieldsDisabled={false} />
      {deliveryOptionsAvaliable && deliveryOptionsAvaliable?.length > 0 && (
        <OrderDeliveryOptions
          options={deliveryOptionsAvaliable}
          onChooseOption={handleOptionChoose}
          optionChecked={selected}
        />
      )}
    </div>
  );
};
