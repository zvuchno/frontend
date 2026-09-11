import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import toast from "react-hot-toast";

import clsx from "clsx";

import {
  type TArtistSettingsFieldValues,
  type TPVZOfficeMe,
  useDeleteArtistPvzOffice,
  useManageArtistStoreSettings,
} from "@/entities/Artist";
import { useSelectDeliveryTariff } from "@/entities/order";

import { HintBlock } from "@/shared/ui/HintBlock";

import styles from "./ArtistSettingsCdekDelivery.module.scss";
import { CdekSelectButton } from "./CdekSelectButton";

export const ArtistSettingsCdekDelivery = ({
  disabled,
  isAvaliable,
  onSelect,
  office,
}: {
  disabled: boolean;
  isAvaliable: boolean;
  office?: TPVZOfficeMe;
  onSelect: () => void;
}) => {
  const { mutateAsync: handleOfficeDelete } = useDeleteArtistPvzOffice();
  const { mutateAsync: toggleCdekAvailabel } = useManageArtistStoreSettings();
  const { register, control, setValue } = useFormContext<TArtistSettingsFieldValues>();

  const [officeCode, officeAddress, officeCity, officeCityCode] = useWatch({
    control,
    name: ["pvz_code", "pvz_address", "pvz_city", "pvz_city_code"],
  });

  const { deliverySelected, setDeliverySelected } = useSelectDeliveryTariff();

  const [cdekDelivery, setCdekDelivery] = useState(!!office?.pvz_code || !!officeCode);

  const formSelectedOffice = {
    code: officeCode,
    address: officeAddress,
    city: officeCity,
    cdek_city_code: officeCityCode,
  };

  const displayedOffice = deliverySelected?.code ? deliverySelected : formSelectedOffice;

  const onHandleDelete = async () => {
    try {
      await handleOfficeDelete();
      setValue("pvz_code", "", { shouldDirty: true });
      setValue("pvz_city_code", "", { shouldDirty: true });
      setValue("pvz_city", "", { shouldDirty: true });
      setValue("pvz_address", "", { shouldDirty: true });
      setDeliverySelected(null);
      setCdekDelivery(false);
    } catch {
      toast.error("Не удалось удалить информацию о ПВЗ. Повторите попытку");
    }
  };

  return (
    <div key='cdek' className={styles.artistSettingsDeliveryOptionsContainer}>
      <input type='hidden' {...register("pvz_address")} />
      <input type='hidden' {...register("pvz_city")} />
      <input type='hidden' {...register("pvz_city_code")} />
      <input type='hidden' {...register("pvz_code")} />
      <div className={styles.artistSettingsDeliveryOption}>
        <label
          className={styles.checkboxContainer}
          aria-label={isAvaliable ? "Выключить" : "Включить"}
          title={isAvaliable ? "Выключить" : "Включить"}
        >
          <input
            {...register("shipping_enabled")}
            disabled={disabled}
            type='checkbox'
            className={styles.visuallyHidden}
            checked={isAvaliable}
            onChange={() => void toggleCdekAvailabel({ shipping_enabled: !isAvaliable })}
          />
          <span className={styles.checkboxMark}></span>
        </label>
        <span
          className={clsx(
            styles.artistSettingsDeliveryOptionTitle,
            !isAvaliable && styles.notAvailable
          )}
        >
          СДЭК
        </span>
        <HintBlock text='при выключенной опции варианты доставки не будут доступны покупателям' />
      </div>

      <CdekSelectButton
        disabled={disabled || !cdekDelivery}
        onChange={onSelect}
        onDelete={() => void onHandleDelete()}
        deliverySelected={displayedOffice}
      />
    </div>
  );
};
