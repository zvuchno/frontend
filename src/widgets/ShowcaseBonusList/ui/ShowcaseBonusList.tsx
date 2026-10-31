"use client";

import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from '@dnd-kit/utilities';
import { Loader } from "@/shared/ui";
import type { TShowcaseBonusListProps } from "../types";
import { useEffect, useState } from "react";
import { BonusCard } from "@/entities/albums";

import s from "./ShowcaseBonusList.module.scss";
import { type TBonusItem } from "@/entities/Artist";

export const ShowcaseBonusList = ({ 
  bonusList, 
  bonusError, 
  isLoading,
  isFetching,
  hasMore,
  loadMore,
  onDeleteBonus, 
  onEditBonus, 
  onOrderChange 
}: TShowcaseBonusListProps) => {

  const [sortedBonuses, setSortedBonuses] = useState(bonusList);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isDragging]);

  useEffect(() => {
    setSortedBonuses(bonusList);
  }, [bonusList]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 8,
      },
    }),
    // useSensor(PointerSensor, {
    //   activationConstraint: {
    //     distance: 8,
    //   }
    // }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = () => setIsDragging(true);

  const handleDragEnd = (event: any) => {
    setIsDragging(false);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedBonuses.findIndex((t) => t.id === active.id);
    const newIndex = sortedBonuses.findIndex((t) => t.id === over.id);

    // Сначала вычисляем новый массив
    const newOrder = arrayMove(sortedBonuses, oldIndex, newIndex);

    // Обновляем локальный стейт
    setSortedBonuses(newOrder);

    // сообщаем родителю об изменении порядка
    onOrderChange?.(newOrder.map((t) => t.id));
  };

  function SortableBonus({ bonus, index }: { bonus: TBonusItem, index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: bonus.id });

    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.7 : 1,
      boxShadow: isDragging
        ? "0 8px 16px rgba(0,0,0,0.15)"
        : undefined,
      //cursor: "grab",
      userSelect: "none",
      //touchAction: 'none',
    };

    const cursorStyle: React.CSSProperties = {
      cursor: "grab",
    };

    return (
      <li ref={setNodeRef} style={style} {...attributes} className={s.bonusList__card}>
        <div className={s.bonusList__dnd} {...listeners} style={cursorStyle}/>
        <BonusCard
          title={bonus.name}
          onDelete={() => void onDeleteBonus(bonus.id)}
          onEdit={() => onEditBonus(bonus.id)}
        />
      </li>
    );
  }

  return (
    <div className={s.container}>
      {isLoading ? (
        <Loader />
      ) : bonusError ? (
        <div>Не удалось загрузить список бонусов</div>
      ) : bonusList && bonusList.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedBonuses.map((t) => t.id)}>
            <ul className={s.bonusList}>
              {sortedBonuses.map((bonus, index) => (
                <SortableBonus key={bonus.id} bonus={bonus} index={index + 1}/>
              ))}
            </ul>
          </SortableContext>

          {hasMore && (
            <div className={s.buttonWrapper}>
              <button
                type="button"
                className={s.button}
                onClick={() => {
                  loadMore().catch(console.error);
                }}
                disabled={isFetching}
              >
                {isFetching ? "загрузка..." : "смотреть ещё"}
              </button>
            </div>
          )}
        </DndContext>
      ) : null}
    </div>
  )
};