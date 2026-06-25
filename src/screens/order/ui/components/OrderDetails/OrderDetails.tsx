import styles from "./OrderDetails.module.scss";
import { useGetDeliveryOptions } from "@/entities";
import { useState } from "react";
import { OrderDetailsPersonal } from "./componenents/OrderDetailsPersonal";
import { OrderDeliveryOptions } from "./componenents/OrderDeliveryOptions";
import { OrderAddressDetails } from "./componenents/OrderAddressDetails";

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
      {selected === "courier" && (
        <OrderAddressDetails fieldsDisabled={fieldsDisabled} />
      )}
    </div>
  );
};
