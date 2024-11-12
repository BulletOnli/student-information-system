import { prisma } from "@/lib/prisma";

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

export const createUser = async (data: RegisterUser) => {
  return await prisma.user.create({ data });
};
