import { useState } from "react";

import { useSelectDeliveryTariff } from "@/entities/order";

import { ButtonUI, CheckboxUI } from "@/shared/ui";

import { ArtistSettingsPickupPoint } from "../ArtistSettingsPickupPoint/ArtistSettingsPickupPoint";
import styles from "./ArtistSettingsDelivery.module.scss";

export type TArtistSettingsDelivery = {
  onChooseButtonClick: () => void;
};

export const ArtistSettingsDelivery = ({ onChooseButtonClick }: TArtistSettingsDelivery) => {
  const { deliverySelected } = useSelectDeliveryTariff();
  const [pickupPointsCount, setPickupPointsCount] = useState<number>(1);

  const addNewPickupPoint = () => {
    setPickupPointsCount((prev) => prev + 1);
  };

  console.log(deliverySelected);

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
          {!deliverySelected?.code || deliverySelected?.code.length === 0 ? (
            <ButtonUI
              variant={"primary"}
              type='button'
              className={styles.artistSettingsDeliveryOptionsButton}
              onClick={() => onChooseButtonClick()}
            >
              Выбрать пункт выдачи
            </ButtonUI>
          ) : (
            <div className={styles.artistSettingsDeliveryOffice}>
              <div className={styles.artistSettingsDeliveryOfficeDetails}>
                <span
                  className={styles.artistSettingsDeliveryOfficeAddress}
                >{`${deliverySelected.city}, ${deliverySelected.address}`}</span>
                <span
                  className={styles.artistSettingsDeliveryOfficeCode}
                >{`ПВЗ - ${deliverySelected.code}`}</span>
              </div>

              <span
                onClick={() => onChooseButtonClick()}
                className={styles.artistSettingsDeliveryOfficeChange}
              >
                Изменить пункт
              </span>
            </div>
          )}
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
