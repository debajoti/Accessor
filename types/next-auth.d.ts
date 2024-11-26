import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number; // User ID from Prisma model
      name: string | null; // Optional field based on Prisma
      email: string; // User email
      role: "ADMIN" | "USER"; // Role enum from Prisma
      permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[]; // Permission enum from Prisma
      status: "ACTIVE" | "INACTIVE"; // Status enum from Prisma
    };
  }

  interface User {
    id: number;
    name: string | null;
    email: string;
    role: "ADMIN" | "USER";
    permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
    status: "ACTIVE" | "INACTIVE"; // User's status field
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string | null;
    email: string;
    role: "ADMIN" | "USER";
    permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
    status: "ACTIVE" | "INACTIVE"; // Status field in the JWT
  }
}
