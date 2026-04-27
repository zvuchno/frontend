import type { ApproveSectionProps } from "./ApproveSection.types";
import styles from "./ApproveSection.module.scss";
import clsx from "clsx";
import { Title } from "@/shared/ui/Typography/Typography";
import { CardApprove } from "@/widgets/landingArtist/ui/CardApprove/CardApprove";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";

export const ApproveSection: React.FC<ApproveSectionProps> = ({
  className,
  artistInfo,
}: ApproveSectionProps) => {
  return (
    <div className={clsx(styles.container, className)}>
      <Title Tag="h2" className={styles.title}>
        одобрено музыкантами
      </Title>
      <div className={styles.wrapper}>
        {artistInfo.map((artist) => {
          return (
            <CardApprove
              key={crypto.randomUUID()}
              mainBlock={
                <CardArtist
                  image={artist.image}
                  description={artist.description}
                  hasButton={true}
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
