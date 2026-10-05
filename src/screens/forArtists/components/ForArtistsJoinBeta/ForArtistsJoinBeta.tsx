"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AccentContainer, ButtonUI, DescriptionArea } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";
import { useUserStore } from "@/entities/user";

export const ForArtistsJoinBeta = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  const user = useUserStore((state) => state.user);
  const isAuthorized = !!user?.id;
  const isArtist = user?.isArtist;
  const publicPath = `/role?next=${encodeURIComponent(currentUrl)}`;
  const authPath = isArtist ? "/artist/profile" : "/fans/profile";

  return (
    <AccentContainer>
      <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
        <div className={styles.content}>
          <span>Присоединиться к бете</span>
          <ButtonUI variant={"accentDark"} size='large' onClick={() => router.push(isAuthorized ? authPath : publicPath)}>
            зарегистрироваться
          </ButtonUI>
        </div>
      </DescriptionArea>
    </AccentContainer>
  );
};
