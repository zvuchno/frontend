"use client";

import clsx from "clsx";
import { useState } from "react";

import styles from "./buttonLike.module.scss";
import { ButtonLikeIcon } from "./ButtonLikeIcon";
import { TButtonLikeProps } from "./types";

export const ButtonLike = ({
  isLiked: initialIsLiked,
  className,
  iconClassName,
  disabled = false,
  onToggle,
}: TButtonLikeProps) => {
  const [isLiked, setIsLiked] = useState(() => initialIsLiked);
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIsLiked = !isLiked;

    setIsLiked(nextIsLiked);
    setAnimationKey((prevAnimationKey) => prevAnimationKey + 1);
    onToggle?.(nextIsLiked);
  };

  return (
    <button
      type="button"
      className={clsx(
        styles.buttonLike,
        {
          [styles.liked]: isLiked,
        },
        className,
      )}
      aria-label={isLiked ? "Убрать лайк" : "Добавить лайк"}
      aria-pressed={isLiked}
      disabled={disabled}
      onClick={handleClick}
    >
      <ButtonLikeIcon
        iconClassName={iconClassName}
        key={animationKey}
        isLiked={isLiked}
        isAnimated={animationKey > 0}
      />
    </button>
  );
};
