"use server";
import { createServerAction } from "zsa";
import { createUser } from "@/data-access/user";
import { baseUserSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const signUpAction = createServerAction()
  .input(baseUserSchema)
  .handler(async ({ input }) => {
    const isEmailTaken = await prisma.user.findFirst({
      where: { email: input.email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new Error("Email is already taken");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await createUser({
      ...input,
      password: hashedPassword,
    });

    return user;
  });
