import { type ComponentType, type SVGProps } from "react";

import clsx from "clsx";

import { MenuIcon } from "../MenuIcon/MenuIcon";
import s from "./MenuTag.module.scss";

export const Menutag = ({
  title,
  icon,
  isActive,
  notComplete,
  onClick,
  className,
}: {
  title: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  notComplete?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  const Icon = icon;
  return (
    <div
      className={clsx(
        s.menuTag,
        { [s.active]: isActive },
        { [s.notComplete]: notComplete },
        className
      )}
      onClick={onClick}
    >
      <MenuIcon className={s.menuTagIconContainer}>
        {Icon && <Icon className={s.menuTagIcon} />}
      </MenuIcon>
      <span className={s.menuTagName}>{title}</span>
    </div>
  );
};
