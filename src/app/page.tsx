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

export default async function Home() {

  const artistsData = await getListArtists(3);
  const artistsList = artistsData.results;

  const mockProducts = [
    {
      id: '1',
      image: 'https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg',
      title: 'ОДИН МАНУЛ',
      description: 'Винил ОДИН МАНУЛ (LP, 2025)',
      price: '1 000 ₽',
    },
    {
      id: '2',
      image: 'https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg',
      title: 'ОДИН МАНУЛ',
      description: 'Винил ОДИН МАНУЛ (LP, 2025)',
      price: '1 000 ₽',
    },
    {
      id: '3',
      image: 'https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg',
      title: 'ОДИН МАНУЛ',
      description: 'Винил ОДИН МАНУЛ Deluxe Gatefold Edition (LP, 2025)',
      price: '12 500 ₽',
    },
    {
      id: '4',
      image: 'https://img.freepik.com/free-photo/musician-playing-electric-guitar_23-2151414264.jpg',
      title: 'ОДИН МАНУЛ',
      description: 'Винил ОДИН МАНУЛ Deluxe Gatefold Edition (LP, 2025)',
      price: '12 500 ₽',
    },
  ];

  const mockBlogs = [
    {
      id: '1',
      image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
      link: '/blog/example',
      description: 'Почему музыкальные релизы выходят по пятницам?',
      hasLink: true,
    },
    {
      id: '2',
      image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
      description: 'Как создать идеальный плейлист',
      hasLink: false,
    },
    {
      id: '3',
      image: 'https://avatars.mds.yandex.net/i?id=2b49f18a1239d68def51de89f1d3c415c83ea222-8236365-images-thumbs&n=13',
      link: '/blog/long-title',
      description: 'Почему музыкальные релизы выходят по пятницам и как это влияет на индустрию',
      hasLink: true,
    }
  ];

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
          {mockProducts.map(product => (
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

        <ListSection title="Мерч" link="">
          {mockProducts.map(product => (
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

        <ListSection title="Блог" link="">
          {mockBlogs.map(blog => (
            <BlogCard 
              key={blog.id} 
              image={blog.image} 
              description={blog.description} 
              link={blog.link} 
              hasLink={blog.hasLink}
            />
          ))}
        </ListSection>

        <SectionFAQ title="FAQ" items={questions} />
      </div>

      <JoinSection link=""/>

    </div>
  );
}