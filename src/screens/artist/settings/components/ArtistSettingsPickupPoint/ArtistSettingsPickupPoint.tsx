import { Controller, useFormContext } from "react-hook-form";

import clsx from "clsx";
import { format, parseISO } from "date-fns";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { CalendarField } from "@/shared/ui/CalendarField/CalendarField";
import { HintBlock } from "@/shared/ui/HintBlock";

import styles from "./ArtistSettingsPickupPoint.module.scss";
import { PickupPointAddress } from "./components/PickupPointAddress";

export const ArtistSettingsPickupPoint = ({
  index,
  disabled,
  onRemove,
}: {
  index: number;
  disabled: boolean;
  onRemove: () => void;
}) => {
  const { control, setValue } = useFormContext<TArtistSettingsFieldValues>();

  const addressName = `pickupPoints.${index}.address` as const;
  const dateName = `pickupPoints.${index}.pickup_date` as const;

  return (
    <fieldset className={clsx(styles.artistSettingsDeliveryOption, styles.pickupPoint)}>
      <PickupPointAddress
        disabled={disabled}
        fieldIndex={index}
        onRemove={onRemove}
        addressName={addressName}
        dateName={dateName}
      />

      <Controller
        control={control}
        shouldUnregister={false}
        name={dateName}
        render={({ field: { value, onBlur }, fieldState }) => (
          <div className={styles.artistSettingsDeliveryDate}>
            <div className={styles.artistSettingsDeliveryDateContainer}>
              <label className={styles.artistSettingsDeliveryDateLabel}>Дата</label>
              <HintBlock text='укажите дату самовывоза или оставьте поле пустым' />
            </div>

            <CalendarField
              fieldError={fieldState.error}
              value={value ? parseISO(value) : null}
              onBlur={onBlur}
              id='pickup-date'
              index={0}
              onChange={(date: Date | null) => {
                setValue(dateName, date ? format(date, "yyyy-MM-dd") : "", {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
              popperClassName={styles.artistSettingsDeliveryDatePopper}
              wrapperClassName={styles.datePickerWrapper}
            />
          </div>
        )}
      />
    </fieldset>
  );
};
