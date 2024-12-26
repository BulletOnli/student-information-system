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

    await prisma.$transaction(async (prisma) => {
      return Promise.all(
        selectedSubjects.map(async (subjectId) => {
          const enrollment = await prisma.enrolledSubject.findFirst({
            where: {
              studentId: input.studentId,
              subjectId,
            },
          });

          if (enrollment) {
            return enrollment; // Skip if already enrolled
          }

          return prisma.enrolledSubject.create({
            data: {
              studentId: input.studentId,
              subjectId,
            },
          });
        })
      );
    });
  });
