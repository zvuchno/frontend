import DatePicker from "react-datepicker";

import clsx from "clsx";
import { ru } from "date-fns/locale";

import { CustomInput } from "@/shared/ui";

import styles from "./ArtistSettingsPickupPoint.module.scss";

export const ArtistSettingsPickupPoint = () => {
  return (
    <fieldset className={clsx(styles.artistSettingsDeliveryOption, styles.pickupPoint)}>
      <CustomInput
        id='pickup-address'
        label='Адрес'
        className={styles.artistSettingsDeliveryAddress}
      />
      <div className={styles.artistSettingsDeliveryDate}>
        <label className={styles.artistSettingsDeliveryDateLabel}>Дата</label>
        <div className={styles.artistSettingsDeliveryDatePicker}>
          <DatePicker
            id='pickup-date'
            className={clsx("input_pickup_date input_size_small")}
            popperClassName={styles.artistSettingsDeliveryDatePopper}
            wrapperClassName={styles.datePickerWrapper}
            dateFormat='dd.MM.yyyy'
            locale={ru}
            //selected={value}
            //onChange={(date: Date | null) => onChange(date)}
            placeholderText='дд.мм.гггг'
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
            showPopperArrow={false}
          />
        </div>
      </div>
    </fieldset>
  );
};
