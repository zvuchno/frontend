import { useEffect } from "react";
import {
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from "react-hook-form";

import clsx from "clsx";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { ButtonUI } from "@/shared/ui";
import { HintBlock } from "@/shared/ui/HintBlock";

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
  isAvaliable: boolean;
  onAddPoint: UseFieldArrayAppend<TArtistSettingsFieldValues, "pickupPoints">;
  onDeletePoint: UseFieldArrayRemove;
}) => {
  const addNewPickupPoint = () => {
    onAddPoint({
      address: "",
      pickup_date: null,
      is_active: true,
    });
  };

  const { register, control, setValue } = useFormContext<TArtistSettingsFieldValues>();

  const [pickupEnabled, pickupPoints] = useWatch({
    control,
    name: ["pickup_enabled", "pickupPoints"],
  });

  useEffect(() => {
    if (!pickupPoints?.length && pickupEnabled) {
      setValue("pickup_enabled", false, { shouldDirty: true, shouldValidate: true });
    }
  }, [pickupPoints?.length, pickupEnabled, setValue]);

  return (
    <div key='pickup' className={styles.artistSettingsDeliveryOptionsContainer}>
      <div className={styles.artistSettingsDeliveryOption}>
        <label
          className={styles.checkboxContainer}
          aria-label={pickupEnabled ? "Выключить" : "Включить"}
          title={
            pickupEnabled
              ? "Выключить"
              : pickupPoints && pickupPoints?.length > 0
                ? "Включить"
                : "Добавьте хотя бы один адрес самовывоза"
          }
        >
          <input
            {...register("pickup_enabled")}
            type='checkbox'
            className={styles.visuallyHidden}
            checked={pickupEnabled}
            disabled={disabled}
            onChange={() => setValue("pickup_enabled", !pickupEnabled, { shouldDirty: true })}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <span
          className={clsx(
            styles.artistSettingsDeliveryOptionTitle,
            !pickupEnabled && styles.notAvailable
          )}
        >
          Самовывоз
        </span>
        <HintBlock text='при выключенной опции выбранные варианты доставки не доступны покупателям' />
        <HintBlock text='добавьте хотя бы один адрес, чтобы включить опцию "Самовывоз"' />
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
