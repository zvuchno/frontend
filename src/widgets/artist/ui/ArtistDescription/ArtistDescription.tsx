"use client";

import { Text, Title } from "@/shared/ui/Typography/Typography";
import s from "./ArtistDescription.module.scss";
import { ArtistDescriptionProps } from "./ArtistDescription.type";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const ArtistDescription = ({
  variant,
  description,
  title,
  emptyText,
}: ArtistDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasDescription = Boolean(description.trim());
  const contentText = hasDescription ? description : (emptyText ?? "");
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
      el.style.height = `${scrollHeight}px`;
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
      })}
    >
      <div
        className={clsx(s.header, {
          [s.header_inCatalog]: variant === "catalog",
        })}
      >
        {title && (
          <Title Tag="h4" variant="title" className={s.header__title}>
            {title}
          </Title>
        )}
      </div>

      <div
        className={clsx(s.content, {
          [s.content_inCatalog]: variant === "catalog",
        })}
      >
        <div
          ref={textRef}
          className={clsx(
            { [s.content__textWrapper]: variant === "catalog" },
            { [s.content__textWrapper_expended]: isExpanded },
          )}
        >
          <Text
            Tag="p"
            className={
              isProfileEmptyState ? s.content__emptyText : s.content__text
            }
          >
            {contentText}
          </Text>
        </div>

        {shouldShowButton && (
          <button
            type="button"
            className={clsx(s.content__button, {
              [s.content__button_rotate]: isExpanded,
            })}
            onClick={toggleExpend}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="6"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="#100f0d"
                strokeLinecap="round"
                d="M8.984.5 4.742 4.743.499.5"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtistDescription;
