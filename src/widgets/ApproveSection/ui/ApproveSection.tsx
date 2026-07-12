import clsx from "clsx";

import { CardApprove } from "@/widgets/CardApprove";

import { CardArtist } from "@/entities/Artist";

import { Title } from "@/shared/ui";

import type { ApproveSectionProps } from "../model/ApproveSection.types";
import styles from "./ApproveSection.module.scss";

export const ApproveSection = ({ className, artistInfo }: ApproveSectionProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <Title Tag='h2' className={styles.title}>
        одобрено музыкантами
      </Title>
      <div className={styles.wrapper}>
        {artistInfo.map((artist) => {
          return (
            <CardApprove
              key={artist.description}
              mainBlock={
                <CardArtist
                  image={artist.image}
                  description={artist.description}
                  hasButton={false}
                  isLiked={true}
                />
              }
              content={artist.content}
            />
          );
        })}
      </div>
    </div>
  );
};
