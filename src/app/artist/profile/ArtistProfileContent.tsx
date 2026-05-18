"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { getCurrentArtist, type CurrentArtistResponse } from "@/api/artist";

import ArtistProfileFormSection from "./ArtistProfileFormSection";
import styles from "./page.module.scss";

export default function ArtistProfileContent() {
  const { status } = useSession();
  const [artist, setArtist] = useState<CurrentArtistResponse | null>(null);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    let isMounted = true;

    const loadCurrentArtist = async () => {
      if (status === "unauthenticated") {
        setArtist(null);
        return;
      }

      try {
        const response = await getCurrentArtist();

        if (!isMounted) {
          return;
        }

        setArtist(response);
      } catch {
        if (!isMounted) {
          return;
        }

        setArtist(null);
      }
    };

    void loadCurrentArtist();

    return () => {
      isMounted = false;
    };
  }, [status]);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ArtistProfileFormSection artist={artist} onArtistChange={setArtist} />
      </div>
    </div>
  );
}
