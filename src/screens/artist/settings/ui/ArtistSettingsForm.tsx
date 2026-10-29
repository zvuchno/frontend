import { useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";

import { DevTool } from "@hookform/devtools";

import {
  type TArtistSettingsFieldValues,
  type TPickupSettings,
  type TShippingSettings,
  useConnetcTelegramBot,
} from "@/entities/Artist";
import { DeliverySelectionProvider } from "@/entities/order";

import { Loader } from "@/shared/ui";

import { ArtistSettingsButtons } from "../components/ArtistSettingsButtons/ArtistSettingsButons";
import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { CdekModal } from "../components/CdekModal/CdekModal";
import { useArtistSettingsSubmit } from "../model/useArtistSettingsSubmit";
import styles from "./ArtistSettingsForm.module.scss";

interface ArtistSettingsFormProps {
  initialCdek: TShippingSettings;
  initialPickup: TPickupSettings;
}

const getFormValues = (
  initialCdek: TShippingSettings,
  initialPickup: TPickupSettings
): TArtistSettingsFieldValues => ({
  pickup_enabled: initialPickup.enabled,
  pickupPoints: (initialPickup.points ?? [])
    .filter((point) => point.is_active !== false)
    .map(({ id, ...point }) => ({ ...point, server_id: id })),
  shipping_enabled: initialCdek.enabled,
  shippingPoint: initialCdek.point,
});

export const ArtistSettingsForm = ({ initialCdek, initialPickup }: ArtistSettingsFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const { mutate: connectTelegramBot } = useConnetcTelegramBot();
  const formValues = useMemo(
    () => getFormValues(initialCdek, initialPickup),
    [initialCdek, initialPickup]
  );

  const methods = useForm<TArtistSettingsFieldValues>({
    values: formValues,
  });

  const [pickupEnabled, pickupPoints] = useWatch({
    control: methods.control,
    name: ["pickup_enabled", "pickupPoints"],
  });
  const hasIncompletePickupPoint = Boolean(
    pickupEnabled &&
    (!pickupPoints?.length ||
      pickupPoints.some((point) => !point.address?.trim() || !point.pickup_date))
  );

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "pickupPoints",
  });

  const onSubmit = useArtistSettingsSubmit({
    initialPickup,
    onSuccess: () => {
      setIsOnEdit(false);
      setServerErrorMessage("");
    },
    onError: (error) => {
      const message = error?.message ?? "Произошла ошибка";
      setServerErrorMessage(message);
    },
  });

  const handleButtonClick = () => {
    void methods.handleSubmit(onSubmit)();
  };

  if (!initialCdek || !initialPickup) return <Loader />;

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
            pickupStatus={initialPickup.enabled}
          />

          {serverErrorMessage.length > 0 && (
            <p className={styles.formError} data-testid='delivery-server-error'>
              {serverErrorMessage}
            </p>
          )}

          <ArtistSettingsButtons
            disabled={!isOnEdit}
            saveDisabled={hasIncompletePickupPoint}
            onChange={setIsOnEdit}
            onSubmit={handleButtonClick}
          />
          <div className={styles.hint}>
            Для удобства обработки и отслеживания заказов{" "}
            <button
              className={styles.hintButton}
              onClick={() => connectTelegramBot()}
              data-testid='delivery-connect-telegram-link'
            >
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
