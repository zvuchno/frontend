"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { HeroUI } from "@/widgets/layout/main/Hero";

import { useUserStore } from "@/entities/user";

import { ButtonUI } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsHero = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;
  const isArtist = user?.isArtist;
  const publicPath = `/role?next=${encodeURIComponent(currentUrl)}`;
  const authPath = isArtist ? "/artist/profile" : "/fans/profile";

  return (
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
            <Link href={isAuthorized ? authPath : publicPath} prefetch={false}>
              зарегистрироваться
            </Link>
          </ButtonUI>
        </div>
        <div className={styles.sectionImage}>
          <Image
            src={"/images/image_for-artists_header_bg.png"}
            alt={"Баннер с зображением касеты"}
            width={802}
            height={683}
            priority
          />
        </div>
      </>
    </HeroUI>
  );
};
