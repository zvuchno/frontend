"use client";

import { useState } from "react";
import { Text } from "../Typography";
import s from "./DropButton.module.scss";
import clsx from "clsx";
import { useClickOutside } from "@/shared/hooks/useClickOutside";

type TDropButtonOptions = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type TDropButtonProps = {
  title: string;
  icon: string;
  options: TDropButtonOptions[];
};

export const DropButton = ({ title, icon, options }: TDropButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  const closeOnOutsideClick = () => setIsOpen(false);

  const dropRef = useClickOutside(closeOnOutsideClick);

  return (
    <div className={s.container} ref={dropRef}>
      <button className={s.dropButton} type="button" onClick={handleClick} onKeyDown={handleKeyDown}>
        <Text Tag="span" className={s.dropButton__text}>{title}</Text>
        <span 
          className={s.dropButton__icon}
          style={{
            backgroundImage: `url("${icon}")` 
          }}
        />
      </button>
      <div className={clsx(s.dropContent, { [s.dropContent_show]: isOpen })}>
        {options.map((opt) => (
          <a 
            key={opt.label} 
            href={opt.href ?? "#"} 
            className={s.dropContent__item}
            onClick={opt.onClick}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </div>
  )
};