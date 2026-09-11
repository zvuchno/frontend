import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import {
  type TArtistSettingsFieldValues,
  type TPVZOfficeMe,
  type TPickupPointMe,
  type TStoreSettings,
  useConnetcTelegramBot,
} from "@/entities/Artist";
import { DeliverySelectionProvider } from "@/entities/order";

import { ArtistSettingsButtons } from "../components/ArtistSettingsButtons/ArtistSettingsButons";
import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { CdekModal } from "../components/CdekModal/CdekModal";
import { useArtistSettingsSubmit } from "../model/useArtistSettingsSubmit";
import styles from "./ArtistSettingsForm.module.scss";

interface ArtistSettingsFormProps {
  initialCdek?: TPVZOfficeMe;
  initialPickup?: TPickupPointMe[];
  initialEmail?: string | null;
  initialSettings?: TStoreSettings;
}

const getCdekDefaultValues = (cdek?: TPVZOfficeMe) => ({
  pvz_address: cdek?.address ?? "",
  pvz_city: cdek?.city ?? "",
  pvz_city_code: cdek?.city_code ?? "",
  pvz_code: cdek?.pvz_code ?? "",
});

const getPickupPointsDefaultValues = (pickupPoints?: TPickupPointMe[]) =>
  (pickupPoints ?? []).map(({ id, ...point }) => ({ ...point, server_id: id }));

export const ArtistSettingsForm = ({
  initialCdek,
  initialPickup,
  initialSettings,
}: ArtistSettingsFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { mutate: connectTelegramBot } = useConnetcTelegramBot();

  const methods = useForm<TArtistSettingsFieldValues>({
    defaultValues: {
      ...getCdekDefaultValues(initialCdek),
      pickupPoints: getPickupPointsDefaultValues(initialPickup),
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: "pickupPoints",
  });

  const onSubmit = useArtistSettingsSubmit({
    initialCdek,
    initialPickup,
    replacePickupPoints: replace,
    setValue: methods.setValue,
  });

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
            cdekOffice={initialCdek}
            initialSettings={{
              shipping_enabled: initialSettings?.shipping_enabled || false,
              pickup_enabled: initialSettings?.pickup_enabled || false,
            }}
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
