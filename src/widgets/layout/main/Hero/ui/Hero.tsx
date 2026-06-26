import clsx from "clsx";

import { Title } from "@/shared/ui";

import type { HeroUIProps } from "../model/Hero.types";
import styles from "./Hero.module.scss";

export const HeroUI = ({
  mainTitle = "ЗВУЧНО",
  leftText = {
    firstPart: "маркетплейс цифровой музыки",
    secondPart: "от СНГ артистов",
  },
  rightText = {
    firstPart: "место, где нет барьеров между",
    secondPart: "артистами и слушателями",
  },
  className,
  centerText,
  children,
}: HeroUIProps) => {
  const highlightBrand = (text: string) => {
    if (!text) return "";
    return text.replace(/(ЗВУЧНО)/gi, `<span class="brand-word">$1</span>`);
  };

  return (
    <div className={clsx(styles.hero__container, className)}>
      {centerText && (
        <Title
          Tag='h4'
          variant='title'
          className={clsx(styles.hero__text, styles.hero__text_center)}
        >
          {centerText}
        </Title>
      )}
      {(leftText.firstPart || leftText.secondPart) && (
        <Title Tag='h4' variant='title' className={clsx(styles.hero__text, styles.hero__text_left)}>
          {leftText.firstPart}
          <br />
          {leftText.secondPart}
        </Title>
      )}
      {mainTitle && (
        <Title Tag='h1' variant='title' className={styles.hero__h1}>
          {mainTitle}
        </Title>
      )}
      {children}
      {(rightText.firstPart || rightText.secondPart) && (
        <Title
          Tag='h4'
          variant='title'
          className={clsx(styles.hero__text, styles.hero__text_right)}
        >
          <span
            dangerouslySetInnerHTML={
              rightText.firstPart
                ? {
                    __html: highlightBrand(rightText.firstPart),
                  }
                : undefined
            }
          />
          <br />
          {rightText.secondPart}
        </Title>
      )}
      {mainTitle === "ЗВУЧНО" && (
        <div className={styles.hero__image}>
          <img src='/images/image_main_hero.png' />
        </div>
      )}
    </div>
  );
};
