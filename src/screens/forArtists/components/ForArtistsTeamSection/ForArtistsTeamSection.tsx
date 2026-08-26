import clsx from "clsx";

import { AccentContainer } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsTeamSection = () => (
  <section className={clsx(styles.sectionArea, styles.sixsSection)}>
    <AccentContainer className={styles.content}>
      <h3>МЫ ЗА ИСКРЕННЕЕ САМОВЫРАЖЕНИЕ</h3>
      <p>
        Команда ЗВУЧНО ценит человека, его жизнь и эмоции, которые стоят за творчеством. Поэтому ни
        в бете, ни после мы не допустим на нашу платформу музыку, которая полность или частично
        сделана с ИИ.
      </p>
      <div className={styles.sectionImage}>
        <img src='/images/for-artists_record-type.png' loading='lazy' />
      </div>
    </AccentContainer>
  </section>
);
