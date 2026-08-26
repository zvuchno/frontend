import clsx from "clsx";

import { AccentContainer, Title } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsOptionsSection = () => (
  <section className={clsx(styles.sectionArea, styles.secondSection)}>
    <Title Tag='h2' className={clsx(styles.mainSectionTitle, styles.textRight)}>
      На «Звучно» можно
    </Title>
    <AccentContainer className={styles.content}>
      <ul className={styles.contentList}>
        <li className={styles.listItem}>
          <h3 className={styles.listItemTitle}>продавать музыку</h3>
          <p>
            как на Bandcamp, но без проблем с оплатами: легально, безопасно и без танцев с бубном
          </p>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.listItemTitle}>продавать мерч онлайн</h3>
          <p>
            без рутины, отнимающей время - тебе
            <br />
            останется только отнести заказы в СДЭК
          </p>
        </li>
        <li className={styles.listItem}>
          <h3 className={styles.listItemTitle}>
            ВЫдавать заказы
            <br />
            на концертах
          </h3>
          <p>
            преврати стойку мерча в ПВЗ - фанаты купят онлайн, а мерчер выдаст по коду в тг-боте
          </p>
        </li>
      </ul>
    </AccentContainer>
    <div className={styles.sectionImage}>
      <img src='/images/for-artists_main-bg-2.png' loading='lazy' />
    </div>
  </section>
);
