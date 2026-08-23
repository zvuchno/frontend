import Link from "next/link";

import { CardArtist } from "@/entities/Artist";

import { ButtonUI } from "@/shared/ui";

import styles from "./LabelPage.module.scss";
import { LabelArtistButtons } from "./components/LabelArtistButtons/LabelArtistButtons";

type TLabelArtist = {
  id: number; //
  name: string; //
  image?: string; //
  link: string; //
  about?: string; //
  contacts?: string[];
  social?: string[];
};

// тип используется на гл странице в каталоге (сравнить)
export type TArtistCard = {
  name: string;
  description: string;
  cover: string | null;
  city: string;
  url: string;
  slug: string;
};

export const LabelPage = () => {
  const artists: TLabelArtist[] = [
    {
      id: 1,
      name: "artist1",
      image:
        "https://storage.yandexcloud.net/zvuchno-platform-public/dev/media/artists/covers/74223bd5495d45c0bd5e08b2c0d8c903.webp",
      link: "/",
    },
    {
      id: 2,
      name: "artist2",
      image:
        "https://storage.yandexcloud.net/zvuchno-platform-public/dev/media/artists/covers/74223bd5495d45c0bd5e08b2c0d8c903.webp",
      link: "/",
    },
    {
      id: 3,
      name: "artist3",
      image:
        "https://storage.yandexcloud.net/zvuchno-platform-public/dev/media/artists/covers/74223bd5495d45c0bd5e08b2c0d8c903.webp",
      link: "/",
    },
    {
      id: 4,
      name: "artist4",
      image:
        "https://storage.yandexcloud.net/zvuchno-platform-public/dev/media/artists/covers/74223bd5495d45c0bd5e08b2c0d8c903.webp",
      link: "/",
    },
    {
      id: 5,
      name: "artist5",
      image:
        "https://storage.yandexcloud.net/zvuchno-platform-public/dev/media/artists/covers/74223bd5495d45c0bd5e08b2c0d8c903.webp",
      link: "/",
    },
  ];
  return (
    <section className={styles.labelContent}>
      <div className={styles.labelAddButton}>
        <ButtonUI variant={"primary"}>Добавить нового артиста</ButtonUI>
      </div>
      {artists.length > 0 && (
        <div className={styles.labelGallery}>
          {artists.map((artist) => (
            <article key={artist.id} className={styles.labelGalleryItem}>
              <Link
                href={`/catalog/artists/${artist.id}/?kind=artists`}
                className={styles.labelGalleryArtistCard}
              >
                <CardArtist
                  image={artist.image}
                  description={artist.name}
                  hasButton
                  className={styles.labelGalleryArtistCard}
                />
              </Link>
              <LabelArtistButtons />
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
