"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";

import { CdekDelivery } from "@/features/CdekDelivery";

import { DeliverySelectionProvider } from "@/entities/order";

import { ModalUI } from "@/shared/ui";

import { ArtistSettingsButtons } from "../components/ArtistSettingsButtons/ArtistSettingsButons";
import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { ArtistSettingsReturn } from "../components/ArtistSettingsReturn/ArtistSettingsReturn";
import styles from "./ArtistSettingsPage.module.scss";

export const ArtistSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm();

  return (
    <DeliverySelectionProvider>
      <FormProvider {...methods}>
        <div className={styles.artistSettings}>
          <ArtistSettingsDelivery onChooseButtonClick={() => setIsModalOpen(true)} />
          <ArtistSettingsReturn />
          <ArtistSettingsButtons />
          <div className={styles.hint}>
            Для удобства обработки и отслеживания заказов{" "}
            <Link href={"#"} className={styles.hintLink}>
              присоединитесь
            </Link>{" "}
            к нашему телеграм-боту
          </div>
        </div>
        {isModalOpen && (
          <ModalUI
            closeButtonStyle={"x"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <CdekDelivery
              isSender={true}
              className={styles.artistSettingsWidget}
              onModalClose={() => setIsModalOpen(false)}
            />
          </ModalUI>
        )}
      </FormProvider>
    </DeliverySelectionProvider>
  );
};
