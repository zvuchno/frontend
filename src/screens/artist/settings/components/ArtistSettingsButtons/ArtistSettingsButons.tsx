import { ButtonUI } from "@/shared/ui";

import styles from "./ArtistSettingsButons.module.scss";

export const ArtistSettingsButtons = ({
  disabled,
  isValid,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  isValid: boolean;
  onChange: (onEdit: boolean) => void;
  onSubmit: () => void;
}) => (
  <div className={styles.artistSettingsButtons}>
    <ButtonUI
      size='standart'
      variant='primary'
      disabled={disabled || !isValid}
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
