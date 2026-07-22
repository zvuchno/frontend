import { type TAddContactFormField } from "../ui/ModalAddContact/model/ModalAddContact.type";

export const addContactFormFields: TAddContactFormField[] = [
  {
    title: "Название",
    name: "name",
    placeholder: "Букинг",
    type: "text",
    required: false,
    validation: {
      minLength: {
        value: 3,
        message: "Минимум 3 символа",
      },
      maxLength: {
        value: 50,
        message: "Максимум 50 символов",
      },
    },
  },
  {
    title: "Адрес",
    name: "email",
    placeholder: "booking@gmail.com",
    type: "email",
    required: false,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Введите корректный email",
      },
    },
  },
];

export const addLinkFormFields: TAddContactFormField[] = [
  {
    title: "Название",
    name: "name",
    placeholder: "ВКонтакте",
    type: "text",
    required: false,
    validation: {
      minLength: {
        value: 3,
        message: "Минимум 3 символа",
      },
      maxLength: {
        value: 50,
        message: "Максимум 50 символов",
      },
    },
  },
  {
    title: "URL",
    name: "url",
    placeholder: "https://example.com",
    type: "url",
    required: false,
    validation: {
      pattern: {
        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        message: "Введите корректный адрес ссылки",
      },
    },
  },
];
