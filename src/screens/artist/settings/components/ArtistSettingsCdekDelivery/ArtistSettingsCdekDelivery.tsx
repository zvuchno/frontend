import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import clsx from "clsx";

import { type TArtistSettingsFieldValues, type TPVZOfficeMe } from "@/entities/Artist";
import { useSelectDeliveryTariff } from "@/entities/order";

import { HintBlock } from "@/shared/ui/HintBlock";

import styles from "./ArtistSettingsCdekDelivery.module.scss";
import { CdekSelectButton } from "./CdekSelectButton";

export const ArtistSettingsCdekDelivery = ({
  disabled,

  onSelect,
}: {
  disabled: boolean;
  isAvaliable: boolean;
  office?: TPVZOfficeMe;
  onSelect: () => void;
}) => {
  const { register, control, setValue } = useFormContext<TArtistSettingsFieldValues>();

  const [shippingEnabled, officeCode, officeAddress, officeCity, officeCityCode] = useWatch({
    control,
    name: [
      "shipping_enabled",
      "shippingPoint.pvz_code",
      "shippingPoint.address",
      "shippingPoint.city",
      "shippingPoint.city_code",
    ],
  });

  const { deliverySelected, setDeliverySelected } = useSelectDeliveryTariff();

  const formSelectedOffice = {
    code: officeCode,
    address: officeAddress,
    city: officeCity,
    cdek_city_code: officeCityCode,
  };

  const displayedOffice = deliverySelected?.code ? deliverySelected : formSelectedOffice;

  const onHandleDelete = () => {
    try {
      setValue("shippingPoint.pvz_code", "", { shouldDirty: true });
      setValue("shippingPoint.city_code", "", { shouldDirty: true });
      setValue("shippingPoint.city", "", { shouldDirty: true });
      setValue("shippingPoint.address", "", { shouldDirty: true });
      setValue("shipping_enabled", false, { shouldDirty: true });
      setDeliverySelected(null);
    } catch {
      toast.error("Не удалось удалить информацию о ПВЗ. Повторите попытку");
    }
  };

  useEffect(() => {
    setValue("shippingPoint.address", displayedOffice.address);
    setValue("shippingPoint.city", displayedOffice.city);
    setValue("shippingPoint.city_code", displayedOffice.cdek_city_code);
    setValue("shippingPoint.pvz_code", displayedOffice.code);
  }, [
    displayedOffice.address,
    displayedOffice.cdek_city_code,
    displayedOffice.city,
    displayedOffice.code,
    setValue,
  ]);

  return (
    <div key='cdek' className={styles.artistSettingsDeliveryOptionsContainer}>
      <input type='hidden' {...register("shippingPoint.address")} />
      <input type='hidden' {...register("shippingPoint.city")} />
      <input type='hidden' {...register("shippingPoint.city_code")} />
      <input type='hidden' {...register("shippingPoint.pvz_code")} />
      <div className={styles.artistSettingsDeliveryOption}>
        <label
          className={styles.checkboxContainer}
          aria-label={shippingEnabled ? "Выключить" : "Включить"}
          title={shippingEnabled ? "Выключить" : officeCode ? "Включить" : "Выберите пункт выдачи"}
        >
          <input
            {...register("shipping_enabled")}
            disabled={disabled || !officeCode}
            type='checkbox'
            className={styles.visuallyHidden}
            checked={shippingEnabled}
            onChange={() => setValue("shipping_enabled", !shippingEnabled, { shouldDirty: true })}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <span
          className={clsx(
            styles.artistSettingsDeliveryOptionTitle,
            !shippingEnabled && styles.notAvailable
          )}
        >
          СДЭК
        </span>
        <HintBlock text='при выключенной опции выбранные варианты доставки не доступны покупателям' />
        <HintBlock text='добавьте пункт выдачи, чтобы включить опцию "СДЭК"' />
      </div>

      <CdekSelectButton
        disabled={disabled}
        onChange={onSelect}
        onDelete={() => onHandleDelete()}
        deliverySelected={displayedOffice}
      />
    </div>
  );
};
