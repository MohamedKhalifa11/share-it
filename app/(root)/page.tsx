import BlogCard from "@/components/BlogCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  console.log(searchParams);
  console.log(query);

  const posts = [
    {
      _CreatedAt: new Date(),
      views: 56,
      author: { _id: 1, name: "Mohamed" },
      _id: 1,
      describtion: "This is a describtion",
      image:
        "https://media.licdn.com/dms/image/v2/D4D12AQG56UPUtPJj0w/article-cover_image-shrink_423_752/article-cover_image-shrink_423_752/0/1669373321238?e=1736985600&v=beta&t=qNT_ausGBDlSY3SwyQSXoMJY2mjojY_2-R4yfkJiq0s",
      category: "Tech",
      title: "This is a title",
    },
  ];

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
            posts.map((post: BlogCardType) => (
              <BlogCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Results Found!</p>
          )}
        </ul>
      </section>
    </>
  );
}
