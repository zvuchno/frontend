'use client';

import { useState } from "react";
import s from "./SizeRange.module.scss";
import clsx from "clsx";
import { SizeRangeProps } from "./SizeRange.type";

const SizeRange = ({ sizes, onClick }: SizeRangeProps) => {

  const [isSelected, setIsSelected] = useState<string | null>(null);

  const hanleClick = (size: string) => {
    setIsSelected(size);

    if (onClick && typeof onClick === 'function') {
      onClick(size);
    }
  };

  return (
    <div className={s.container}>
      {sizes.map(size => {
        return (
          <button 
            type="button" 
            className={clsx(s.button, {[s.button_selected]: size.name === isSelected})}
            onClick={() => hanleClick(size.name)}
            disabled={!size.isAvailable}
          >
            {size.name}
          </button>
        )
      })}
    </div>
  )
};

export default SizeRange;