import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";

import { ButtonUI, Title } from "@/shared/ui";

import { DataStatusBar, type TDataStatus } from "../DataStatusBar/DataStatusBar";
import s from "./MainSectionMenu.module.scss";

type TMainSectionMenuProps = {
  dataStatus?: TDataStatus;
  statusMessage?: string;
  primaryButtonTitle?: string;
  secondaryButtonTitle?: string;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  onClickPrimaryBtn?: () => void;
  onClickSecondaryBtn?: () => void;
  pathBack?: string;
  title?: string;
  hasButtons: boolean;
  router?: AppRouterInstance;
};

export const MainSectionMenu = ({
  dataStatus,
  statusMessage,
  pathBack,
  onClickPrimaryBtn,
  onClickSecondaryBtn,
  primaryButtonTitle,
  primaryDisabled,
  secondaryButtonTitle,
  secondaryDisabled,
  title,
  hasButtons,
  router,
}: TMainSectionMenuProps) => (
  <div className={s.mainSectionMenu}>
    <div className={s.mainSectionSubtitleActions}>
      {pathBack && (
        <button
          className={s.mainSectionBackButton}
          title='Назад'
          onClick={() => pathBack && router?.replace(pathBack)}
          aria-label='Назад'
          aria-labelledby='artist-account-back-button'
        >
          <Image src={"/icons/arrow-pixel-back.svg"} alt={"Назад"} width={10.67} height={18.67} />
        </button>
      )}
      <div className={s.mainSectionSubtitle}>
        <Title Tag='h3' className={s.subtitle}>
          {title}
        </Title>
        {dataStatus && <DataStatusBar dataStatus={dataStatus} statusMessage={statusMessage} />}
      </div>
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
);
