import { CustomInput, PhoneInput, Typography } from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/CustomInput";

import {
  type FormErrors,
  type ListenerRegisterFormData,
} from "../../model/ListenerRegisterForm.types";
import s from "./ListenerRegisterFormContent.module.scss";

export const ListenerRegisterFormContent = ({
  data,
  disabled,
  errors,
  registerError,
  handleFieldChange,
}: {
  data: ListenerRegisterFormData;
  disabled: boolean;
  errors: FormErrors;
  registerError?: string;
  handleFieldChange: (
    field: keyof ListenerRegisterFormData
  ) => (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}) => {
  return (
    <div className={s.listenerRegisterFormContent}>
      <CustomInput
        id='login'
        label='Имя пользователя*'
        type='text'
        name='login'
        value={data.login}
        onChange={handleFieldChange("login")}
        placeholder='Текст'
        error={!!errors.login}
        message={errors.login}
        inputSize='small'
        disabled={disabled}
        maxLength={150}
      />

      <CustomInput
        id='email'
        label='Почта*'
        type='email'
        name='email'
        value={data.email}
        onChange={handleFieldChange("email")}
        placeholder='user@example.com'
        error={!!errors.email}
        message={errors.email}
        inputSize='small'
        disabled={disabled}
      />

      <PhoneInput
        id='phone'
        label='Телефон*'
        value={data.phone}
        onChange={handleFieldChange("phone")}
        hasError={!!errors.phone}
        errorMessage={errors.phone}
        inputSize='small'
        disabled={disabled}
      />

      <PasswordInput
        id='password'
        label='Пароль*'
        name='password'
        value={data.password}
        onChange={handleFieldChange("password")}
        placeholder='Длина пароля не менее 8 символов.......'
        error={!!errors.password}
        message={errors.password}
        disabled={disabled}
        autoComplete='new-password'
      />

      <PasswordInput
        id='confirmPassword'
        label='Повторите пароль*'
        name='confirmPassword'
        value={data.confirmPassword}
        onChange={handleFieldChange("confirmPassword")}
        placeholder=''
        error={!!errors.confirmPassword}
        message={errors.confirmPassword}
        disabled={disabled}
        autoComplete='new-password'
      />

      {registerError && (
        <Typography variant='normal' className={s.error}>
          {registerError}
        </Typography>
      )}
    </div>
  );
};
