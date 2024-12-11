"use server";
import { deleteSubject } from "@/data-access/subject";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const deleteSubjectAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    await deleteSubject(input.id);

    revalidatePath(`/courses`);
  });
