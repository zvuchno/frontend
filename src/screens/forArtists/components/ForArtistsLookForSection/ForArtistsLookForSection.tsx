import clsx from "clsx";

import { AccentContainer, DescriptionArea, Title } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsLookForSection = () => (
  <section className={clsx(styles.sectionArea, styles.forthSection)}>
    <Title Tag='h2' className={clsx(styles.mainSectionTitle, styles.textCenter)}>
      КОГо мы ищем?
    </Title>
    <AccentContainer>
      <DescriptionArea headerwithIcons={true} colorOption={"blue"}>
        <div className={styles.content}>
          <p>Сейчас мы отбираем проекты по заявкам - ищем активных артистов с живой аудиторией</p>
          <p>
            Потом у нас появится больше ресурсов для помощи начинающим музыкантам, мы выйдем из
            беты, и пользователем ЗВУЧНО сможет стать кто угодно
          </p>
        </div>
      </DescriptionArea>
    </AccentContainer>
  </section>
);
