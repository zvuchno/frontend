import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import s from "./layout.module.scss";
import { Title } from "@/shared/ui/Typography/Typography";
import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { usePathname } from "next/navigation";

const ArtistsLayout = ({ children }: {children: React.ReactNode}) => {

  const pathname = usePathname();

  const isShowArtistData = pathname === 'artists/profile' || pathname.startsWith('artists/profile');

  const artistsRoutes = [
    {
      id: 'Профиль',
      href: 'artists/profile',
      label: 'Профиль',
    },
    {
      id: 'Данные',
      href: 'artists/data',
      label: 'Данные',
    },
    {
      id: 'Витрина',
      href: 'artists/showcase',
      label: 'Витрина',
    },
    {
      id: 'Заказы',
      href: 'artists/orders',
      label: 'Заказы',
    },
    {
      id: 'Финансы',
      href: 'artists/finance',
      label: 'Финансы',
    },
    {
      id: 'Настройки',
      href: 'artists/settings',
      label: 'Настройки',
    },
  ];

  return (
    <>
      <AccentContainer className={s.container}>
        <Title Tag="h2" className={s.title}>Личный кабинет</Title>
        <section className={s.section}>
          <NavBar links={artistsRoutes} />
          <div className={s.section__content}>
            {children}
          </div>
        </section>
      </AccentContainer>

      {/* Добавить блок с информацией об артисте */}
      {isShowArtistData && (
        <div></div>
      )}
    </>
  )
};

export default ArtistsLayout;