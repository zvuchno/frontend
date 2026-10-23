import { type ReactNode } from "react";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";

import { ButtonUI, Title } from "@/shared/ui";

import { DataStatusBar } from "../DataStatusBar/DataStatusBar";
import s from "./AccountContent.module.scss";

export const AccountContent = ({ title, children }: { title?: string; children: ReactNode }) => {
  const { accountActions } = useAccountActions();

  const dataStatus = accountActions?.dataStatus;
  const primaryButtonTitle = accountActions?.primaryButtonTitle;
  const secondaryButtonTitle = accountActions?.secondaryButtonTitle;
  const primaryDisabled = accountActions?.primaryDisabled;
  const secondaryDisabled = accountActions?.secondaryDisabled;
  const onClickPrimaryBtn = accountActions?.onClickPrimaryBtn;
  const onClickSecondaryBtn = accountActions?.onClickSecondaryBtn;

  const hasButtons = accountActions?.primaryButtonTitle || accountActions?.secondaryButtonTitle;

  return (
    <section className={s.mainSection}>
      {(hasButtons || title) && (
        <div className={s.mainSectionMenu}>
          <div className={s.mainSectionSubtitle}>
            <Title Tag='h3' className={s.subtitle}>
              {title}
            </Title>
            {dataStatus && <DataStatusBar dataStatus={dataStatus} />}
          </div>

          {hasButtons && (
            <div className={s.mainSectionButtons}>
              {primaryButtonTitle && (
                <ButtonUI
                  variant='primary'
                  size='small'
                  className={s.mainSectionButton}
                  onClick={onClickPrimaryBtn}
                  disabled={primaryDisabled}
                >
                  {primaryButtonTitle}
                </ButtonUI>
              )}
              {secondaryButtonTitle && (
                <ButtonUI
                  variant='secondary'
                  size='small'
                  className={s.mainSectionButton}
                  onClick={onClickSecondaryBtn}
                  disabled={secondaryDisabled}
                >
                  {secondaryButtonTitle}
                </ButtonUI>
              )}
            </div>
          )}
        </div>
      )}

      <div className={s.mainSectionContent}>{children}</div>
    </section>
  );
};
