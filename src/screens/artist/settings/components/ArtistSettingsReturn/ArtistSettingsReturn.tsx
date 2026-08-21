import { useFormContext } from "react-hook-form";

import { type TArtistSettingsFieldValues } from "@/entities/Artist";

import { CustomInput } from "@/shared/ui";

import styles from "./ArtistSettingsReturn.module.scss";

export const ArtistSettingsReturn = ({ disabled }: { disabled: boolean }) => {
  const { register } = useFormContext<TArtistSettingsFieldValues>();

  return (
    <section className={styles.artistSettingsReturn}>
      <h3 className={styles.artistSettingsTitle}>Настройки возвратов</h3>
      <form className={styles.artistSettingsReturnData} aria-disabled={disabled}>
        <CustomInput
          id='support_email'
          label='Контакты поддержки'
          disabled={disabled}
          {...register("support_email")}
          placeholder='support@email.ru'
        />
        <CustomInput
          id='returns_email'
          label='Адрес для возвратов'
          disabled={disabled}
          {...register("returns_email")}
          placeholder='support@email.ru'
        />
      </form>
    </section>
  );
};
