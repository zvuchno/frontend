import HeroUI from "@/widgets/Main/ui/Hero/Hero";
import styles from "./page.module.css";
import { ButtonUI } from "@/shared/ui/button";
import Link from "next/link";
import s from "../widgets/Main/ui/Hero/Hero.module.scss";
import clsx from "clsx";
import ListSection from "@/shared/ui/ListSection/ListSection";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";

const products = [
  {
    id: "string",
    name: "name",
    cover_image: "",
    description: "description",
    price: "",
    isLiked: true,
  },
  {
    id: "string1",
    name: "name",
    cover_image: "",
    description: "description",
    price: "",
    isLiked: false,
  },
  {
    id: "string2",
    name: "name",
    cover_image: "",
    description: "description",
    price: "",
    isLiked: false,
  },
  {
    id: "string3",
    name: "name",
    cover_image: "",
    description: "description",
    price: "",
    isLiked: true,
  },
];

export default function NotFoundPage() {
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
              <img src="404-image.png" alt="На главную" />
            </div>
          </div>
          <ButtonUI variant={"accentDark"} className={styles.not_found__button}>
            <Link href={"/"} className={styles.button_text}>
              На главную
            </Link>
          </ButtonUI>
        </div>
      </HeroUI>
      <ListSection
        title="вам может понравиться"
        link={`/catalog`}
        className={styles.not_found__main_section}
      >
        {products.map((product) => (
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
