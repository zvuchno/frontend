"use client";

import { AccountActionsProvider } from "@/features/AccountActions/context/AccountActionsProvider";
import { AccountNavigation, ActiveLinkProvider, useActiveLink } from "@/features/profile";

import { useGetArtistLegalData } from "@/entities/Artist";
import { useCurrentArtist } from "@/entities/profile";

import { AccentContainer, Loader } from "@/shared/ui";

import s from "./AccountLayout.module.scss";
import { AccountContent } from "./components/AccountContent/AccountContent";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useIsNestedAccountRoute } from "./hooks/hooks";

const AccountLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { data: currentArtist } = useCurrentArtist();
  const { activeLink } = useActiveLink();

  // для страницы ЛК-Данные определяем какой именно заголовок показывать //
  const isArtistDataPage = activeLink?.id === "artist-data";
  const { data: legalData, status } = useGetArtistLegalData(isArtistDataPage);
  const recipientType = legalData?.legal_profile?.recipient_type;
  const moderatedLabel =
    recipientType === "legal_entity"
      ? "Данные юридического лица"
      : !recipientType
        ? activeLink?.label
        : "Личные данные";
  //------------------------------------------------------------------//

  const hasPathBack = useIsNestedAccountRoute();

  if (isArtistDataPage && status === "pending") return <Loader />;

  return (
    <AccentContainer className={s.container}>
      <div className={s.body}>
        <SideMenu>
          <AccountNavigation type={currentArtist?.profile_type} data-testid='account-menu' />
        </SideMenu>
        <AccountContent
          title={!isArtistDataPage ? activeLink?.label : moderatedLabel}
          hasPathBack={hasPathBack}
        >
          {children}
        </AccountContent>
      </div>
    </AccentContainer>
  );
};

export const AccountLayout = ({ children }: { children: React.ReactNode }) => (
  <ActiveLinkProvider>
    <AccountActionsProvider>
      <AccountLayoutContent>{children}</AccountLayoutContent>
    </AccountActionsProvider>
  </ActiveLinkProvider>
);
