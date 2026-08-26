import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import {
  type TArtistSettingsFieldValues,
  type TPVZOfficeMe,
  type TPickupPointMe,
  type TSupportSettings,
  useConnetcTelegramBot,
} from "@/entities/Artist";
import { DeliverySelectionProvider } from "@/entities/order";

import { ArtistSettingsButtons } from "../components/ArtistSettingsButtons/ArtistSettingsButons";
import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { ArtistSettingsReturn } from "../components/ArtistSettingsReturn/ArtistSettingsReturn";
import { CdekModal } from "../components/CdekModal/CdekModal";
import { useArtistSettingsSubmit } from "../model/useArtistSettingsSubmit";
import styles from "./ArtistSettingsForm.module.scss";

interface ArtistSettingsFormProps {
  initialCdek?: TPVZOfficeMe;
  initialPickup?: TPickupPointMe[];
  initialContacts?: TSupportSettings;
  initialEmail?: string | null;
}

const getCdekDefaultValues = (cdek?: TPVZOfficeMe) => ({
  pvz_address: cdek?.address ?? "",
  pvz_city: cdek?.city ?? "",
  pvz_city_code: cdek?.city_code ?? "",
  pvz_code: cdek?.pvz_code ?? "",
});

const getContactsDefaultValues = (contacts?: TSupportSettings, email?: string | null) => ({
  returns_email: contacts?.returns_email ?? "",
  support_email: contacts?.support_email ?? email ?? "",
});

const getPickupPointsDefaultValues = (pickupPoints?: TPickupPointMe[]) =>
  (pickupPoints ?? []).map(({ id, ...point }) => ({ ...point, server_id: id }));

export const ArtistSettingsForm = ({
  initialCdek,
  initialPickup,
  initialContacts,
  initialEmail,
}: ArtistSettingsFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { mutate: connectTelegramBot } = useConnetcTelegramBot();

  const methods = useForm<TArtistSettingsFieldValues>({
    defaultValues: {
      ...getCdekDefaultValues(initialCdek),
      ...getContactsDefaultValues(initialContacts, initialEmail),
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
    initialContacts,
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
          />
          <ArtistSettingsReturn disabled={!isOnEdit} />
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
