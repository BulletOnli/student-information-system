import { prisma } from "@/lib/prisma";
import { Prisma, UserRole } from "@prisma/client";

export const getUserDetails = async (userId: string) => {
  return await prisma.user.findFirst({
    where: { id: userId },
    include: {
      student: {
        include: {
          course: true,
          enrolledSubjects: {
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
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      faculty: true,
    },
  });
};

export const getStudentDetails = async (userId: string) => {
  return await prisma.user.findFirst({
    where: { id: userId },
    include: {
      student: {
        include: {
          course: true,
        },
      },
    },
  });
};

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

export const createUser = async (data: RegisterUser) => {
  const randomId = `${Date.now()}-${Math.floor(Math.random() * 1_000)}`;
  return await prisma.user.create({
    data: {
      ...data,
      schoolId: randomId,
    },
  });
};

type StudentInfo = {
  userId: string;
  courseId: string;
  section: string;
  yearLevel: number;
};

export const createStudent = async (data: StudentInfo) => {
  return await prisma.student.create({ data });
};

type FacultyInfo = {
  userId: string;
  department: string;
  position: string;
};

export const createFaculty = async (data: FacultyInfo) => {
  return await prisma.faculty.create({ data });
};

export const getAllUsers = async (role?: UserRole) => {
  return await prisma.user.findMany({
    where: role ? { role } : undefined,
    include: {
      student:
        role === UserRole.STUDENT ? { include: { course: true } } : undefined,
      faculty: role === UserRole.FACULTY ? true : undefined,
    },
  });
};

type EntityType = "user" | "student" | "faculty";

export async function updateEntity<T extends { id: string }>(
  entityType: EntityType,
  data: T
) {
  const prismaModel = prisma[entityType] as any;

  return await prismaModel.update({
    where: { id: data.id },
    data,
  });
}

export const updateStudent = async (
  data: Prisma.StudentUncheckedUpdateInput & { id: string }
) => {
  return updateEntity("student", data);
};

export const updateFaculty = async (
  data: Prisma.FacultyUncheckedUpdateInput & { id: string }
) => {
  return updateEntity("faculty", data);
};

export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};
