"use server";
import { createServerAction } from "zsa";
import { z } from "zod";
import { adminSchema, facultySchema, studentSchema } from "@/lib/zod";
import {
  createFaculty,
  createStudent,
  createUser,
  deleteUser,
  updateFaculty,
  updateStudent,
} from "@/data-access/user";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const createUserAction = createServerAction()
  .input(
    z.discriminatedUnion("role", [facultySchema, studentSchema, adminSchema])
  )
  .handler(async ({ input }) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);

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
      });
    }

    if (input.role === "STUDENT") {
      await createStudent({
        userId: user.id,
        courseId: input.courseId,
        section: input.section,
        yearLevel: Number(input.yearLevel),
      });
    }

    revalidatePath(`/users/${user.role.toLowerCase()}`);
    return { id: user.id, email: user.email };
  });

export const updateUserAction = createServerAction()
  .input(
    z
      .discriminatedUnion("role", [facultySchema, studentSchema, adminSchema])
      .and(z.object({ userId: z.string() }))
  )
  .handler(async ({ input }) => {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized, please login");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const isEmailTaken = await prisma.user.findFirst({
      where: { email: input.email, NOT: { id: input.userId } },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new Error("Email is already taken");
    }

    const user = await prisma.user.update({
      where: { id: input.userId as string },
      data: {
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        // password: hashedPassword,
      },
      include: {
        faculty: {
          select: {
            id: true,
          },
        },
        student: {
          select: {
            id: true,
          },
        },
      },
    });

    if (input.role === "FACULTY") {
      await updateFaculty({
        id: user.faculty?.id as string,
        department: input.department,
        position: input.position,
      });
    }

    if (input.role === "STUDENT") {
      await updateStudent({
        id: user.student?.id as string,
        courseId: input.courseId,
        section: input.section,
        yearLevel: Number(input.yearLevel),
      });
    }

    revalidatePath(`/users/${user.role.toLowerCase()}`);
    return { id: user.id, email: user.email };
  });

export const deleteUserAction = createServerAction()
  .input(
    z.object({
      userId: z.string().min(1),
      role: z.enum(["STUDENT", "FACULTY", "ADMIN"]),
    })
  )
  .handler(async ({ input }) => {
    await deleteUser(input.userId);

    revalidatePath(`/users/${input.role.toLowerCase()}`);
  });
