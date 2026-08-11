import clsx from "clsx";

import styles from "./Paginator.module.scss";

export const Paginator = ({
  count,
  currentPage,
  className,
  onHandleCurrent,
}: {
  count: number;
  currentPage: number;
  className?: string;
  onHandleCurrent: (page: number) => void;
}) => {
  return (
    <div className={clsx(styles.paginator, className)}>
      {Array.from({ length: count }, (_, index) => {
        const pageNum = index + 1;
        return (
          <span
            key={pageNum}
            className={clsx(styles.paginatorPage, { [styles.active]: pageNum === currentPage })}
            onClick={() => onHandleCurrent(pageNum)}
          >
            {pageNum}
          </span>
        );
      })}
    </div>
  );
};
