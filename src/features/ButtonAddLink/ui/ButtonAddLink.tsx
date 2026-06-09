import clsx from "clsx";

import { DeleteIcon, PlusIcon } from "@/shared/ui/Icons";
import s from "./ButtonAddLink.module.scss";
import type { TButtonAddLinkItem, TButtonAddLinkProps } from "./types";

const getItemKey = (item: TButtonAddLinkItem) =>
  item.id !== undefined ? String(item.id) : `${item.label}::${item.value}`;

export const ButtonAddLink = ({
  items,
  addButtonText,
  title,
  deletingItemKey = null,
  className,
  onAddClick,
  onDeleteClick,
}: TButtonAddLinkProps) => {
  const hasItems = items.length > 0;
  const canDeleteItems = Boolean(onDeleteClick);

  return (
    <div className={clsx(s.container, className)}>
      {title ? <h3 className={s.title}>{title}</h3> : null}

      {hasItems ? (
        <div className={s.list}>
          {items.map((item) => {
            const isDeleting = deletingItemKey === getItemKey(item);

            return (
              <div
                key={getItemKey(item)}
                className={clsx(s.item, {
                  [s.itemWithDelete]: canDeleteItems,
                  [s.itemDeleting]: isDeleting,
                })}
              >
                <div className={s.itemMain}>
                  <span className={s.itemLabel}>{item.label}</span>

                  <div className={s.itemField}>
                    <span className={s.itemValue}>{item.value}</span>
                  </div>
                </div>

                {canDeleteItems ? (
                  <button
                    type="button"
                    className={s.deleteButton}
                    disabled={isDeleting}
                    onClick={() => onDeleteClick?.(item)}
                    aria-label={
                      isDeleting
                        ? `Удаление ${item.label}`
                        : `Удалить ${item.label}`
                    }
                  >
                    {isDeleting ? (
                      <span className={s.deleteSpinner} aria-hidden="true" />
                    ) : (
                      <DeleteIcon />
                    )}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      <button type="button" className={s.actionButton} onClick={onAddClick}>
        <PlusIcon />
        {addButtonText}
      </button>
    </div>
  );
};
