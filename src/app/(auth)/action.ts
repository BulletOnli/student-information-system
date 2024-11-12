"use server";
import { createServerAction } from "zsa";
import { createUser } from "@/data-access/user";
import { registerFormSchema } from "./register/_components/RegisterForm";
import { z } from "zod";

export const signUpAction = createServerAction()
  .input(
    z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" }),
      lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" }),
      role: z.enum(["STUDENT", "FACULTY", "ADMIN"], {
        required_error: "Please select a role",
      }),
    })
  )
  .handler(async ({ input }) => {
    const user = await createUser(input);

    return user;
  });
