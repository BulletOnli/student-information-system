import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllAnnouncements = async () => {
  return prisma.announcement.findMany({
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
};

export const createAnnouncement = async (
  data: Prisma.AnnouncementUncheckedCreateInput
) => {
  return prisma.announcement.create({ data });
};
