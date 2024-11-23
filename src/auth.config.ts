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

        console.log(credentials);
        const parsedCredentials = z
        .object({
          email: z.string().email(),
          password: z.string().min(6),
          'g-recaptcha-response': z.string(),
        })
        .safeParse(credentials);

           
        if (!parsedCredentials.success) {
          return null;
        }
        const { email, password, 'g-recaptcha-response': captchaToken } = parsedCredentials.data;
        
        if (!captchaToken) {
          return null;
          
        }
        const user = await ValidateUser(email, password);
        if (!user) return null;
        return {
          firstname: user.user.firstname,
          lastname: user.user.lastname,
          email: user.user.email,
          birthdate: user.user.birthdate,
          image:user.user.photo.formats.thumbnail.url,
          country:user.user?.country?.name,
          phone:`${user.user.phone.code}${user.user.number}`,
          token: user.token,
        };
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
