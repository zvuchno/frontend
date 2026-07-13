import clsx from "clsx";

import styles from "../OrderDetails.module.scss";
import { type ArtistPickupOption } from "./OrderArtistPickupList";

export const OrderArtistPickupOption = ({
  option,
  setSelected,
  isSelected,
}: {
  option: ArtistPickupOption;
  isSelected: boolean;
  setSelected: (option: ArtistPickupOption) => void;
}) => (
  <div
    className={clsx(styles.pickupOption, isSelected && styles.active)}
    onClick={() => setSelected(option)}
  >
    <div className={styles.pickupOptionDetails}>
      <span className={styles.pickupOptionTitle}>Адрес: </span>
      <p className={styles.pickupOptionDescription}>{option.address}</p>
    </div>
    <div className={styles.pickupOptionDetails}>
      <span className={styles.pickupOptionTitle}>Дата: </span>
      <p className={styles.pickupOptionDescription}>{option.date ?? "не указана"}</p>
    </div>
  </div>
);
