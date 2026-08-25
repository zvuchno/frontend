import clsx from "clsx";

import styles from "./button.module.scss";
import type { TButtonUIProps } from "./types";

export const ButtonUI = ({
  variant,
  disabled = false,
  children,
  type = "button",
  size = "standart",
  ariaLabel,
  className,
  contentClassName,
  onClick,
  ...rest
}: TButtonUIProps) => (
  <button
    {...rest}
    className={clsx(
      styles.button,
      styles[`${variant}Button`],
      { [styles[`${size}Button`]]: size !== "standart" },
      className
    )}
    type={type}
    disabled={disabled}
    aria-label={typeof children === "string" ? children : ariaLabel}
    aria-disabled={disabled}
    onClick={onClick}
  >
    <span className={clsx(styles.buttonContent, contentClassName)}>{children}</span>
  </button>
);
