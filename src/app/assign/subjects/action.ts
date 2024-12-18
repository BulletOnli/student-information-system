"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createServerAction } from "zsa";

export const assignSubjectsAction = createServerAction()
  .input(
    z.object({ studentId: z.string(), selectedSubjects: z.array(z.string()) })
  )
  .handler(async ({ input }) => {
    const { selectedSubjects } = input;

    selectedSubjects.forEach(async (subjectId) => {
      await prisma.student.update({
        where: {
          id: input.studentId,
        },
        data: {
          subjects: {
            connect: {
              id: subjectId,
            },
          },
        },
      });
    });
  });
