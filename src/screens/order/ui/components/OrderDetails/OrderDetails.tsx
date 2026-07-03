import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { type TDeliveryOption, useGetDeliveryOptions } from "@/entities/order";

import styles from "./OrderDetails.module.scss";
import { OrderDeliveryOptions } from "./componenents/OrderDeliveryOptions";
import { OrderDetailsPersonal } from "./componenents/OrderDetailsPersonal";

export const OrderDetails = ({ fieldsDisabled = false }) => {
  const { data } = useGetDeliveryOptions();

  const [selected, setIsSelected] = useState("");

  const { setValue } = useFormContext<FieldValues>();

  const handleOptionChoose = (option: TDeliveryOption) => {
    setIsSelected(option.delivery_type);
    setValue("delivery", option.id);
  };

  return (
    <div className={styles.orderDetails}>
      <OrderDetailsPersonal fieldsDisabled={fieldsDisabled} />
      {data && (
        <OrderDeliveryOptions
          options={data}
          onChooseOption={handleOptionChoose}
          optionChecked={selected}
        />
      )}
    </div>
  );
};
