import { create } from "zustand";

export type TDeliveryAddress = {
  city?: string;
  cityCode?: string;
  cityId?: string;
  street?: string;
  streetId?: string;
  house?: string;
  houseId?: string;
  apartment?: string;
};

type CourierDeliveryAddressProps = {
  address: TDeliveryAddress;
  setAddress: (fieldName: keyof TDeliveryAddress, value: string) => void;
  clearAddressField: (fieldName: keyof TDeliveryAddress) => void;
  clearAddress: () => void;
};

export const useCourierDeliveryAddressStore = create<CourierDeliveryAddressProps>()((set) => ({
  address: {
    city: "",
    cityCode: "",
    cityId: "",
    street: "",
    streetId: "",
    house: "",
    houseId: "",
    apartment: "",
  },

  setAddress: (fieldName, value) =>
    set((state) => ({
      address: {
        ...state.address,
        [fieldName]: value,
      },
    })),

  clearAddressField: (fieldName) =>
    set((state) => ({
      address: {
        [fieldName]: "",
        ...state.address,
      },
    })),

  clearAddress: () =>
    set({
      address: {
        city: "",
        street: "",
        house: "",
        apartment: "",
      },
    }),
}));
