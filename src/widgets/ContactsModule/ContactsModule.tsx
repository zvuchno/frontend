import { Contacts } from "@/shared/Contacts";
import { ModalUI } from "@/shared/ui";

import styles from "./ContactsModule.module.scss";

export const ContactsModule = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <ModalUI isOpen={isOpen} closeButtonStyle={"x"} onClose={onClose} className={styles.darkShadow}>
      <Contacts />
    </ModalUI>
  );
};
