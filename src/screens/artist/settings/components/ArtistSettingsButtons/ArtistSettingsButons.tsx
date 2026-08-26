import { ButtonUI } from "@/shared/ui";

import styles from "./ArtistSettingsButons.module.scss";

export const ArtistSettingsButtons = ({
  disabled,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  onChange: (onEdit: boolean) => void;
  onSubmit: () => void;
}) => (
  <div className={styles.artistSettingsButtons}>
    <ButtonUI
      size='standart'
      variant='primary'
      disabled={disabled}
      type='submit'
      onClick={() => {
        onSubmit();
        onChange(false);
      }}
    >
      Сохранить
    </ButtonUI>
    <ButtonUI
      size='standart'
      variant='secondary'
      onClick={() => onChange(true)}
      disabled={!disabled}
      type='button'
    >
      Изменить
    </ButtonUI>
  </div>
);
