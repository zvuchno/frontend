import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from "react-hook-form";

import clsx from "clsx";

import { type TArtistSettingsFieldValues, type TShippingSettings } from "@/entities/Artist";

import { ArtistSettingsCdekDelivery } from "../ArtistSettingsCdekDelivery/ArtistSettingsCdekDelivery";
import { ArtistSettingsPickupPointDelivery } from "../ArtistSettingsPickupPointDelivery/ArtistSettingsPickupPointDelivery";
import styles from "./ArtistSettingsDelivery.module.scss";

export type TArtistSettingsDelivery = {
  disabled: boolean;
  cdekSettings?: TShippingSettings;
  onAddPoint: UseFieldArrayAppend<TArtistSettingsFieldValues, "pickupPoints">;
  onDeletePoint: UseFieldArrayRemove;
  pickupStatus?: boolean;
  fields: FieldArrayWithId<TArtistSettingsFieldValues, "pickupPoints", "id">[];

  onChooseButtonClick: () => void;
};

export const ArtistSettingsDelivery = ({
  disabled,
  fields,
  cdekSettings,
  pickupStatus,
  onAddPoint,
  onDeletePoint,
  onChooseButtonClick,
}: TArtistSettingsDelivery) => (
  <section className={clsx(styles.artistSettingsDelivery, disabled && styles.disabled)}>
    <h3 className={styles.artistSettingsTitle}>Настройки доставки</h3>
    <div className={styles.artistSettingsDeliveryOptions}>
      <ArtistSettingsCdekDelivery
        disabled={disabled}
        onSelect={onChooseButtonClick}
        office={cdekSettings?.point}
        isAvaliable={cdekSettings?.enabled || false}
      />

      <ArtistSettingsPickupPointDelivery
        disabled={disabled}
        fields={fields}
        onAddPoint={onAddPoint}
        onDeletePoint={onDeletePoint}
        isAvaliable={pickupStatus || false}
      />
    </div>
  </section>
);
