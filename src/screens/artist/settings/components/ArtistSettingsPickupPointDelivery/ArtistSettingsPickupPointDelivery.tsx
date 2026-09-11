import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from "react-hook-form";

import clsx from "clsx";

import { type TArtistSettingsFieldValues, useManageArtistStoreSettings } from "@/entities/Artist";

import { ButtonUI } from "@/shared/ui";
import { HintBlock } from "@/shared/ui/HintBlock";

import { ArtistSettingsPickupPoint } from "../ArtistSettingsPickupPoint/ArtistSettingsPickupPoint";
import styles from "./ArtistSettingsPickupPointDelivery.module.scss";

export const ArtistSettingsPickupPointDelivery = ({
  fields,
  disabled,
  isAvaliable,
  onAddPoint,
  onDeletePoint,
}: {
  fields: FieldArrayWithId<TArtistSettingsFieldValues, "pickupPoints", "id">[];
  disabled: boolean;
  isAvaliable: boolean;
  onAddPoint: UseFieldArrayAppend<TArtistSettingsFieldValues, "pickupPoints">;
  onDeletePoint: UseFieldArrayRemove;
}) => {
  const { mutateAsync: toggleCdekAvailabel } = useManageArtistStoreSettings();
  const addNewPickupPoint = () => {
    onAddPoint({
      address: "",
      pickup_date: "",
      is_active: true,
    });
  };

  return (
    <div key='pickup' className={styles.artistSettingsDeliveryOptionsContainer}>
      <div className={styles.artistSettingsDeliveryOption}>
        <label
          className={styles.checkboxContainer}
          aria-label={isAvaliable ? "Выключить" : "Включить"}
          title={isAvaliable ? "Выключить" : "Включить"}
        >
          <input
            type='checkbox'
            className={styles.visuallyHidden}
            checked={isAvaliable}
            disabled={disabled}
            onChange={() => void toggleCdekAvailabel({ pickup_enabled: !isAvaliable })}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <span
          className={clsx(
            styles.artistSettingsDeliveryOptionTitle,
            !isAvaliable && styles.notAvailable
          )}
        >
          Самовывоз
        </span>
        <HintBlock text='при выключенной опции варианты доставки не будут доступны покупателям' />
      </div>

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
        disabled={disabled}
      >
        + Добавить еще адрес
      </ButtonUI>
    </div>
  );
};
