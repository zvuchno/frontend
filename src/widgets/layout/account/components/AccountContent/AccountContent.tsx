"use client";

import { type ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";

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

  const dataStatus = accountActions?.dataStatus;
  const primaryButtonTitle = accountActions?.primaryButtonTitle;
  const secondaryButtonTitle = accountActions?.secondaryButtonTitle;
  const primaryDisabled = accountActions?.primaryDisabled;
  const secondaryDisabled = accountActions?.secondaryDisabled;
  const onClickPrimaryBtn = accountActions?.onClickPrimaryBtn;
  const onClickSecondaryBtn = accountActions?.onClickSecondaryBtn;
  const statusMessage = accountActions?.dataStatusComment;
  const shouldShowBackButton = hasPathBack;

  const hasButtons = Boolean(primaryButtonTitle || secondaryButtonTitle);

  return (
    <section className={s.mainSection}>
      {(hasButtons || title) && (
        <MainSectionMenu
          dataStatus={dataStatus}
          statusMessage={statusMessage}
          hasPathBack={shouldShowBackButton}
          onClickPrimaryBtn={onClickPrimaryBtn}
          onClickSecondaryBtn={onClickSecondaryBtn}
          primaryButtonTitle={primaryButtonTitle}
          primaryDisabled={primaryDisabled}
          secondaryButtonTitle={secondaryButtonTitle}
          secondaryDisabled={secondaryDisabled}
          title={title}
          hasButtons={hasButtons}
          router={router}
        />
      )}

      <div className={s.mainSectionContent}>{children}</div>
    </section>
  );
};
