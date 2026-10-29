"use client";

import clsx from "clsx";
import { checklistConfig } from "../../config/CheckListConfig";
import s from "./CheckListItem.module.scss";
import Link from "next/link";
import { RoleCard } from "@/shared/ui";
import { CheckListItemProps } from "../../model/types";

const checkIcon: React.ReactNode = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" fill="none">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.333 1 3.917 7.417 1 4.5"/>
  </svg>
);

const arrowIcon: React.ReactNode =  (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L10 13L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CheckListItem = ({ index, itemKey, isDone, hasProduct, actions }: CheckListItemProps) => {

  const isFirstProductAdd = itemKey === "add_first_product";

  return (
    <li className={clsx(s.container, { [s.container__withButton]: !hasProduct && isFirstProductAdd})}>

      <div className={s.labelWrapper}>
        <span 
          className={s.number}
          style={{
            backgroundColor: isDone ? "var(--color-primary-blue)" : "var(--color-text-black)"
          }}
        >
          {isDone ? checkIcon : index + 1}
        </span>
        <p className={clsx(s.label, {[ s.label_done ]: isDone})}>{checklistConfig[itemKey].label}</p>
      </div>

      {isFirstProductAdd && !hasProduct && (
        <div className={s.selectedBlock}>
          <RoleCard
            path="/artist/showcase/upload/release"
            image={"/images/cassette.png"}
            title="Загрузить релиз"
            cardClassName={s.selectedBlockCard}
            imageClassName={s.selectedBlockImage}
            titleClassName={s.selectedBlockTitle}
          />
          <RoleCard
            path="/artist/showcase/upload/merch"
            image={"/images/shirt.png"}
            title="Загрузить мерч"
            cardClassName={s.selectedBlockCard}
            imageClassName={s.selectedBlockImage}
            titleClassName={s.selectedBlockTitle}
          />
        </div>
      )}

      {!isDone && !isFirstProductAdd && (
        <>
          {checklistConfig[itemKey].actionType === "button" && actions?.[itemKey] && (
            <button 
              onClick={() => actions[itemKey]?.()} 
              className={s.action} 
              data-testid={`checklist-button-${itemKey}`}
            >
              <span className={s.action__text}>Подключить</span>
              
              {arrowIcon}
            </button>
          )}
          {checklistConfig[itemKey].actionType === "link" && (
            <Link 
              href={checklistConfig[itemKey].href ?? "#"} 
              className={s.action} 
              data-testid={`checklist-link-${itemKey}`}
            >
              <span className={s.action__text}>Перейти</span>
              {arrowIcon}
            </Link>
          )}
        </>
      )}

    </li>
  )
};