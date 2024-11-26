import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string | null; 
      email: string;
      role: "ADMIN" | "USER"; 
      permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
      status: "ACTIVE" | "INACTIVE"; 
    };
  }

  interface User {
    id: number;
    name: string | null;
    email: string;
    role: "ADMIN" | "USER";
    permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
    status: "ACTIVE" | "INACTIVE";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string | null;
    email: string;
    role: "ADMIN" | "USER";
    permissions: ("CREATE" | "READ" | "UPDATE" | "DELETE")[];
    status: "ACTIVE" | "INACTIVE"; 
  }
}
