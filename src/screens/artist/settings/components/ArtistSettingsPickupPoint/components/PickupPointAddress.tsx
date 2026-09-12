import { useFormContext } from "react-hook-form";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { CustomInput } from "@/shared/ui";

import styles from "../ArtistSettingsPickupPoint.module.scss";

export const PickupPointAddress = ({
  disabled,
  fieldIndex,
  addressName,
  dateName,
  onRemove,
}: {
  disabled: boolean;
  fieldIndex: number;
  addressName: `pickupPoints.${number}.address`;
  dateName: `pickupPoints.${number}.pickup_date`;
  onRemove: () => void;
}) => {
  const { register, trigger } = useFormContext<TArtistSettingsFieldValues>();

  const addressRegistration = register(addressName, {
    onChange: () => {
      void trigger(dateName);
    },
  });

  return (
    <div className={styles.artistSettingsDeliveryAddressWrapper}>
      <CustomInput
        {...addressRegistration}
        id={`pickup-address-${fieldIndex}`}
        label='Адрес'
        className={styles.artistSettingsDeliveryAddress}
        disabled={disabled}
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
  );
};
