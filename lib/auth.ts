import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_OR_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user: { name, email, image }, account, profile }) {
      // const id = account?.provider === "github" ? profile?.id : account?.providerAccountId;
      const id =
        account?.provider === "github" ? profile?.id : googleId(profile?.sub);
      const login =
        account?.provider === "github" ? profile?.login : email?.split("@")[0];
      const bio = account?.provider === "github" ? profile?.bio : "";

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_OR_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio,
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        // const id = account.providerAccountId;
        const id =
          account?.provider === "github" ? profile?.id : googleId(profile?.sub);
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_OR_GITHUB_ID_QUERY, { id });
        token.id = user?._id;
      }
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      console.log(session);
      return session;
    },
  },
});

const googleId = (sub) => {
  let sum = 0;
  for (let i = 0; i < sub.length; i++) {
    sum += sub.charCodeAt(i);
  }
  return sum;
};
