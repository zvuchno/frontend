import {
  type SubmitHandler,
  type UseFieldArrayReplace,
  type UseFormSetValue,
} from "react-hook-form";

import {
  type TArtistSettingsFieldValues,
  type TPVZOfficeMe,
  type TPickupPointForm,
  type TPickupPointMe,
  type TSupportSettings,
  useAddArtistPickupPoint,
  useChangeArtistPickupPoint,
  useCreateArtistPvzOffice,
  useManageArtistSupportContacts,
} from "@/entities/Artist";

interface UseArtistSettingsSubmitParams {
  initialCdek?: TPVZOfficeMe;
  initialPickup?: TPickupPointMe[];
  initialContacts?: TSupportSettings;
  replacePickupPoints: UseFieldArrayReplace<TArtistSettingsFieldValues, "pickupPoints">;
  setValue: UseFormSetValue<TArtistSettingsFieldValues>;
}

const isPointChanged = (point: TPickupPointForm, initial?: TPickupPointMe) =>
  point.address !== initial?.address ||
  point.pickup_date !== initial?.pickup_date ||
  point.is_active !== initial?.is_active;

export const useArtistSettingsSubmit = ({
  initialCdek,
  initialPickup,
  initialContacts,
  replacePickupPoints,
  setValue,
}: UseArtistSettingsSubmitParams): SubmitHandler<TArtistSettingsFieldValues> => {
  const { mutate: addPickupPoint } = useAddArtistPickupPoint();
  const { mutate: changePickupPoint } = useChangeArtistPickupPoint();
  const { mutate: addCdekOffice } = useCreateArtistPvzOffice();
  const { mutate: manageContacts } = useManageArtistSupportContacts();

  return (values) => {
    const cdekChanged =
      values.pvz_code && (!initialCdek || values.pvz_code !== initialCdek.pvz_code);

    if (cdekChanged) {
      addCdekOffice({
        address: values.pvz_address,
        city: values.pvz_city,
        city_code: values.pvz_city_code,
        pvz_code: values.pvz_code,
      });
    }

    const contactsChanged =
      values.returns_email !== initialContacts?.returns_email ||
      values.support_email !== initialContacts?.support_email;

    if (contactsChanged) {
      manageContacts({
        returns_email: values.returns_email,
        support_email: values.support_email,
      });
    }

    const allPoints = values.pickupPoints ?? [];
    const pointsToSave = allPoints.filter((point) => Boolean(point.address?.trim()));

    if (pointsToSave.length !== allPoints.length) {
      replacePickupPoints(pointsToSave);
    }

    pointsToSave.forEach((point, index) => {
      if (point.server_id === undefined) {
        addPickupPoint(
          {
            address: point.address,
            pickup_date: point.pickup_date,
            is_active: point.is_active,
          },
          {
            onSuccess: (created) => {
              if (created.id !== undefined) {
                setValue(`pickupPoints.${index}.server_id`, created.id);
              }
            },
          }
        );
        return;
      }

      const initial = initialPickup?.find(({ id }) => id === point.server_id);

      if (isPointChanged(point, initial)) {
        changePickupPoint({
          id: point.server_id,
          address: point.address,
          pickup_date: point.pickup_date,
          is_active: point.is_active,
        });
      }
    });
  };
};
