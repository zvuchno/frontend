import { type SubmitHandler, type UseFieldArrayReplace } from "react-hook-form";
import toast from "react-hot-toast";

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
  const { mutateAsync: managePickupPoint } = useManageArtistPickupPoint();
  const { mutateAsync: manageCdekOffice } = useManageArtistPvzOffice();

  const { mutateAsync: handleOfficeDelete } = useDeleteArtistPvzOffice();

  return async (values) => {
    try {
      if (!values.shippingPoint?.pvz_code) {
        await handleOfficeDelete();
      } else {
        //  запрос на изменение shipping-point

        await manageCdekOffice({
          enabled: values.shipping_enabled,
          point: values.shippingPoint,
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
      await managePickupPoint(
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

      toast.success("Настройки доставки успешно обновлены");
    } catch {
      toast.error("Не удалось сохранить все настройки доставки. Повторите попытку");
    }
  };
};
