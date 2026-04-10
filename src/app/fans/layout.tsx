import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { Title } from "@/shared/ui/Typography/Typography";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import s from "./layout.module.scss";

const FansLayout = ({ children }: {children: React.ReactNode}) => {

  const fansProfileRoutes = [
    {
      id: 'Профиль',
      href: 'fans/profile',
      label: 'Профиль',
    },
    {
      id: 'Избранное',
      href: 'fans/favorites',
      label: 'Избранное',
    },
    {
      id: 'Заказы',
      href: 'fans/orders',
      label: 'Заказы',
    },
    {
      id: 'Релизы',
      href: 'fans/releases',
      label: 'Релизы',
    }
  ];

  return (
    <AccentContainer className={s.container}>
      <Title Tag="h2" className={s.title}>Личный кабинет</Title>
      <section className={s.section}>
        <NavBar links={fansProfileRoutes} />
        <div className={s.section__content}>
          {children}
        </div>
      </section>
    </AccentContainer>
  )
};

export default FansLayout;