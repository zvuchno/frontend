import { CustomInput } from "@/shared/ui";

import styles from "../ui/ArtistSettingsPage.module.scss";

export const ArtistSettingsReturn = () => {
  return (
    <section className={styles.artistSettingsReturn}>
      <h3 className={styles.artistSettingsTitle}>Настройки возвратов</h3>
      <form className={styles.artistSettingsDeliveryOption}>
        <CustomInput id='return-contacts' label='Контакты поддержки' />
        <CustomInput id='return-address' label='Адрес для возвратов' />
      </form>
    </section>
  );
};
