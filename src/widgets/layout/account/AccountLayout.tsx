"use client";

import { AccountNavigation } from "@/features/profile";

import { useCurrentArtist } from "@/entities/profile";

import { AccentContainer } from "@/shared/ui";

import s from "./AccountLayout.module.scss";
import { AccountContent } from "./components/AccountContent/AccountContent";
import { type TDataStatus } from "./components/DataStatusBar/DataStatusBar";
import { SideMenu } from "./components/SideMenu/SideMenu";

export const AccountLayout = ({
  subtitle,
  children,
  dataStatus,
  primaryButtonTitle,
  secondaryButtonTitle,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
}: {
  subtitle: string;
  children: React.ReactNode;
  dataStatus?: TDataStatus;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onClickPrimaryBtn?: () => void;
  onClickSecondaryBtn?: () => void;
}) => {
  const { data: currentArtist } = useCurrentArtist();

  return (
    <AccentContainer className={s.container}>
      <div className={s.body}>
        <SideMenu>
          <AccountNavigation type={currentArtist?.profile_type} />
        </SideMenu>
        <AccountContent
          title={subtitle}
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
