import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { RecomendationsList } from "@/widgets/RecomendationsList";

import { ButtonUI } from "@/shared/ui";

import styles from "./OrderSucceed.module.scss";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

export const OrderSucceed = () => (
  <div className={styles.success}>
    <AccentContainerWithPlayer className={styles.successMain}>
      <h1 className={styles.successTitle}>Заказ оплачен!</h1>
      <div className={styles.successImages}>
        <Image
          src={"/images/vinyl_player.png"}
          alt={"Баннер фото проигрователя"}
          width={470}
          height={456}
          className={clsx(styles.successImage, styles.successBanner)}
        />
        <Image
          src={"/images/banner-plastic-cover.png"}
          alt={"Прозрачная пленка на баннере пустой корзины"}
          width={1355}
          height={481}
          className={clsx(styles.successImage, styles.successBannerCover)}
        />
      </div>

      <ButtonUI variant={"accentDark"} size={"standart"} className={styles.successButton}>
        <Link href={"/"} prefetch={false} style={{ width: "100%" }}>
          Назад к покупкам
        </Link>
      </ButtonUI>
    </AccentContainerWithPlayer>
    <RecomendationsList />
  </div>
);
