import { useState } from "react";

import { ButtonUI, CheckboxUI } from "@/shared/ui";

import { ArtistSettingsPickupPoint } from "../ArtistSettingsPickupPoint/ArtistSettingsPickupPoint";
import styles from "./ArtistSettingsDelivery.module.scss";

export type TArtistSettingsDelivery = {
  onChooseButtonClick: (isOpen?: boolean) => void;
};

export const ArtistSettingsDelivery = ({ onChooseButtonClick }: TArtistSettingsDelivery) => {
  const [pickupPointsCount, setPickupPointsCount] = useState<number>(1);

  const addNewPickupPoint = () => {
    setPickupPointsCount((prev) => prev + 1);
  };

  return (
    <section className={styles.artistSettingsDelivery}>
      <h3 className={styles.artistSettingsTitle}>Настройки доставки</h3>
      <div className={styles.artistSettingsDeliveryOptions}>
        <div key='cdek' className={styles.artistSettingsDeliveryOptionsContainer}>
          <CheckboxUI
            type={"radio"}
            //isChecked={isCurrentSelected}
            //{...register("delivery", fieldsConfig.delivery)}
            //value={String(option.id)}
          >
            СДЭК
          </CheckboxUI>

          <ButtonUI
            variant={"primary"}
            type='button'
            className={styles.artistSettingsDeliveryOptionsButton}
            onClick={() => onChooseButtonClick(true)}
          >
            Выбрать пункт выдачи
          </ButtonUI>
        </div>

        <div key='pickup' className={styles.artistSettingsDeliveryOptionsContainer}>
          <CheckboxUI
            type={"radio"}
            //isChecked={isCurrentSelected}
            //{...register("delivery", fieldsConfig.delivery)}
            //value={String(option.id)}
          >
            Самовывоз
          </CheckboxUI>

          <form className={styles.pickupPointsForm} name='pickup-points'>
            {Array.from({ length: pickupPointsCount }).map((_, index) => (
              <ArtistSettingsPickupPoint key={index} />
            ))}
          </form>

          <ButtonUI
            variant={"primary"}
            type='button'
            className={styles.artistSettingsDeliveryOptionsButton}
            onClick={() => addNewPickupPoint()}
          >
            + Добавить еще адрес
          </ButtonUI>
        </div>
      </div>
    </section>
  );
};
