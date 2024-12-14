import { auth, signOut } from "@/lib/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  // const session = false;
  return (
    <header className="bg-white px-5 py-3 font-work-sans shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="logo"
            width={50}
            height={50}
            className="transition-transform duration-300 hover:rotate-90"
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/blog/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 text-blue-500 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 text-blue-500 sm:hidden" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>
                    <Image
                      src="/user-48x48.png"
                      alt="user image"
                      width={40}
                      height={40}
                    />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              {/* <button onClick={signIn("github")}>
                <span>Login using GitHub</span>
              </button>
              <button onClick={signIn("google")}>
                <span>Login using Gmail</span>
              </button> */}
              <Link href="/login">
                <span>Login</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
