import { ButtonUI, LoadingButton, ModalUI, Title } from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/CustomInput";
import { FormProvider, useForm } from "react-hook-form";
import s from "./UpdatePasswordModal.module.scss";
import { useSetAccountPassword, useUpdateAccountPassword } from "@/entities/profile/model/useListenerProfile";
import { useState } from "react";
import type { TFormValues, UpdatePasswordModalProps } from "../model/types";
import toast from "react-hot-toast";

const initialValues: TFormValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

export const UpdatePasswordModal = ({
  isOpen,
  has_usable_password = false,
  onClose
}: UpdatePasswordModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<TFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset,
  } = methods;

  const updatePasswordMutation = useUpdateAccountPassword();
  const setPasswordMutation = useSetAccountPassword();

  const handleClose = () => {
    reset(initialValues);
    onClose();
  };

  const onSubmit = async (data: TFormValues) => {
    if (isSubmitting) return;
    setErrorMessage(null);

    try {
      if (has_usable_password && data.password) {
        // меняем существующий пароль
        await updatePasswordMutation.mutateAsync({
          old_password: data.password,
          new_password: data.newPassword,
          retype_new_password: data.confirmPassword,
        })

        toast.success("Пароль обновлён");
      } else if (!has_usable_password) {
        // устанавливаем пароль впервые
        await setPasswordMutation.mutateAsync({
          new_password: data.newPassword,
          retype_new_password: data.confirmPassword,
        })
        toast.success("Пароль установлен");
      }
      handleClose();

    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Не удалось обновить пароль"
      );
    } 
  };

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle="circledX" hasClickOnOverlay={false}>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Title className={s.title} Tag="h3">
            {has_usable_password ? "Изменение пароля" : "Установление пароля"}
          </Title>
          {has_usable_password && (
            <PasswordInput 
              id="password"
              label="Пароль"
              error={!!errors.password}
              message={errors.password?.message}
              messageSize="small"
              aria-required
              style={{
                height: "40px",
              }}
              {...register("password", {
                required: "Введите текущий пароль",
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
                maxLength: {
                  value: 50,
                  message: "Максимум 50 символов",
                },
                pattern: {
                  value: /^[a-zA-Z0-9!@#$%^&*()_+\-={};':"\\|,.<>\/?`~]*$/,
                  message: "Допустимы только латинские буквы, цифры, спецсимволы (без пробелов)"
                } 
              })}
            />
          )}
          <PasswordInput 
            id='newPassword'
            label={has_usable_password ? "Новый пароль" : "Пароль"}
            error={!!errors.newPassword}
            message={errors.newPassword?.message}
            messageSize="small"
            aria-required
            style={{
              height: "40px",
            }}
            {...register("newPassword", {
              required: "Введите новый пароль",
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()_+\-={};':"\\|,.<>\/?`~]*$/,
                message: "Допустимы только латинские буквы, цифры, спецсимволы (без пробелов)"
              },
              validate: (value, formValues) => {
                if (formValues.confirmPassword && value !== formValues.confirmPassword) {
                  return "Пароли не совпадают";
                }
                return true;
              }
            })}
          />
          <PasswordInput 
            id="confirmPassword"
            label="Повторите пароль"
            error={!!errors.confirmPassword}
            message={errors.confirmPassword?.message}
            messageSize="small"
            aria-required
            style={{
              height: "40px",
            }}
            {...register("confirmPassword", {
              required: "Повторите новый пароль",
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
              maxLength: {
                value: 50,
                message: "Максимум 50 символов",
              },
              pattern: {
                value: /^[a-zA-Z0-9!@#$%^&*()_+\-={};':"\\|,.<>\/?`~]*$/,
                message: "Допустимы только латинские буквы, цифры, спецсимволы (без пробелов)"
              },
              validate: (value, formValues) => {
                if (value !== formValues.newPassword) {
                  return "Пароли не совпадают";
                }
                return true;
              }
            })}
          />

          {errorMessage && <p className={s.formError}>{errorMessage}</p>}

          <ButtonUI 
            variant="primary" 
            type="submit" 
            className={s.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingButton /> : "Сохранить"}
          </ButtonUI>
        </form>
      </FormProvider>
    </ModalUI>
  )
};