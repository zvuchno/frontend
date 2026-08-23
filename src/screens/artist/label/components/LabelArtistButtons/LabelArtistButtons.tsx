import Image from "next/image";

import { ButtonUI } from "@/shared/ui";

import styles from "./LabelArtistButtons.module.scss";

export const LabelArtistButtons = () => (
  <div className={styles.labelArtistButtons}>
    <ButtonUI variant='primary' className={styles.labelArtistButton}>
      <Image width={20} height={20} src={"/icons/pencil.svg"} alt={"Редактировать"} />
    </ButtonUI>
    <ButtonUI variant='secondary' className={styles.labelArtistButton}>
      <Image width={20} height={20} src={"/icons/cart-label-option.svg"} alt={"Удалить"} />
    </ButtonUI>
  </div>
);
