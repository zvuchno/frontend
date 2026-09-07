import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";

import styles from "./LegalFormSelector.module.scss";

type LegalFormType = "legal_entity" | "individual_temporary";

export const LegalFormSelector = ({ onSelect }: { onSelect: (type: LegalFormType) => void }) => {

  const setTemporaryType = useArtistLegalDataStore();

  const handleSelect = (type: LegalFormType) => {
    //individual_temporary - промежуточное значение для открытия нужной формы ЮЛ/ФЛ, отсутствует в бэкенде
    setTemporaryType.setArtistLegalData({ legal_profile: { recipient_type: type } });
  };

  return (
    <div className={styles.formButtons}>
      <ButtonUI
        className={styles.formSelector}
        variant='primary'
        onClick={() => {
          handleSelect("legal_entity");
          onSelect("legal_entity");
        }}
      >
        Юридическое лицо
      </ButtonUI>
      <ButtonUI
        className={styles.formSelector}
        variant='primary'
        onClick={() => {
          handleSelect("individual_temporary");
          onSelect("individual_temporary");
        }}
      >
        Физическое лицо
      </ButtonUI>
    </div>
  );
};
