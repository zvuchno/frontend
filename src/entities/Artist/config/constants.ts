import { type TArtistSettingsFormField } from "../model/artistSettings.types";

export const artistSettingsFields: TArtistSettingsFormField[] = [
  { title: "Адрес пункта СДЕК", name: "pvz_address", type: "hidden", required: false },
  { title: "Город СДЕК", name: "pvz_city", type: "hidden", required: false },
  { title: "Код города СДЕК", name: "pvz_city_code", type: "hidden", required: false },
  {
    title: "Код пункта СДЕК",
    name: "pvz_code",
    type: "hidden",
    required: false,
  },
  {
    title: "Контакты поддержки",
    name: "support_email",
    placeholder: "support@email.ru",
    type: "email",
    required: false,
  },

  {
    title: "Адрес для возвратов",
    name: "returns_email",
    placeholder: "support@email.ru",
    type: "email",
    required: false,
  },
];
