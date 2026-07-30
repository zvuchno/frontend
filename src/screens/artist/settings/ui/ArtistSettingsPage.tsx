"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { CdekDelivery } from "@/features/CdekDelivery";
import { WidgetCdek } from "@/features/CdekDelivery/components/WidgetCdek";

import { DeliverySelectionProvider } from "@/entities/order";

import { ModalUI } from "@/shared/ui";

import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { ArtistSettingsPersonal } from "../components/ArtistSettingsPersonal/ArtistSettingsPersonal";
import { ArtistSettingsReturn } from "../components/ArtistSettingsReturn/ArtistSettingsReturn";
import styles from "./ArtistSettingsPage.module.scss";

export const ArtistSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const methods = useForm();

  return (
    <DeliverySelectionProvider>
      <FormProvider {...methods}>
        <div className={styles.artistSettings}>
          <ArtistSettingsPersonal />
          <ArtistSettingsDelivery onChooseButtonClick={() => setIsModalOpen(true)} />
          <ArtistSettingsReturn />
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
