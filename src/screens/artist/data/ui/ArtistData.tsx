"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

  //const formValues = useMemo(() => toArtistDataFormValues(data), [data]);

  const methods = useForm<FieldValues>({
    defaultValues: data,
    mode: "onChange",
    values: (data ?? {}) as FieldValues,
  });

  const artistType = data?.legal_profile?.recipient_type;
  const [isFormOpen, setFormOpen] = useState(!!artistType);

  if (isLoading || status === "loading") return <Loader />;

  if (!isFormOpen && (!artistType || artistType.length === 0))
    return (
      <div className={styles.formContentWrapper}>
        <h3 className={styles.formTitle}>Данные профиля</h3>
        <LegalFormSelector
          onSelect={() => {
            setFormOpen(true);
          }}
        />
      </div>
    );

  return (
    <FormProvider {...methods}>
      <ArtistFormPersonal onSubmit={() => {}} values={data} />
    </FormProvider>
  );
};
