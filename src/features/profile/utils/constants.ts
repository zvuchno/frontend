import { type Validate } from "react-hook-form";

import { validatePhone } from "@/shared/utils/validatePhone";

import { type FieldValues, type TProfileFormField } from "../ui/profileForm/types";

export const artistFormFields: TProfileFormField[] = [
  {
    title: "Название",
    name: "name",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 1,
    column: 1,
  },
  {
    title: "Город",
    name: "city",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 1,
    column: 2,
  },
  {
    title: "Описание",
    name: "description",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 2,
    column: 1,
  },
  // {
  //   title: "Email",
  //   name: "email",
  //   placeholder: "Текст",
  //   type: "email",
  //   required: true,
  //   row: 1,
  //   column: 2,
  // },
  // {
  //   title: "Телефон",
  //   name: "phone",
  //   placeholder: "+7(___)___-__-__",
  //   type: "tel",
  //   required: true,
  //   row: 2,
  //   column: 1,
  // },
  // {
  //   title: "Пароль",
  //   name: "password",
  //   placeholder: "",
  //   type: "password",
  //   required: false,
  //   row: 2,
  //   column: 2,
  // },
  
  {
    title: "URL артиста",
    name: "url",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 2,
    column: 2,
  },
];

export const listenerFormFields: TProfileFormField[] = [
  {
    title: "Имя и фамилия",
    name: "name",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 1,
    column: 1,
  },
  {
    title: "Email",
    name: "email",
    placeholder: "Текст",
    type: "email",
    required: true,
    row: 1,
    column: 2,
  },
  {
    title: "Телефон",
    name: "phone",
    placeholder: "+7(___)___-__-__",
    type: "tel",
    required: true,
    row: 2,
    column: 1,
  },
  {
    title: "Имя пользователя",
    name: "userName",
    placeholder: "Текст",
    type: "text",
    required: true,
    row: 2,
    column: 2,
  },
  {
    title: "Пароль",
    name: "password",
    placeholder: "",
    type: "password",
    required: false,
    row: 3,
    column: 1,
  },
  {
    title: "Старый пароль",
    name: "oldPassword",
    placeholder: "",
    type: "password",
    required: false,
    row: 3,
    column: 2,
  },
];

export const fieldsConfig: Record<
  keyof FieldValues,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<string | undefined, FieldValues>;
  }
> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  userName: {
    required: true,
    pattern: /^[а-яА-Яa-zA-Z0-9@./\-_+]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    validate: (value, fields) => validatePhone(value, fields),
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 50,
    pattern: /^(?=\S{8,}$)[a-zA-Z0-9\W]*$/
  },
  oldPassword: {
    required: true,
    minLength: 8,
    maxLength: 50,
    pattern: /^(?=\S{8,}$)[a-zA-Z0-9\W]*$/
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 250,
  },
  url: {
    required: true,
    pattern:
      /^(?:[a-z0-9]+(?:[-_][a-z0-9]+)*|(?:https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?)$/i,
  },
  description: {
    required: false,
    minLength: 3,
    maxLength: 3000
  }
};
