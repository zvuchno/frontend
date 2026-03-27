"use client";

import clsx from "clsx";
import { FC, useState } from "react";

import styles from "./buttonLike.module.scss";
import { ButtonLikeIcon } from "./ButtonLikeIcon";
import { TButtonLikeProps } from "./types";

export const ButtonLike: FC<TButtonLikeProps> = ({
  isLiked: initialIsLiked, className, iconClassName
}) => {
  const [isLiked, setIsLiked] = useState(() => initialIsLiked);
  const [animationKey, setAnimationKey] = useState(0);

  const handleClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setAnimationKey((prevAnimationKey) => prevAnimationKey + 1);
  };

  return (
    <button
      type="button"
      className={clsx(styles.buttonLike, {
        [styles.liked]: isLiked}, className)}
      aria-label={isLiked ? "Убрать лайк" : "Добавить лайк"}
      aria-pressed={isLiked}
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
