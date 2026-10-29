"use client";

import { useState } from "react";
import s from "./ShowcaseActions.module.scss";
import { SelectUI } from "@/shared/ui";
import type { TShowcaseItem } from "@/entities/Artist";
import { DropButton } from "@/shared/ui/DropButton/DropButton";
import { ChoiceGroup } from "@/shared/ui/ChoiceGroup";
import { MusicIcon } from "@/shared/ui/Icons/musicIcon";
import { TShirtIcon } from "@/shared/ui/Icons/tshirtIcon/TShirtIcon";
import { NoteIcon } from "@/shared/ui/Icons/noteIcon";

type TOption = {
  value: string;
  label: string;
};

interface ShowcaseActionsProps {
  itemType: TShowcaseItem;
  releaseCount: string;
  merchCount: string;
  promoCount: string;
  selectItemType: (item: TShowcaseItem) => void;
  addPromo: () => void;
  artistOptions?: TOption[];
  onChangeArtist?: (id: string) => void;
};

export const ShowcaseActions = ({ 
  itemType,
  artistOptions,
  releaseCount,
  merchCount,
  promoCount,
  selectItemType,
  addPromo,
  onChangeArtist
}: ShowcaseActionsProps) => {
  const [artist, setArtist] = useState<string>("");

  const handleChangeArtist = (id: string) => {
    setArtist(id);
    if (onChangeArtist) onChangeArtist(id);
  }

  return (
    <div className={s.actions}>

      <ChoiceGroup 
        value={itemType} 
        onChange={(value) => selectItemType(value as TShowcaseItem)}
        items={[
          {label: "Музыка", value: "release", icon: MusicIcon, count: releaseCount},
          {label: "Мерч", value: "merch", icon: TShirtIcon, count: merchCount},
          {label: "Промо-коды", value: "promo", icon: NoteIcon, count: promoCount},
        ]}
        containerClassName={s.actions__choice}
      />

      <div className={s.actions__select}>
        {artistOptions && artistOptions.length > 0 && (
          <SelectUI
            value={artist}
            onChange={handleChangeArtist}
            options={artistOptions}
            placeholder='артист'
            containerClassName={s.containerOnPersonalAccountPage}
            selectClassName={s.selectOnPersonalAccountPage}
            contentClassName={s.itemListOnPersonalAccountPage}
            optionClassName={s.itemOnPersonalAccountPage}
            iconClassName={s.selectIcon}
          />
        )}

        <DropButton 
          title="Добавить" 
          icon="/icons/plus-sign.svg"
          options={[
            {label: "Релиз", href: "/artist/showcase/upload/release"},
            {label: "Мерч", href: "/artist/showcase/upload/merch"},
            {label: "Промо-код", onClick: addPromo},
          ]}
        />

      </div>
    </div>
  )
};