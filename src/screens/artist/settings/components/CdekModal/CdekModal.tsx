import { useFormContext } from "react-hook-form";

import { CdekDelivery } from "@/features/CdekDelivery";

import { type TArtistSettingsFieldValues, type TPVZOfficeMe } from "@/entities/Artist";

import { ModalUI } from "@/shared/ui";

import styles from "./CdekModal.module.scss";

export const CdekModal = ({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) => {
  const { setValue } = useFormContext<TArtistSettingsFieldValues>();

  if (!isModalOpen) return;

  const handleOfficeSelect = (office: TPVZOfficeMe) => {
    if (office) {
      setValue("pvz_address", office.address, { shouldDirty: true });
      setValue("pvz_city", office.city, { shouldDirty: true });
      setValue("pvz_city_code", office.city_code, { shouldDirty: true });
      setValue("pvz_code", office.pvz_code, { shouldDirty: true });
    }
  };
  return (
    <ModalUI closeButtonStyle={"x"} isOpen={isModalOpen} onClose={() => onClose()}>
      <CdekDelivery
        isSender={true}
        className={styles.artistSettingsWidget}
        onModalClose={() => onClose()}
        onSelectOfficeDraft={handleOfficeSelect}
      />
    </ModalUI>
  );
};
