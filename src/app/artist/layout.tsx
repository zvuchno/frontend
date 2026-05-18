"use client";

import { usePathname } from "next/navigation";

import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import s from "./layout.module.scss";
import { Title } from "@/shared/ui/Typography/Typography";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { artistsProfileRoutes } from "@/shared/constants/routes";
import { ArtistDataSection } from "./components/ArtistDataSection";

const artistProfilePathnames = ["/artist/profile"];

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const shouldShowArtistInfo = artistProfilePathnames.includes(pathname);

  return (
    <AccentContainer className={s.container}>
      <Title Tag="h2" className={s.title}>
        Личный кабинет
      </Title>
      <section className={s.section}>
        <NavBar links={artistsProfileRoutes} />
        <div className={s.section__body}>
          <div className={s.section__content}>{children}</div>
          {shouldShowArtistInfo ? (
            <div className={s.section__profileInfo}>
              <ArtistDataSection
                coverSrc="/artist-image.png"
                description=""
                contacts={[]}
                socials={[]}
              />
            </div>
          ) : null}
        </div>
      </section>
    </AccentContainer>
  );
};

export default ArtistLayout;
