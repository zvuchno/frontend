import { Validate } from "react-hook-form"
import { TProfileFormField, FieldValues } from "../ui/profileForm/types"
import { validatePhone } from "./validation"

export const artistFormFields: TProfileFormField[] = [
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

export const listenerFormFields: TProfileFormField[] = [
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
    required: false,
    row: 2,
    column: 2
  },
]

export const errorsMessages = {
  requiredMessage: 'Обязательное поле',
  minLengthMessage: 'Min длина поля ',
  maxLengthMessage: 'Max длина поля ',
  patternMessage: 'Введите корректные данные'
}

export const fieldsConfig: Record<keyof FieldValues, {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: Validate<string | undefined, FieldValues>;
}> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    required: true,
    validate: validatePhone,
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 50
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  url: {
    required: true,
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  }
}

