import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import s from "./layout.module.scss";
import { Title } from "@/shared/ui/Typography/Typography";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { artistsProfileRoutes } from "@/shared/constants/routes";

const ArtistsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccentContainer className={s.container}>
      <Title Tag="h2" className={s.title}>
        Личный кабинет
      </Title>
      <section className={s.section}>
        <NavBar links={artistsProfileRoutes} />
        <div className={s.section__content}>{children}</div>
      </section>
    </AccentContainer>
  );
};

export default ArtistsLayout;
