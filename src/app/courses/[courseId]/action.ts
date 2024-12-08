"use server";
import { addSubject, createCourseSubject } from "@/data-access/subject";
import { prisma } from "@/lib/prisma";
import { subjectSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const addSubjectAction = createServerAction()
  .input(subjectSchema.and(z.object({ courseId: z.string() })))
  .handler(async ({ input }) => {
    const subject = await addSubject({
      ...input,
      code: input.code.toUpperCase(),
    });

    await createCourseSubject({
      courseId: input.courseId,
      subjectId: subject.id,
    });

    revalidatePath(`/courses/${input.courseId}`);
  });

export const updateSubjectAction = createServerAction()
  .input(subjectSchema.and(z.object({ id: z.string(), courseId: z.string() })))
  .handler(async ({ input }) => {
    const subject = await prisma.subject.update({
      data: {
        code: input.code.toUpperCase(),
        title: input.title,
        description: input.description,
        facultyId: input.facultyId,
      },
      where: {
        id: input.id,
      },
    });

    revalidatePath(`/courses/${input.courseId}`);
    return subject;
  });
