"use client";

import clsx from "clsx";
import Image from "next/image";

import { Text, Title } from "@/shared/ui";

import s from "./BonusCard.module.scss";
import { BonusCardProps } from "./types";
import { DeleteIcon, EditIcon } from "@/shared/ui/Icons";

export const BonusCard = ({
  image,
  title,
  name,
  onEdit,
  onDelete,
}: BonusCardProps) => {

  return (
    <div className={s.container}>
      <div className={s.card}>
        {image && (
          <div className={s.card__img}>
            <Image src={image} alt={title ?? "Трек"} width={50} height={50} />
          </div>
        )}
        <div className={s.card__content}>
          {title && (
            <Title className={s.text} Tag='h6'>
              {title}
            </Title>
          )}
          <Text className={clsx(s.text, s.name)} Tag='p'>
            {name}
          </Text>
        </div>
      </div>

      {onEdit && (
        <button 
          className={s.editButton} 
          onClick={onEdit} 
          type="button" 
          data-testid="bonus-card-edit-bitton"
        >
          <EditIcon />
        </button>
      )}
      {onDelete && (
        <button 
          className={s.deleteButton} 
          onClick={onDelete} 
          type="button" 
          data-testid="bonus-card-delete-bitton"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};