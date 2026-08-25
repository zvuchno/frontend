"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CardArtist } from "@/entities/Artist";
import { useGetManagedProfiles } from "@/entities/Label";

import { ButtonUI, Loader, ModalUI } from "@/shared/ui";

import styles from "./LabelPage.module.scss";
import { LabelArtistButtons } from "./components/LabelArtistButtons/LabelArtistButtons";
import { NewManagedProfile } from "./components/NewManagedProfile/NewManagedProfile";

export const LabelPage = () => {
  const session = useSession();
  const profileType = session.data?.user.profileType;

  const { data: artists, status } = useGetManagedProfiles(profileType);

  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (status === "pending") return <Loader />;

  return (
    <section className={styles.labelContent}>
      <div className={styles.labelAddButton}>
        <ButtonUI variant={"primary"} onClick={() => setIsModalOpen(true)}>
          Добавить нового артиста
        </ButtonUI>
      </div>
      {artists && artists.length > 0 && (
        <div className={styles.labelGallery}>
          {artists
            .filter((artist) => artist.is_self === false)
            .map((artist) => (
              <article key={artist.id} className={styles.labelGalleryItem}>
                <Link
                  href={`/catalog/artists/${artist.slug}/?kind=artists`}
                  className={styles.labelGalleryArtistCard}
                >
                  <CardArtist
                    image={artist.cover || ""}
                    description={artist.name}
                    hasButton
                    className={styles.labelGalleryArtistCard}
                  />
                </Link>
                <LabelArtistButtons
                  onChange={() =>
                    router.push(
                      `/artist/label/${artist.id}/${encodeURIComponent(artist.slug ?? "")}`
                    )
                  }
                  onDelete={() => {}} // нет ручки для удаления профиля артиста из лейбла
                />
              </article>
            ))}
        </div>
      )}
      {isModalOpen && (
        <ModalUI closeButtonStyle={"x"} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NewManagedProfile onClose={() => setIsModalOpen(false)} />
        </ModalUI>
      )}
    </section>
  );
};
