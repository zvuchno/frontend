import clsx from "clsx";

import styles from "./buttonLike.module.scss";

type TButtonLikeIconProps = {
  isLiked: boolean;
  isAnimated?: boolean;
};

const HEART_PATH =
  "M.001 9.505C.056 4.37 4.134 0 9.375 0c3.218 0 5.584 1.593 7.094 3.092.42.417.782.834 1.084 1.218.302-.384.663-.8 1.083-1.218C20.145 1.592 22.512 0 25.73 0c5.241 0 9.32 4.371 9.372 9.505.1 10.012-7.945 16.938-16.03 22.428a2.7 2.7 0 0 1-3.04 0C7.946 26.443-.1 19.517.002 9.505";

export const ButtonLikeIcon = ({
  isLiked,
  isAnimated = false,
}: TButtonLikeIconProps) => (
  <svg
    className={clsx(styles.icon, {
      [styles.iconAnimated]: isAnimated,
    })}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-1.5 -1.5 39 39"
    aria-hidden="true"
    focusable="false"
  >
    {isLiked ? (
      <path className={styles.iconFill} d={HEART_PATH} />
    ) : (
      <path className={styles.iconOutline} d={HEART_PATH} />
    )}
  </svg>
);
