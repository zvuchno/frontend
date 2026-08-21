import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";

import clsx from "clsx";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

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
  const { control, getValues, setValue } = useFormContext<TArtistSettingsFieldValues>();

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
        rules={{
          validate: (value) => {
            const hasAddress = Boolean(getValues(addressName)?.trim());
            return !hasAddress || Boolean(value) || "Укажите дату самовывоза";
          },
        }}
        render={({ field: { value, onBlur }, fieldState }) => (
          <div className={styles.artistSettingsDeliveryDate}>
            <label className={styles.artistSettingsDeliveryDateLabel}>Дата</label>
            <div
              className={clsx(
                styles.artistSettingsDeliveryDatePicker,
                fieldState.error && styles.dateError
              )}
            >
              <DatePicker
                selected={value ? parseISO(value) : null}
                onChange={(date: Date | null) => {
                  setValue(dateName, date ? format(date, "yyyy-MM-dd") : "", {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  });
                }}
                onBlur={onBlur}
                id='pickup-date'
                className={clsx("input_pickup_date input_size_small")}
                popperClassName={styles.artistSettingsDeliveryDatePopper}
                wrapperClassName={styles.datePickerWrapper}
                dateFormat='dd.MM.yyyy'
                locale={ru}
                placeholderText='дд.мм.гггг'
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                showPopperArrow={false}
                disabled={disabled}
                minDate={new Date()}
                autoComplete='off'
                onKeyDown={(event) => event.preventDefault()}
              />
            </div>
          </div>
        )}
      />
    </fieldset>
  );
};
