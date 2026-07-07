"use client";

import { type TArtistCard } from "@/api/catalog/artistsListApi/types";
import { type TCatalogCard } from "@/api/catalog/catalogListApi/types";
import Link from "next/link";

import { SectionFAQ } from "@/widgets/SectionFAQ";
import { HeroUI } from "@/widgets/layout/main/Hero";
import { JoinSection } from "@/widgets/layout/main/JoinSection";

import { ButtonLike } from "@/features/ButtonLike";

import { CardArtist } from "@/entities/Artist";
import { ProductCard } from "@/entities/ProductCard";
import { BlogCard } from "@/entities/blog";
import { useRecentlyViewed } from "@/entities/recentlyViewed";

import { mockBlogs, questions } from "@/shared/constants";
import { ListSection } from "@/shared/ui";

import styles from "./HomePage.module.scss";
import { handleToggleFavorites } from "@/shared/utils/handleToggleFavorites";
import { useUserStore } from "@/entities/user";

interface HomePageProps {
  artists: TArtistCard[];
  albums: TCatalogCard[];
  merch: TCatalogCard[];
}

export function HomePage({ artists, albums, merch }: HomePageProps) {
  const { addProduct } = useRecentlyViewed();

  const user = useUserStore((state) => state.user);
  const isAuth = !!user?.id;

  return (
    <div className={styles.page}>
      <HeroUI />

      <div className={styles.mainContent}>
        <ListSection title='Артисты' link={`/catalog/artists`} gap='70px'>
          {artists.map((artist) => (
            <Link key={artist.slug} href={`/catalog/artists/${artist.slug}/?kind=artists`}>
              <CardArtist image={artist.cover ?? undefined} description={artist.name} hasButton={false}/>
            </Link>
          ))}
        </ListSection>

        <ListSection title='Музыка' link={`/catalog/album`}>
          {albums.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected =
              item.target.selected_variant_id !== null
                ? item.target.selected_variant_id
                : undefined;
            return (
              <ProductCard
                key={item.product_id}
                title={item.artist_name}
                image={item.image}
                description={
                  item.year === null
                    ? `${item.kind} ${item.name}`
                    : `${item.kind} ${item.name} (${item.year.toString()})`
                }
                price={item.price ?? undefined}
                likeButton={
                  <ButtonLike 
                    isLiked={item.is_favorite} 
                    onToggle={(isLiked) => handleToggleFavorites(isLiked, item.target.id)}
                    isAuth={isAuth}
                  />
                }
                link={`/catalog/release/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
              />
            );
          })}
        </ListSection>

        <ListSection title='Мерч' link={`/catalog/merch`}>
          {merch.map((item) => {
            const url = item.target.url;
            const match = url.match(/(\d+)\/$/);
            const id = match ? match[1] : null;
            const selected =
              item.target.selected_variant_id !== null
                ? item.target.selected_variant_id
                : undefined;
            return (
              <ProductCard
                key={item.product_id}
                title={item.artist_name}
                image={item.image}
                description={
                  item.year === null
                    ? `${item.kind} ${item.name}`
                    : `${item.kind} ${item.name} (${item.year.toString()})`
                }
                price={item.price ?? undefined}
                likeButton={
                  <ButtonLike 
                    isLiked={item.is_favorite} 
                    onToggle={(isLiked) => handleToggleFavorites(isLiked, item.target.id)}
                    isAuth={isAuth}
                  />
                }
                link={`/catalog/album/${id}/?kind=${item.target.type}&selected=${selected}`}
                onHandleClick={() => addProduct(item)}
              />
            );
          })}
        </ListSection>

        {mockBlogs.length > 0 && (
          <ListSection title='Блог' link=''>
            {mockBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                image={blog.image}
                description={blog.description}
                link={blog.link}
                hasLink={blog.hasLink}
              />
            ))}
          </ListSection>
        )}

        <SectionFAQ title='FAQ' items={questions} />
      </div>

      <JoinSection link='' />
    </div>
  );
}
