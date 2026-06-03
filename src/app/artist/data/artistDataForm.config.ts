import type {
  ArtistDataFieldGroup,
  ArtistDataFormValues,
  ArtistDataValidation,
} from "./artistDataForm.types";

const validationMessages = {
  required: "Заполните поле",
  date: "Введите дату в формате дд.мм.гггг",
};

export const defaultArtistData: ArtistDataFormValues = {
  lastName: "Иванов",
  firstName: "Иван",
  middleName: "Иванович",
  birthDate: "",
  registrationAddress: "Москва",
  passportSeries: "1234",
  passportNumber: "123456",
  departmentCode: "123-456",
  passportIssueDate: "",
  inn: "123456789012",
  bankName: "Название банка",
  bik: "123456789",
  correspondentAccount: "30100000000000000000",
  checkingAccount: "40700000000000000000",
  taxSystem: "ИП",
};

const requiredText: ArtistDataValidation = {
  required: validationMessages.required,
};

const dateValidation: ArtistDataValidation = {
  ...requiredText,
  pattern: {
    value: /^\d{2}\.\d{2}\.\d{4}$/,
    message: validationMessages.date,
  },
};

export const artistDataFieldGroups: ArtistDataFieldGroup[] = [
  {
    id: "identity",
    fields: [
      {
        name: "lastName",
        label: "Фамилия",
        placeholder: "Иванов",
        autoComplete: "family-name",
        validation: requiredText,
      },
      {
        name: "firstName",
        label: "Имя",
        placeholder: "Иван",
        autoComplete: "given-name",
        validation: requiredText,
      },
      {
        name: "middleName",
        label: "Отчество",
        placeholder: "Иванович",
        autoComplete: "additional-name",
      },
      {
        name: "birthDate",
        label: "Дата рождения",
        placeholder: "дд.мм.гггг",
        autoComplete: "bday",
        validation: dateValidation,
      },
      {
        name: "registrationAddress",
        label: "Адрес регистрации",
        placeholder: "Москва",
        autoComplete: "street-address",
        wide: true,
        validation: requiredText,
      },
    ],
  },
  {
    id: "passport",
    fields: [
      {
        name: "passportSeries",
        label: "Паспорт серия",
        placeholder: "1234",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{4}$/,
            message: "Введите 4 цифры",
          },
        },
      },
      {
        name: "passportNumber",
        label: "Паспорт номер",
        placeholder: "123456",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{6}$/,
            message: "Введите 6 цифр",
          },
        },
      },
      {
        name: "departmentCode",
        label: "Код подразделения",
        placeholder: "123-456",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{3}-\d{3}$/,
            message: "Введите код в формате 000-000",
          },
        },
      },
      {
        name: "passportIssueDate",
        label: "Дата выдачи паспорта",
        placeholder: "дд.мм.гггг",
        validation: dateValidation,
      },
    ],
  },
  {
    id: "payment",
    fields: [
      {
        name: "inn",
        label: "ИНН",
        placeholder: "123456789012",
        validation: {
          ...requiredText,
          pattern: {
            value: /^(?:\d{10}|\d{12})$/,
            message: "Введите 10 или 12 цифр",
          },
        },
      },
      {
        name: "bankName",
        label: "Название банка",
        placeholder: "Название банка",
        autoComplete: "organization",
        validation: requiredText,
      },
      {
        name: "bik",
        label: "БИК",
        placeholder: "123456789",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{9}$/,
            message: "Введите 9 цифр",
          },
        },
      },
      {
        name: "correspondentAccount",
        label: "Корреспондентский счет",
        placeholder: "30100000000000000000",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{20}$/,
            message: "Введите 20 цифр",
          },
        },
      },
      {
        name: "checkingAccount",
        label: "Расчетный счет",
        placeholder: "40700000000000000000",
        validation: {
          ...requiredText,
          pattern: {
            value: /^\d{20}$/,
            message: "Введите 20 цифр",
          },
        },
      },
      {
        name: "taxSystem",
        label: "Форма налогообложения",
        placeholder: "ИП / СМЗ / Юридическое лицо",
        validation: {
          ...requiredText,
          pattern: {
            value:
              /^(ИП|СМЗ|Юридическое лицо|individual_entrepreneur|self_employed|legal_entity)$/i,
            message: "Введите ИП, СМЗ или Юридическое лицо",
          },
        },
      },
    ],
  },
];
