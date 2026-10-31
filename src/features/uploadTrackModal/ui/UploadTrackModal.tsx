"use client";

import { ChangeEvent, useEffect, useMemo } from "react";
import type { 
  TrackFormValues, 
  TUpdateTrackPayload, 
  TUploadTrackPayload, 
  UploadTrackModalProps 
} from "../model/types";

import { useDetailTrack, useUpdateTrack, useUpdateTrackInfo, useUploadTrack } from "../model/useTrack";
import { FormProvider, useForm } from "react-hook-form";
import { checkMediaFiles } from "@/features/showcaseUpload";
import toast from "react-hot-toast";
import { mapTrackDirtyFieldsToPayload } from "../utils/mapTrackDirtyFieldsToPayload";
import { Loader, ModalUI } from "@/shared/ui";
import { UploadTrackForm } from "../components/UploadTrackForm";

const initialFormValues: TrackFormValues = {
  allowHigherPrice: false,
  track: null,
  name: '',
  description: '',
  price: null,
};

export const UploadTrackModal = ({ 
  isOpen, 
  trackId,
  albumId,
  releaseType,
  onClose,
}: UploadTrackModalProps) => {

  // данные трека, получаемые, если перешли для редактирования (если есть id)
  const { 
    data, 
    isLoading, 
    error 
  } = useDetailTrack(trackId);

  const isEditForm = !!trackId;

  const updateTrackInfoMutation = useUpdateTrackInfo(albumId);
  const udateTrackMutation = useUpdateTrack(albumId);
  const uploadTrackMutation = useUploadTrack(albumId);

  const initialValues = useMemo(() => {
    if (!trackId || !data) {
      return initialFormValues;
    }
    return {
      name: data.name,
      track: null,
      description: data.description,
      price: Number(data.price),
      allowHigherPrice: data.allow_overpay
    };
  }, [trackId, data]);

  const methods = useForm<TrackFormValues>({
    mode: "onChange",
    defaultValues: initialValues,
  });

  const {
    formState: { isSubmitting, isDirty, dirtyFields }, 
    setValue, 
    reset,
    watch
  } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const file = watch("track");

  const handleClose = () => {
    reset(initialFormValues);
    onClose();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      setValue("track", null);
      return;
    }
  
    const result = await checkMediaFiles(file, "music");
    if (result.error) {
      toast.error(result.error, {
        duration: 5000,
      });
      setValue("track", null);
      return;
    }
    setValue("track", file, { shouldValidate: true });
  };

  const onSubmit = async (data: TrackFormValues, action: "save" | "add" ) => {
    if (isSubmitting) return;

    if (!data.track && !isEditForm) {
      toast.error("Пожалуйста, загрузите трек");
      return;
    }

    try {
      switch (action) {
        case "add":
          if (data.track) {
            const payload: TUploadTrackPayload = {
              album_id: albumId,
              filename: data.track?.name,
              size: data.track?.size,
              content_type: data.track.type,
              name: data.name,
              description: data.description,
              ...(data.price ? { price: data.price.toString() } : {}),
              ...(releaseType !== "single" && { allow_overpay: data.allowHigherPrice })
            }
            await uploadTrackMutation.mutateAsync({file: data.track, data: payload});
            handleClose();
          }
          break;
        case "save":
          if (!isDirty && !data.track) {
            handleClose();
            break;
          }

          if (data.track) {
            const trackPayload: TUpdateTrackPayload = {
              track_id: trackId!,
              filename: data.track.name,
              size: data.track.size,
              content_type: data.track.type
            };
            await udateTrackMutation.mutateAsync({ file: data.track, data: trackPayload })
          }

          if (isDirty) {
            const newData = mapTrackDirtyFieldsToPayload(dirtyFields, data);
            await updateTrackInfoMutation.mutateAsync({...newData, id: trackId!});
          }
          
          handleClose();
          break;
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Произошла ошибка при сохранении";
      toast.error(message);
    }
  };

  if (isLoading) return <Loader />
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle="circledX" hasClickOnOverlay={false}>
      <FormProvider {...methods}>
        <UploadTrackForm 
          isEditForm={isEditForm}
          file={file}
          handleFileChange={handleFileChange}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </ModalUI>
  )
};