"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AccentContainer, ButtonUI, DescriptionArea } from "@/shared/ui";

import styles from "../../ForArtists.module.scss";

export const ForArtistsJoinBeta = () => {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  return (
    <AccentContainer>
      <DescriptionArea headerwithIcons={true} colorOption={"grey"}>
        <div className={styles.content}>
          <span>Присоединиться к бете</span>
          <ButtonUI variant={"accentDark"} size='large' onClick={() => router.push(`/role?next=${encodeURIComponent(currentUrl)}`)}>
            присоединиться
          </ButtonUI>
        </div>
      </DescriptionArea>
    </AccentContainer>
  );
};
