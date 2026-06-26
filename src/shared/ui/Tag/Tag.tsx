"use client";

import clsx from "clsx";

import styles from "./Tag.module.scss";
import type { TagUIProps } from "./Tag.types";

export const TagUI = ({
  className,
  isActive = false,
  isSecondary = false,
  onTagClick,
  title,
  titleClassName,
  icon = "x-circle",
  iconClassName,
  hasIcon = true,
}: TagUIProps) => {
  return (
    <>
      <div
        className={clsx(
          styles.container,
          {
            [styles.container_secondary]: isSecondary,
            [styles.container_active]: isActive,
          },
          className
        )}
        onClick={onTagClick}
      >
        <span className={clsx(styles.title, titleClassName)}>{title}</span>
        {isActive && hasIcon && (
          <div
            className={clsx(
              styles.icon,
              {
                [styles.icon_arrow]: icon === "arrow",
                [styles.icon_xCircle]: icon === "x-circle",
              },
              iconClassName
            )}
          ></div>
        )}
        {/* {!!icon && (<div className={clsx(styles.icon, {[styles.icon_arrow]: icon === 'arrow', [styles.icon_xCircle]: icon === 'x-circle'}, iconClassName)} onClick={iconClickHandler}></div>)} */}
      </div>
    </>
  );
};
