import { signIn } from "@/auth";
import React from "react";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <button type="submit">Login using GitHub</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button type="submit">Login using Gmail</button>
      </form>
    </>
  );
};

export default Page;
