import { ButtonUI } from "@/shared/ui";

import styles from "./ArtistSettingsButons.module.scss";

export const ArtistSettingsButtons = ({
  disabled,
  saveDisabled,
  onChange,
  onSubmit,
}: {
  disabled: boolean;
  saveDisabled: boolean;
  onChange: (onEdit: boolean) => void;
  onSubmit: () => void;
}) => (
  <div className={styles.artistSettingsButtons}>
    <ButtonUI
      size='standart'
      variant='primary'
      disabled={disabled || saveDisabled}
      type='submit'
      onClick={() => {
        onSubmit();
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
