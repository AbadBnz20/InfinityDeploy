import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { ValidateUser } from "./actions/auth/getuser";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {

      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token }) {

      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) {
          return null;
        }
        const { email, password } = parsedCredentials.data;
        const user = await ValidateUser(email, password);
        if (!user) return null;
        return {
          id: user.user.id.toString(),
          name: user.user.username,
          email: user.user.email,
          token: user.jwt,
        };
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
