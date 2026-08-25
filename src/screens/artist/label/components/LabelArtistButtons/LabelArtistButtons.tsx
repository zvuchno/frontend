import Image from "next/image";

import { ButtonUI } from "@/shared/ui";

import styles from "./LabelArtistButtons.module.scss";

export const LabelArtistButtons = ({
  onChange,
  onDelete,
}: {
  onChange: () => void;
  onDelete: () => void;
}) => (
  <div className={styles.labelArtistButtons}>
    <ButtonUI
      variant='primary'
      className={styles.labelArtistButton}
      onClick={onChange}
      title='Редактировать'
      ariaLabel='Редактировать профиль артиста'
    >
      <Image width={20} height={20} src={"/icons/pencil.svg"} alt={"Редактировать"} />
    </ButtonUI>
    <ButtonUI
      variant='secondary'
      className={styles.labelArtistButton}
      onClick={onDelete}
      disabled
      title='Удалить'
      ariaLabel='Удалить профиль артиста'
      aria-disabled={true}
    >
      <Image width={20} height={20} src={"/icons/cart-label-option.svg"} alt={"Удалить"} />
    </ButtonUI>
  </div>
);
