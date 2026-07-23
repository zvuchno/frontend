import { ButtonUI } from "@/shared/ui";

import { type AuthFormData } from "../model/AuthForm.types";
import { LoadingButton } from "./LoadingButton";

export const PrimaryButton = ({
  isLoading,
  mode,
  formData,
}: {
  isLoading: boolean;
  mode: string;
  formData: AuthFormData;
}) => (
  <ButtonUI
    variant='primary'
    type='submit'
    size='small'
    disabled={isLoading || !(formData.email && formData.password)}
  >
    {isLoading ? <LoadingButton /> : mode === "login" ? "Войти" : "Зарегистрироваться"}
  </ButtonUI>
);
