import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import { Definition } from "@/shared/ui/definition";
import styles from "./ProductCardArtist.module.scss";
import type { ProductCardArtistProps } from "./types";

export const ProductCardArtist: FC<ProductCardArtistProps> = ({
  className,
  id,
  image,
  definitions,
  ...articleProps
}) => {
  const primaryDefinition = definitions[0];
  const productName = String(primaryDefinition.value);

  return (
    <article
      {...articleProps}
      className={clsx(styles.productCardArtist, className)}
      data-product-id={id}
      aria-label={productName}
    >
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={image}
          alt={productName}
          width={96}
          height={96}
          sizes="96px"
        />
      </div>

      <dl className={styles.definitions}>
        {definitions.map((definition, index) => (
          <Definition
            key={`${id}-${index}`}
            {...definition}
            className={clsx(styles.definition, definition.className)}
          />
        ))}
      </dl>
    </article>
  );
};
