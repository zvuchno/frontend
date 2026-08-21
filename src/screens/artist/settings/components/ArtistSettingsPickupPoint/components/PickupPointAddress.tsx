import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import { type TArtistSettingsFieldValues, useDeleteArtistPickupPoint } from "@/entities/Artist";

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
  const { register, trigger, control } = useFormContext<TArtistSettingsFieldValues>();
  const { mutateAsync: deletePickuppoint } = useDeleteArtistPickupPoint();

  const serverIdName = `pickupPoints.${fieldIndex}.server_id` as const;

  const serverId = useWatch({
    control,
    name: serverIdName,
  });

  const addressRegistration = register(addressName, {
    onChange: () => {
      void trigger(dateName);
    },
  });

  const handleDelete = async () => {
    if (serverId === undefined) {
      onRemove();
      return;
    }

    try {
      await deletePickuppoint(serverId);
      onRemove();
    } catch {
      toast.error("Не удалось удалить пункт самовывоза. Повторите попытку");
    }
  };

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
        onClick={() => void handleDelete()}
      />
    </div>
  );
};
