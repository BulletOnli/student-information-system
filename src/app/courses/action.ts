"use server";
import { createCourse, updateCourse } from "@/data-access/course";
import { courseSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const addCourseAction = createServerAction()
  .input(courseSchema)
  .handler(async ({ input }) => {
    const course = await createCourse(input);

    revalidatePath("/courses");
    return course;
  });

export const updateCourseAction = createServerAction()
  .input(courseSchema.and(z.object({ id: z.string() })))
  .handler(async ({ input }) => {
    const course = await updateCourse({ ...input, id: input.id });

    revalidatePath(`/courses/${course.id}`);
    return course;
  });
