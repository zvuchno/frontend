import { type SubmitHandler, type UseFieldArrayReplace } from "react-hook-form";

import {
  type TArtistSettingsFieldValues,
  type TPickupSettings,
  useDeleteArtistPvzOffice,
  useManageArtistPickupPoint,
  useManageArtistPvzOffice,
} from "@/entities/Artist";

export const useArtistSettingsSubmit = ({
  initialPickup,
  replacePickupPoints,
}: {
  initialPickup?: TPickupSettings;
  replacePickupPoints: UseFieldArrayReplace<TArtistSettingsFieldValues, "pickupPoints">;
}): SubmitHandler<TArtistSettingsFieldValues> => {
  const { mutate: managePickupPoint } = useManageArtistPickupPoint();
  const { mutate: manageCdekOffice } = useManageArtistPvzOffice();

  const { mutateAsync: handleOfficeDelete } = useDeleteArtistPvzOffice();

  //  запрос на изменение shipping-point
  return (values) => {
    if (!values.shippingPoint?.pvz_code) {
      void handleOfficeDelete();
    } else {
      manageCdekOffice({
        enabled: values.shipping_enabled,
        point: {
          address: values.shippingPoint?.address,
          city: values.shippingPoint?.city,
          city_code: values.shippingPoint?.city_code,
          pvz_code: values.shippingPoint?.pvz_code,
        },
      });
    }

    const points = (values.pickupPoints ?? []).map(({ server_id, ...point }) => ({
      ...point,
      id: server_id,
    }));
    const remainingIds = new Set(points.map((point) => point.id));
    const deletedPoints = (initialPickup?.points ?? [])
      .filter((point) => point.id !== undefined && !remainingIds.has(point.id))
      .map((point) => ({ ...point, is_active: false }));

    //  запрос на изменение pickup-points
    managePickupPoint(
      { enabled: values.pickup_enabled, points: [...points, ...deletedPoints] },
      {
        onSuccess: (result) => {
          if (result.points) {
            replacePickupPoints(
              result.points
                .filter((point) => point.is_active !== false)
                .map(({ id, ...point }) => ({ ...point, server_id: id }))
            );
          }
        },
      }
    );
  };
};
