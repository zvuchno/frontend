import { HeroUI } from "@/widgets/layout/main/Hero";
import styles from "./NotFoundPage.module.scss";
import { ButtonUI, ListSection } from "@/shared/ui";
import Link from "next/link";
import s from "@/widgets/layout/main/Hero/ui/Hero.module.scss"; // изменить структуру
import clsx from "clsx";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import { mockProducts } from "@/shared/constants";

export function NotFoundPage() {
  return (
    <div className={clsx(styles.page, styles.not_found)}>
      <HeroUI
        centerText="Упс! Кажется что-то пошло не так"
        mainTitle=""
        leftText={{}}
        rightText={{}}
        className={styles.not_found__banner}
      >
        <div className={styles.not_found__container}>
          <div className={styles.not_found__content}>
            <span className={clsx(s.hero__h1, styles.not_found__contentText)}>
              4
            </span>
            <span
              className={clsx(
                s.hero__h1,
                styles.not_found__contentText,
                styles.secondSymbol,
              )}
            >
              4
            </span>
            <div className={styles.image_container}>
              <img
                src="/images/404-image.png"
                alt="На главную"
                loading="lazy"
              />
            </div>
          </div>
          <ButtonUI variant={"accentDark"} className={styles.not_found__button}>
            <Link href={"/catalog/all"} className={styles.button_text}>
              На главную
            </Link>
          </ButtonUI>
        </div>
      </HeroUI>
      <ListSection
        title="вам может понравиться"
        link={`/`}
        className={styles.not_found__main_section}
      >
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            image={product.cover_image}
            description={product.description}
            price={product.price ?? undefined}
            likeButton={<ButtonLike isLiked={product.isLiked} />}
          />
        ))}
      </ListSection>
    </div>
  );
}
