"use client";

import { ModalUI } from "@/shared/ui";
import { FormProvider, useForm } from "react-hook-form";
import type { TBonusFormValues } from "../model/types";
import { useCreateBonus, useDetailBonus, useUpdateBonus } from "../model/useBonuses";
import { ChangeEvent, useEffect, useMemo } from "react";
import { AddBunusForm } from "../components/addBonusForm/AddBonusForm";
import { checkMediaFiles } from "@/features/showcaseUpload";
import toast from "react-hot-toast";
import { mapBonusDirtyFieldsToPayload } from "../utils/mapDirtyFieldsToPayload";

const initialFormValues: TBonusFormValues = {
  bonus_file: null,
  name: "",
  description: "",
};

type TAddBonuseModalProps = {
  isOpen: boolean;
  albumId: number;
  bonusId?: number;
  onClose: () => void;
};

export const AddBonuseModal = ({  isOpen, albumId, bonusId, onClose }: TAddBonuseModalProps) => {

  const isEditForm = !!bonusId;

  const createBonusMutation = useCreateBonus();
  const updateBonusMutation = useUpdateBonus();

  // данные бонуса, получаемые, если перешли для редактирования (если есть id)
  const { 
    data: bonusData, 
    isLoading, 
    error 
  } = useDetailBonus(bonusId);


  const initialValues: TBonusFormValues = useMemo(() => {
    if (!bonusId || !bonusData) {
      return initialFormValues;
    }
    return {
      bonus_file: bonusData.bonus_file,
      name: bonusData.name,
      description: bonusData.description,
    };
  }, [bonusId, bonusData]);

  const methods = useForm<TBonusFormValues>({
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

  const file = watch("bonus_file");

  const handleClose = () => {
    reset(initialFormValues);
    onClose();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      setValue("bonus_file", null);
      return;
    }
  
    const result = await checkMediaFiles(file, "bonus");
    if (result.error) {
      toast.error(result.error, {
        duration: 5000,
      });
      setValue("bonus_file", null);
      return;
    }
    setValue("bonus_file", file, { shouldValidate: true });
  };

  const onSubmit = async (data: TBonusFormValues, action: "save" | "create" ) => {
    if (isSubmitting) return;

    if (!data.bonus_file && !isEditForm) {
      toast.error("Пожалуйста, выберите файл");
      return;
    }

    try {
      switch (action) {
        case "create":
          await createBonusMutation.mutateAsync({
            payload: {
              ...data,
              album: albumId,
            }
          })
          handleClose();
          break;
          
        case 'save':
          if (!isDirty) {
            handleClose();
            break;
          }

          if (bonusData) {
            const newData = mapBonusDirtyFieldsToPayload(dirtyFields, data);
            await updateBonusMutation.mutateAsync({
              bonusId: bonusData?.id,
              payload: newData,
            })
          }
          
          handleClose();
          break;
      }
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Произошла ошибка при сохранении";
      toast.error(message);
    }
  }

  return (
    <ModalUI isOpen={isOpen} onClose={handleClose} closeButtonStyle="circledX" hasClickOnOverlay={false}>
      <FormProvider {...methods}>
        <AddBunusForm 
          isEditForm={isEditForm}
          file={file}
          handleFileChange={handleFileChange}
          onSubmit={onSubmit}
        />
      </FormProvider>
    </ModalUI>
  )
};