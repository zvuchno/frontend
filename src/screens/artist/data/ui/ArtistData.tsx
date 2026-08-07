"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { DevTool } from "@hookform/devtools";
import { useSession } from "next-auth/react";

import { ArtistFormPersonal } from "@/features/artist/";
import { type FieldValues } from "@/features/artist/";
import { LegalFormSelector } from "@/features/artist/";

import { useGetArtistLegalData } from "@/entities/Artist";

import { Loader } from "@/shared/ui";

import styles from "./ArtistData.module.scss";

export const ArtistData = () => {
  const { status } = useSession();
  const { data, isLoading } = useGetArtistLegalData();

  const methods = useForm<FieldValues>({
    defaultValues: data,
    mode: "onChange",
    values: (data ?? {}) as FieldValues,
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
            onSelect={(type?: "legal_entity") => {
              setIsManuallyOpened(true);
              if (type) methods.setValue("legal_profile.recipient_type", type);
            }}
          />
          <input type='hidden' {...methods.register("legal_profile.recipient_type")} />
        </FormProvider>
      </div>
    );

  return (
    <FormProvider {...methods}>
      <ArtistFormPersonal values={data} />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};
