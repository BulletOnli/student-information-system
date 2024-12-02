"use server";
import { createCourse, deleteCourse, updateCourse } from "@/data-access/course";
import { courseSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const addCourseAction = createServerAction()
  .input(courseSchema)
  .handler(async ({ input }) => {
    const course = await createCourse({
      ...input,
      code: input.code.toUpperCase(),
    });

    revalidatePath("/courses");
    return course;
  });

export const updateCourseAction = createServerAction()
  .input(courseSchema.and(z.object({ id: z.string() })))
  .handler(async ({ input }) => {
    const course = await updateCourse({
      ...input,
      id: input.id,
      code: input.code.toUpperCase(),
    });

    revalidatePath(`/courses/${course.id}`);
    return course;
  });

export const deleteCourseAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    await deleteCourse(input.id);

    revalidatePath("/courses");
  });
