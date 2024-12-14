import { client } from "@/sanity/lib/client";
import { BLOGS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import BlogCard, { BlogTypeCard } from "./BlogCard";

const UserBlogs = async ({ id }: { id: string }) => {
  const blogs = await client.fetch(BLOGS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((blog: BlogTypeCard) => (
          <BlogCard key={blog._id} post={blog} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserBlogs;
