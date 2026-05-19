import styles from "./page.module.css";
import HeroUI from "@/widgets/Main/ui/Hero/Hero";
import JoinSection from "@/widgets/Main/ui/JoinSection/JoinSection";
import ListSection from "@/shared/ui/ListSection/ListSection";
import CardArtist from "@/entities/Artist/ui/CardArtist/CardArtist";
import { ProductCard } from "@/entities";
import { ButtonLike } from "@/features";
import BlogCard from "@/entities/blog/ui/BlogCard/BlogCard";
import SectionFAQ from "./components/SectionFAQ/SectionFAQ";
import { getListArtists } from "@/api/listArtists/listArtistsApi";
import { mockBlogs, mockProducts } from "./mocks";
import { getListAlbums } from "@/api/listAlbums/listAlbumsApi";

export default async function Home() {

  const artistsList = (await getListArtists(3)).results;
  
  const albumsList = (await getListAlbums(4)).results

  const products = mockProducts;

  const blogs = mockBlogs;

  const questions = [
    {
      id: '1',
      label: 'Когда запуск?',
      children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
    },
    {
      id: '2',
      label: 'Ещё один стриминг?',
      children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
    },
    {
      id: '3',
      label: 'А моя поддержка точно поступит артисту?',
      children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим в следующем году',
    },
  ];

  return (
    <div className={styles.page}>

      <HeroUI />

      <div className={styles.mainContent}>
        <ListSection title="Артисты" link="">
          {artistsList.map(artist => (
            <CardArtist 
              key={artist.name} 
              image={artist.cover ?? undefined} 
              description={artist.name}
            />
          ))}
        </ListSection>

        <ListSection title="Музыка" link="">
          {albumsList.map(item => (
            <ProductCard
              key={item.id}
              title={item.name} 
              image={item.cover_image} 
              description={item.description} 
              price={item.price ?? undefined}
              likeButton={<ButtonLike isLiked={false}/>}
            />
          ))}
        </ListSection>

        <ListSection title="Мерч" link="">
          {products.map(product => (
            <ProductCard
              key={product.id}
              title={product.title} 
              image={product.image} 
              description={product.description} 
              price={product.price}
              likeButton={<ButtonLike isLiked={false}/>}
            />
          ))}
        </ListSection>

        {blogs.length > 0 && (
          <ListSection title="Блог" link="">
            {blogs.map(blog => (
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

      <JoinSection link=""/>

    </div>
  );
}