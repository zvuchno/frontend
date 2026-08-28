import { type ChangeEvent, useRef } from "react";

import clsx from "clsx";

import { CardArtist } from "@/entities/Artist";

import { ButtonUI } from "@/shared/ui";

import s from "./ArtistDataSectionMedia.module.scss";

export const ArtistDataSectionMedia = ({
  src,
  className,
  disabled,
  onChange,
  onEdit,
}: {
  src: string;
  className?: string;
  disabled: boolean;
  onChange: ((file: File) => void | Promise<void>) | undefined;
  onEdit?: () => void;
}) => {
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const handleCoverInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    void onChange?.(file);
  };

  const handleCoverButtonClick = () => {
    if (onChange) {
      coverInputRef.current?.click();
      return;
    }

    onEdit?.();
  };

  return (
    <div className={s.media}>
      <div className={clsx(s.coverFrame, className)}>
        <CardArtist image={src} hasButton={false} className={clsx(s.withoutHover, s.wideWidth)}/>
      </div>

      <ButtonUI
        variant='secondary'
        size='standart'
        onClick={handleCoverButtonClick}
        disabled={disabled}
        className={s.mediaButton}
      >
        {disabled ? "Загрузка..." : "Изменить обложку"}
      </ButtonUI>

      {onChange ? (
        <input
          ref={coverInputRef}
          className={s.fileInput}
          type='file'
          accept='image/*'
          onChange={handleCoverInputChange}
        />
      ) : null}
    </div>
  );
};
