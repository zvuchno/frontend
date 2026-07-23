import { type ChangeEvent } from "react";

import { CustomInput, Typography } from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/CustomInput";

import { RememberMeOptions } from "../components/RememberMeOptions";
import { type AuthFormData } from "../model/AuthForm.types";
import s from "../ui/AuthForm.module.scss";

export const AuthFormFields = ({
  data,
  disabled,
  error,
  onFieldChange,
  setData,
}: {
  data: AuthFormData;
  disabled: boolean;
  error?: string;
  onFieldChange: (field: keyof AuthFormData) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setData: (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}) => (
  <div className={s.authFormContent}>
    <CustomInput
      id='email'
      label='Почта'
      type='email'
      name='email'
      value={data.email}
      onChange={onFieldChange("email")}
      placeholder='user@example.com'
      inputSize='small'
      disabled={disabled}
    />

    <PasswordInput
      id='password'
      label='Пароль'
      name='password'
      value={data.password}
      onChange={onFieldChange("password")}
      placeholder='••••••••'
      disabled={disabled}
    />

    <RememberMeOptions disabled={disabled} data={data} setData={setData} />

    {/* {mode === "register" && (
            <Input
              id="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="••••••••"
              error={!!errors.confirmPassword}
              message={errors.confirmPassword}
              inputSize="small"
              disabled={isLoading}
            />
          )} */}

    {/* {mode === "login" && (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: e.target.checked,
                  }))
                }
                disabled={isLoading}
                style={{ width: "16px", height: "16px", cursor: "pointer" }}
              />
              <span>Запомнить меня</span>
            </label>
          )} */}

    {error && (
      <Typography variant='normal' className={s.authErrorMessage}>
        {error}
      </Typography>
    )}
  </div>
);
