import { prisma } from "@/lib/prisma";
import { Course } from "@/lib/zod";
import { Prisma } from "@prisma/client";

export const getAllCourses = async () => {
  return await prisma.course.findMany({
    include: {
      _count: true,
    },
  });
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
              schoolId: true,
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

export const updateCourse = async (
  data: Prisma.CourseUpdateInput & { id: string }
) => {
  return await prisma.course.update({
    where: { id: data.id },
    data,
  });
};

export const deleteCourse = async (id: string) => {
  return await prisma.course.delete({ where: { id } });
};
