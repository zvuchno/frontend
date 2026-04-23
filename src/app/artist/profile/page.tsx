"use client";

import { useEffect, useState } from "react";

import { getCurrentArtist, type CurrentArtistResponse } from "@/api/artist";
import { useUserStore } from "@/entities/user/store/useUserStore";
import type { UserDataProps } from "@/entities/user/store/useUserStore";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import type { LinkItem } from "@/shared/ui/Link/Link.types";
import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import { Title } from "@/shared/ui/Typography/Typography";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";

import styles from "./page.module.scss";
import ArtistProfileDataSection from "./ArtistProfileDataSection";
import ArtistProfileFormSection from "./ArtistProfileFormSection";
import { isArtistPersonalDataComplete } from "./utils";

const ARTIST_PROFILE_NAV_LINKS: LinkItem[] = [
  {
    id: "profile",
    href: "/artist/profile",
    label: "Профиль",
  },
  {
    id: "artist-data",
    href: "/artist/profile#artist-data",
    label: "Данные",
  },
  {
    id: "storefront",
    href: "/artist/profile#storefront",
    label: "Витрина",
  },
  {
    id: "orders",
    href: "/artist/profile#orders",
    label: "Заказы",
  },
  {
    id: "finance",
    href: "/artist/profile#finance",
    label: "Финансы",
  },
  {
    id: "settings",
    href: "/artist/profile#settings",
    label: "Настройки",
  },
];

export default function ArtistProfilePage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const accessToken = user?.accessToken;
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setArtist(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadCurrentArtist = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getCurrentArtist(accessToken);

        if (!isMounted) {
          return;
        }

        setArtist(response);
        setError(null);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setArtist(null);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Не удалось загрузить данные артиста",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadCurrentArtist();

    return () => {
      isMounted = false;
    };
  }, [accessToken]);

  const isPersonalDataComplete = isArtistPersonalDataComplete(artist);
  const shouldShowPublishHint =
    !isLoading && artist !== null && !isPersonalDataComplete;

  return (
    <div className={styles.page}>
      <AccentContainer className={styles.container}>
        <HeaderUI actions={DefaultHeaderActions} />

        <div className={styles.containerBody}>
          <Title Tag="h2" className={styles.title}>
            Личный кабинет
          </Title>

          <section className={styles.layout}>
            <aside className={styles.sidebar}>
              <NavBar links={ARTIST_PROFILE_NAV_LINKS} />
            </aside>

            <div className={styles.content}>
              <ArtistProfileFormSection
                artist={artist}
                user={user}
                accessToken={accessToken}
                showPublishHint={shouldShowPublishHint}
                onArtistChange={setArtist}
                onUserChange={(nextUser: UserDataProps) => setUser(nextUser)}
              />
            </div>
          </section>
        </div>
      </AccentContainer>

      <ArtistProfileDataSection
        artist={artist}
        accessToken={accessToken}
        isLoading={isLoading}
        error={error}
        onArtistChange={setArtist}
      />
    </div>
  );
}
