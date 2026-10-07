import clsx from "clsx";
import Image from "next/image";

import { AccentContainer } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsTeamSection = () => (
  <section className={clsx(styles.sectionArea, styles.sixsSection)}>
    <AccentContainer className={styles.content}>
      <h3>МЫ ЗА ИСКРЕННЕЕ САМОВЫРАЖЕНИЕ</h3>
      <p>
        Команда ЗВУЧНО ценит человека, его жизнь и эмоции, которые стоят за творчеством. Поэтому ни
        в бете, ни после мы не допустим на нашу платформу музыку, которая полностью или частично
        сделана с ИИ.
      </p>
      <div className={styles.sectionImage}>
        <Image
          src='/images/for-artists_record-type.png'
          alt='Фонофое изображение касеты'
          width={633.4}
          height={633.4}
        />
      </div>
    </AccentContainer>
  </section>
);
