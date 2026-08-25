import { Contacts } from "@/shared/Contacts";
import { ModalUI } from "@/shared/ui";

export const ContactsModule = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <ModalUI isOpen={isOpen} closeButtonStyle={"x"} onClose={onClose}>
      <Contacts />
    </ModalUI>
  );
};
