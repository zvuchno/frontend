import { useEffect, useState } from "react";
import s from "./ShowcaseTrackList.module.scss";
import { TShowcaseTrackListProps } from "../types";

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
import { TShowcaseTrack } from "@/entities/Artist/model/types";
import { Loader } from "@/shared/ui";
import { TrackCard } from "@/entities/albums";

export const ShowcaseTrackList = ({ 
  tracksList, 
  tracksError, 
  isLoading,
  isFetching,
  hasMore,
  loadMore,
  onDeleteTrack, 
  onEditTrack, 
  onOrderChange 
}: TShowcaseTrackListProps) => {

  const [sortedTracks, setSortedTracks] = useState(tracksList);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isDragging]);

  useEffect(() => {
    setSortedTracks(tracksList);
  }, [tracksList]);

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

    const oldIndex = sortedTracks.findIndex((t) => t.id === active.id);
    const newIndex = sortedTracks.findIndex((t) => t.id === over.id);

    // Сначала вычисляем новый массив
    const newOrder = arrayMove(sortedTracks, oldIndex, newIndex);

    // Обновляем локальный стейт
    setSortedTracks(newOrder);

    // сообщаем родителю об изменении порядка
    onOrderChange?.(newOrder.map((t) => t.id));
  };

  function SortableTrack({ track, index }: { track: TShowcaseTrack, index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: track.id });

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
      <li ref={setNodeRef} style={style} {...attributes} className={s.tracksList__card}>
        <div className={s.tracksList__dnd} {...listeners} style={cursorStyle}/>
        <TrackCard
          image={track.image}
          title={track.artist_name}
          description={track.name}
          duration={track.duration}
          onDelete={() => void onDeleteTrack(track.id)}
          onEdit={() => onEditTrack(track.id)}
        />
      </li>
    );
  }

  return (
    <div className={s.container}>
      {isLoading ? (
        <Loader />
      ) : tracksError ? (
        <div>Не удалось загрузить список треков</div>
      ) : tracksList && tracksList.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortedTracks.map((t) => t.id)}>
            <ul className={s.tracksList}>
              {sortedTracks.map((track, index) => (
                <SortableTrack key={track.id} track={track} index={index + 1}/>
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
                {isFetching ? 'загрузка...' : 'смотреть ещё'}
              </button>
            </div>
          )}
        </DndContext>
      ) : null}
    </div>
  )
};