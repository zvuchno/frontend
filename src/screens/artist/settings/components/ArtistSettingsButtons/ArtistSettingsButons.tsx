import { ButtonUI } from "@/shared/ui";

import styles from "./ArtistSettingsButons.module.scss";

export const ArtistSettingsButtons = () => (
  <div className={styles.artistSettingsButtons}>
    <ButtonUI
      size='standart'
      variant='primary'
      //disabled={!isChecked || (errors && Object.keys(errors).length > 0)}
      type='submit'
    >
      Сохранить
    </ButtonUI>
    <ButtonUI
      size='standart'
      variant='secondary'
      //onClick={onEdit}
      //disabled={isOnChange}
      type='button'
    >
      Изменить
    </ButtonUI>
  </div>
);
