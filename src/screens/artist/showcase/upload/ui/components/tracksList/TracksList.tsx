"use client";

import s from "./TracksList.module.scss";
import TrackCard from "@/entities/albums/ui/trackCard/TrackCard";
import { Loader } from "@/shared/ui";

import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from "react";
import type { TShowcaseTrack } from "@/entities/Artist/model/types";
import type { PaginatedStoreResponse } from "@/api/store/types";
import type { 
  FetchNextPageOptions, 
  InfiniteData, 
  InfiniteQueryObserverResult 
} from "@tanstack/react-query";
import { DeleteIcon, EditIcon } from "@/shared/ui/Icons";

type TracksListProps = {
  tracksList: TShowcaseTrack[];
  tracksError: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  loadMore: (options?: FetchNextPageOptions | undefined) => 
    Promise<InfiniteQueryObserverResult<InfiniteData<PaginatedStoreResponse<TShowcaseTrack>, unknown>, Error>>
  onDeleteTrack: (id: number) => Promise<void>;
  onEditTrack: (id: number) => void;
  onOrderChange?: (ids: number[]) => void;
};

export const TracksList = ({ 
  tracksList, 
  tracksError, 
  isLoading,
  isFetching,
  hasMore,
  loadMore,
  onDeleteTrack, 
  onEditTrack, 
  onOrderChange 
}: TracksListProps) => {

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
    useSensor(TouchSensor),
    useSensor(PointerSensor),
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
      cursor: "grab",
      userSelect: "none",
    };

    return (
      <li ref={setNodeRef} style={style} {...attributes} className={s.tracksList__card}>
        <div className={s.tracksList__dragCard} {...listeners}>
          <span className={s.tracksList__index} >{index}</span>
          <TrackCard
            image={track.image}
            title={track.artist_name}
            description={track.name}
            duration={track.duration}
          />
        </div>
        
        <button className={s.editButton} onClick={() => onEditTrack(track.id)} type="button">
          {EditIcon()}
        </button>
        <button className={s.deleteButton} onClick={() => void onDeleteTrack(track.id)} type="button">
          {DeleteIcon()}
        </button>
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