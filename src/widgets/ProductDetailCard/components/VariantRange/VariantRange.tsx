"use client"

import { useEffect, useState } from "react";
import { VariantRangeProps } from "./VariantRange.types";
import s from "./VariantRange.module.scss";
import clsx from "clsx";

const VariantRange = ({ variants, type, selectadVariant, onClick }: VariantRangeProps) => {

  const [isSelected, setIsSelected] = useState<string>(variants[0].property_value);

  useEffect(() => {
    if (selectadVariant) {
      setIsSelected(selectadVariant);
    }
  }, [selectadVariant])

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
            disabled={variant.property_value !== 'Диджитал' && variant.stock === null}
          >
            {variant.property_value}
          </button>
        )
      })}
    </div>
  )
};

export default VariantRange;