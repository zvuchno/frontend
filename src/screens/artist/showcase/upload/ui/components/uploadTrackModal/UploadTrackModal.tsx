"use client";

import { 
  ButtonUI, 
  CheckboxUI, 
  CustomInput, 
  Loader, 
  ModalUI, 
  Text, 
  Title 
} from "@/shared/ui";
import s from "./UploadTrackModal.module.scss";
import { type ChangeEvent, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { 
  checkMediaFiles, 
  mapTrackDirtyFieldsToPayload, 
  type TrackFormValues 
} from "@/features/showcaseUpload";
import { 
  type TUpdateTrackPayload,
  type TUploadTrackPayload, 
  useDetailTrack, 
  useUpdateTrack, 
  useUpdateTrackInfo, 
  useUploadTrack 
} from "@/entities/Artist";

const initialFormValues: TrackFormValues = {
  allowHigherPrice: false,
  track: null,
  name: '',
  description: '',
  price: null,
};

interface UploadTrackModalProps {
  isOpen: boolean;
  albumId: number;
  onClose: () => void;
  trackId?: number;
};

export const UploadTrackModal = ({ 
  isOpen, 
  trackId,
  albumId,
  onClose,
}: UploadTrackModalProps) => {
  const trackInputRef = useRef<HTMLInputElement | null>(null);

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
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting, isDirty, dirtyFields }, 
    setValue, 
    reset,
    watch
  } = methods;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const file = watch('track');

  const handleTrackButtonClick = () => {
    trackInputRef.current?.click();
  };

  const handleClose = () => {
    reset(initialFormValues);
    onClose();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      setValue('track', null);
      return;
    }
  
    const result = await checkMediaFiles(file);
    if (result.error) {
      toast.error(result.error);
      setValue('track', null);
      return;
    }
    setValue('track', file, { shouldValidate: true });
  };

  const onSubmit = async (data: TrackFormValues, action: 'save' | 'add' ) => {
    if (isSubmitting) return;

    if (!data.track && !isEditForm) {
      toast.error('Пожалуйста, загрузите трек');
      return;
    }

    try {
      switch (action) {
        case 'add':
          if (data.track) {
            const payload: TUploadTrackPayload = {
              album_id: albumId,
              filename: data.track?.name,
              size: data.track?.size,
              content_type: data.track.type,
              name: data.name,
              description: data.description,
              price: data.price?.toString(),
              allow_overpay: data.allowHigherPrice,
            }
            await uploadTrackMutation.mutateAsync({file: data.track, data: payload});
            handleClose();
          }
          break;
        case 'save':
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
      const message = error instanceof Error ? error.message : 'Произошла ошибка при сохранении';
      toast.error(message);
    }
  };

  if (isLoading) return <Loader />
  if (error) return <div>{`Не удалось загрузить данные: ${error.message}`}</div>

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle="circledX">
      <FormProvider {...methods}>
        <form 
          className={s.form} 
          onSubmit={handleSubmit((data) => onSubmit(data, isEditForm ? 'save' : 'add'))}
        >
          <Title className={clsx(s.text, s.title)}>
            {isEditForm ? 'Редактирование трека' : 'Добавление трека'}
          </Title>

          {!file ? (
            <div className={s.uploadContainer}>
              <ButtonUI
                type="button"
                variant='primary'
                size='standart'
                onClick={handleTrackButtonClick}
                disabled={isSubmitting}
                className={s.uploadContainer__mediaButton}
              >
                {isEditForm ? 'Заменить трек' : 'Выбрать трек'}
              </ButtonUI>

              <input
                ref={trackInputRef}
                className={s.uploadContainer__fileInput}
                type='file'
                accept="audio/mpeg,audio/wav,audio/flac"
                onChange={(e) => {
                  handleFileChange(e).catch(console.error)
                }}
              />

              <Text className={s.uploadContainer__hint}>
                Загрузите трек с вашего устройства (максимальный размер 500 MB; MP3, WAV, FLAC)
              </Text>
            </div>
          ) : (
            <div className={s.selectedFileBlock}>
              <div className={s.selectedFileBlock__info}>
                <span className={s.selectedFileBlock__name}>{file?.name}</span>
                <span className={s.selectedFileBlock__size}>
                  {(file?.size / 1024 / 1024).toFixed(1)} МБ
                </span>
              </div>

              <ButtonUI
                type="button"
                variant="secondary"
                size="small"
                disabled={isSubmitting}
                onClick={() => {
                  setValue('track', null);
                }}
                className={s.selectedFileBlock__removeBtn}
              >
                Удалить
              </ButtonUI>
            </div>
          )}

          <CustomInput
            id="name"
            label="Название трека"
            error={!!errors.name}
            message={errors.name?.message}
            {...register('name', { required: "Название обязательно" })}
            labelClassName={s.label}
            inputClassName={s.input}
          />
          <div className={s.container}>
            <div className={s.field}>
              <div className={s.field__labelContainer}>
                <label className={clsx(s.text, s.field__labelContainer__label)} htmlFor='price'>
                  Индивидуальная цена
                </label>
                <span className={s.field__labelContainer__icon}>
                  <span className={clsx(s.text, s.popup)}>
                    если не выставить индивидуальную цену, то приобрести трек отдельно от всего альбома будет нельзя
                  </span>
                </span>
              </div>
              <CustomInput 
                id={'price'}
                type='number'
                error={!!errors.price}
                message={errors.price?.message}
                {...register('price', { 
                  required: false,
                  valueAsNumber: true,
                  min: { value: 0, message: 'Цена не может быть отрицательной' },
                  max: 99999999,
                  validate: (val) => {
                    const str = String(val);
                    const parts = str.split('.');
                    if (parts.length > 1 && parts[1].length > 2) {
                      return 'Допускается не более 2 знаков после запятой';
                    }
                    return true;
                  },
                })}
                labelClassName={s.label}
                inputClassName={s.input}
              />
            </div>

            <CheckboxUI 
              type='checkbox'
              checked={!!watch('allowHigherPrice')}
              {...register('allowHigherPrice')}
              className={s.checkbox}
            >
              Разрешить фанатам платить больше, если они хотят
            </CheckboxUI>
          </div>

          <CustomInput 
            id="description"
            label="Текст трека" 
            multiline
            rows={7}
            style={{
              resize: 'none'
            }}
            {...register('description', {
              required: false,
            })}
            labelClassName={s.label}
            inputClassName={s.textarea}
            placeholder="Этот текст будут видеть ваши слушатели"
          />

          <ButtonUI variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Загрузка...' : isEditForm ? 'Сохранить' : 'Добавить'}
          </ButtonUI>
        </form>
      </FormProvider>
    </ModalUI>
  )
};