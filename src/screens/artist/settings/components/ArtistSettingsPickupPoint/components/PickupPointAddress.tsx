import { type FieldError, get, useFormContext } from "react-hook-form";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { CustomInput } from "@/shared/ui";

import styles from "../ArtistSettingsPickupPoint.module.scss";

export const PickupPointAddress = ({
  disabled,
  fieldIndex,
  addressName,
  onRemove,
}: {
  disabled: boolean;
  fieldIndex: number;
  addressName: `pickupPoints.${number}.address`;
  onRemove: () => void;
}) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<TArtistSettingsFieldValues>();
  const addressError = get(errors, addressName) as FieldError | undefined;

  const addressRegistration = register(addressName, {
    required: "Укажите адрес (место) самовывоза",
    validate: (value) => Boolean(value?.trim()) || "Укажите адрес (место) самовывоза",
    onChange: () => {
      void trigger(addressName);
    },
  });

  return (
    <div className={styles.artistSettingsDeliveryAddressWrapper}>
      <div style={{ height: "max-content", position: "relative" }}>
        <CustomInput
          {...addressRegistration}
          id={`pickup-address-${fieldIndex}`}
          label='Адрес'
          className={styles.artistSettingsDeliveryAddress}
          disabled={disabled}
          required
          error={!!addressError}
          message={addressError?.message}
        />

        <button
          className={styles.artistSettingsDeliveryAddressDeleteButton}
          disabled={disabled}
          title='Удалить пункт самовывоза'
          type='button'
          aria-label='Удалить пункт самовывоза'
          onClick={onRemove}
        />
      </div>
    </div>
  );
};
