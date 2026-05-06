import { ButtonUI } from "@/shared/ui/button";
import styles from "../artistFormPersonal.module.scss";
import { useArtistPersonalDataStore } from "@/entities/Artist/store/useArtistPersonalDataStore";

export const LegalFormSelector = () => {
  const updateArtistData = useArtistPersonalDataStore(
    (state) => state.setArtistPersonalData,
  );

  return (
    <div className={styles.formButtons}>
      <ButtonUI
        className={styles.formSelector}
        variant="primary"
        children={"Юридическое лицо"}
        onClick={() => updateArtistData({ artistType: "legalEntity" })}
      />
      <ButtonUI
        className={styles.formSelector}
        variant="primary"
        children={"Физическое лицо"}
        onClick={() => updateArtistData({ artistType: "individual" })}
      />
    </div>
  );
};
