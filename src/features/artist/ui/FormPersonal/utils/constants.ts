import { Validate } from "react-hook-form";
import { FieldName, FieldValues, TArtistFormPersonalField } from "../types";

export const artistPersonalMainFields: TArtistFormPersonalField[] = [
  {
    title: 'Фамилия',
    name: 'lastName',
    placeholder: 'Иванов',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 1
  },
  {
    title: 'Имя',
    name: 'firstName',
    placeholder: 'Иван',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 2
  },
  {
    title: 'Отчество',
    name: 'middleName',
    placeholder: 'Иванович',
    type: 'text',
    required: false,
    disabled: false,
    row: 2,
    column: 1
  },
  {
    title: 'Дата рождения',
    name: 'birthDate',
    placeholder: 'дд.мм.гггг',
    type: 'date',
    required: true, 
    disabled: false,
    row: 2,
    column: 2
  },
  {
    title: 'Адрес регистрации', 
    name: 'adress',
    placeholder: 'Москва',
    type: 'text',
    required: true,
    disabled: false,
    row: 3,
    column: 1
  }
]

export const artistPersonalPasportFields: TArtistFormPersonalField[] = [
  {
    title: 'Паспорт серия',
    name: 'passport.series',
    placeholder: '1111',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 1,
    maxLength: 4,
    minLength: 4
  },
  {
    title: 'Паспорт номер',
    name: 'passport.number',
    placeholder: '111111',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 2,
    maxLength: 6,
    minLength: 6
  },
  {
    title: 'Код подразделения',
    name: 'passport.issuerCode',
    placeholder: '111-111',
    type: 'text',
    required: true,
    disabled: false,
    row: 2,
    column: 1,
    maxLength: 7,
    minLength: 7
  },
  {
    title: 'Дата выдачи паспорта',
    name: 'passport.issueDate',
    placeholder: 'дд.мм.гггг',
    type: 'date',
    required: true,
    disabled: false,
    row: 2,
    column: 2
  }
]

export const artistPersonalPaymentFields: TArtistFormPersonalField[] = [
  {
    title: 'ИНН',
    name: 'paymentDetails.taxId',
    placeholder: '0123456789',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 1,
    maxLength: 12,
    minLength: 10
  },
  {
    title: 'Название банка',
    name: 'paymentDetails.bankName',
    placeholder: 'Название банка',
    type: 'text',
    required: true,
    disabled: false,
    row: 1,
    column: 2
  },
  {
    title: 'БИК',
    name: 'paymentDetails.bic',
    placeholder: '123456789',
    type: 'text',
    required: true,
    disabled: false,
    row: 2,
    column: 1,
    maxLength: 9,
    minLength: 9
  },
  {
    title: 'Корреспондентский счет',
    name: 'paymentDetails.correspondentAccount',
    placeholder: '30100000000000000000',
    type: 'text',
    required: true,
    disabled: false,
    row: 2,
    column: 2,
    maxLength: 20,
    minLength: 20
  },
   {
    title: 'Расчетный счет',
    name: 'paymentDetails.account',
    placeholder: '00000000000000000000',
    type: 'text',
    required: true,
    disabled: false,
    row: 3,
    column: 1,
    maxLength: 20,
    minLength: 20
  },
  {
    title: 'Форма налогообложения',
    name: 'paymentDetails.taxSystem',
    placeholder: 'Выберите из справочника',
    type: 'text',
    required: true,
    disabled: false,
    row: 3,
    column: 2
  }
]

export const errorsMessages = {
  requiredMessage: 'Обязательное поле',
  minLengthMessage: 'Min длина поля ',
  maxLengthMessage: 'Max длина поля ',
  patternMessage: 'Введите корректные данные',
  referenceBookMessage: 'Выберите значение из справочника'
}



export const fieldsConfig: Record<FieldName, {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: Validate<string | undefined, FieldValues>;
}> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  middleName: {
    required: false,
    minLength: 2,
    maxLength: 50
  },
  birthDate: {
    required: true,
    validate: (value: any) => value instanceof Date && !isNaN(value.getTime())
  },
  adress: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  "passport.series": {
    required: true,
    pattern: /^(\d{4})$/
  },
  "passport.number": {
    required: true,
    pattern: /^(\d{6})$/
  },
  "passport.issuerCode": {
    required:  true,
    pattern: /^\d{3}-\d{3}$/
  },
  "passport.issueDate": {
    required: true,
    validate: (value: any) => value instanceof Date && !isNaN(value.getTime()),
  },
  "paymentDetails.taxId": {
    required: true,
    pattern: /^(\d{10}|\d{12})$/
  },
  "paymentDetails.bankName": {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  "paymentDetails.bic": {
    required: true,
    pattern: /^(\d{9})$/
  },
  "paymentDetails.correspondentAccount": {
    required: true,
    pattern: /^(\d{20})$/
  },
  "paymentDetails.account": {
    required: true,
    pattern: /^(\d{20})$/
  },
  "paymentDetails.taxSystem": {
    required: true,
    minLength: 2,
    maxLength: 50
  },
}


export const taxSystem = [
  "ИП (ОСНО)",
  "ИП (УСН - Доход)",
  "ИП (УСН - Доход минус Расход)",
  "ИП (ЕСХН)",
  "ИП (ПСН)",
  "ИП (АУСН)",
  "ИП (НПД)",
  "ООО (ОСНО)",
  "ООО (УСН - Доход)",
  "ООО (УСН - Доход минус Расход)",
  "ООО (ЕСХН)",
  "ООО (АУСН)"
];