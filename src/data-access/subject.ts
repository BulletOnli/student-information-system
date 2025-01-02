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

export const deleteSubject = async (id: string) => {
  return await prisma.subject.delete({ where: { id } });
};

export const getEnrolledSubjectsWithGrades = async (studentId: string) => {
  const enrolledSubjects = await prisma.enrolledSubject.findMany({
    where: { studentId },
    include: { subject: true, grades: true },
    orderBy: [{ subject: { code: "asc" } }],
  });

  const processedSubjects = enrolledSubjects.map((subject) => {
    const grades: {
      FIRST: number | null;
      SECOND: number | null;
    } = {
      FIRST: null,
      SECOND: null,
    };

    subject.grades.forEach((grade) => {
      grades[grade.semester] = grade.grade;
    });

    return {
      id: subject.id,
      code: subject.subject.code,
      title: subject.subject.title,
      grades,
    };
  });

  return processedSubjects;
};
