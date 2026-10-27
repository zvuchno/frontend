import { ButtonUI, ModalUI } from "@/shared/ui";

import styles from "./ModalConfirmChanges.module.scss";

export const ModalConfirmChanges = ({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}) => {
  return (
    <ModalUI closeButtonStyle={"x"} isOpen={isOpen} onClose={() => onClose()}>
      <div className={styles.moduleConfirmContent}>
        <h4 className={styles.moduleConfirmTitle}>Сохранить изменения перед выходом?</h4>
        <p className={styles.moduleConfirmText}>
          Вы изменили данные в этом разделе. Если выйти без сохранения, изменения будут потеряны.
        </p>
        <div className={styles.moduleConfirmButtons}>
          <ButtonUI
            variant={"primary"}
            onClick={() => void onConfirm()}
            className={styles.moduleConfirmButton}
            data-testid='module-confirm-submit-btn'
            size='small'
          >
            Сохранить и выйти
          </ButtonUI>
          <ButtonUI
            variant={"secondary"}
            onClick={() => onCancel()}
            className={styles.moduleConfirmButton}
            data-testid='module-confirm-cancel-btn'
            size='small'
          >
            Выйти без сохранения
          </ButtonUI>
        </div>
      </div>
    </ModalUI>
  );
};
