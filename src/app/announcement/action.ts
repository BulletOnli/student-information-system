"use server";

import { createAnnouncement } from "@/data-access/announcement";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createAnnouncementAction = createServerAction()
  .input(
    z.object({
      title: z.string(),
      content: z.string(),
      authorId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const course = await createAnnouncement(input);

    revalidatePath("/announcement");
    return course;
  });
