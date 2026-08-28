import { CustomInput, Typography } from "@/shared/ui";

import s from "./BecomeArtistFormContent.module.scss";
import type { TBecomeArtistFormData } from "../model/types";
import { BecomeArtistConsents } from "./BecomeArtistConstans/BecomeArtistConstans";

export const BecomeArtistFormContent = ({
  data,
  disabled,
  //errors,
  registerError,
  currentUserType,
  handleFieldChange,
}: {
  data: TBecomeArtistFormData;
  disabled: boolean;
  //errors: FormErrors;
  registerError?: string;
  currentUserType?: "artist" | "listener";
  handleFieldChange: (
      field: keyof TBecomeArtistFormData
    ) => (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}) => {
  return (
    <div className={s.artistRegisterFormContent}>
      <CustomInput
        id='title'
        label='Название*'
        type='text'
        name='title'
        value={data.name}
        onChange={handleFieldChange("name")}
        placeholder='Текст'
        //error={!!errors.title}
        //message={errors.title}
        inputSize='small'
        disabled={disabled}
      />

      {currentUserType && currentUserType === "listener" && (
        <BecomeArtistConsents data={data} disabled={disabled} handleFieldChange={handleFieldChange} />
      )}

      {registerError && (
        <Typography variant='normal' className={s.error}>
          {registerError}
        </Typography>
      )}
    </div>
  );
};
