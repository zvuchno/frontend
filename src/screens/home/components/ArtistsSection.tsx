import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import Link from "next/link";

import { CardArtist } from "@/entities/Artist";

import { ListSection } from "@/shared/ui";

import styles from "./../HomePage.module.scss";

export const ArtistsSection = ({ artists }: { artists: TArtistCard[] }) => (
  <ListSection title='Артисты' link={`/catalog/artists`} className={styles.artistsSection}>
    {artists.map((artist) => (
      <Link
        key={artist.slug}
        href={`/catalog/artists/${artist.slug}/?kind=artists`}
        className={styles.mainContentCardLink}
      >
        <CardArtist image={artist.cover ?? undefined} description={artist.name} hasButton={false} />
      </Link>
    ))}
  </ListSection>
);
