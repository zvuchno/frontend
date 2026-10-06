import clsx from "clsx";
import Image from "next/image";

import { DescriptionArea, Title } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsCareSection = () => (
  <section className={clsx(styles.sectionArea, styles.firstSection)}>
    <Title Tag='h2' className={styles.mainSectionTitle}>
      С заботой о музыкантах
      <br />и их фанатах
    </Title>
    <div className={styles.width825}>
      <DescriptionArea headerwithIcons={false} colorOption={"blue"} border>
        <div className={styles.content}>
          <p>
            Артист в текущих реалиях практически бесплатно обслуживает стриминги и соцсети. Вместо
            творчества он вынужден клепать контент и драться с равнодушными алгоритмами. А фанаты,
            которые хотят поддержать любимого музыканта, приносят прибыль только корпорациям и
            агрегаторам.
          </p>
          <p>
            ЗВУЧНО - первый на российском рынке сервис прямой поддержки артистов.
            <br />
            Это не очередной стриминг - мы хотим, чтобы музыка приносила тебе деньги.
          </p>
        </div>
      </DescriptionArea>
      <div className={styles.sectionImage}>
        <Image
          src={"/images/for-artists_main-bg-1.png"}
          alt={"Фоновое изображение наушников"}
          width={591.73}
          height={656.79}
          priority
        />
      </div>
    </div>
  </section>
);
