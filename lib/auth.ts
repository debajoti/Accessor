import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        role: { label: "Role", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "mail@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (
          !credentials?.role ||
          !credentials?.email ||
          !credentials?.password
        ) {
          throw new Error("Missing credentials");
        }

        let existingUser;

        if (credentials.role === "USER") {
          existingUser = await db.user.findUnique({
            where: { email: credentials.email, role: "USER" },
          });
        } else if (credentials.role === "ADMIN") {
          existingUser = await db.user.findUnique({
            where: { email: credentials.email, role: "ADMIN" },
          });
        } else {
          throw new Error("Invalid role");
        }

        if (!existingUser) return null;

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) return null;

        return {
          id: existingUser.id,
          email: existingUser.email,
          role: credentials.role,
          name: existingUser.name,
          permissions: existingUser.permissions,
          status: existingUser.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.permissions = user.permissions;
        token.status = user.status; // Include the status field
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        permissions: token.permissions,
        status: token.status, // Include the status field
      };
      return session;
    },
  },
};
