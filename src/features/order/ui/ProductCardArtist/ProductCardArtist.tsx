import clsx from "clsx";
import Image from "next/image";
import type { FC } from "react";

import { Definition } from "@/shared/ui/definition";
import styles from "./ProductCardArtist.module.scss";
import type { ProductCardArtistProps } from "./types";

const getDefinitionText = ({
  label,
  value,
}: ProductCardArtistProps["definitions"][number]) =>
  [label, value]
    .filter(
      (part): part is string | number =>
        part !== undefined && !(typeof part === "string" && part.length === 0),
    )
    .map(String)
    .join(" ");

export const ProductCardArtist: FC<ProductCardArtistProps> = ({
  className,
  id,
  image,
  imageWidth,
  imageHeight,
  definitions,
  variant = "merch",
  ...articleProps
}) => {
  const primaryDefinition = definitions[0];
  const productName = getDefinitionText(primaryDefinition);

  return (
    <article
      {...articleProps}
      className={clsx(
        styles.productCardArtist,
        styles[`productCardArtist_variant_${variant}`],
        className,
      )}
      data-product-id={id}
      aria-label={productName}
    >
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={image}
          alt={productName}
          width={imageWidth}
          height={imageHeight}
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
