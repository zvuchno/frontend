"use client";

import { useMemo, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";

import NavBar from "@/features/profile/ui/NavBar/NavBar";
import { ProfileFormUI } from "@/features/profile/ui/profileForm/ProfileForm";
import { ProfileFormArtistUI } from "@/features/profile/ui/profileForm/profileFormArtist";
import { DefaultHeaderActions } from "@/shared/constants/headerActions";
import type { FieldValues } from "@/features/profile/ui/profileForm/types";
import type { LinkItem } from "@/shared/ui/Link/Link.types";
import { Title } from "@/shared/ui/Typography/Typography";
import { ArtistDataSection } from "@/widgets/profile/ui/ArtistDataSection";
import { AccentContainer } from "@/widgets/layout/ui/accentContainer";
import { HeaderUI } from "@/widgets/layout/ui/header";

import styles from "./page.module.scss";

const ARTIST_PROFILE_NAV_LINKS: LinkItem[] = [
  {
    id: "profile",
    href: "/artist/profile",
    label: "Профиль",
  },
  {
    id: "artist-data",
    href: "/artist/profile#artist-data",
    label: "Данные",
  },
  {
    id: "storefront",
    href: "/artist/profile#storefront",
    label: "Витрина",
  },
  {
    id: "orders",
    href: "/artist/profile#orders",
    label: "Заказы",
  },
  {
    id: "finance",
    href: "/artist/profile#finance",
    label: "Финансы",
  },
  {
    id: "settings",
    href: "/artist/profile#settings",
    label: "Настройки",
  },
];

const DEFAULT_FORM_VALUES: FieldValues = {
  name: "Summer Stage",
  email: "booking@gmail.com",
  phone: "79991234567",
  password: "password123",
  city: "Москва",
  url: "zvuchno.space",
};

const MOCK_ARTIST_DATA = {
  coverSrc: "https://placehold.co/632x464/png",
  description:
    "Летнее «Выгорание» пройдёт 9 и 10 августа в долгожданном и новом для нас формате городского open-air фестиваля на территории арт-кластера! Полноценная уличная сцена Summer Stage, 2 live-сцены и одна электронная, а также лекторий, квесты, маркеты, фудкорт, турниры по консольным играм и многое другое для всех выгоревших москвичей и гостей столицы!",
  contacts: [{ id: 1, label: "Букинг", value: "booking@gmail.com" }],
  socials: [{ id: 1, label: "Вконтакте", value: "vk.com/summerstage" }],
} as const;

export default function ArtistProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const isFormValid = methods.formState.isValid;

  const handleEdit = () => {
    void methods.trigger();
    setIsEditMode(true);
  };

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    setIsEditMode(false);
  };

  const dataSectionProps = useMemo(
    () => ({
      coverSrc: MOCK_ARTIST_DATA.coverSrc,
      description: MOCK_ARTIST_DATA.description,
      contacts: [...MOCK_ARTIST_DATA.contacts],
      socials: [...MOCK_ARTIST_DATA.socials],
    }),
    [],
  );

  return (
    <div className={styles.page}>
      <AccentContainer className={styles.container}>
        <HeaderUI actions={DefaultHeaderActions} />

        <div className={styles.containerBody}>
          <Title Tag="h2" className={styles.title}>
            Личный кабинет
          </Title>

          <section className={styles.layout}>
            <aside className={styles.sidebar}>
              <NavBar links={ARTIST_PROFILE_NAV_LINKS} />
            </aside>

            <div className={styles.content}>
              <FormProvider {...methods}>
                <ProfileFormUI
                  title="Профиль"
                  isChecked={isEditMode && isFormValid}
                  isOnChange={isEditMode}
                  onSubmit={handleSubmit}
                  onEdit={handleEdit}
                >
                  <ProfileFormArtistUI
                    fieldsDisabled={!isEditMode}
                    personalDataHref="#artist-data"
                  />
                </ProfileFormUI>
              </FormProvider>
            </div>
          </section>
        </div>
      </AccentContainer>

      <section id="artist-data" className={styles.dataSection}>
        <ArtistDataSection {...dataSectionProps} />
      </section>
    </div>
  );
}
