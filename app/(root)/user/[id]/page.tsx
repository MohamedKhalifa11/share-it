import { BlogCardSkeleton } from "@/components/BlogCard";
import UserBlogs from "@/components/UserBlogs";
import { auth } from "@/lib/auth";
import { ParamsType } from "@/lib/types";
import { getUserById } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: ParamsType) {
  const id = (await params).id;
  const user = await getUserById(id);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  return {
    title: `${user.name}`,
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth;

  const user = await getUserById(id);
  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black text-center uppercase">{user.name}</h3>
          </div>
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="text-14-normal mt-1 text-center">{user?.bio}</p>
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<BlogCardSkeleton />}>
              <UserBlogs id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
