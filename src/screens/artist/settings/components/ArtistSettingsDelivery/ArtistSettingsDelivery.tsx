import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from "react-hook-form";

import { type TArtistSettingsFieldValues, type TPVZOfficeMe } from "@/entities/Artist";

import { ArtistSettingsCdekDelivery } from "../ArtistSettingsCdekDelivery/ArtistSettingsCdekDelivery";
import { ArtistSettingsPickupPointDelivery } from "../ArtistSettingsPickupPointDelivery/ArtistSettingsPickupPointDelivery";
import styles from "./ArtistSettingsDelivery.module.scss";

export type TArtistSettingsDelivery = {
  disabled: boolean;
  cdekOffice?: TPVZOfficeMe;
  onAddPoint: UseFieldArrayAppend<TArtistSettingsFieldValues, "pickupPoints">;
  onDeletePoint: UseFieldArrayRemove;
  fields: FieldArrayWithId<TArtistSettingsFieldValues, "pickupPoints", "id">[];
  onChooseButtonClick: () => void;
};

export const ArtistSettingsDelivery = ({
  disabled,
  fields,
  cdekOffice,
  onAddPoint,
  onDeletePoint,
  onChooseButtonClick,
}: TArtistSettingsDelivery) => (
  <section className={styles.artistSettingsDelivery}>
    <h3 className={styles.artistSettingsTitle}>Настройки доставки</h3>
    <div className={styles.artistSettingsDeliveryOptions}>
      <ArtistSettingsCdekDelivery
        disabled={disabled}
        onSelect={onChooseButtonClick}
        office={cdekOffice}
      />

      <ArtistSettingsPickupPointDelivery
        disabled={disabled}
        fields={fields}
        onAddPoint={onAddPoint}
        onDeletePoint={onDeletePoint}
      />
    </div>
  </section>
);
