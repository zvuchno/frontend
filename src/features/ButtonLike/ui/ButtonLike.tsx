import clsx from "clsx";
import { FC } from "react";

import styles from "./buttonLike.module.scss";
import { TButtonLikeProps } from "./types";

export const ButtonLike: FC<TButtonLikeProps> = ({ isLiked }) => (
  <button
    type="button"
    className={clsx(styles.buttonLike, {
      [styles.liked]: isLiked,
    })}
    aria-label={isLiked ? "Удалить лайк" : "Добавить лайк"}
    aria-pressed={isLiked}
  >
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="33"
      fill="none"
    >
      <path
        fill="#c2dfff"
        fill-rule="evenodd"
        d="M0 9.505C.055 4.37 4.133 0 9.374 0c3.218 0 5.584 1.593 7.094 3.092.42.417.782.834 1.084 1.218.302-.384.663-.8 1.083-1.218C20.144 1.592 22.511 0 25.73 0c5.241 0 9.32 4.371 9.372 9.505.1 10.012-7.945 16.938-16.031 22.428a2.7 2.7 0 0 1-3.038 0C7.945 26.443-.1 19.517.001 9.505m18.757-2.148a1.35 1.35 0 0 1-2.412 0q0 0-.002-.003l-.015-.029-.075-.136a9 9 0 0 0-.332-.532 11 11 0 0 0-1.356-1.649c-1.21-1.2-2.931-2.308-5.192-2.308-3.661 0-6.634 3.077-6.672 6.832m16.056-2.175.001-.003.015-.029q.023-.043.076-.136a10.862 10.862 0 0 1 1.688-2.18c1.209-1.202 2.931-2.309 5.192-2.309 3.661 0 6.633 3.077 6.672 6.832.084 8.437-6.692 14.63-14.849 20.167h-.002C9.392 24.162 2.616 17.97 2.7 9.532"
        clip-rule="evenodd"
      />
    </svg>
  </button>
);
