import { TAddContactFormField } from "../ui/ModalAddContact/ModalAddContact.type";

export const addContactFormFields: TAddContactFormField[] = [
  {
    title: 'Название',
    name: 'name',
    placeholder: 'Букинг',
    type: 'text',
    required: false,
    validation: {
      minLength: {
        value: 2,
        message: 'Минимум 2 символа'
      },
      maxLength: {
        value: 50,
        message: 'Максимум 50 символов'
      }
    }
  },
  {
    title: 'Адрес',
    name: 'email',
    placeholder: 'booking@gmaol.com',
    type: 'email',
    required: false,
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Введите корректный email'
      }
    }
  }
];

export const addLinkFormFields: TAddContactFormField[] = [
  {
    title: 'Название',
    name: 'name',
    placeholder: 'Букинг',
    type: 'text',
    required: false,
    validation: {
      minLength: {
        value: 2,
        message: 'Минимум 2 символа'
      },
      maxLength: {
        value: 50,
        message: 'Максимум 50 символов'
      }
    }
  },
  {
    title: 'URL',
    name: 'url',
    placeholder: 'booking@gmaol.com',
    type: 'url',
    required: false,
    validation: {
      pattern: {
        value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        message: 'Введите корректный адрес ссылки'
      }
    }
  }
];