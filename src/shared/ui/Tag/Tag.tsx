"use client";

import clsx from "clsx";
<<<<<<< Updated upstream

import styles from "./Tag.module.scss";
import type { TagUIProps } from "./Tag.types";

=======
import type { TagUIProps } from "./Tag.types";
import styles from "./Tag.module.scss";

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
}: TagUIProps) => {
=======
  onIconClick,
}: TagUIProps) => {
  const iconClickHandler = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (!onIconClick) return;
    onIconClick();
  };

>>>>>>> Stashed changes
  return (
    <>
      <div
        className={clsx(
          styles.container,
          {
            [styles.container_secondary]: isSecondary,
            [styles.container_active]: isActive,
          },
<<<<<<< Updated upstream
          className
=======
          className,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              iconClassName
=======
              iconClassName,
>>>>>>> Stashed changes
            )}
          ></div>
        )}
        {/* {!!icon && (<div className={clsx(styles.icon, {[styles.icon_arrow]: icon === 'arrow', [styles.icon_xCircle]: icon === 'x-circle'}, iconClassName)} onClick={iconClickHandler}></div>)} */}
      </div>
    </>
  );
};
