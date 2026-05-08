import { ButtonUI } from "@/shared/ui/button";
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
        children={"Юридическое лицо"}
        onClick={() => handleSelect("legal_entity")}
      />
      <ButtonUI
        className={styles.formSelector}
        variant="primary"
        children={"Физическое лицо"}
        onClick={() => handleSelect("individual_temporary")}
      />
    </div>
  );
};
