"use server";
import { createCourse } from "@/data-access/course";
import { courseSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { createServerAction } from "zsa";

export const addCourseAction = createServerAction()
  .input(courseSchema)
  .handler(async ({ input }) => {
    const course = await createCourse(input);

    revalidatePath("/courses");
    return course;
  });
