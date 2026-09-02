"use client";

import { useRouter } from "next/navigation";

import { AccentContainer, ButtonUI, DescriptionArea } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsJoinBeta = () => {
  const router = useRouter();

  return (
    <AccentContainer>
      <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
        <div className={styles.content}>
          <span>Присоединиться к бете</span>
          <ButtonUI variant={"accentDark"} size='large' onClick={() => router.push("/role")}>
            присоединиться
          </ButtonUI>
        </div>
      </DescriptionArea>
    </AccentContainer>
  );
};
