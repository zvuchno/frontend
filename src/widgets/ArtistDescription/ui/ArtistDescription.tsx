"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import clsx from "clsx";

import { type FieldValues } from "@/features/profile";

import { CustomInput, Text, Title } from "@/shared/ui";

import { type ArtistDescriptionProps } from "../model/ArtistDescription.type";
import s from "./ArtistDescription.module.scss";

type ArtistDescriptionInputProps = Pick<
  ArtistDescriptionProps,
  "description" | "emptyText" | "hasChanges" | "isEdit" | "onEditMode"
> & {
  isEmpty: boolean;
};

const ArtistDescriptionInput = ({
  emptyText,
  description,
  isEdit,
  hasChanges,
  onEditMode,
  isEmpty,
}: ArtistDescriptionInputProps) => {
  const { register, setValue } = useFormContext<FieldValues>();

  return (
    <CustomInput
      {...register("description")}
      id='description'
      multiline
      className={isEmpty ? s.content__emptyText : s.content__text}
      inputClassName={s.content__descriptionInput}
      rows={10}
      maxLength={350}
      readOnly={!isEdit}
      aria-readonly={!isEdit}
      placeholder={emptyText}
      value={description}
      onChange={(event) => {
        const value = event.target.value;

        setValue("description", value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
        onEditMode?.();
        hasChanges?.(value);
      }}
    />
  );
};

const ExpandButton = ({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) => (
  <button
    type='button'
    className={clsx(s.content__button, { [s.content__button_rotate]: isExpanded })}
    onClick={onClick}
  >
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none' viewBox='0 0 10 6'>
      <path stroke='#100f0d' strokeLinecap='round' d='M8.984.5 4.742 4.743.499.5' />
    </svg>
  </button>
);

export const ArtistDescription = ({
  variant,
  description,
  title,
  emptyText,
  className,
  isEdit,
  hasChanges,
  onEditMode,
}: ArtistDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasDescription = Boolean(description.trim());
  const isProfileEmptyState = variant === "profile" && !hasDescription;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (variant === "profile") {
        setShouldShowButton(false);
        return;
      }

      const el = textRef.current;

      if (!el) {
        return;
      }

      const scrollHeight = el.scrollHeight;
      //el.style.height = `${scrollHeight}px`;
      setShouldShowButton(scrollHeight > 60);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [description, emptyText, variant]);

  useEffect(() => {
    const el = textRef.current;

    if (!el) return;

    if (isExpanded) {
      const scrollHeight = el.scrollHeight;

      if (scrollHeight > 500) {
        el.style.overflowY = "scroll";
      }
    } else {
      el.style.overflowY = "hidden";
    }
  }, [isExpanded]);

  const toggleExpend = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div
      className={clsx(s.container, {
        [s.container_inCatalog]: variant === "catalog",
        [s.container_inProfile]: variant === "profile",
      })}
    >
      <div
        className={clsx(s.header, {
          [s.header_inCatalog]: variant === "catalog",
          [s.header_inProfile]: variant === "profile",
        })}
      >
        {title && (
          <Title Tag='h4' variant='title' className={s.header__title}>
            {title}
          </Title>
        )}
      </div>

      <div
        className={clsx(s.content, className, {
          [s.content_inCatalog]: variant === "catalog",
          [s.content_inProfile]: variant === "profile",
        })}
      >
        <div
          ref={textRef}
          className={clsx(
            { [s.content__textWrapper]: variant === "catalog" },
            { [s.content__textWrapper_expended]: isExpanded }
          )}
        >
          {variant === "catalog" ? (
            <Text Tag='p' className={isProfileEmptyState ? s.content__emptyText : s.content__text}>
              {description}
            </Text>
          ) : (
            <ArtistDescriptionInput
              description={description}
              isEdit={isEdit}
              emptyText={emptyText}
              hasChanges={hasChanges}
              onEditMode={onEditMode}
              isEmpty={isProfileEmptyState}
            />
          )}
        </div>

        {shouldShowButton && <ExpandButton isExpanded={isExpanded} onClick={toggleExpend} />}
      </div>
    </div>
  );
};
