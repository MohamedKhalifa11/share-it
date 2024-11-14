import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  console.log(searchParams);
  console.log(query);

  return (
    <section className="blue_container">
      <h1 className="heading">Share Your Tech Insights with the World</h1>
      <p className="sub-heading !max-w-3xl">
        Explore the latest in tech, or start a conversation with your own blog.
      </p>
      <SearchForm query={query} />
    </section>
  );
}
