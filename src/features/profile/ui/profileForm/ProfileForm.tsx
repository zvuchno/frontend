import { FC } from "react";
import { TProfileFormField, TProfileFormUIProps } from "./types";
import styles from './profileForm.module.scss';
import { ButtonUI } from "@/shared/ui/button";
import { ProfileFormArtistUI } from "./profileFormArtist";
import { ProfileFormListenerUI } from "./profileFormListener";

const artistFormFields: TProfileFormField[] = [
    {
      title: 'Название',
      name: 'name',
      placeholder: 'Текст',
      type: 'text',
      required: true,
      row: 1,
      column: 1
    },
    {
      title: 'Email',
      name: 'email',
      placeholder: 'Текст',
      type: 'email',
      required: true,
      row: 1,
      column: 2
    },
    {
      title: 'Телефон',
      name: 'phone',
      placeholder: '+7(___)___-__-__',
      type: 'tel',
      required: true,
      row: 2,
      column: 1
    },
    {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      required: true,
      row: 2,
      column: 2
    },
    {
      title: 'Город',
      name: 'city',
      placeholder: 'Текст',
      type: 'text',
      required: true,
      row: 3,
      column: 1
    },
    {
      title: 'URL',
      name: 'url',
      placeholder: 'Текст',
      type: 'url',
      required: true,
      row: 3,
      column: 2
    },
  ]

const listenerFormFields: TProfileFormField[] = [
    {
      title: 'Имя и фамилия',
      name: 'name',
      placeholder: 'Текст',
      type: 'text',
      required: true,
      row: 1,
      column: 1
    },
    {
      title: 'Email',
      name: 'email',
      placeholder: 'Текст',
      type: 'email',
      required: true,
      row: 1,
      column: 2
    },
    {
      title: 'Телефон',
      name: 'phone',
      placeholder: '+7(___)___-__-__',
      type: 'tel',
      required: true,
      row: 2,
      column: 1
    },
    {
      title: 'Пароль',
      name: 'password',
      placeholder: '',
      type: 'password',
      required: true,
      row: 2,
      column: 2
    },
  ]

export const ProfileFormUI: FC<TProfileFormUIProps> = ({
  role,
  className,
  title = 'Профиль',
  isChecked = false,
  isProfileNew = true,
  isOnChange = true,
  errors,
  onSubmit,
  onEdit,
  ...restProps
}) => (
  <>
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>{title}</h3>
        <div className={styles.formContent}>
          {role === 'artist' && 
            <ProfileFormArtistUI 
              fields={artistFormFields} 
              errors={errors} 
              fieldsDisabled={(isProfileNew === true || isOnChange === true) ? false : true}  
            />
          }
          {role === 'listener' && 
            <ProfileFormListenerUI 
              fields={listenerFormFields} 
              errors={errors} 
              fieldsDisabled={(isProfileNew === true || isOnChange === true) ? false : true} 
            />
          }
        </div>
      </div>
      <div className={styles.formButtons}>
        <ButtonUI 
          size='standart' 
          variant='primary' 
          children={'Сохранить'}
          className={styles.formSubmitButton}
          disabled={!isChecked || errors && Object.keys(errors).length > 0}
          type='submit'
        />
        <ButtonUI 
          size='standart' 
          variant='secondary' 
          children={'Изменить'}
          className={styles.formChangeButton}
          onClick={onEdit}
          disabled={isProfileNew || isOnChange}
          type='button'
        />
      </div>
    </form>
  </>
)
