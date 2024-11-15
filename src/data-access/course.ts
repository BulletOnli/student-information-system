import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/zod";

export const getAllCourses = async () => {
  return await prisma.course.findMany();
};

export const getCourseDetails = async (id: string) => {
  return await prisma.course.findFirst({
    where: { id },
    include: {
      students: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

export const createCourse = async (data: Course) => {
  return await prisma.course.create({ data });
};
