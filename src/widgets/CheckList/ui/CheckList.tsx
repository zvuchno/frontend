"use client";

import { Text, Title } from "@/shared/ui";
import s from "./CheckList.module.scss";
import { useCheckList } from "../model/useCheckList";
import { useState } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import type { CheckListProps, TCheckListResponse } from "../model/types";
import { CheckListItem } from "../components/CheckListItem/CheckListItem";

const defaultIcon: React.ReactNode =  (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L10 13L17 6" stroke="#100F0D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CheckList = ({ 
  title = "Чек-лист до 1й продажи", 
  artistSlug, 
  icon = defaultIcon, 
  hasProducts,
  actions,
}: CheckListProps) => {

  const [isListOpen, setIsListOpen] = useState(false);
  const { data, isLoading, error } = useCheckList(artistSlug);

  const handleToggleList = () => setIsListOpen((v) => !v);

  if (isLoading) return <div>Загрузка чек-листа...</div>;
  if (error) return <div>Ошибка загрузки чек-листа</div>;
  if (!data) return null;

  const total = Object.keys(data).length;
  const completed = Object.values(data).filter(Boolean).length;

  return (
    <section className={s.section}>

      <div className={s.header}>
        <div className={s.titleContainer}>
          <Title Tag="h3" className={s.titleContainer__title}>{title}</Title>
          <Text Tag="span" className={s.titleContainer__count}>({completed}/{total})</Text>
        </div>
        <button 
          className={clsx(s.iconButton, { [s.iconButton_rotated]: isListOpen })}
          type="button"
          aria-expanded={isListOpen}
          aria-label={isListOpen ? "Свернуть чек-лист" : 'Показать чек-лист'}
          title={isListOpen ? "Свернуть чек-лист" : 'Показать чек-лист'}
          onClick={handleToggleList}
        >
          {icon}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isListOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
            className={s.listBlock}
          >
            <ul className={s.list}>
              {(Object.keys(data) as Array<keyof TCheckListResponse>).map((key, index) => {
                const isDone = data[key];

                return (
                  <CheckListItem 
                    key={key} 
                    index={index} 
                    itemKey={key} 
                    isDone={isDone} 
                    hasProduct={hasProducts} 
                    actions={actions}
                  />
                )
              })}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
      
    </section>
  )
};