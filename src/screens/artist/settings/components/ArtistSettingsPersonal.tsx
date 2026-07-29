import { type FieldError, FormProvider, useForm } from "react-hook-form";



import { useSession } from "next-auth/react";



import { InputPhone } from "@/features/profile";



import { ButtonUI } from "@/shared/ui";
import { CustomInput, PasswordInput } from "@/shared/ui/CustomInput";



import { artistSettingsPersonalFields } from "../config/config";
import { registerRules } from "../config/validation";
import { type TArtistSettingsFieldValues } from "../model/artistSettings.types";
import styles from "../ui/ArtistSettingsPage.module.scss";







































































export const ArtistSettingsPersonal = () => {
  const fields = artistSettingsPersonalFields;

  const session = useSession();
  const userData = session.data?.user;
  const methods = useForm<TArtistSettingsFieldValues>({
    mode: "onChange",
    defaultValues: {
      email: userData?.email || "",
      phone: userData?.phone || "",
      password: "",
      repeatPassword: "",
    },
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  return (
    <section className={styles.artistSettingsPersonal}>
      <h3 className={styles.artistSettingsTitle}>Настройки профиля</h3>
      <FormProvider {...methods}>
        <form className={styles.artistSettingsPersonalForm}>
          <div className={styles.artistSettingsPersonalFormContent}>
            {fields.map((field) => {
              const fieldError = errors[field.name] as FieldError;
              /*const isFieldDisabled =
                  fieldsDisabled || disabledFields?.includes(field.name) || false;*/
              return (
                <div className={`cell-${field.row}-${field.column}`} key={field.name}>
                  {field.type === "tel" ? (
                    <InputPhone field={field} disabled={false} />
                  ) : field.type === "password" ? (
                    <PasswordInput
                      {...register(field.name, registerRules(field))}
                      id={`${field.row}.${field.column}`}
                      label={field.title}
                      placeholder={field.placeholder}
                      error={!!fieldError}
                      message={fieldError?.message}
                      //disabled={isFieldDisabled}
                      //aria-disabled={isFieldDisabled}
                      required={field.required}
                      aria-required={field.required}
                      style={{
                        height: "40px",
                      }}
                    />
                  ) : (
                    <CustomInput
                      {...register(field.name, registerRules(field))}
                      id={`${field.row}.${field.column}`}
                      type={field.type}
                      label={field.title}
                      placeholder={field.placeholder}
                      style={{
                        height: "40px",
                      }}
                      error={!!fieldError}
                      message={fieldError?.message}
                      //disabled={isFieldDisabled}
                      // aria-disabled={isFieldDisabled}
                      required={field.required}
                      aria-required={field.required}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.artistSettingsPersonalFormButtons}>
            <ButtonUI
              size='standart'
              variant='primary'
              //disabled={!isChecked || (errors && Object.keys(errors).length > 0)}
              type='submit'
            >
              Сохранить
            </ButtonUI>
            <ButtonUI
              size='standart'
              variant='secondary'
              //onClick={onEdit}
              //disabled={isOnChange}
              type='button'
            >
              Изменить
            </ButtonUI>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
