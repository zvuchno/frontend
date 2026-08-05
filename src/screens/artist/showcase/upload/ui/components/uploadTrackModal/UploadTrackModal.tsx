"use client";

import { ButtonUI, CheckboxUI, CustomInput, ModalUI, Text, Title } from "@/shared/ui";
import s from "./UploadTrackModal.module.scss";
import { type ChangeEvent, useRef } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkMediaFiles } from "@/features/showcaseUpload";

type TrackFormValues = {
  name: string;
  price?: number | null;
  allowHigherPrice: boolean;
  description: string;
  track: File | undefined;
};

interface UploadTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadTrack: (file: File, values: Omit<TrackFormValues, 'track'>) => void;
}

export const UploadTrackModal = ({ isOpen, onClose, onUploadTrack }: UploadTrackModalProps) => {
  const trackInputRef = useRef<HTMLInputElement | null>(null);

  // если это редактируемый товар, то возможно сюда передавать id этого товара

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    setValue, 
    watch 
  } = useForm<TrackFormValues>({
    defaultValues: {
      allowHigherPrice: false,
      track: undefined,
      name: '',
      description: '',
      price: null,
    },
  });

  const handleTrackButtonClick = () => {
    trackInputRef.current?.click();
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      setValue('track', undefined);
      return;
    }
  
    const result = await checkMediaFiles(file);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setValue('track', file, { shouldValidate: true });
  };

  const onSubmit = async (values: TrackFormValues) => {
    if (!values.track) {
      toast.error('Пожалуйста, загрузите трек');
      return;
    }

    // try {
    //   await onUploadTrack(values.track, {
    //     name: values.name,
    //     price: values.price,
    //     allowHigherPrice: values.allowHigherPrice,
    //     description: values.description,
    //   });
    //   onClose();
    // } catch (e) {
    //   console.error(e);
    //   toast.error('Не удалось загрузить трек. Попробуйте позже.');
    // }
  }

  return (
    <ModalUI isOpen={isOpen} onClose={onClose} closeButtonStyle="circledX">
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Title className={clsx(s.text, s.title)}>Добавление трека</Title>

        <div className={s.uploadContainer}>
          <ButtonUI
            type="button"
            variant='primary'
            size='standart'
            onClick={handleTrackButtonClick}
            disabled={isSubmitting}
            className={s.uploadContainer__mediaButton}
          >
            Выбрать трек
          </ButtonUI>

          <input
            ref={trackInputRef}
            className={s.uploadContainer__fileInput}
            type='file'
            accept="audio/mpeg,audio/wav,audio/flac"
            onChange={handleFileChange}
          />

          <Text className={s.uploadContainer__hint}>
            Загрузите трек с вашего устройства (максимальный размер 500 MB; MP3, WAV, FLAC)
          </Text>
        </div>

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
                  // Проверяем, что дробная часть не больше 2 знаков
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
            {...register('allowHigherPrice')}
          >
            Разрешить фанатам платить больше, если они хотят
          </CheckboxUI>
        </div>

        <CustomInput 
          id="description"
          label="Текст трека" 
          multiline
          rows={5}
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
          {isSubmitting ? 'Загрузка...' : 'Добавить'}
        </ButtonUI>
      </form>
    </ModalUI>
  )
};