import { User } from "@prisma/client";


export type ExtendedUser = Omit<User, "hashedPassword" | "emailVerified"> & {
  role: "ADMIN" | "CUSTOMER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "CUSTOMER";
  }
}