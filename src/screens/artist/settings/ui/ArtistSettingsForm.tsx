import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import {
  type TArtistSettingsFieldValues,
  type TPickupSettings,
  type TShippingSettings,
  useConnetcTelegramBot,
} from "@/entities/Artist";
import { DeliverySelectionProvider } from "@/entities/order";

import { ArtistSettingsButtons } from "../components/ArtistSettingsButtons/ArtistSettingsButons";
import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { CdekModal } from "../components/CdekModal/CdekModal";
import { useArtistSettingsSubmit } from "../model/useArtistSettingsSubmit";
import styles from "./ArtistSettingsForm.module.scss";

interface ArtistSettingsFormProps {
  initialCdek?: TShippingSettings;
  initialPickup?: TPickupSettings;
}

export const ArtistSettingsForm = ({ initialCdek, initialPickup }: ArtistSettingsFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { mutate: connectTelegramBot } = useConnetcTelegramBot();

  const methods = useForm<TArtistSettingsFieldValues>({
    defaultValues: {
      pickup_enabled: initialPickup?.enabled,
      pickupPoints: (initialPickup?.points ?? [])
        .filter((point) => point.is_active !== false)
        .map(({ id, ...point }) => ({ ...point, server_id: id })),
      shipping_enabled: initialCdek?.enabled,
      shippingPoint: initialCdek?.point,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: "pickupPoints",
  });

  const onSubmit = useArtistSettingsSubmit({ initialPickup, replacePickupPoints: replace });

  const handleButtonClick = () => {
    void methods.handleSubmit(onSubmit)();
  };

  return (
    <DeliverySelectionProvider>
      <FormProvider {...methods}>
        <div className={styles.artistSettings}>
          <ArtistSettingsDelivery
            disabled={!isOnEdit}
            onChooseButtonClick={() => setIsModalOpen(true)}
            fields={fields}
            onAddPoint={append}
            onDeletePoint={remove}
            cdekSettings={initialCdek}
            pickupStatus={initialPickup?.enabled}
          />
          <ArtistSettingsButtons
            disabled={!isOnEdit}
            onChange={setIsOnEdit}
            onSubmit={handleButtonClick}
          />
          <div className={styles.hint}>
            Для удобства обработки и отслеживания заказов{" "}
            <button className={styles.hintButton} onClick={() => connectTelegramBot()}>
              присоединитесь
            </button>{" "}
            к нашему телеграм-боту
          </div>
        </div>
        <CdekModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </FormProvider>
      <DevTool control={methods.control} />
    </DeliverySelectionProvider>
  );
};
