import { client } from "@/sanity/lib/client";
import { BLOGS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const expermintal_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(BLOGS_BY_ID_QUERY, { id });
  if (!post) return notFound();

  return (
    <>
      <h1 className="text-3xl">{post.title}</h1>
    </>
  );
};

export default page;
