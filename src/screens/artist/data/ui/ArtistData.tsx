"use client";

import { useMemo, useState } from "react";
import { FormProvider, type UseFormRegister, useForm, useWatch } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { useAccountActions } from "@/features/AccountActions/context/useAccountActions";
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

  return <input type='hidden' {...register("legal_profile.recipient_type", recipientTypeRules)} />;
};

export const ArtistData = () => {
  const { status } = useSession();
  const { data, isLoading } = useGetArtistLegalData();
  const { accountActions } = useAccountActions();

  const statusComment = accountActions?.dataStatusComment;

  const formValues = useMemo(
    () =>
      ({
        ...data,
        legal_profile: {
          ...data?.legal_profile,
          phone: data?.legal_profile?.phone?.replace(/\D/g, "") ?? "",
        },
      }) as FieldValues,
    [data]
  );

  const methods = useForm<FieldValues>({
    defaultValues: formValues,
    mode: "onChange",
    values: formValues,
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
    <div className={clsx(styles.formContentWrapper, styles.comment)}>
      {statusComment && (
        <span className={styles.statusComment}>
          ВНИМАНИЕ: <p>{statusComment}</p>
        </span>
      )}
      <FormProvider {...methods}>
        <ArtistFormPersonal values={formValues} />
        <LegalEntityRecipientTypeInput recipientType={recipientType} register={methods.register} />
        <DevTool control={methods.control} />
      </FormProvider>
    </div>
  );
};
