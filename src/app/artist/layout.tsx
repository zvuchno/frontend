"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";

import { EMPTY_PROFILE_FORM_VALUES } from "@/screens/artist/profile/form.utils";

import { AccountNavigation, type FieldValues } from "@/features/profile";

import {
  useSetArtistId,
  useSetArtistSlug,
  useShowcaseArtistId,
  useShowcaseArtistSlug,
} from "@/entities/Artist/store/useShowcaseStore";
import {
  useChangeManagedProfile,
  useChangeManagedProfileCover,
  useGetManagedProfileDetails,
} from "@/entities/Label";
import {
  ArtistProfileEditModeProvider,
  type UpdateCurrentArtistPayload,
  useCurrentArtist,
  useUpdateArtist,
  useUpdateArtistCover,
} from "@/entities/profile";

import { AccentContainer, Loader, Title } from "@/shared/ui";

import { ArtistDataSectionLayout } from "./components/ArtistDataSectionLayout/ArtistDataSectionLayout";
import s from "./layout.module.scss";

const artistProfilePathnames = ["/artist/profile"];

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status } = useSession();

  const params = useParams<{ id?: string; slug?: string }>();

  const isManagedArtistPage = Boolean(params.id && params.slug);

  const managedArtistId = isManagedArtistPage ? (params.id ?? "") : "";

  const { data: currentArtist, isLoading, error } = useCurrentArtist();
  const {
    data: managedArtist,
    isLoading: isManagedProfileLoading,
    error: managedProfileError,
  } = useGetManagedProfileDetails(managedArtistId);

  const { mutateAsync: updateArtist } = useUpdateArtist();
  const { mutateAsync: updateCover } = useUpdateArtistCover();
  const { mutateAsync: updateManagedArtist } = useChangeManagedProfile();
  const { mutateAsync: updateManagedArtistCover } = useChangeManagedProfileCover();

  const artist = managedArtistId ? managedArtist : currentArtist;

  const handleArtistUpdate = async (payload: UpdateCurrentArtistPayload) => {
    if (managedArtistId) {
      await updateManagedArtist({
        id: managedArtistId,
        profile: payload,
      });
      return;
    }
    await updateArtist(payload);
  };

  const handleCoverUpdate = async (file: File) => {
    if (managedArtistId) {
      await updateManagedArtistCover({
        id: managedArtistId,
        payload: { cover: file },
      });
      return;
    }
    await updateCover({ cover: file });
  };

  const setArtistSlug = useSetArtistSlug();
  const setArtistId = useSetArtistId();
  const currentSlug = useShowcaseArtistSlug();
  const currentArtistId = useShowcaseArtistId();

  const shouldShowArtistInfo = artistProfilePathnames.includes(pathname) || isManagedArtistPage;

  const isLoadingArtist = managedArtistId ? isManagedProfileLoading : isLoading;
  const isLoadingDataArtist = status === "loading" || isLoadingArtist;

  const artistError = managedArtistId ? managedProfileError : error;

  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: EMPTY_PROFILE_FORM_VALUES,
  });

  useEffect(() => {
    if (!artist) return;

    const newSlug = artist.slug;
    const newArtistId = artist.id ?? null;

    if (currentSlug !== newSlug) {
      setArtistSlug(newSlug ?? null);
    }

    if (currentArtistId !== newArtistId) {
      setArtistId(newArtistId);
    }
  }, [artist?.slug, currentSlug, setArtistSlug, artist, currentArtistId, setArtistId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.page}>
          <ArtistProfileEditModeProvider>
            <FormProvider {...methods}>
              <AccentContainer className={s.container}>
                <div className={s.body}>
                  <Title Tag='h2' className={s.title}>
                    Личный кабинет
                  </Title>
                  <section className={s.section}>
                    <AccountNavigation type={currentArtist?.profile_type} />

                    <div className={s.section__content}>{children}</div>
                  </section>
                </div>
              </AccentContainer>

              {shouldShowArtistInfo && (isManagedProfileLoading || isLoading) ? (
                <Loader />
              ) : (
                shouldShowArtistInfo && (
                  <ArtistDataSectionLayout
                    key={`${managedArtistId ? "managed" : "current"}-${artist?.id ?? "loading"}`}
                    isLoading={isLoadingDataArtist}
                    artist={artist}
                    withButton={isManagedArtistPage}
                    error={artistError}
                    onArtistUpdate={handleArtistUpdate}
                    onCoverUpdate={handleCoverUpdate}
                  />
                )
              )}
            </FormProvider>
          </ArtistProfileEditModeProvider>
        </div>
      )}
    </>
  );
};

export default ArtistLayout;
