import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getAllAnnouncements = async () => {
  return prisma.announcement.findMany();
};

export const createAnnouncement = async (
  data: Prisma.AnnouncementUncheckedCreateInput
) => {
  return prisma.announcement.create({ data });
};
