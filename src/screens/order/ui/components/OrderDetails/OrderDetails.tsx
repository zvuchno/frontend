import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { type TDeliveryOption, useGetCheckoutData } from "@/entities/order";

import styles from "./OrderDetails.module.scss";
import { OrderDeliveryOptions } from "./componenents/OrderDeliveryOptions";
import { OrderDetailsPersonal } from "./componenents/OrderDetailsPersonal";

export const OrderDetails = ({ fieldsDisabled = false }) => {
  //const { data } = useGetDeliveryOptions(); // для локальных тестов
  //const deliveryOptionsAvaliable = data; // для локальных тестов

  const { data, status } = useGetCheckoutData();
  const deliveryOptionsAvaliable = data?.deliveries;

  const [selected, setIsSelected] = useState("");

  const { setValue } = useFormContext<FieldValues>();

  const handleOptionChoose = (option: TDeliveryOption) => {
    setIsSelected(option.delivery_type);
    setValue("delivery", option.id);
  };

  const isDigital = !(deliveryOptionsAvaliable && deliveryOptionsAvaliable?.length > 0);

  return (
    <div className={styles.orderDetails}>
      <OrderDetailsPersonal fieldsDisabled={fieldsDisabled} />

      {status === "success" && (
        <OrderDeliveryOptions
          options={
            !isDigital
              ? deliveryOptionsAvaliable
              : [{ id: 4, name: "Электронный товар", delivery_type: "digital" }]
          }
          onChooseOption={!isDigital ? handleOptionChoose : () => {}}
          optionChecked={!isDigital ? selected : "Электронный товар"}
        />
      )}
    </div>
  );
};
