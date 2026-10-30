import Image from "next/image";

import styles from "./DataStatusBar.module.scss";

export type TDataStatus = "not-completed" | "on-review" | "is-confirmed";
type TStatusDetails = { title: string; color: string; icon: string };

const status: Record<TDataStatus, TStatusDetails> = {
  "not-completed": {
    title: "Не заполнены",
    color: "#C52525",
    icon: "/icons/Status-not-completed.svg",
  },
  "on-review": { title: "На проверке", color: "#2929D9", icon: "/icons/Status-review.svg" },
  "is-confirmed": {
    title: "Подтверждены",
    color: "#20813A",
    icon: "/icons/Status-confirmed.svg",
  },
};

export const DataStatusBar = ({ dataStatus }: { dataStatus: TDataStatus }) => {
  const title = status[dataStatus].title;
  const img = status[dataStatus].icon;
  const color = status[dataStatus].color;

  return (
    <div className={styles.dataStatusWrapper}>
      <div className={styles.dataStatus} style={{ backgroundColor: `${color}` }}>
        <Image src={img} alt={title} width={20} height={20} />
        <span className={styles.dataStatusTitle}>{title}</span>
      </div>
    </div>
  );
};
