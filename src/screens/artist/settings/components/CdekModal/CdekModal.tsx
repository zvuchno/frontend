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
      setValue("shippingPoint", office, { shouldDirty: true });
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
