"use server";
import { createServerAction } from "zsa";
import { z } from "zod";
import { adminSchema, facultySchema, studentSchema } from "@/lib/zod";
import { createFaculty, createStudent, createUser } from "@/data-access/user";
import * as argon2 from "argon2";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createUserAction = createServerAction()
  .input(
    z.discriminatedUnion("role", [facultySchema, studentSchema, adminSchema])
  )
  .handler(async ({ input }) => {
    const hashedPassword = await argon2.hash(input.password);

    const isEmailTaken = await prisma.user.findFirst({
      where: { email: input.email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new Error("Email is already taken");
    }

    let user = await createUser({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: hashedPassword,
      role: input.role,
    });

    if (input.role === "FACULTY") {
      await createFaculty({
        userId: user.id,
        department: input.department,
        position: input.position,
        facultyNumber: Number(input.facultyNumber),
      });
    }

    if (input.role === "STUDENT") {
      await createStudent({
        userId: user.id,
        courseId: input.courseId,
        section: input.section,
        yearLevel: Number(input.yearLevel),
        studentNumber: Number(input.studentNumber),
      });
    }

    revalidatePath("/users");
    return { id: user.id, email: user.email };
  });
