'use client';

import { FC } from "react";
import clsx from "clsx";
import type { TagUIProps } from "./Tag.types";
import styles from './Tag.module.scss';

export const TagUI: FC<TagUIProps> = ({
  className,
  isActive = false,
  isSecondary = false,
  onTagClick,
  title,
  titleClassName,
  icon,
  iconClassName,
  onIconClick
}: TagUIProps) => {
  
  const iconClickHandler = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (!onIconClick) return;
    onIconClick();
  }

  return (
    <>
      <div className={clsx(styles.container, {[styles.container_secondary]: isSecondary, [styles.container_active]: isActive}, className)} onClick={onTagClick}>
        <span className={clsx(styles.title, titleClassName)}>{title}</span>
        {!!icon && (<div className={clsx(styles.icon, {[styles.icon_arrow]: icon === 'arrow', [styles.icon_xCircle]: icon === 'x-circle'}, iconClassName)} onClick={iconClickHandler}></div>)}
      </div>
    </>
  )
}