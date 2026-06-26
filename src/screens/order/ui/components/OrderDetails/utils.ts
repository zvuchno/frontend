import { type Validate } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { type TProfileFormField } from "@/features/profile";

import { validatePhone } from "@/shared/utils/validatePhone";

export const orderPersonalFormFields: TProfileFormField<FieldValues>[] = [
  {
    title: "Имя и фамилия",
    name: "fullName",
    placeholder: "Например, Иван Иванов",
    type: "text",
    required: true,
    row: 1,
    column: 1,
  },
  {
    title: "Email",
    name: "email",
    placeholder: "Напишите свою почту",
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
];

export const orderAddressFormFields: TProfileFormField<FieldValues>[] = [
  {
    title: "Город",
    name: "city",
    placeholder: "Москва",
    type: "text",
    required: true,
    row: 1,
    column: 1,
  },
  {
    title: "Улица",
    name: "street",
    placeholder: "ул. Ленина",
    type: "text",
    required: true,
    row: 1,
    column: 2,
  },
  {
    title: "Дом",
    name: "building",
    placeholder: "1",
    type: "text",
    required: true,
    row: 2,
    column: 1,
  },
  {
    title: "Квартира / офис ",
    name: "apartment",
    placeholder: "101",
    type: "text",
    required: false,
    row: 2,
    column: 2,
  },
];

export const errorsMessages = {
  requiredMessage: "Обязательное поле",
  minLengthMessage: "Min длина поля ",
  maxLengthMessage: "Max длина поля ",
  patternMessage: "Введите корректные данные",
};

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
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    validate: (value, fields) => validatePhone(value, fields),
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  street: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  building: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  apartment: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
};
