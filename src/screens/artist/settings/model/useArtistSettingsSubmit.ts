import { type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import {
  type TArtistSettingsFieldValues,
  type TPickupSettings,
  type TShippingSettings,
  useDeleteArtistPvzOffice,
  useManageArtistPickupPoint,
  useManageArtistPvzOffice,
} from "@/entities/Artist";

export const useArtistSettingsSubmit = ({
  initialPickup,
  onSuccess,
}: {
  initialPickup: TPickupSettings;
  onSuccess: () => void;
}): SubmitHandler<TArtistSettingsFieldValues> => {
  const queryClient = useQueryClient();
  const { mutateAsync: managePickupPoint } = useManageArtistPickupPoint();
  const { mutateAsync: manageCdekOffice } = useManageArtistPvzOffice();

  const { mutateAsync: handleOfficeDelete } = useDeleteArtistPvzOffice();

  return async (values) => {
    try {
      let savedShippingSettings: TShippingSettings;

      if (!values.shippingPoint?.pvz_code) {
        await handleOfficeDelete();
        savedShippingSettings = { enabled: false, point: null };
      } else {
        savedShippingSettings = await manageCdekOffice({
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
      const savedPickup = await managePickupPoint({
        enabled: values.pickup_enabled,
        points: [...points, ...deletedPoints],
      });

      queryClient.setQueryData<TShippingSettings | null>(["artist-pvz"], savedShippingSettings);
      queryClient.setQueryData<TPickupSettings>(["artist-pickup-points"], savedPickup);

      toast.success("Настройки доставки успешно обновлены");
      onSuccess();
    } catch {
      toast.error("Не удалось сохранить все настройки доставки. Повторите попытку");
    }
  };
};
