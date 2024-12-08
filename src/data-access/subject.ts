import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourseSubjects = async (courseId: string) => {
  return await prisma.courseSubject.findMany({
    where: {
      courseId,
    },
    include: {
      subject: {
        include: {
          faculty: {
            select: {
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
      },
    },
  });
};

export const addSubject = async (data: Prisma.SubjectUncheckedCreateInput) => {
  return await prisma.subject.create({
    data: {
      code: data.code,
      title: data.title,
      description: data.description,
      facultyId: data.facultyId,
    },
  });
};

export const createCourseSubject = async (
  data: Prisma.CourseSubjectUncheckedCreateInput
) => {
  return await prisma.courseSubject.create({ data });
};