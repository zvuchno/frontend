"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getCurrentArtist, type CurrentArtistResponse } from "@/api/artist";

import ArtistProfileDataSection from "./ArtistProfileDataSection";
import ArtistProfileFormSection from "./ArtistProfileFormSection";
import styles from "./page.module.scss";
import { isArtistPersonalDataComplete } from "./utils";

export default function ArtistProfileContent() {
  const { status } = useSession();
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
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

        const response = await getCurrentArtist();

        if (!isMounted) {
          return;
        }

        setArtist(response);
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
  }, [status]);

  const shouldShowPublishHint =
    !isLoading && artist !== null && !isArtistPersonalDataComplete(artist);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ArtistProfileFormSection
          artist={artist}
          showPublishHint={shouldShowPublishHint}
          onArtistChange={setArtist}
        />
      </div>

      <ArtistProfileDataSection
        artist={artist}
        isLoading={isLoading}
        error={error}
        onArtistChange={setArtist}
      />
    </div>
  );
}
