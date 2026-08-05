import { type ChangeEvent } from "react";

import { type TArtistFormPersonalField } from "./types";

export const issuerCodeFormatter = (
  field: TArtistFormPersonalField,
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement, Element>
) => {
  if (field.name === "identity_data.passport_issued_by") {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) {
      e.target.value = `${value.slice(0, 3)}-${value.slice(3, 6)}`;
    } else {
      e.target.value = value;
    }
  }
};
