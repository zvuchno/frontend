import Link from "next/link";

import { HeroUI } from "@/widgets/layout/main/Hero";

import { ButtonUI } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsHero = () => (
  <HeroUI
    mainTitle=''
    leftText={{
      firstPart: "Зарабатывай на музыке,",
      secondPart: "оставаясь артистом",
    }}
    rightText={{
      firstPart: "А Звучно поможет с эквайрингом,",
      secondPart: "доставкой и прочей рутиной",
    }}
    className={styles.headerSection}
  >
    <>
      <div className={styles.headerSectionButton}>
        <ButtonUI variant={"primary"} size='large'>
          <Link href={"/role"} prefetch={false}>
            присоединиться к бете
          </Link>
        </ButtonUI>
      </div>
      <div className={styles.sectionImage}>
        <img src='/images/image_for-artists_header_bg.png' loading='lazy' />
      </div>
    </>
  </HeroUI>
);
