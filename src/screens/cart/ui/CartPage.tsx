"use client";

import { ListSection } from "@/shared/ui";
import styles from "./CartPage.module.scss";
import { useCart } from "@/entities/cart";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import { mockProducts } from "@/shared/constants";
import { useUserStore } from "@/entities/user/store/useUserStore";
import { EmptyCart } from "./components/EmptyCart/EmptyCart";
import { ProductsCart } from "./components/ProductsCart/ProductsCart";

export const CartPage = () => {
  const { data, isLoading } = useCart();
  const items = data?.items;
  const isAuth = useUserStore((state) => state.isUserAuthorized);

  if (isAuth === undefined || isLoading) return <div>Загрузка корзины...</div>;

  return (
    <div className={styles.cart}>
      {!items || items?.length === 0 ? (
        <EmptyCart />
      ) : (
        <ProductsCart cartItems={items} />
      )}
      <ListSection
        title="вы смотрели"
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
};
