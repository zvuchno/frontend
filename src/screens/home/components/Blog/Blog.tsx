import { BlogCard } from "@/entities/blog";

import { ListSection } from "@/shared/ui";

import styles from "./Blog.module.scss";

type TBlog =
  | { id: string; image: string; link: string; description: string; hasLink: boolean }
  | {
      id: string;
      image: string;
      description: string;
      hasLink: boolean;
      link?: undefined;
    };

export const Blog = ({ blogs }: { blogs: TBlog[] }) => {
  if (blogs.length === 0) return;

  return (
    <ListSection title='Блог' link='' className={styles.blogs}>
      {blogs.map((blog) => (
        <div key={blog.id} className={styles.blogsCardWrapper}>
          <BlogCard
            image={blog.image}
            description={blog.description}
            link={blog.link}
            hasLink={blog.hasLink}
            className={styles.blogsCard}
          />
        </div>
      ))}
    </ListSection>
  );
};
