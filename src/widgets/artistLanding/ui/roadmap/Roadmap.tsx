"use client";

import clsx from "clsx";

import { Text, Title } from "@/shared/ui/Typography/Typography";

import styles from "./Roadmap.module.scss";
import type { RoadmapItemSide, RoadmapProps } from "./Roadmap.types";

const resolveSide = (
  side: RoadmapItemSide | undefined,
  index: number,
  autoAlternate: boolean,
): RoadmapItemSide => {
  if (side) {
    return side;
  }

  if (autoAlternate) {
    return index % 2 === 0 ? "left" : "right";
  }

  return "left";
};

export const Roadmap = ({
  title,
  items,
  className,
  autoAlternate = true,
}: RoadmapProps) => {
  return (
    <section className={clsx(styles.roadmap, className)}>
      <div className={styles.roadmap__inner}>
        <Title Tag="h2" className={styles.roadmap__title}>
          {title}
        </Title>

        <ol className={styles.roadmap__timeline}>
          {items.map((item, index) => {
            const side = resolveSide(item.side, index, autoAlternate);

            return (
              <li
                key={item.id}
                className={clsx(
                  styles.roadmap__item,
                  side === "left"
                    ? styles.roadmap__item_left
                    : styles.roadmap__item_right,
                )}
              >
                <div className={styles.roadmap__content}>
                  <Title Tag="h3" className={styles.roadmap__itemTitle}>
                    {item.title}
                  </Title>

                  <Text Tag="p" className={styles.roadmap__itemDescription}>
                    {item.description}
                  </Text>
                </div>

                <span className={styles.roadmap__marker} aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Roadmap;
