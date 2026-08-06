import { CustomInput, Typography } from "@/shared/ui";

import s from "./BecomeArtistFormContent.module.scss";

export const BecomeArtistFormContent = ({
  name,
  disabled,
  //errors,
  registerError,
  handleFieldChange,
}: {
  name: string;
  disabled: boolean;
  //errors: FormErrors;
  registerError?: string;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}) => {
  return (
    <div className={s.artistRegisterFormContent}>
      <CustomInput
        id='title'
        label='Название*'
        type='text'
        name='title'
        value={name}
        onChange={handleFieldChange}
        placeholder='Текст'
        //error={!!errors.title}
        //message={errors.title}
        inputSize='small'
        disabled={disabled}
      />

      {registerError && (
        <Typography variant='normal' className={s.error}>
          {registerError}
        </Typography>
      )}
    </div>
  );
};
