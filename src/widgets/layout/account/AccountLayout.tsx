"use client";

import { AccountNavigation, ActiveLinkProvider, useActiveLink } from "@/features/profile";

import { useCurrentArtist } from "@/entities/profile";

import { AccentContainer } from "@/shared/ui";

import s from "./AccountLayout.module.scss";
import { AccountContent } from "./components/AccountContent/AccountContent";
import { type TDataStatus } from "./components/DataStatusBar/DataStatusBar";
import { SideMenu } from "./components/SideMenu/SideMenu";

type AccountLayoutProps = {
  children: React.ReactNode;
  dataStatus?: TDataStatus;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onClickPrimaryBtn?: () => void;
  onClickSecondaryBtn?: () => void;
};

const AccountLayoutContent = ({
  children,
  dataStatus,
  primaryButtonTitle,
  secondaryButtonTitle,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
}: AccountLayoutProps) => {
  const { data: currentArtist } = useCurrentArtist();
  const { activeLink } = useActiveLink();

  return (
    <AccentContainer className={s.container}>
      <div className={s.body}>
        <SideMenu>
          <AccountNavigation type={currentArtist?.profile_type} />
        </SideMenu>
        <AccountContent
          title={activeLink?.label}
          dataStatus={dataStatus}
          primaryButtonTitle={primaryButtonTitle}
          secondaryButtonTitle={secondaryButtonTitle}
          onClickPrimaryBtn={onClickPrimaryBtn}
          onClickSecondaryBtn={onClickSecondaryBtn}
        >
          {children}
        </AccountContent>
      </div>
    </AccentContainer>
  );
};

export const AccountLayout = (props: AccountLayoutProps) => (
  <ActiveLinkProvider>
    <AccountLayoutContent {...props} />
  </ActiveLinkProvider>
);
