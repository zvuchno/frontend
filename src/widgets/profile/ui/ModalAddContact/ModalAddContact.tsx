'use client';

import { ModalUI } from "@/shared/ui/modal";
import { ModalAddContactProps, TFieldValues } from "./ModalAddContact.type";
import { Title } from "@/shared/ui/Typography/Typography";
import Input from "@/shared/ui/Input/Input";
import { ButtonUI } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { addContactFormFields, addLinkFormFields } from "../../utils/constants";
import s from './ModalAddContact.module.scss';

const ModalAddContact = ({variant, isOpen, onClose, onSubmit}: ModalAddContactProps) => {

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });

  const fieldSet = {
    'contact': addContactFormFields,
    'link': addLinkFormFields
  };

  const fields = fieldSet[variant];

  const onSave = (data: TFieldValues) => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(data);
      reset();
    }
  };

  return (
    <ModalUI onClose={onClose} isOpen={isOpen} closeButtonStyle="circledX">

      <div className={s.container}>

        <form className={s.form} onSubmit={handleSubmit(onSave)}>
          <Title className={s.form__title} Tag="h5" variant="title">
            {variant === 'contact' ? 'Добавление контакта' : 'Добавление ссылки'}
          </Title>

          {fields.map((field) => {
            return (
              <Input
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
                  height: '40px'
                }}
              />
            )
          })}

          <ButtonUI
            size="small"
            variant="primary"
            children={'Сохранить'}
            type="submit"
            disabled={!isValid}
          />
        </form>

      </div>

    </ModalUI>
  )
};

export default ModalAddContact;