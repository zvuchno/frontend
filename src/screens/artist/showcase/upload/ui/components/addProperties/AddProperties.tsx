"use client";

import { ButtonUI, CustomInput } from "@/shared/ui";
import s from "./AddProperties.module.scss";
import { useFieldArray, useFormContext } from "react-hook-form";
import { UploadFormValues, VariantForm } from "@/features/showcaseUpload";

export const AddPropertises = () => {
  const { control } = useFormContext<UploadFormValues>();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'variants',
  });

  const propertyField = useFormContext().getValues().propertyName;
  const setPropertyValue = useFormContext().setValue;

  const addVariant = () => {
    append({
      id: crypto.randomUUID(),
      value: '',
      sku: '',
      stock: '',
    });
  };

  const removeVariant = (index: number) => {
     remove(index);
  };

  const updateVariantField = (
    index: number,
    field: 'value' | 'sku' | 'stock',
    value: string
  ) => {
    const current = fields[index];
    update(index, {
      ...current,
      [field]: value,
    } as VariantForm);
  };

  return (
    <div className={s.container}>

      <div className={s.propertyContainer}>
        <CustomInput 
          id="propertyName" 
          label="Название свойства"
          value={propertyField ?? ''}
          onChange={(e) => setPropertyValue('propertyName', e.target.value)}
          required
        />

        {fields.length > 0 && fields.map((field, index) => (
          <div key={field.id} className={s.variantContainer}>
            <CustomInput 
              id={`value_${field.id}`}
              label="Значение"
              value={field.value}
              onChange={(e) =>
               updateVariantField(index, 'value', e.target.value)
              }
            />
            <CustomInput 
              id={`sku_${field.id}`}
              label="SKU"
              value={field.sku}
              onChange={(e) =>
                updateVariantField(index, 'sku', e.target.value)
              }
              placeholder="Артикул варианта"
            />
            <CustomInput 
              id={`stock_${field.id}`}
              label="Количество"
              type="number"
              value={field.stock}
              onChange={(e) =>
                updateVariantField(index, 'stock', e.target.value)
              }
              placeholder="0"
            />
            <button 
              type="button"
              onClick={() => removeVariant(index)}
              className={s.removeButton}
            >
              удалить
            </button>
          </div>
        ))}

        <ButtonUI 
          variant="primary" 
          type="button"
          className={s.buttonContainer__button}
          onClick={addVariant}
        >
          + Добавить вариант
        </ButtonUI>
        
      </div>
   
    </div>
  )
}