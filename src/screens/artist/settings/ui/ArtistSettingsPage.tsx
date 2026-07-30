"use client";

import { useState } from "react";

import { WidgetCdek } from "@/features/CdekDelivery/components/WidgetCdek";

import { ModalUI } from "@/shared/ui";

import { ArtistSettingsDelivery } from "../components/ArtistSettingsDelivery/ArtistSettingsDelivery";
import { ArtistSettingsPersonal } from "../components/ArtistSettingsPersonal/ArtistSettingsPersonal";
import { ArtistSettingsReturn } from "../components/ArtistSettingsReturn/ArtistSettingsReturn";
import styles from "./ArtistSettingsPage.module.scss";

export const ArtistSettingsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.artistSettings}>
        <ArtistSettingsPersonal />
        <ArtistSettingsDelivery onChooseButtonClick={() => setIsModalOpen} />
        <ArtistSettingsReturn />
      </div>
      {isModalOpen && (
        <ModalUI closeButtonStyle={"x"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WidgetCdek cityCode={0} cityName={""} />
        </ModalUI>
      )}
    </>
  );
};
