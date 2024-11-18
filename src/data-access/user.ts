import { prisma } from "@/lib/prisma";
import { Course, Prisma, UserRole } from "@prisma/client";

type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
};

export const createUser = async (data: RegisterUser) => {
  return await prisma.user.create({ data });
};

type StudentInfo = {
  userId: string;
  courseId: string;
  section: string;
  yearLevel: number;
  studentNumber: number;
};

export const createStudent = async (data: StudentInfo) => {
  return await prisma.student.create({ data });
};

type FacultyInfo = {
  userId: string;
  department: string;
  position: string;
  facultyNumber: number;
};

export const createFaculty = async (data: FacultyInfo) => {
  return await prisma.faculty.create({ data });
};

const getUserIncludeObject = (role?: UserRole) => {
  const includes: Prisma.UserInclude = {};

  if (role === UserRole.STUDENT) {
    includes.student = {
      include: {
        course: true,
      },
    };
  }

  return includes;
};

export const getAllUsers = async (role?: UserRole) => {
  const queryOptions: Prisma.UserFindManyArgs = {
    where: role ? { role } : undefined,
    include: getUserIncludeObject(role),
  };

  return await prisma.user.findMany(queryOptions);
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
