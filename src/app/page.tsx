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
import { mockBlogs } from "./mocks";
import { getListAlbums } from "@/api/listAlbums/listAlbumsApi";
import { getListMerch } from "@/api/listMerch/listMerchApi";

export default async function Home() {

  const artistsList = (await getListArtists(3)).results;
  
  const albumsList = (await getListAlbums(4)).results;

  const merchList = (await getListMerch(4)).results;

  const blogs = mockBlogs;

  const questions = [
    {
      id: '1',
      label: 'Когда запуск?',
      children: 'Если ты это читаешь, то бета уже в релизе. Полноценный релиз выкатим уже летом этого года.',
    },
    {
      id: '2',
      label: 'Ещё один стриминг?',
      children: 'Нет. Мы концентрируемся на взаимодействии фанатов с артистами и прямой поддержке.',
    },
    {
      id: '3',
      label: 'Это безопасно?',
      children: 'Да. По секрету, у нас не было выбора, мы не можем не заботиться о ваших данных. А еще у нас нет рекламы, вот и думайте.',
    },
    {
      id: '4',
      label: 'А моя поддержка точно поступит артисту?',
      children: 'Да. Все наши артисты верифицированы, и мы сделали все, чтобы защитить их права и данные.',
    },
  ];

  return (
    <div className={styles.page}>

      <HeroUI />

      <div className={styles.mainContent}>
        <ListSection title="Артисты" link={`/catalog/artists`}>
          {artistsList.map(artist => (
            <CardArtist 
              key={artist.name} 
              image={artist.cover ?? undefined} 
              description={artist.name}
            />
          ))}
        </ListSection>

        <ListSection title="Музыка" link={`/catalog/albums`}>
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

        <ListSection title="Мерч" link={`/catalog/merch`}>
          {merchList.map(item => (
            <ProductCard
              key={item.id}
              title={item.name} 
              image={item.main_image} 
              description={item.description} 
              price={item.price}
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