import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from "react-hook-form";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { ButtonUI, CheckboxUI } from "@/shared/ui";

import { ArtistSettingsPickupPoint } from "../ArtistSettingsPickupPoint/ArtistSettingsPickupPoint";
import styles from "./ArtistSettingsPickupPointDelivery.module.scss";

export const ArtistSettingsPickupPointDelivery = ({
  fields,
  disabled,
  onAddPoint,
  onDeletePoint,
}: {
  fields: FieldArrayWithId<TArtistSettingsFieldValues, "pickupPoints", "id">[];
  disabled: boolean;
  onAddPoint: UseFieldArrayAppend<TArtistSettingsFieldValues, "pickupPoints">;
  onDeletePoint: UseFieldArrayRemove;
}) => {
  const hasNewPoints = fields.length > 0;

  const isPickupEnabled = hasNewPoints;

  const addNewPickupPoint = () => {
    onAddPoint({
      address: "",
      pickup_date: "",
      is_active: true,
    });
  };

  return (
    <div key='pickup' className={styles.artistSettingsDeliveryOptionsContainer}>
      <CheckboxUI
        type={"radio"}
        isChecked={isPickupEnabled}
        onChange={fields.length === 0 ? () => addNewPickupPoint() : undefined}
        disabled={disabled}
        className={styles.artistSettingsDeliveryOption}
      >
        Самовывоз
      </CheckboxUI>

      <form className={styles.pickupPointsForm} name='pickup-points' aria-disabled={disabled}>
        {fields.map((field, index) => (
          <ArtistSettingsPickupPoint
            key={field.id}
            index={index}
            disabled={disabled}
            onRemove={() => onDeletePoint(index)}
          />
        ))}
      </form>

      <ButtonUI
        variant={"primary"}
        type='button'
        className={styles.artistSettingsDeliveryOptionsButton}
        onClick={addNewPickupPoint}
        disabled={disabled || !isPickupEnabled}
      >
        + Добавить еще адрес
      </ButtonUI>
    </div>
  );
};
