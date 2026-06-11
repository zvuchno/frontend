import styles from "./HomePage.module.scss";
import { HeroUI } from "@/widgets/layout/main/Hero";
import { JoinSection } from "@/widgets/layout/main/JoinSection";
import { ListSection } from "@/shared/ui";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import BlogCard from "@/entities/blog/ui/BlogCard/BlogCard";
import { SectionFAQ } from "@/widgets/SectionFAQ";
import { getListArtists } from "@/api/listArtists/listArtistsApi";
import { mockBlogs, questions } from "@/shared/constants";
import { getListAlbums } from "@/api/listAlbums/listAlbumsApi";
import { getListMerch } from "@/api/listMerch/listMerchApi";

export async function HomePage() {
  const artistsList = (await getListArtists(3)).results;

  const albumsList = (await getListAlbums(4)).results;

  const merchList = (await getListMerch(4)).results;

  return (
    <div className={styles.page}>
      <HeroUI />

      <div className={styles.mainContent}>
        <ListSection title="Артисты" link={`/catalog/artists`}>
          {artistsList.map((artist, index) => (
            <CardArtist
              key={`${artist.name}-${index}`}
              image={artist.cover ?? undefined}
              description={artist.name}
            />
          ))}
        </ListSection>

        <ListSection title="Музыка" link={`/catalog/albums`}>
          {albumsList.map((item) => (
            <ProductCard
              key={item.id}
              title={item.name}
              image={item.cover_image}
              description={item.description}
              price={item.price ?? undefined}
              likeButton={<ButtonLike isLiked={false} />}
            />
          ))}
        </ListSection>

        <ListSection title="Мерч" link={`/catalog/merch`}>
          {merchList.map((item) => (
            <ProductCard
              key={item.id}
              title={item.name}
              image={item.main_image}
              description={item.description}
              price={item.price}
              likeButton={<ButtonLike isLiked={false} />}
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
