"use server";
import { prisma } from "@/lib/prisma";
import { gradeFormSchema } from "@/lib/zod";
import { Semester } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const addGrade = createServerAction()
  .input(gradeFormSchema)
  .handler(async ({ input }) => {
    const { enrolledSubjectId, semester, grade } = input;

    await prisma.grade.create({
      data: {
        enrolledSubjectId,
        semester,
        grade,
      },
    });

    revalidatePath("/grades");
  });

export const updateGradeAction = createServerAction()
  .input(gradeFormSchema)
  .handler(async ({ input }) => {
    const { semester, grade, gradeId } = input;

    const currentGrade = await prisma.grade.findUnique({
      where: { id: gradeId ?? "" },
      select: { semester: true, grade: true },
    });

    if (!currentGrade) {
      throw new Error("Grade not found");
    }

    const updatedData: { semester?: Semester; grade?: number } = {};

    if (semester !== currentGrade.semester) {
      updatedData.semester = semester;
    }
    if (grade !== currentGrade.grade) {
      updatedData.grade = grade;
    }

    if (Object.keys(updatedData).length > 0) {
      await prisma.grade.update({
        where: { id: gradeId ?? "" },
        data: updatedData,
      });
    }

    revalidatePath("/grades");
  });
