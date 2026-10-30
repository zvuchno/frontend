"use client";

import { type ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";
import { useActiveLink } from "@/features/profile";

//import { Loader } from "@/shared/ui";

import { MainSectionMenu } from "../MainSectionMenu/MainSectionMenu";
import s from "./AccountContent.module.scss";

export const AccountContent = ({
  title,
  children,
  hasPathBack,
}: {
  title?: string;
  children: ReactNode;
  hasPathBack?: boolean;
}) => {
  const router = useRouter();

  const { accountActions } = useAccountActions();
  const { activeLink } = useActiveLink();

  //if (!accountActions || !activeLink) return <Loader />;

  const dataStatus = accountActions?.dataStatus;
  const primaryButtonTitle = accountActions?.primaryButtonTitle;
  const secondaryButtonTitle = accountActions?.secondaryButtonTitle;
  const primaryDisabled = accountActions?.primaryDisabled;
  const secondaryDisabled = accountActions?.secondaryDisabled;
  const onClickPrimaryBtn = accountActions?.onClickPrimaryBtn;
  const onClickSecondaryBtn = accountActions?.onClickSecondaryBtn;
  const isLoading = accountActions?.isLoading || false;
  const backPath =
    typeof activeLink?.href === "string" ? activeLink.href : (activeLink?.href.pathname ?? "/");

  const hasButtons = Boolean(primaryButtonTitle || secondaryButtonTitle);

  return (
    <section className={s.mainSection}>
      {(hasButtons || title) && (
        <MainSectionMenu
          dataStatus={dataStatus}
          pathBack={hasPathBack ? backPath : undefined}
          onClickPrimaryBtn={onClickPrimaryBtn}
          onClickSecondaryBtn={onClickSecondaryBtn}
          primaryButtonTitle={primaryButtonTitle}
          primaryDisabled={primaryDisabled}
          secondaryButtonTitle={secondaryButtonTitle}
          secondaryDisabled={secondaryDisabled}
          title={title}
          hasButtons={hasButtons}
          router={router}
          isLoading={isLoading}
        />
      )}

      <div className={s.mainSectionContent}>{children}</div>
    </section>
  );
};
