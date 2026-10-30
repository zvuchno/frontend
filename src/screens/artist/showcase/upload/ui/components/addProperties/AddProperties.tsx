"use client";

import { ButtonUI, CustomInput } from "@/shared/ui";
import s from "./AddProperties.module.scss";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { UploadMerchFormValues } from "@/features/showcaseUpload";

export const AddPropertises = () => {
  const { control, setValue } = useFormContext<UploadMerchFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  const addVariant = () => {
    append({
      value: '',
      //sku: '',
      stock: undefined,
    });
  };

  const removeVariant = (index: number) => {
    remove(index);
    if (fields.length === 1) {
      setValue('hasProperty', false);
      setValue('propertyName', '');
      setValue('variants', [{
        value: '',
        stock: undefined,
      }])
    }
  };

  return (
    <div className={s.container}>

      <div className={s.propertyContainer}>
        {fields.length > 0 && (
          <Controller 
            name="propertyName"
            control={control}
            rules={{ required: 'Обязательно для заполнения' }}
            render={({ field, fieldState }) => (
              <CustomInput 
                id="propertyName" 
                name="propertyName"
                label="Название свойства"
                labelClassName={s.label}
                inputClassName={s.input}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={!!fieldState.error?.message}
                message={fieldState.error?.message}
                data-testid="property-name"
              />
            )}
          />
        )}

        {fields.length > 0 && fields.map((variantField, index) => {
          // if (!variantField.value && variantField.sku) {
          //   return null;
          // }
          return (
            <div key={variantField.id} className={s.variantContainer}>
              <Controller 
                name={`variants.${index}.value`}
                control={control}
                rules={{ required: 'Обязательно для заполнения' }}
                render={({ field, fieldState }) => (
                  <CustomInput 
                    id={`value_${variantField.id}`} 
                    name={`variants.${index}.value`}
                    label={`Свойство ${index + 1}`}
                    labelClassName={s.label}
                    inputClassName={s.input}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!fieldState.error?.message}
                    message={fieldState.error?.message}
                    data-testid={`value_${variantField.id}`}
                  />
                )}
              />
              <Controller 
                name={`variants.${index}.stock`}
                control={control}
                rules={{
                  required: 'Количество обязательно',
                  min: { value: 0, message: 'Количество не может быть отрицательным' },
                }}
                render={({ field, fieldState }) => (
                  <CustomInput 
                    id={`stock_${variantField.id}`} 
                    name={`variants.${index}.stock`}
                    label="Количество"
                    labelClassName={s.label}
                    inputClassName={s.input}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={!!fieldState.error?.message}
                    message={fieldState.error?.message}
                    placeholder="0"
                    data-testid={`stock_${variantField.id}`}
                  />
                )}
              />
              {variantField.sku && (
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
                      disabled
                      data-testid={`sku_${variantField.id}`}
                    />
                  )}
                />
              )}
              <button 
                type="button"
                onClick={() => removeVariant(index)}
                className={s.removeButton}
                data-testid={`property-delete-${index}`}
              >
                удалить
              </button>
            </div>
        )})}
      </div>

      <ButtonUI 
        variant="primary" 
        type="button"
        className={s.addButton}
        onClick={addVariant}
        data-testid="property-add-button"
      >
        + Добавить свойство
      </ButtonUI>
   
    </div>
  )
}