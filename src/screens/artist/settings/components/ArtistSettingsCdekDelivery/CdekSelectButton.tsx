import clsx from "clsx";

import { type TDeliveryTariffSelection } from "@/features/CdekDelivery";

import { ButtonUI } from "@/shared/ui";

import styles from "./ArtistSettingsCdekDelivery.module.scss";

export const CdekSelectButton = ({
  deliverySelected,
  disabled,
  onChange,
  onDelete,
}: {
  deliverySelected: Partial<TDeliveryTariffSelection>;
  disabled: boolean;
  onChange: () => void;
  onDelete: () => void;
}) => (
  <>
    {!deliverySelected?.code || deliverySelected?.code.length === 0 ? (
      <ButtonUI
        variant={"primary"}
        type='button'
        className={styles.artistSettingsDeliveryOptionsButton}
        onClick={() => onChange()}
        disabled={disabled}
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
        <div className={styles.artistSettingsDeliveryOfficeOptions}>
          <span
            onClick={!disabled ? () => onChange() : undefined}
            className={clsx(styles.artistSettingsDeliveryOfficeChange, {
              [styles.disabled]: disabled,
            })}
          >
            Изменить пункт
          </span>
          <span
            onClick={!disabled ? () => onDelete() : undefined}
            className={clsx(styles.artistSettingsDeliveryOfficeChange, styles.cdekDelete, {
              [styles.disabled]: disabled,
            })}
          >
            Удалить
          </span>
        </div>
      </div>
    )}
  </>
);
