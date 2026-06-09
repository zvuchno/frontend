import { ButtonUI } from "@/shared/ui";
import styles from "../artistFormPersonal.module.scss";
import { useFormContext } from "react-hook-form";

export const LegalFormSelector = () => {
  const { setValue } = useFormContext();

  const handleSelect = (type: "legal_entity" | "individual_temporary") => {
    //individual_temporary - промежуточное значение для открытия нужной формы ЮЛ/ФЛ, отсуттвует в бэкенде
    setValue("legal_profile.recipient_type", type, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={styles.formButtons}>
      <ButtonUI
        className={styles.formSelector}
        variant="primary"
        onClick={() => handleSelect("legal_entity")}
      >
        Юридическое лицо
      </ButtonUI>
      <ButtonUI
        className={styles.formSelector}
        variant="primary"
        onClick={() => handleSelect("individual_temporary")}
      >
        Физическое лицо
      </ButtonUI>
    </div>
  );
};
