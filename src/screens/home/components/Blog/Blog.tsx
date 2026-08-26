import { BlogCard } from "@/entities/blog";

import { ListSection } from "@/shared/ui";

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
    <ListSection title='Блог' link=''>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          image={blog.image}
          description={blog.description}
          link={blog.link}
          hasLink={blog.hasLink}
        />
      ))}
    </ListSection>
  );
};
