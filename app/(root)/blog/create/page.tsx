import BlogForm from "@/components/BlogForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/login");
    return (
      <>
        <section className="blue_container !min-h-[230px]">
          <h1 className="heading">Create your own blog</h1>
        </section>

        <BlogForm />
      </>
    );
};

export default page;
