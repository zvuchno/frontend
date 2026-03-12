"use client";

import { FC } from "react";

import { TButtonLikeProps } from "./types";

export const ButtonLike: FC<TButtonLikeProps> = ({ isLiked }) => (
  <button
    type="button"
    aria-label={isLiked ? "Удалить лайк" : "Добавить лайк"}
    aria-pressed={isLiked}
  ></button>
);
