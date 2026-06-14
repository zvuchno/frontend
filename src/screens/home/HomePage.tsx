import styles from "./HomePage.module.scss";
import { HeroUI } from "@/widgets/layout/main/Hero";
import { JoinSection } from "@/widgets/layout/main/JoinSection";
import { ListSection } from "@/shared/ui";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import BlogCard from "@/entities/blog/ui/BlogCard/BlogCard";
import { SectionFAQ } from "@/widgets/SectionFAQ";
import { mockBlogs, questions } from "@/shared/constants";
import { getArtistsList } from "@/api/catalog/artistsListApi/getArtistsList";
import { getCatalogList } from "@/api/catalog/catalogListApi/getCatalogList";

export async function HomePage() {
  
  const artistsList = (await getArtistsList({
    limit: "3"
  })).results;

  const albumsList = (await getCatalogList({
    type: "album",
    limit: "4"
  })).results;

  const merchList = (await getCatalogList({
    type: "merch",
    limit: "4"
  })).results;

  return (
    <div className={styles.page}>
      <HeroUI />

      <div className={styles.mainContent}>
        <ListSection title="Артисты" link={`/catalog/artists`}>
          {artistsList.map((artist) => (
            <CardArtist
              key={artist.slug}
              image={artist.cover ?? undefined}
              description={artist.name}
            />
          ))}
        </ListSection>

        <ListSection title="Музыка" link={`/catalog/album`}>
          {albumsList.map((item) => (
            <ProductCard
              key={item.product_id}
              title={item.artist_name}
              image={item.image}
              description={item.name}
              price={item.price ?? undefined}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
            />
          ))}
        </ListSection>

        <ListSection title="Мерч" link={`/catalog/merch`}>
          {merchList.map((item) => (
            <ProductCard
              key={item.product_id}
              title={item.artist_name}
              image={item.image}
              description={item.name}
              price={item.price ?? undefined}
              likeButton={<ButtonLike isLiked={item.is_favorite} />}
            />
          ))}
        </ListSection>

        {mockBlogs.length > 0 && (
          <ListSection title="Блог" link="">
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

        <SectionFAQ title="FAQ" items={questions} />
      </div>

      <JoinSection link="" />
    </div>
  );
}
