import { useArtistLegalDataStore } from "@/entities/Artist/store/useArtistLegalDataStore";

import { ButtonUI } from "@/shared/ui";

import styles from "./LegalFormSelector.module.scss";

export const LegalFormSelector = ({ onSelect }: { onSelect: () => void }) => {
  //const { setValue } = useFormContext();
  const setTemporaryType = useArtistLegalDataStore();

  const handleSelect = (type: "legal_entity" | "individual_temporary") => {
    //individual_temporary - промежуточное значение для открытия нужной формы ЮЛ/ФЛ, отсуттвует в бэкенде
    setTemporaryType.setArtistLegalData({ legal_profile: { recipient_type: type } });
  };

  return (
    <div className={styles.formButtons}>
      <ButtonUI
        className={styles.formSelector}
        variant='primary'
        onClick={() => {
          handleSelect("legal_entity");
          onSelect();
        }}
      >
        Юридическое лицо
      </ButtonUI>
      <ButtonUI
        className={styles.formSelector}
        variant='primary'
        onClick={() => {
          handleSelect("individual_temporary");
          onSelect();
        }}
      >
        Физическое лицо
      </ButtonUI>
    </div>
  );
};
