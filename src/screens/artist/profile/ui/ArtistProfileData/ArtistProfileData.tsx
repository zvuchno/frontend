import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";

import { ArtistDataSectionLayout } from "@/app/artist/components/ArtistDataSectionLayout/ArtistDataSectionLayout";

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
  type UpdateCurrentArtistPayload,
  useCurrentArtist,
  useUpdateArtist,
  useUpdateArtistCover,
} from "@/entities/profile";

import { Loader } from "@/shared/ui";

const artistProfilePathnames = ["/artist/profile"];

export const ArtistProfileData = () => {
  const pathname = usePathname();
  const { status } = useSession();

  const { mutateAsync: updateArtist } = useUpdateArtist();
  const { mutateAsync: updateCover } = useUpdateArtistCover();
  const { mutateAsync: updateManagedArtist } = useChangeManagedProfile();
  const { mutateAsync: updateManagedArtistCover } = useChangeManagedProfileCover();

  const params = useParams<{ id?: string; slug?: string }>();

  const isManagedArtistPage = Boolean(params.id && params.slug);

  const managedArtistId = isManagedArtistPage ? (params.id ?? "") : "";

  const { data: currentArtist, isLoading, error } = useCurrentArtist();
  const { data: managedArtist } = useGetManagedProfileDetails(managedArtistId);

  const artist = managedArtistId ? managedArtist : currentArtist;

  const setArtistSlug = useSetArtistSlug();
  const setArtistId = useSetArtistId();
  const currentSlug = useShowcaseArtistSlug();
  const currentArtistId = useShowcaseArtistId();

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

  const { isLoading: isManagedProfileLoading, error: managedProfileError } =
    useGetManagedProfileDetails(managedArtistId);

  const isLoadingArtist = managedArtistId ? isManagedProfileLoading : isLoading;

  const shouldShowArtistInfo = artistProfilePathnames.includes(pathname) || isManagedArtistPage;
  const isLoadingDataArtist = status === "loading" || isLoadingArtist;

  const artistError = managedArtistId ? managedProfileError : error;

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

  return (
    <>
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
    </>
  );
};
