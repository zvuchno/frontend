import clsx from "clsx";
import Link from "next/link";

import { DeleteIcon } from "@/shared/ui";
import { EditIcon } from "@/shared/ui/Icons";

import s from "./../ShowcaseCard.module.scss";

export const renderActions = ({
  id,
  type,
  editType,
  isChecked,
  profileType,
  onToggleAlbumVisibility,
  onToggleMerchVisibility,
  onTogglePromoVisibility,
  onDeleteAlbum,
  onDeletePromocode,
  onDeleteMerch,
  onEditPromo,
}: {
  id: number;
  type: string;
  editType: string;
  isChecked?: boolean;
  profileType: "label" | "artist" | undefined;
  onToggleAlbumVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onToggleMerchVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onTogglePromoVisibility: (isChecked: boolean, id: number) => void | Promise<void>;
  onDeleteAlbum: (id: number) => void | Promise<void>;
  onDeletePromocode: (id: number) => void | Promise<void>;
  onDeleteMerch: (id: number) => void | Promise<void>;
  onEditPromo: (id: number) => void;
}) => {
  const params = new URLSearchParams();
  params.append("id", encodeURIComponent(id));

  const handleToggleVisibility = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const isCheked = e.target.checked;
    if (id) {
      if (type === "album") await onToggleAlbumVisibility(isCheked, id);
      if (type === "merch") await onToggleMerchVisibility(isCheked, id);
      if (type === "promo") await onTogglePromoVisibility(isCheked, id);
    }
  };

  const handleDeleteItem = async (type: string) => {
    if (id) {
      if (type === "album") await onDeleteAlbum(id);
      if (type === "merch") await onDeleteMerch(id);
      if (type === "promo") await onDeletePromocode(id);
    }
  };

  const handleEditPromoClick = () => {
    onEditPromo(id);
  };
  return (
    <div
      className={clsx(s.actions, {
        [s.actions_wide]: type === "promo",
        [s.actions_full]: profileType === "label" && type === "promo",
      })}
    >
      <label
        className={s.checkboxContainer}
        aria-label='Переключить видимость'
        title='Переключить видимость'
      >
        <input
          type='checkbox'
          className={s.visuallyHidden}
          checked={isChecked}
          onChange={(e) => void handleToggleVisibility(e, type)}
        />
        <span className={s.checkboxMark} title='Изменить видимость'></span>
      </label>
      <div className={s.buttons}>
        <Link
          className={s.editButton}
          href={
            editType === "promo" ? "" : `/artist/showcase/upload/${editType}/?${params.toString()}`
          }
          onClick={editType === "promo" ? handleEditPromoClick : undefined}
          aria-label='Редактировать'
          title='Редактировать'
        >
          {EditIcon()}
        </Link>
        <button
          type='button'
          className={s.deleteButton}
          onClick={() => void handleDeleteItem(type)}
          aria-label='Удалить'
          title='Удалить'
        >
          {DeleteIcon()}
        </button>
      </div>
    </div>
  );
};
