<<<<<<< Updated upstream
import { type FieldError, useFormContext } from "react-hook-form";

import { CustomInput } from "@/shared/ui";

import { listenerFormFields } from "../../../utils/constants";
import { registerRules } from "../../../utils/validation";
import { InputPhone } from "../inputPhone";
import { type FieldValues, type TProfileFormFieldsProps } from "../types";
import styles from "./profileFormListener.module.scss";

=======
import { FieldValues, TProfileFormFieldsProps } from "../types";
import styles from "./profileFormListener.module.scss";
import { CustomInput } from "@/shared/ui";
import { FieldError, useFormContext } from "react-hook-form";
import { listenerFormFields } from "@/features/profile/utils/constants";
import { InputPhone } from "../inputPhone";
import { registerRules } from "@/features/profile/utils/validation";

>>>>>>> Stashed changes
export const ProfileFormListenerUI = ({
  fieldsDisabled = false,
  disabledFields,
}: TProfileFormFieldsProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
  const fields = listenerFormFields;

  return (
    <div className={styles.listenerForm}>
      {fields.map((field) => {
        const fieldError = errors[field.name] as FieldError;
        const isFieldDisabled = fieldsDisabled || disabledFields?.includes(field.name) || false;
        return (
          <div className={`cell-${field.row}-${field.column}`} key={field.name}>
            {field.type === "tel" ? (
              <InputPhone field={field} disabled={isFieldDisabled} />
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
                disabled={isFieldDisabled}
                aria-disabled={isFieldDisabled}
                required={field.required}
                aria-required={field.required}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
