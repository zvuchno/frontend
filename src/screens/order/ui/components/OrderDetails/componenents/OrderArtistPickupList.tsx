import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { useGetCheckoutData } from "@/entities/order";

import styles from "../OrderDetails.module.scss";
import { fieldsConfig } from "../utils";
import { OrderArtistPickupOption } from "./OrderArtistPickupOption";

export type ArtistPickupOption = {
  id: number;
  address: string;
  date: string;
};

export const OrderArtistPickupList = () => {
  const { data } = useGetCheckoutData();
  const artistPickPoints = data?.pickup_points;

  const [selectedOption, setSelectedOption] = useState<ArtistPickupOption | null>(null);

  const { register, unregister, setValue } = useFormContext<FieldValues>();

  useEffect(() => {
    register("pickup_point", fieldsConfig.pickup_point);

    return () => {
      unregister("pickup_point");
    };
  }, [register, unregister]);

  const handleSelectOption = (option: ArtistPickupOption) => {
    setSelectedOption(option);
    setValue("pickup_point", option.id, { shouldValidate: true });
  };

  return (
    <div className={styles.artistPickup}>
      <h3 className={styles.title}>Пункты самовывоза</h3>
      <div className={styles.artistPickupList}>
        {artistPickPoints?.map((option) => (
          <OrderArtistPickupOption
            option={option}
            key={option.id}
            setSelected={handleSelectOption}
            isSelected={option.id === selectedOption?.id ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
