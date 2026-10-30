"use client";

import { createContext } from "react";

import { useCheckList } from "@/widgets/CheckList/model/useCheckList";

import { AccountActionsProvider } from "@/features/AccountActions/context/AccountActionsProvider";
import { AccountNavigation, ActiveLinkProvider, useActiveLink } from "@/features/profile";

import { useGetArtistLegalData } from "@/entities/Artist";
import { useCurrentArtist } from "@/entities/profile";

import { AccentContainer, Loader } from "@/shared/ui";

import s from "./AccountLayout.module.scss";
import { AccountContent } from "./components/AccountContent/AccountContent";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { useIsNestedAccountRoute } from "./hooks/hooks";

const sideMenuStatus = {
  statusShowcase: false,
  statusDelivery: false,
  statusProfile: false,
  statusArtistAccount: false,
  statusPaymentData: false,
};

export const SideMenuStatusContext = createContext(sideMenuStatus);

const AccountLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { data: currentArtist } = useCurrentArtist();
  const { activeLink } = useActiveLink();

  const { data: checklist } = useCheckList();

  const statusShowcase = (checklist?.add_first_product && checklist.publish_first_product) || false;
  const statusDelivery = checklist?.cdek_integration || false;
  const statusProfile = checklist?.email_verified || false;
  const statusArtistAccount = checklist?.artist_cover || false;
  const statusPaymentData = checklist?.payout_details || false;

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

  if ((isArtistDataPage && status === "pending") || !checklist) return <Loader />;

  return (
    <AccentContainer className={s.container}>
      <div className={s.body}>
        <SideMenuStatusContext
          value={{
            statusDelivery: statusDelivery,
            statusArtistAccount: statusArtistAccount,
            statusProfile: statusProfile,
            statusShowcase: statusShowcase,
            statusPaymentData: statusPaymentData,
          }}
        >
          <SideMenu>
            <AccountNavigation type={currentArtist?.profile_type} data-testid='account-menu' />
          </SideMenu>
        </SideMenuStatusContext>

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
