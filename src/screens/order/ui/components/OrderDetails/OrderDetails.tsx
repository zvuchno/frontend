import { useState } from "react";

import { useGetDeliveryOptions } from "@/entities/order";

import styles from "./OrderDetails.module.scss";
import { OrderAddressDetails } from "./componenents/OrderAddressDetails";
import { OrderDeliveryOptions } from "./componenents/OrderDeliveryOptions";
import { OrderDetailsPersonal } from "./componenents/OrderDetailsPersonal";

export const OrderDetails = ({ fieldsDisabled = false }) => {
  const { data } = useGetDeliveryOptions();

  const [selected, setIsSelected] = useState("");

  const handleOptionChoose = (option: string) => {
    setIsSelected(option);
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
      {selected === "courier" && <OrderAddressDetails fieldsDisabled={fieldsDisabled} />}
    </div>
  );
};
