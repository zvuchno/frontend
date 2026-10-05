"use client";

import { useSession } from "next-auth/react";

import { RoleSelectBlock } from "@/entities/RoleSelectBlock";

import { RoleCard } from "@/shared/ui";

import styles from "./ChangeRole.module.scss";
import { usePathname, useSearchParams } from "next/navigation";

export const ChangeRole = () => {
  const { data } = useSession();
  const isArtist = data?.user.isArtist;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`;

  return (
    <section className={styles.becomeArtist}>
      <RoleSelectBlock>
        {!isArtist && (
          <>
            <div className={styles.becomeArtistText}>
              <p>Хотите использовать возможности платформы по максимуму?</p>
              <p>
                Зарегистрируйтесь как артист или лейбл и начните публиковать музыку и продавать мерч
              </p>
            </div>
            <RoleCard
              path={`/fans/change-account-type?role=artist&next=${encodeURIComponent(currentUrl)}`}
              image='/images/cassette.png'
              title='Как исполнитель'
              description='Продавай мерч, делись новыми релизами и общайся со своими фанатами'
            />
          </>
        )}
        <RoleCard
          path={`/fans/change-account-type?role=label&next=${encodeURIComponent(currentUrl)}`}
          image='/images/vinyl_player.png'
          title='Как лейбл'
          description='Продвигай своих артистов, следи за их популярностью, анонсируй релизы'
        />
      </RoleSelectBlock>
    </section>
  );
};
