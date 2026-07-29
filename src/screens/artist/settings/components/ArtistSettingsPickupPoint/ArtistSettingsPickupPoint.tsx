import clsx from "clsx";

import { CustomInput } from "@/shared/ui";

import styles from "../../ui/ArtistSettingsPage.module.scss";

export const ArtistSettingsPickupPoint = () => {
  return (
    <fieldset className={clsx(styles.artistSettingsDeliveryOption, styles.pickupPoint)}>
      <CustomInput id='return-contacts' label='Адрес' />
      <CustomInput id='return-address' label='Дата' type='date' />
    </fieldset>
  );
};
