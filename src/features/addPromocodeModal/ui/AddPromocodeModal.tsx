import { useShowcaseArtistId } from "@/entities/Artist/store/useShowcaseStore";
import { AddPromocodeForm } from "../components/addPromocodeForm";
import type { PromocodeFormValues, AddPromocodeModalProps } from "../model/types";
import { TCreatePromocodeRequest, useCreatePromocode, useDetailPromocode, useUpdatePromocode } from "@/entities/Artist";
import { useEffect, useMemo, useState } from "react";
import { mapPromoDirtyFieldsToPayload, toDateOnlyString } from "@/features/showcaseUpload";
import { FormProvider, useForm } from "react-hook-form";
import { useGetManagedProfiles } from "@/entities/Label";
import toast from "react-hot-toast";
import { ModalUI } from "@/shared/ui";

const initialFormValues: PromocodeFormValues = {
  code: "",
  discountValue: null,
  description: "",
  limit: null,
  startAt: "",
  endAt: "",
};

export const AddPromocodeModal = ({ isOpen, profileType, id, onClose }: AddPromocodeModalProps) => {
  // id текущего артиста/лейбла
  const currentArtistId = useShowcaseArtistId();

  // данные промокода, получаемые, если перешли для редактирования
  const { data, isLoading, error } = useDetailPromocode(id);
  const [formError, setFormError] = useState<string | null>(null);

  const isEditForm = !!id;

  const initialValues = useMemo(() => {
    if (!id || !data) {
      return initialFormValues;
    }
    return {
      code: data.code,
      description: data.description ?? "",
      limit: data.usage_limit,
      discountValue: Number(data.discount_value),
      discountType: data.discount_type,
      startAt: toDateOnlyString(data.start_at) ?? "",
      endAt: toDateOnlyString(data.end_at) ?? "",
      artistId: String(data.artist),
    };
  }, [id, data]);

  const methods = useForm<PromocodeFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    reset,
    formState: { isSubmitting, dirtyFields, isDirty },
  } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // Список артистов (для селекта)
  const managedProfilesQuery = useGetManagedProfiles(profileType);

  const artistsOptions = useMemo(() => {
    if (!managedProfilesQuery.data) return [];
    return managedProfilesQuery.data.map((artist) => ({
      value: String(artist.id),
      label: artist.name,
    }));
  }, [managedProfilesQuery.data]);

  const isLoadingArtists = managedProfilesQuery.isFetching || managedProfilesQuery.isPending;

  const createPromocodeMutation = useCreatePromocode();
  const updatePromocodeMutation = useUpdatePromocode();

  const handleClose = () => {
    reset(initialFormValues);
    onClose();
  };

  const handleCancelClick = () => {
    handleClose();
  };

  const onSubmit = async (data: PromocodeFormValues, action: "create" | "save") => {
    if (isSubmitting) return;
    setFormError(null);

    if (data.startAt && data.endAt) {
      const start = new Date(data.startAt);
      const end = new Date(data.endAt);
      
      if (end < start) {
        setFormError("Дата окончания не может быть раньше даты начала");
        return;
      }
    }

    try {
      switch (action) {
        case "create": {
          const payload: TCreatePromocodeRequest = {
            code: data.code,
            discount_value: data.discountValue ? String(data.discountValue) : "",
            discount_type: data.discountType ?? "FIXED",
            start_at: data.startAt 
              ? new Date(`${data.startAt}T00:00:00Z`).toISOString()
              : null,
            end_at: data.endAt 
              ? new Date(`${data.endAt}T00:00:00Z`).toISOString() 
              : null,
            usage_limit: data.limit ? Number(data.limit) : null,
            is_enabled: true,
            description: data.description ?? "",
            artist: data.artistId
              ? Number(data.artistId)
              : currentArtistId
                ? currentArtistId
                : undefined,
          };
          await createPromocodeMutation.mutateAsync(payload);
          reset(initialValues);
          handleClose();
          break;
        }
        case "save": {
          if (!isDirty) {
            handleClose();
            break;
          }
          const newData = mapPromoDirtyFieldsToPayload(dirtyFields, data);
          await updatePromocodeMutation.mutateAsync({
            id: id!,
            payload: newData,
          });
          reset(initialValues);
          handleClose();
          break;
        }
      }
    } catch (e) {
      console.error(e);
      toast.error(`Произошла ошибка: ${error?.message}`);
    }
  };

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle='circledX'>
      <FormProvider {...methods}>
        <AddPromocodeForm 
          isEditForm={isEditForm} 
          profileType={profileType} 
          artistsOptions={artistsOptions} 
          isLoadingArtists={isLoadingArtists} 
          formError={formError}
          isLoadingEditData={isLoading}
          errorEditData={error}
          onSubmit={onSubmit}
          handleCancelClick={handleCancelClick}
          setFormError={setFormError}
        />
      </FormProvider>
    </ModalUI>
  )
}