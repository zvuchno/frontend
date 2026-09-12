import { type TArtistSettingsFormField } from "../model/artistSettings.types";

export const artistSettingsFields: TArtistSettingsFormField[] = [
  { title: "Адрес пункта СДЕК", name: "shippingPoint.address", type: "hidden", required: false },
  { title: "Город СДЕК", name: "shippingPoint.city", type: "hidden", required: false },
  { title: "Код города СДЕК", name: "shippingPoint.city_code", type: "hidden", required: false },
  {
    title: "Код пункта СДЕК",
    name: "shippingPoint.pvz_code",
    type: "hidden",
    required: false,
  },
];
