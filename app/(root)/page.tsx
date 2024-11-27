import BlogCard, { BlogTypeCard } from "@/components/BlogCard";
import SearchForm from "../../components/SearchForm";
// import { client } from "@/sanity/lib/client";
import { BLOGS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  console.log(searchParams);
  console.log(query);

  const { data: posts } = await sanityFetch({ query: BLOGS_QUERY });
  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Share Your Tech Insights with the World</h1>
        <p className="sub-heading !max-w-3xl">
          Explore the latest in tech, or start a conversation with your own
          blog.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Blogs and Posts"}
        </p>
        <ul className="card_grid mt-7">
          {posts?.length > 0 ? (
            posts.map((post: BlogTypeCard) => (
              <BlogCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Results Found!</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
