import { type Validate } from "react-hook-form";

import { type TProfileFormField } from "@/features/profile/";

import { validatePhone } from "@/shared/utils/validatePhone";

import { type TArtistSettingsFieldValues } from "../model/artistSettings.types";

export const artistSettingsPersonalFields: TProfileFormField<TArtistSettingsFieldValues>[] = [
  {
    title: "Email",
    name: "email",
    placeholder: "zvuchno@gmail.com",
    type: "email",
    required: false,
    row: 1,
    column: 1,
  },
  {
    title: "Телефон",
    name: "phone",
    placeholder: "+7(___)___-__-__",
    type: "tel",
    required: false,
    row: 1,
    column: 2,
  },
  {
    title: "Новый пароль",
    name: "password",
    placeholder: "",
    type: "password",
    required: false,
    row: 3,
    column: 1,
  },
  {
    title: "Повторите пароль",
    name: "repeatPassword",
    placeholder: "",
    type: "password",
    required: false,
    row: 2,
    column: 2,
  },
];

export const artistSettingsFieldsConfig: Record<
  keyof TArtistSettingsFieldValues,
  {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: Validate<string | undefined, TArtistSettingsFieldValues>;
  }
> = {
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
    pattern: /^(?=\S{8,}$)[a-zA-Z0-9\W]*$/,
  },
  repeatPassword: {
    required: true,
    minLength: 8,
    maxLength: 50,
    pattern: /^(?=\S{8,}$)[a-zA-Z0-9\W]*$/,
  },
};
