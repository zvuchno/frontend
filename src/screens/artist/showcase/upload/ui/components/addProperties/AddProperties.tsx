"use client";

import { ButtonUI, CustomInput } from "@/shared/ui";
import s from "./AddProperties.module.scss";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import type { UploadFormValues } from "@/features/showcaseUpload";
import clsx from "clsx";

export const AddPropertises = () => {
  const { control } = useFormContext<UploadFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const addVariant = () => {
    append({
      value: '',
      sku: '',
      stock: 0,
    });
  };

  const removeVariant = (index: number) => {
     remove(index);
  };

  return (
    <div className={s.container}>

      <div className={s.propertyContainer}>
        <Controller 
          name="propertyName"
          control={control}
          render={({ field }) => (
            <CustomInput 
              id="propertyName" 
              name="propertyName"
              label="Название свойства"
              labelClassName={s.label}
              inputClassName={s.input}
              value={field.value ?? ''}
              onChange={field.onChange}
            />
          )}
        />

        {fields.length > 0 && fields.map((variantField, index) => (
          <div key={variantField.id} className={s.variantContainer}>
            <Controller 
              name={`variants.${index}.value`}
              control={control}
              render={({ field }) => (
                <CustomInput 
                  id={`value_${variantField.id}`} 
                  name={`variants.${index}.value`}
                  label="Значение свойства"
                  labelClassName={s.label}
                  inputClassName={s.input}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller 
              name={`variants.${index}.stock`}
              control={control}
              render={({ field }) => (
                <CustomInput 
                  id={`stock_${variantField.id}`} 
                  name={`variants.${index}.stock`}
                  label="Количество"
                  labelClassName={s.label}
                  inputClassName={s.input}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  placeholder="0"
                />
              )}
            />
            <Controller 
              name={`variants.${index}.sku`}
              control={control}
              render={({ field }) => (
                <CustomInput 
                  id={`sku_${variantField.id}`} 
                  name={`variants.${index}.sku`}
                  label="SKU"
                  labelClassName={s.label}
                  inputClassName={clsx(s.input, s.input_wide)}
                  value={field.value ?? ''}
                  onChange={field.onChange}
                  readOnly
                />
              )}
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
      </div>

      <ButtonUI 
        variant="primary" 
        type="button"
        className={s.addButton}
        onClick={addVariant}
      >
        + Добавить вариант
      </ButtonUI>
   
    </div>
  )
}