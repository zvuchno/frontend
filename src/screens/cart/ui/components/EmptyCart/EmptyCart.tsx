import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ButtonUI } from "@/shared/ui";

import styles from "../../CartPage.module.scss";
import { AccentContainerWithPlayer } from "@/widgets/AccentContainerWithPlayer";

export const EmptyCart = () => (
  <AccentContainerWithPlayer
    className={clsx(styles.cartMain, styles.emptyCart)}
    style={{
      width: "100%",
      padding: "60px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "70px",
    }}
  >
    <h1 className={clsx(styles.cartTitle, styles.emptyCartTitle)}>Ваша корзина пуста</h1>
    <div className={styles.emptyCartImages}>
      <Image
        src={"/images/empty-cart-banner.png"}
        alt={"Баннер пустой корзины"}
        width={374}
        height={332}
        className={clsx(styles.emptyCartImage, styles.emptyCartBanner)}
      />
      <Image
        src={"/images/banner-plastic-cover.png"}
        alt={"Прозрачная пленка на баннере пустой корзины"}
        width={917}
        height={326}
        className={clsx(styles.emptyCartImage, styles.emptyCartBannerCover)}
      />
    </div>

    <ButtonUI variant={"accentDark"} size={"standart"} className={styles.buttonEmpty}>
      <Link href={"/"} prefetch={false} style={{ width: "100%" }}>
        Назад к покупкам
      </Link>
    </ButtonUI>
  </AccentContainerWithPlayer>
);
