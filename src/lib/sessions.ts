import { auth } from "@/auth";
import { cache } from "react";
import { prisma } from "./prisma";

export const getCurrentUser = cache(async (email?: string) => {
  const session = await auth();
  if (!session?.user) return null;

  const userEmail = email || session.user.email;
  if (!userEmail) return null;

  const user = await prisma.user.findFirst({
    where: { email: userEmail },
  });

  return user;
});
