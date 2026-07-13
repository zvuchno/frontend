import { type RegisterOptions } from "react-hook-form";

import { type FieldValues } from "@/screens/order/model/types";

import { type TProfileFormField } from "@/features/profile";

import { validateDeliveryOption } from "@/shared/utils/validateDeliveryOption";
import { validatePersonalConsent } from "@/shared/utils/validatePersonalConsent";
import { validatePhone } from "@/shared/utils/validatePhone";

export const orderPersonalFormFields: TProfileFormField<FieldValues>[] = [
  {
    title: "Имя и фамилия",
    name: "full_name",
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
    name: "house",
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

export const orderCdekDeliveryFormFields: Partial<TProfileFormField<FieldValues>>[] = [
  {
    name: "delivery_point",
    type: "text",
    required: true,
  },
  {
    name: "tariffs",
    type: "text",
    required: true,
  },
];

export const errorsMessages = {
  requiredMessage: "Обязательное поле",
  minLengthMessage: "Min длина поля ",
  maxLengthMessage: "Max длина поля ",
  patternMessage: "Введите корректные данные",
};

export const fieldsConfig: {
  [K in keyof FieldValues]?: RegisterOptions<FieldValues, K>;
} = {
  full_name: {
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
    maxLength: 250,
  },
  street: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  house: {
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  apartment: {
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  delivery: {
    required: true,
    validate: (value, fields) => validateDeliveryOption(String(value), fields),
  },
  personal_data_consent: {
    required: true,
    validate: (value, fields) => validatePersonalConsent(value, fields),
  },
  tariffs: {
    required: true,
  },
  delivery_point: {
    required: true,
  },
  cdek_city_code: {
    required: true,
  },
};
