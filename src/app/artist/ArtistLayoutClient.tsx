"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { EMPTY_PROFILE_FORM_VALUES } from "@/screens/artist/profile/form.utils";

import { AccountLayout } from "@/widgets/layout/account/AccountLayout";

import { type FieldValues } from "@/features/profile";

import {
  useSetArtistId,
  useSetArtistSlug,
  useShowcaseArtistId,
  useShowcaseArtistSlug,
} from "@/entities/Artist/store/useShowcaseStore";
import { ArtistProfileEditModeProvider, useCurrentArtist } from "@/entities/profile";

import { Loader } from "@/shared/ui";

import s from "./layout.module.scss";

export default function ArtistLayoutClient({ children }: { children: React.ReactNode }) {
  const { data: currentArtist, isLoading } = useCurrentArtist();

  const setArtistSlug = useSetArtistSlug();
  const setArtistId = useSetArtistId();
  const currentSlug = useShowcaseArtistSlug();
  const currentArtistId = useShowcaseArtistId();

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  useEffect(() => {
    if (!currentArtist) return;

    const newSlug = currentArtist.slug;
    const newArtistId = currentArtist.id ?? null;

    if (currentSlug !== newSlug) setArtistSlug(newSlug ?? null);
    if (currentArtistId !== newArtistId) setArtistId(newArtistId);
  }, [
    currentArtist?.slug,
    currentSlug,
    setArtistSlug,
    currentArtist,
    currentArtistId,
    setArtistId,
  ]);

  if (isLoading) return <Loader />;

  return (
    <div className={s.page}>
      <ArtistProfileEditModeProvider>
        <FormProvider {...methods}>
          <AccountLayout>{children}</AccountLayout>
        </FormProvider>
      </ArtistProfileEditModeProvider>
    </div>
  );
}
