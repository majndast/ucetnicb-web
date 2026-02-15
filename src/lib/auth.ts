import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Heslo", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const allowedEmail = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!allowedEmail || !passwordHash) return null;
        if (email !== allowedEmail) return null;

        const isValid = await compare(password, passwordHash);
        if (!isValid) return null;

        return { id: "1", email, name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
});
