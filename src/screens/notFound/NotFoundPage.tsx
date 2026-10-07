import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { RecomendationsList } from "@/widgets/RecomendationsList";
import { HeroUI } from "@/widgets/layout/main/Hero";

import { ButtonUI } from "@/shared/ui";

import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  return (
    <div className={clsx(styles.page, styles.not_found)}>
      <HeroUI
        centerText='Упс! Кажется что-то пошло не так'
        mainTitle=''
        leftText={{}}
        rightText={{}}
        className={styles.not_found__banner}
      >
        <div className={styles.not_found__container}>
          <div className={styles.not_found__content}>
            <span className={clsx(styles.hero__h1, styles.not_found__contentText)}>4</span>
            <span
              className={clsx(styles.hero__h1, styles.not_found__contentText, styles.secondSymbol)}
            >
              4
            </span>
            <div className={styles.image_container}>
              <Image
                src='/images/404-image.png'
                alt='На главную'
                priority
                width={394}
                height={382}
              />
            </div>
          </div>
          <ButtonUI variant={"accentDark"} className={styles.not_found__button}>
            <Link href={"/catalog/all"} className={styles.button_text} prefetch={false}>
              На главную
            </Link>
          </ButtonUI>
        </div>
      </HeroUI>
      <RecomendationsList />
    </div>
  );
}
