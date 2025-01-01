"use server";
import { prisma } from "@/lib/prisma";
import { gradeFormSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const addGrade = createServerAction()
  .input(gradeFormSchema)
  .handler(async ({ input }) => {
    const { enrolledSubjectId, semester, quarter, grade } = input;

    await prisma.grade.create({
      data: {
        enrolledSubjectId,
        semester,
        quarter,
        grade,
      },
    });

    revalidatePath("/grades");
  });
