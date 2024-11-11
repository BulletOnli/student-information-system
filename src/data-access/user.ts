import { prisma } from "@/lib/prisma";

type User = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: User) => {
  return await prisma.user.create({
    data: { email, password },
  });
};
