import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { fansProfileRoutes } from "@/shared/constants/routes";
import { Title } from "@/shared/ui/Typography/Typography";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import s from "./layout.module.scss";

const FansLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AccentContainer className={s.container}>
      <Title Tag="h2" className={s.title}>
        Личный кабинет
      </Title>
      <section className={s.section}>
        <NavBar links={fansProfileRoutes} />
        <div className={s.section__content}>{children}</div>
      </section>
    </AccentContainer>
  );
};

export default FansLayout;
