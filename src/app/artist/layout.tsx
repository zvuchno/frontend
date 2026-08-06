"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { AccountNavigation } from "@/features/profile";

import {
  useSetArtistId,
  useSetArtistSlug,
  useShowcaseArtistId,
  useShowcaseArtistSlug,
} from "@/entities/Artist/store/useShowcaseStore";
import {
  type ArtistApiDataItem,
  type CurrentArtistResponse,
  type UpdateCurrentArtistPayload,
  useCurrentArtist,
  useUpdateArtist,
  useUpdateArtistCover,
} from "@/entities/profile";

import { AccentContainer, Loader, Title } from "@/shared/ui";

import { ArtistDataSection, type TArtistDataItem } from "./components/ArtistDataSection";
import s from "./layout.module.scss";

const artistProfilePathnames = ["/artist/profile"];

const getArtistDataItemKey = (item: TArtistDataItem) =>
  item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

const toApiDataItem = (item: TArtistDataItem): ArtistApiDataItem => ({
  ...(typeof item.id === "number" ? { id: item.id } : {}),
  label: item.label,
  value: item.value,
});

const buildArtistUpdatePayload = (
  artist: CurrentArtistResponse,
  overrides: Partial<Pick<CurrentArtistResponse, "contacts" | "socials">>
): UpdateCurrentArtistPayload => ({
  name: artist.name,
  description: artist.description ?? "",
  city: artist.city ?? "",
  url: artist.url ?? "",
  contacts: overrides.contacts ?? artist.contacts,
  socials: overrides.socials ?? artist.socials,
});

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { status } = useSession();

  const { data: artist, isLoading, error } = useCurrentArtist();
  const updateArtist = useUpdateArtist();
  const updateCover = useUpdateArtistCover();

  const setArtistSlug = useSetArtistSlug();
  const setArtistId = useSetArtistId();
  const currentSlug = useShowcaseArtistSlug();
  const currentArtistId = useShowcaseArtistId();

  const shouldShowArtistInfo = artistProfilePathnames.includes(pathname);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [deletingContactKey, setDeletingContactKey] = useState<string | null>(null);
  const [deletingSocialKey, setDeletingSocialKey] = useState<string | null>(null);

  const isLoadingDataArtist = status === "loading" || isLoading;

  useEffect(() => {
    if (!artist) return;

    const newSlug = artist.slug;
    const newArtistId = artist.id;

    if (currentSlug !== newSlug) {
      setArtistSlug(newSlug);
    }

    if (currentArtistId !== newArtistId) {
      setArtistId(newArtistId);
    }
  }, [artist?.slug, currentSlug, setArtistSlug, artist, currentArtistId, setArtistId]);

  const handleCoverChange = async (file: File) => {
    setIsUploadingCover(true);
    try {
      await updateCover.mutateAsync({ cover: file });
      toast.success("Обложка успешно обновлена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось обновить обложку");
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleAddContact = async (item: TArtistDataItem) => {
    if (!artist) return;
    try {
      setIsAddingContact(true);
      const payload = buildArtistUpdatePayload(artist, {
        contacts: [...artist.contacts, toApiDataItem(item)],
      });
      await updateArtist.mutateAsync(payload);
      toast.success("Контакт успешно добавлен");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось добавить контакт");
    } finally {
      setIsAddingContact(false);
    }
  };

  const handleAddSocial = async (item: TArtistDataItem) => {
    if (!artist) return;
    try {
      setIsAddingSocial(true);
      const payload = buildArtistUpdatePayload(artist, {
        socials: [...artist.socials, toApiDataItem(item)],
      });
      await updateArtist.mutateAsync(payload);
      toast.success("Соцсеть успешно добавлена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось добавить соцсеть");
    } finally {
      setIsAddingSocial(false);
    }
  };

  const handleDeleteContact = async (item: TArtistDataItem) => {
    if (!artist) return;
    const key = getArtistDataItemKey(item);
    setDeletingContactKey(key);
    try {
      const payload = buildArtistUpdatePayload(artist, {
        contacts: artist.contacts.filter((c) => getArtistDataItemKey(c) !== key),
      });
      await updateArtist.mutateAsync(payload);
      toast.success("Контат удалён");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось удалить контакт");
    } finally {
      setDeletingContactKey(null);
    }
  };

  const handleDeleteSocial = async (item: TArtistDataItem) => {
    if (!artist) return;
    const key = getArtistDataItemKey(item);
    setDeletingSocialKey(key);
    try {
      const payload = buildArtistUpdatePayload(artist, {
        socials: artist.socials.filter((s) => getArtistDataItemKey(s) !== key),
      });
      await updateArtist.mutateAsync(payload);
      toast.success("Соцсеть удалена");
    } catch (err) {
      console.error(err);
      toast.error("Не удалось удалить соцсеть");
    } finally {
      setDeletingSocialKey(null);
    }
  };

  return (
    <div className={s.page}>
      <AccentContainer className={s.container}>
        <div className={s.body}>
          <Title Tag='h2' className={s.title}>
            Личный кабинет
          </Title>
          <section className={s.section}>
            <AccountNavigation />

            <div className={s.section__content}>{children}</div>
          </section>
        </div>
      </AccentContainer>

      {shouldShowArtistInfo ? (
        isLoadingDataArtist ? (
          <Loader />
        ) : (
          <div className={s.profileInfo}>
            <ArtistDataSection
              coverSrc={artist?.cover ?? ""}
              description={artist?.description ?? ""}
              contacts={artist?.contacts ?? []}
              socials={artist?.socials ?? []}
              isAddingContact={isAddingContact}
              isAddingSocial={isAddingSocial}
              isUploadingCover={isUploadingCover}
              deletingContactKey={deletingContactKey}
              deletingSocialKey={deletingSocialKey}
              errorMessage={error?.message}
              onCoverChange={handleCoverChange}
              onAddContactClick={handleAddContact}
              onAddSocialClick={handleAddSocial}
              onDeleteContactClick={(item) => void handleDeleteContact(item)}
              onDeleteSocialClick={(item) => void handleDeleteSocial(item)}
            />
          </div>
        )
      ) : null}
    </div>
  );
};

export default ArtistLayout;
