"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./buttonLike.module.scss";
import { ButtonLikeIcon } from "./ButtonLikeIcon";
import { type TButtonLikeProps } from "./types";
import toast from "react-hot-toast";

export const ButtonLike = ({
  isLiked: initialIsLiked,
  className,
  iconClassName,
  disabled = false,
  isAuth,
  onToggle,
}: TButtonLikeProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIsLiked = !isLiked;

    if (!isAuth) {
      toast.error('Войдите, чтобы добавить в избранное');
      return;
    }

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
