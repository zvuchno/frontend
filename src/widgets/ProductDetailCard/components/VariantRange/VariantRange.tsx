"use client"

import { useState } from "react";
import { VariantRangeProps } from "./VariantRange.types";
import s from "./VariantRange.module.scss";
import clsx from "clsx";

const VariantRange = ({ variants, type, onClick }: VariantRangeProps) => {

  const [isSelected, setIsSelected] = useState<string>(variants[0].property_value);

  const hanleClick = (value: string, sku: string, id: number) => {
    setIsSelected(value);

    if (onClick && typeof onClick === 'function') {
      onClick(value, sku, id);
    }
  };

  return (
    <div className={s.container}>
      {variants.map(variant => {
        return (
          <button 
            key={variant.variant_id}
            type="button" 
            className={clsx(s.button, {[s.button_selected]: variant.property_value === isSelected})}
            onClick={() => hanleClick(variant.property_value, variant.sku, variant.variant_id)}
            disabled={variant.stock === null}
          >
            {variant.property_value}
          </button>
        )
      })}
    </div>
  )
};

export default VariantRange;