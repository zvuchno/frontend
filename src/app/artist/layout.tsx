"use client";

import { FormProvider, useForm } from "react-hook-form";

import { EMPTY_PROFILE_FORM_VALUES } from "@/screens/artist/profile/form.utils";

import { AccountLayout } from "@/widgets/layout/account/AccountLayout";

import { type FieldValues } from "@/features/profile";

import { ArtistProfileEditModeProvider, useCurrentArtist } from "@/entities/profile";

import { Loader } from "@/shared/ui";

import s from "./layout.module.scss";
import { 
  useSetArtistId, 
  useSetArtistSlug, 
  useShowcaseArtistId, 
  useShowcaseArtistSlug 
} from "@/entities/Artist/store/useShowcaseStore";
import { useEffect } from "react";

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: currentArtist, isLoading } = useCurrentArtist();

  const setArtistSlug = useSetArtistSlug();
  const setArtistId = useSetArtistId();
  const currentSlug = useShowcaseArtistSlug();
  const currentArtistId = useShowcaseArtistId();

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  // запись id и slug артиста в стор для витрины
  useEffect(() => {
    if (!currentArtist) return;

    const newSlug = currentArtist.slug;
    const newArtistId = currentArtist.id ?? null;

    if (currentSlug !== newSlug) {
      setArtistSlug(newSlug ?? null);
    }

    if (currentArtistId !== newArtistId) {
      setArtistId(newArtistId);
    }
  }, [currentArtist?.slug, currentSlug, setArtistSlug, currentArtist, currentArtistId, setArtistId]);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.page}>
          <ArtistProfileEditModeProvider>
            <FormProvider {...methods}>
              <AccountLayout>{children}</AccountLayout>
            </FormProvider>
          </ArtistProfileEditModeProvider>
        </div>
      )}
    </>
  );
};

export default ArtistLayout;
