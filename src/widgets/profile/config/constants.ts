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
        value: 2,
        message: "Min 2, max 20 символов",
      },
      maxLength: {
        value: 20,
        message: "Максимум 20 символов",
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
        value: 2,
        message: "Min 2, max 20 символов",
      },
      maxLength: {
        value: 20,
        message: "Максимум 20 символов",
      },
      pattern: {
        value: /^(?=.*\S)[а-яА-Яa-zA-Z0-9@./\-_+\s]{2,50}$/,
        message: "Введите корректное наименование",
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
        value: /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
        message: "Введите корректный адрес ссылки",
      },
    },
  },
];
