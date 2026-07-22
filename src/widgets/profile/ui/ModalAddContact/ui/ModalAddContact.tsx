"use client";

import { useForm } from "react-hook-form";

import { ButtonUI, CustomInput, ModalUI, Title } from "@/shared/ui";

import { addContactFormFields, addLinkFormFields } from "../../../config/constants";
import { type ModalAddContactProps, type TFieldValues } from "../model/ModalAddContact.type";
import s from "./ModalAddContact.module.scss";

export const ModalAddContact = ({
  variant,
  isOpen,
  isSubmitting = false,
  onClose,
  onSubmit,
}: ModalAddContactProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const fieldSet = {
    contact: addContactFormFields,
    link: addLinkFormFields,
  };

  const fields = fieldSet[variant];

  const onSave = async (data: TFieldValues) => {
    if (onSubmit && typeof onSubmit === "function") {
      try {
        await onSubmit(data);
      } catch {
        return;
      }

      reset();
    }
  };

  return (
    <ModalUI onClose={onClose} isOpen={isOpen} closeButtonStyle='circledX'>
      <div className={s.container}>
        <form
          className={s.form}
          onSubmit={handleSubmit(onSave)}
        >
          <Title className={s.form__title} Tag='h5' variant='title'>
            {variant === "contact" ? "Добавление контакта" : "Добавление ссылки"}
          </Title>

          {fields.map((field) => {
            return (
              <CustomInput
                {...register(field.name, field.validation)}
                key={field.name}
                id={field.name}
                type={field.type}
                label={field.title}
                placeholder={field.placeholder}
                required={field.required}
                message={errors[field.name]?.message as string}
                error={!!errors[field.name]?.message}
                style={{
                  height: "40px",
                }}
              />
            );
          })}

          <ButtonUI
            size='small'
            variant='primary'
            type='submit'
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Добавление..." : "Сохранить"}
          </ButtonUI>
        </form>
      </div>
    </ModalUI>
  );
};
