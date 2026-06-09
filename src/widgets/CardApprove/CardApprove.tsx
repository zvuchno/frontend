import type { CardApproveProps } from "./model/CardApprove.types";
import styles from "./CardApprove.module.scss";
import clsx from "clsx";
import { Accordion } from "@/shared/ui";

export const CardApprove: React.FC<CardApproveProps> = ({
  mainBlock,
  content,
  className,
  contentClassName,
}: CardApproveProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div>{mainBlock}</div>
      <Accordion content={content} wrapperClassName={contentClassName} />
    </div>
  );
};
