import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

// Simple in-memory brute force protection
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkBruteForce(email: string): { blocked: boolean } {
  const entry = loginAttempts.get(email);
  if (!entry) return { blocked: false };

  if (Date.now() > entry.lockedUntil) {
    loginAttempts.delete(email);
    return { blocked: false };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { blocked: true };
  }

  return { blocked: false };
}

function recordFailedAttempt(email: string) {
  const entry = loginAttempts.get(email);
  if (!entry) {
    loginAttempts.set(email, {
      count: 1,
      lockedUntil: Date.now() + LOCK_DURATION_MS,
    });
    return;
  }
  entry.count++;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCK_DURATION_MS;
  }
}

function clearAttempts(email: string) {
  loginAttempts.delete(email);
}

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

        const { blocked } = checkBruteForce(email);
        if (blocked) return null;

        const allowedEmail = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!allowedEmail || !passwordHash) return null;

        if (email !== allowedEmail) {
          recordFailedAttempt(email);
          return null;
        }

        const isValid = await compare(password, passwordHash);
        if (!isValid) {
          recordFailedAttempt(email);
          return null;
        }

        clearAttempts(email);
        return { id: "1", email, name: "Admin" };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});
