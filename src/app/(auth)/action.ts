"use server";
import { createServerAction } from "zsa";
import z from "zod";
import { createUser } from "@/data-access/user";

export const signUpAction = createServerAction()
  .input(
    z.object({
      email: z.string().min(3).max(20),
      password: z.string().min(6).max(20),
    })
  )
  .handler(async ({ input }) => {
    const user = await createUser(input);

    return user;
  });
