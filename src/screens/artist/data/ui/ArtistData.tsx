"use client";

import { useState } from "react";
import { FormProvider, type UseFormRegister, useForm, useWatch } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { useSession } from "next-auth/react";

import { ArtistFormPersonal } from "@/features/artist/";
import { type FieldValues } from "@/features/artist/";
import { LegalFormSelector } from "@/features/artist/";

import { useGetArtistLegalData } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import styles from "./ArtistData.module.scss";

const recipientTypeRules = {
  required: "Выберите из списка",
  validate: (value: FieldValues["legal_profile"]["recipient_type"]) =>
    value !== "individual_temporary" || "Выберите из списка",
};

type RecipientType = FieldValues["legal_profile"]["recipient_type"];

const LegalEntityRecipientTypeInput = ({
  recipientType,
  register,
}: {
  recipientType: RecipientType;
  register: UseFormRegister<FieldValues>;
}) => {
  if (recipientType !== "legal_entity") return null;

  return (
    <input
      type='hidden'
      {...register("legal_profile.recipient_type", recipientTypeRules)}
    />
  );
};

export const ArtistData = () => {
  const { status } = useSession();
  const { data, isLoading } = useGetArtistLegalData();

  const methods = useForm<FieldValues>({
    defaultValues: data,
    mode: "onChange",
    values: (data ?? {}) as FieldValues,
  });

  const recipientType = useWatch({
    control: methods.control,
    name: "legal_profile.recipient_type",
  });

  const artistType = data?.legal_profile?.recipient_type;

  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const isFormOpen = Boolean(artistType) || isManuallyOpened;

  if (isLoading || status === "loading" || status === "unauthenticated") return <Loader />;

  if (!isLoading && !isFormOpen)
    return (
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>Данные профиля</h3>
        <FormProvider {...methods}>
          <LegalFormSelector
            onSelect={(type) => {
              methods.setValue("legal_profile.recipient_type", type, {
                shouldDirty: true,
                shouldValidate: true,
              });
              setIsManuallyOpened(true);
            }}
          />
        </FormProvider>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <ArtistFormPersonal values={data} />
      <LegalEntityRecipientTypeInput
        recipientType={recipientType}
        register={methods.register}
      />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
