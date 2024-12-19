import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { signIn } from "@/lib/auth";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Sign in",
};

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        {/* Back Button */}
        <div className="mb-4 text-left">
          <BackButton />
        </div>
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Welcome to SHARE IT!
        </h1>
        <p className="mb-8 text-gray-500">
          Sign in to continue and start sharing.
        </p>

        {/* Gmail Login */}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button variant="default" type="submit" className="login_btn">
            <Mail />
            Login with Gmail
          </Button>
        </form>

        {/* GitHub Login */}
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/" });
          }}
        >
          <Button
            variant="outline"
            type="submit"
            className="login_btn bg-gray-900 hover:bg-gray-800"
          >
            <Github />
            Login with GitHub
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
