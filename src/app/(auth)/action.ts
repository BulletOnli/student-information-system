"use server";
import { createServerAction } from "zsa";
import { createUser } from "@/data-access/user";
import { baseUserSchema } from "@/lib/zod";
import * as argon2 from "argon2";
import { prisma } from "@/lib/prisma";

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

    const hashedPassword = await argon2.hash(input.password);
    const user = await createUser({
      ...input,
      password: hashedPassword,
    });

    return user;
  });
