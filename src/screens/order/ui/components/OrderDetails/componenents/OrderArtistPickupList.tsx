import { useState } from "react";

import { useGetCheckoutData } from "@/entities/order";

import styles from "../OrderDetails.module.scss";
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

  return (
    <div className={styles.artistPickup}>
      <h3 className={styles.title}>Пункты самовывоза</h3>
      <div className={styles.artistPickupList}>
        {artistPickPoints?.map((option) => (
          <OrderArtistPickupOption
            option={option}
            key={option.id}
            setSelected={setSelectedOption}
            isSelected={option.id === selectedOption?.id ? true : false}
          />
        ))}
      </div>
    </div>
  );
};
