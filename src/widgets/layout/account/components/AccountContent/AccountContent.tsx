import { type ReactNode } from "react";

import { ButtonUI, Title } from "@/shared/ui";

import { DataStatusBar, type TDataStatus } from "../DataStatusBar/DataStatusBar";
import s from "./AccountContent.module.scss";

export const AccountContent = ({
  title,
  children,
  dataStatus,
  primaryButtonTitle,
  secondaryButtonTitle,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
}: {
  title?: string;
  children: ReactNode;
  // dataStatus - для отображения статуса проверки данных формы (согласовать наисенования с бэкендом)
  dataStatus?: TDataStatus;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  onClickPrimaryBtn?: () => void;
  onClickSecondaryBtn?: () => void;
}) => {
  const hasButtons = primaryButtonTitle || secondaryButtonTitle;

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
                  onClick={() => onClickPrimaryBtn}
                >
                  {primaryButtonTitle}
                </ButtonUI>
              )}
              {secondaryButtonTitle && (
                <ButtonUI
                  variant='secondary'
                  size='small'
                  className={s.mainSectionButton}
                  onClick={() => onClickSecondaryBtn}
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
